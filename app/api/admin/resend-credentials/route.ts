import { apiErrorResponse } from "@/lib/api-error";
import { getDb } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { cookies } from "next/headers";
import { sendClientCredentialsEmail } from "@/lib/mailer";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const adminCookie = cookieStore.get("ajx_admin");
    if (!adminCookie || adminCookie.value !== "ok") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { userId } = body || {};

    if (!userId) {
      return NextResponse.json({ message: "userId is required" }, { status: 400 });
    }

    const db = await getDb();
    const user = await db.collection("users").findOne<{
      email?: string;
      clientId?: string;
      fullName?: string;
      adminPlainPassword?: string;
    }>({ _id: new ObjectId(userId) });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (!user.clientId || !user.adminPlainPassword) {
      return NextResponse.json(
        { message: "User does not have credentials set yet" },
        { status: 400 },
      );
    }

    if (!user.email) {
      return NextResponse.json(
        { message: "User has no email address on file" },
        { status: 400 },
      );
    }

    await sendClientCredentialsEmail({
      to: user.email,
      fullName: user.fullName,
      clientId: user.clientId,
      password: user.adminPlainPassword,
    });

    return NextResponse.json({
      message: "Credentials email resent",
      email: user.email,
    });
  } catch (error) {
    return apiErrorResponse(error, "Resend credentials error:", "Failed to resend credentials");
  }
}

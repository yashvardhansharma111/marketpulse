import { NextResponse } from "next/server";
import crypto from "crypto";
import { cookies } from "next/headers";
import { getDb } from "@/lib/mongodb";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("ajx_session")?.value;

    if (sessionToken) {
      const tokenHash = crypto
        .createHash("sha256")
        .update(sessionToken)
        .digest("hex");

      const db = await getDb();
      await db.collection("sessions").deleteOne({ tokenHash });
    }

    const response = NextResponse.json({ message: "Logged out" });
    response.cookies.set("ajx_session", "", {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json({ message: "Failed to logout" }, { status: 500 });
  }
}

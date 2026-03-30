import { NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 },
      );
    }

    const {
      passwordHash,
      ...safeUser
    } = user as Record<string, unknown> & { passwordHash?: string };

    const tradingBalance =
      (safeUser.tradingBalance as number | undefined) ?? 0;
    const margin = (safeUser.margin as number | undefined) ?? 0;

    return NextResponse.json({
      user: {
        ...safeUser,
        tradingBalance,
        margin,
      },
    });
  } catch (error) {
    console.error("Auth me error:", error);
    return NextResponse.json(
      { message: "Failed to load user" },
      { status: 500 },
    );
  }
}


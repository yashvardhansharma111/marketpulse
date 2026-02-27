import { NextResponse } from "next/server";
import { getUserFromSession } from "@/lib/auth";
import { readScopedConfig } from "@/lib/scoped-config";

type HomeConfig = {
  indices?: Array<{
    name: string;
    value: number;
    change: number;
    changePct: number;
  }>;
  chart?: {
    title?: string;
    points: Array<{ x: string; y: number }>;
  };
  stocks?: Array<{
    symbol: string;
    name?: string;
    ltp: number;
    change: number;
    changePct: number;
  }>;
};

const defaultConfig: HomeConfig = {
  indices: [
    { name: "NIFTY 50", value: 22000, change: 120, changePct: 0.55 },
    { name: "SENSEX", value: 72000, change: -250, changePct: -0.35 },
    { name: "BANKNIFTY", value: 48000, change: 90, changePct: 0.19 },
  ],
  chart: {
    title: "Market Overview",
    points: [
      { x: "09:15", y: 100 },
      { x: "10:00", y: 104 },
      { x: "11:00", y: 102 },
      { x: "12:00", y: 108 },
      { x: "13:00", y: 106 },
      { x: "14:00", y: 110 },
      { x: "15:30", y: 112 },
    ],
  },
  stocks: [
    { symbol: "RELIANCE", name: "Reliance", ltp: 2850, change: 25, changePct: 0.88 },
    { symbol: "TCS", name: "TCS", ltp: 3920, change: -18, changePct: -0.46 },
    { symbol: "HDFCBANK", name: "HDFC Bank", ltp: 1540, change: 6, changePct: 0.39 },
  ],
};

export async function GET() {
  try {
    const user = await getUserFromSession();
    const userId = (user as { _id?: { toString(): string } } | null)?._id?.toString();

    const { config } = await readScopedConfig<HomeConfig>({
      key: "dashboard_home",
      userId: userId || null,
      fallback: defaultConfig,
    });

    return NextResponse.json({ config });
  } catch (error) {
    console.error("Config dashboard home error:", error);
    return NextResponse.json(
      { message: "Failed to load dashboard home" },
      { status: 500 },
    );
  }
}

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/** Default dev origins (Expo web, etc.). Trailing slashes are normalized away. */
const DEFAULT_ALLOWED = [
  "http://localhost:8081",
  "http://127.0.0.1:8081",
];

function normalizeOrigin(o: string): string {
  return o.replace(/\/$/, "");
}

function loadAllowedOrigins(): Set<string> {
  const set = new Set<string>();
  for (const o of DEFAULT_ALLOWED) {
    set.add(normalizeOrigin(o));
  }
  const extra = process.env.CORS_ALLOWED_ORIGINS;
  if (extra) {
    for (const part of extra.split(",")) {
      const t = part.trim();
      if (t) set.add(normalizeOrigin(t));
    }
  }
  return set;
}

const ALLOWED_ORIGINS = loadAllowedOrigins();

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  const n = normalizeOrigin(origin);
  if (ALLOWED_ORIGINS.has(n)) return true;
  // Optional: any localhost / loopback port (set in .env.local for dev)
  if (process.env.CORS_ALLOW_LOCALHOST === "true") {
    try {
      const u = new URL(n);
      return u.hostname === "localhost" || u.hostname === "127.0.0.1";
    } catch {
      return false;
    }
  }
  return false;
}

function corsHeaders(origin: string | null): HeadersInit {
  if (!isAllowedOrigin(origin)) {
    return {};
  }
  const allowOrigin = normalizeOrigin(origin!);
  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers":
      "Authorization, Content-Type, X-Requested-With, Accept, ngrok-skip-browser-warning",
    Vary: "Origin",
    "Access-Control-Max-Age": "86400",
  };
}

export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin");
  const extra = corsHeaders(origin);

  if (request.method === "OPTIONS") {
    return new NextResponse(null, { status: 204, headers: extra });
  }

  const res = NextResponse.next();
  for (const [key, value] of Object.entries(extra)) {
    res.headers.set(key, value as string);
  }
  return res;
}

export const config = {
  matcher: "/api/:path*",
};

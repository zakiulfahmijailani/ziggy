import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { encryptTokens, tokenCookieOptions, type GoogleTokens, TOKEN_COOKIE } from "@/lib/google-drive-auth";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const jar = await cookies();
  if (!code || !state || state !== jar.get("ziggy_google_state")?.value) return NextResponse.redirect(new URL("/projects?drive=failed", request.url));
  try {
    const body = new URLSearchParams({ code, client_id: process.env.GOOGLE_CLIENT_ID ?? "", client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "", redirect_uri: process.env.GOOGLE_REDIRECT_URI ?? "", grant_type: "authorization_code" });
    const exchange = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body });
    if (!exchange.ok) throw new Error("Google token exchange failed");
    const token = await exchange.json() as { access_token: string; refresh_token?: string; expires_in: number };
    const secureTokens: GoogleTokens = { access_token: token.access_token, refresh_token: token.refresh_token, expires_at: Date.now() + token.expires_in * 1000 };
    const response = NextResponse.redirect(new URL("/projects?drive=connected", request.url));
    response.cookies.set(TOKEN_COOKIE, encryptTokens(secureTokens), tokenCookieOptions());
    response.cookies.set("ziggy_google_state", "", { path: "/", maxAge: 0 });
    return response;
  } catch { return NextResponse.redirect(new URL("/projects?drive=failed", request.url)); }
}

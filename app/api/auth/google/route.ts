import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;
  if (!clientId || !redirectUri) return NextResponse.json({ error: "Google Drive is not configured yet." }, { status: 503 });
  const state = randomBytes(24).toString("base64url");
  const query = new URLSearchParams({ client_id: clientId, redirect_uri: redirectUri, response_type: "code", access_type: "offline", prompt: "consent", state, scope: "https://www.googleapis.com/auth/drive" });
  const response = NextResponse.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${query}`);
  response.cookies.set("ziggy_google_state", state, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 600 });
  return response;
}

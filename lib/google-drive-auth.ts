import { createCipheriv, createDecipheriv, createHash, randomBytes } from "crypto";

const TOKEN_COOKIE = "ziggy_google_drive";
const TOKEN_URL = "https://oauth2.googleapis.com/token";

export type GoogleTokens = {
  access_token: string;
  refresh_token?: string;
  expires_at: number;
};

function encryptionKey() {
  const secret = process.env.GOOGLE_TOKEN_ENCRYPTION_KEY;
  if (!secret) throw new Error("GOOGLE_TOKEN_ENCRYPTION_KEY is not configured.");
  return createHash("sha256").update(secret).digest();
}

export function encryptTokens(tokens: GoogleTokens) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", encryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(tokens), "utf8"), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), encrypted]).toString("base64url");
}

export function decryptTokens(value: string): GoogleTokens {
  const payload = Buffer.from(value, "base64url");
  const iv = payload.subarray(0, 12);
  const tag = payload.subarray(12, 28);
  const encrypted = payload.subarray(28);
  const decipher = createDecipheriv("aes-256-gcm", encryptionKey(), iv);
  decipher.setAuthTag(tag);
  return JSON.parse(Buffer.concat([decipher.update(encrypted), decipher.final()]).toString("utf8"));
}

export function tokenCookieOptions() {
  return { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax" as const, path: "/", maxAge: 60 * 60 * 24 * 30 };
}

export async function refreshGoogleTokens(tokens: GoogleTokens) {
  if (tokens.expires_at > Date.now() + 60_000) return tokens;
  if (!tokens.refresh_token) throw new Error("Your Google Drive connection has expired. Please reconnect it.");
  const body = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID ?? "",
    client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    refresh_token: tokens.refresh_token,
    grant_type: "refresh_token",
  });
  const response = await fetch(TOKEN_URL, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body });
  if (!response.ok) throw new Error("Google could not refresh the Drive connection.");
  const refreshed = await response.json() as { access_token: string; expires_in: number };
  return { ...tokens, access_token: refreshed.access_token, expires_at: Date.now() + refreshed.expires_in * 1000 };
}

export { TOKEN_COOKIE };

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { decryptTokens, TOKEN_COOKIE } from "@/lib/google-drive-auth";

export async function GET() {
  const raw = (await cookies()).get(TOKEN_COOKIE)?.value;
  try {
    if (!raw) throw new Error();
    decryptTokens(raw);
    const rootFolderId = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;
    return NextResponse.json({ connected: true, rootFolderId, rootFolderUrl: rootFolderId ? `https://drive.google.com/drive/folders/${rootFolderId}` : undefined });
  } catch { return NextResponse.json({ connected: false }); }
}

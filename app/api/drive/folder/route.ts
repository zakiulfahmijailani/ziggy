import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decryptTokens, encryptTokens, refreshGoogleTokens, TOKEN_COOKIE, tokenCookieOptions } from "@/lib/google-drive-auth";
import { prisma } from "@/lib/prisma";
import { toUiProject } from "@/lib/project-data";
const API = "https://www.googleapis.com/drive/v3/files";
const MIME = "application/vnd.google-apps.folder";
export async function POST(request: Request) {
  try {
    const { name, starter, institution, title, country } = await request.json();
    if (!name) return NextResponse.json({ error: "A folder name is required." }, { status: 400 });
    const rawTokens = (await cookies()).get(TOKEN_COOKIE)?.value;
    if (!rawTokens) return NextResponse.json({ error: "Connect Google Drive first." }, { status: 401 });
    const tokens = await refreshGoogleTokens(decryptTokens(rawTokens));
    const parentId = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;
    if (!parentId) return NextResponse.json({ error: "Ziggy's Drive parent folder is not configured." }, { status: 503 });
    const accessToken = tokens.access_token;
    const make = (folderName: string, parent?: string) => fetch(API, { method: "POST", headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" }, body: JSON.stringify({ name: folderName, mimeType: MIME, ...(parent ? { parents: [parent] } : {}) }) });
    const response = await make(name, parentId);
    if (!response.ok) return NextResponse.json({ error: "Google Drive rejected the request." }, { status: response.status });
    const folder = await response.json();
    const names = starter ? ["01 Vacancy & Requirements", "02 Proposal", "03 Cover Letter", "04 CV & Certificates", "05 References", "06 Submission Proof"] : [];
    await Promise.all(names.map((child) => make(child, folder.id)));
    const user = await prisma.user.upsert({ where: { email: "zaki@example.com" }, update: {}, create: { email: "zaki@example.com", name: "Zaki" } });
    const project = await prisma.project.create({
      data: {
        userId: user.id,
        slug: `application-${folder.id}`,
        organization: institution?.trim() || null,
        title: title?.trim() || folder.name,
        country: country?.trim() || null,
        stage: "PREPARING",
        risk: "LOW",
        driveFolderId: folder.id,
        driveFolderUrl: `https://drive.google.com/drive/folders/${folder.id}`,
      },
      include: { requirements: true, tasks: true, milestones: true },
    });
    const result = NextResponse.json({ id: folder.id, name: folder.name, url: `https://drive.google.com/drive/folders/${folder.id}`, subfolders: names, project: toUiProject(project) });
    result.cookies.set(TOKEN_COOKIE, encryptTokens(tokens), tokenCookieOptions());
    return result;
  } catch { return NextResponse.json({ error: "Could not create the Drive folder." }, { status: 500 }); }
}

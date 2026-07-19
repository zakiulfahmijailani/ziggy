import { NextResponse } from "next/server";
const API = "https://www.googleapis.com/drive/v3/files";
const MIME = "application/vnd.google-apps.folder";
export async function POST(request: Request) {
  try {
    const { accessToken, name, parentId, starter } = await request.json();
    if (!accessToken || !name) return NextResponse.json({ error: "Access token and folder name are required." }, { status: 400 });
    const make = (folderName: string, parent?: string) => fetch(API, { method: "POST", headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" }, body: JSON.stringify({ name: folderName, mimeType: MIME, ...(parent ? { parents: [parent] } : {}) }) });
    const response = await make(name, parentId);
    if (!response.ok) return NextResponse.json({ error: "Google Drive rejected the request." }, { status: response.status });
    const folder = await response.json();
    const names = starter ? ["01 Vacancy & Requirements", "02 Proposal", "03 Cover Letter", "04 CV & Certificates", "05 References", "06 Submission Proof"] : [];
    await Promise.all(names.map((child) => make(child, folder.id)));
    return NextResponse.json({ id: folder.id, name: folder.name, url: `https://drive.google.com/drive/folders/${folder.id}`, subfolders: names });
  } catch { return NextResponse.json({ error: "Could not create the Drive folder." }, { status: 500 }); }
}

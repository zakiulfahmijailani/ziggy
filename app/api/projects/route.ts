import { NextResponse } from "next/server";
import { ensureKthProject } from "@/lib/bootstrap-project";
import { prisma } from "@/lib/prisma";
import { toUiProject } from "@/lib/project-data";

const include = { requirements: true, tasks: true, milestones: true } as const;

export async function GET() {
  try {
    await ensureKthProject();
    const projects = await prisma.project.findMany({ orderBy: { createdAt: "asc" }, include });
    return NextResponse.json({ projects: projects.map(toUiProject) });
  } catch {
    return NextResponse.json({ projects: [] });
  }
}

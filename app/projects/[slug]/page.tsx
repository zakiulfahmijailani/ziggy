import { ProjectDetail } from "@/components/project-detail";
import { getProjectBySlug } from "@/lib/demo-data";
import { toUiProject } from "@/lib/project-data";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const storedProject = await prisma.project.findUnique({ where: { slug }, include: { requirements: true, tasks: true, milestones: true } }).catch(() => null);
  const project = storedProject ? toUiProject(storedProject) : getProjectBySlug(slug);
  if (!project) notFound();
  return <ProjectDetail project={project} />;
}

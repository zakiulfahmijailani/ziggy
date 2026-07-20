import { prisma } from "@/lib/prisma";

export async function ensureKthProject() {
  const existing = await prisma.project.findUnique({ where: { slug: "kth-geoai" } });
  if (existing) return existing;

  const user = await prisma.user.upsert({
    where: { email: "zaki@example.com" },
    update: {},
    create: { email: "zaki@example.com", name: "Zaki" },
  });

  return prisma.project.create({
    data: {
      slug: "kth-geoai",
      userId: user.id,
      organization: "KTH Royal Institute of Technology",
      title: "PhD in GeoAI for Sustainable Cities",
      country: "Sweden",
      stage: "PREPARING",
      risk: "HIGH",
      officialDeadline: new Date("2026-08-14T23:59:00Z"),
      personalTarget: new Date("2026-08-13T17:00:00Z"),
      driveFolderId: "1jcZD9n9tpFGpfu4aqCMOLsASdXdLFY_h",
      driveFolderUrl: "https://drive.google.com/drive/folders/1jcZD9n9tpFGpfu4aqCMOLsASdXdLFY_h",
      tasks: { create: [
        { title: "Finish research-fit section", priority: 1, estimatedMinutes: 90, status: "TODO" },
        { title: "Ask Nina to review proposal", priority: 1, estimatedMinutes: 15, status: "TODO" },
        { title: "Tailor academic CV", priority: 2, estimatedMinutes: 45, status: "DONE" },
      ] },
      requirements: { create: [
        { title: "Academic CV", status: "FINAL" },
        { title: "Master's diploma", status: "FINAL" },
        { title: "Research proposal", status: "REVISING" },
        { title: "Cover letter", status: "DRAFTING" },
        { title: "Reference letter — Dr. Hani", status: "NEEDS_REVIEW" },
      ] },
    },
  });
}

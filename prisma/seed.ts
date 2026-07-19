import { PrismaClient, ProjectStage, RiskLevel, TaskStatus, DocumentStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({ where: { email: "zaki@example.com" }, update: {}, create: { email: "zaki@example.com", name: "Zaki" } });
  await prisma.project.upsert({ where: { id: "demo-kth-geoai" }, update: {}, create: { id: "demo-kth-geoai", userId: user.id, organization: "KTH Royal Institute of Technology", title: "PhD in GeoAI for Sustainable Cities", country: "Sweden", stage: ProjectStage.PREPARING, risk: RiskLevel.HIGH, officialDeadline: new Date("2026-08-14T23:59:00Z"), personalTarget: new Date("2026-08-13T17:00:00Z"), driveFolderUrl: "https://drive.google.com/", tasks: { create: [{ title: "Finish research-fit section", priority: 1, estimatedMinutes: 90, status: TaskStatus.TODO }, { title: "Tailor academic CV", priority: 2, estimatedMinutes: 45, status: TaskStatus.DONE }] }, requirements: { create: [{ title: "Academic CV", status: DocumentStatus.FINAL }, { title: "Research proposal", status: DocumentStatus.REVISING }, { title: "Reference letter", status: DocumentStatus.NEEDS_REVIEW }] } } });
  console.log("Ziggy demo data is ready.");
}
main().finally(() => prisma.$disconnect());

import { execFileSync } from "node:child_process";

if (!process.env.DATABASE_URL?.startsWith("postgres")) {
  console.log("No database URL available locally; skipping database preparation.");
  process.exit(0);
}

execFileSync("npx", ["prisma", "generate"], { stdio: "inherit", shell: process.platform === "win32" });
execFileSync("npx", ["prisma", "db", "push"], { stdio: "inherit", shell: process.platform === "win32" });

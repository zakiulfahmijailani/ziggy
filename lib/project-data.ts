import type { Milestone, Project as DatabaseProject, Requirement, Task } from "@prisma/client";
import type { Project } from "./demo-data";

type ProjectWithDetails = DatabaseProject & {
  requirements: Requirement[];
  tasks: Task[];
  milestones: Milestone[];
};

const stageLabels = {
  DISCOVERED: "Evaluating",
  EVALUATING: "Evaluating",
  SHORTLISTED: "Evaluating",
  PREPARING: "Preparing",
  WAITING: "Preparing",
  READY_TO_SUBMIT: "Ready to submit",
  SUBMITTED: "Submitted",
  INTERVIEW: "Submitted",
  OFFER: "Submitted",
  REJECTED: "Submitted",
  WITHDRAWN: "Submitted",
  ARCHIVED: "Submitted",
} as const;

const statusLabels = {
  NOT_STARTED: "Not started",
  DRAFTING: "Drafting",
  NEEDS_REVIEW: "Revising",
  REVISING: "Revising",
  FINAL: "Final",
  SUBMITTED: "Final",
  OUTDATED: "Not started",
} as const;

function formatDate(date: Date | null) {
  return date ? new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(date) : "No deadline";
}

function daysUntil(date: Date | null) {
  if (!date) return 0;
  return Math.max(0, Math.ceil((date.getTime() - Date.now()) / 86_400_000));
}

export function toUiProject(project: ProjectWithDetails): Project {
  const requirements = project.requirements.map((requirement) => ({
    name: requirement.title,
    status: statusLabels[requirement.status],
    critical: requirement.isRequired,
  }));
  const requirementsDone = requirements.filter((requirement) => requirement.status === "Final").length;
  const requirementsTotal = requirements.length;
  const tasks = project.tasks.map((task) => ({
    title: task.title,
    due: formatDate(task.dueAt),
    done: task.status === "DONE",
    priority: task.priority <= 1 ? "High" as const : task.priority === 2 ? "Medium" as const : "Low" as const,
    estimate: task.estimatedMinutes ? `${task.estimatedMinutes} min` : "—",
  }));
  const milestones = project.milestones.map((milestone) => ({
    title: milestone.title,
    date: formatDate(milestone.dueAt),
    done: milestone.status === "DONE",
  }));
  const nextTask = tasks.find((task) => !task.done);

  return {
    id: project.id,
    slug: project.slug,
    university: project.organization || "PhD application",
    title: project.title,
    country: project.country || "—",
    stage: stageLabels[project.stage],
    risk: project.risk.toLowerCase() as Project["risk"],
    deadline: formatDate(project.officialDeadline),
    daysLeft: daysUntil(project.officialDeadline),
    readiness: requirementsTotal ? Math.round((requirementsDone / requirementsTotal) * 100) : 0,
    taskTotal: tasks.length,
    taskDone: tasks.filter((task) => task.done).length,
    requirementsTotal,
    requirementsDone,
    nextAction: nextTask?.title || "Add your next action",
    accent: project.risk === "HIGH" ? "coral" : project.risk === "MEDIUM" ? "violet" : "blue",
    driveUrl: project.driveFolderUrl || "https://drive.google.com/",
    description: project.description || "A new PhD application in your Ziggy workspace.",
    requirements,
    tasks,
    documents: [],
    milestones,
  };
}

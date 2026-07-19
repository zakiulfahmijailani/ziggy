export type ProjectStage = "Preparing" | "Ready to submit" | "Submitted" | "Evaluating";
export type Risk = "low" | "medium" | "high";

export type Project = {
  id: string;
  slug: string;
  university: string;
  title: string;
  country: string;
  stage: ProjectStage;
  risk: Risk;
  deadline: string;
  daysLeft: number;
  readiness: number;
  taskTotal: number;
  taskDone: number;
  requirementsTotal: number;
  requirementsDone: number;
  nextAction: string;
  accent: string;
  driveUrl: string;
  description: string;
  requirements: { name: string; status: "Final" | "Revising" | "Drafting" | "Waiting" | "Not started"; critical?: boolean }[];
  tasks: { title: string; due: string; done?: boolean; priority: "High" | "Medium" | "Low"; estimate: string }[];
  documents: { name: string; type: string; status: string; updated: string }[];
  milestones: { title: string; date: string; done?: boolean }[];
};

export const projects: Project[] = [
  {
    id: "1",
    slug: "kth-geoai",
    university: "KTH Royal Institute of Technology",
    title: "PhD in GeoAI for Sustainable Cities",
    country: "Sweden",
    stage: "Preparing",
    risk: "high",
    deadline: "Aug 14, 2026",
    daysLeft: 6,
    readiness: 68,
    taskTotal: 17,
    taskDone: 12,
    requirementsTotal: 11,
    requirementsDone: 8,
    nextAction: "Complete the research-fit section",
    accent: "coral",
    driveUrl: "https://drive.google.com/drive/folders/1jcZD9n9tpFGpfu4aqCMOLsASdXdLFY_h",
    description: "A doctoral project exploring how spatial AI can support fairer and more climate-resilient urban decisions.",
    requirements: [
      { name: "Academic CV", status: "Final" },
      { name: "Master's diploma", status: "Final" },
      { name: "English transcript", status: "Final" },
      { name: "Research proposal", status: "Revising", critical: true },
      { name: "Cover letter", status: "Drafting", critical: true },
      { name: "Reference letter — Dr. Hani", status: "Waiting", critical: true },
      { name: "Writing sample", status: "Final" },
      { name: "Passport copy", status: "Final" },
      { name: "Publication list", status: "Final" },
      { name: "Portal profile", status: "Not started", critical: true },
      { name: "Data consent form", status: "Not started" },
    ],
    tasks: [
      { title: "Finish research-fit section", due: "Today", priority: "High", estimate: "90 min" },
      { title: "Ask Nina to review proposal", due: "Tomorrow", priority: "High", estimate: "15 min" },
      { title: "Tailor academic CV", due: "Aug 10", done: true, priority: "Medium", estimate: "45 min" },
      { title: "Prepare portal answers", due: "Aug 12", priority: "High", estimate: "45 min" },
      { title: "Submit application", due: "Aug 13", priority: "High", estimate: "30 min" },
    ],
    documents: [
      { name: "Research proposal — KTH", type: "Google Doc", status: "Revising", updated: "Today" },
      { name: "Academic CV — KTH", type: "PDF", status: "Final", updated: "Yesterday" },
      { name: "Cover letter — KTH", type: "Google Doc", status: "Drafting", updated: "Aug 6" },
    ],
    milestones: [
      { title: "Requirements reviewed", date: "Jul 28", done: true },
      { title: "Proposal review", date: "Aug 11" },
      { title: "Personal submission target", date: "Aug 13" },
      { title: "Official deadline", date: "Aug 14" },
    ],
  },
];

export const getProjectBySlug = (slug: string) => projects.find((project) => project.slug === slug);

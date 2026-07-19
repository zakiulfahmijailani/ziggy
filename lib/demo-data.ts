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
    id: "1", slug: "kth-geoai", university: "KTH Royal Institute of Technology", title: "PhD in GeoAI for Sustainable Cities", country: "Sweden", stage: "Preparing", risk: "high", deadline: "Aug 14, 2026", daysLeft: 6, readiness: 68, taskTotal: 17, taskDone: 12, requirementsTotal: 11, requirementsDone: 8, nextAction: "Complete the research-fit section", accent: "coral", driveUrl: "https://drive.google.com/", description: "A doctoral project exploring how spatial AI can support fairer and more climate-resilient urban decisions.",
    requirements: [{ name: "Academic CV", status: "Final" }, { name: "Master’s diploma", status: "Final" }, { name: "English transcript", status: "Final" }, { name: "Research proposal", status: "Revising", critical: true }, { name: "Cover letter", status: "Drafting", critical: true }, { name: "Reference letter — Dr. Hani", status: "Waiting", critical: true }, { name: "Writing sample", status: "Final" }, { name: "Passport copy", status: "Final" }, { name: "Publication list", status: "Final" }, { name: "Portal profile", status: "Not started", critical: true }, { name: "Data consent form", status: "Not started" }],
    tasks: [{ title: "Finish research-fit section", due: "Today", priority: "High", estimate: "90 min" }, { title: "Ask Nina to review proposal", due: "Tomorrow", priority: "High", estimate: "15 min" }, { title: "Tailor academic CV", due: "Aug 10", done: true, priority: "Medium", estimate: "45 min" }, { title: "Prepare portal answers", due: "Aug 12", priority: "High", estimate: "45 min" }, { title: "Submit application", due: "Aug 13", priority: "High", estimate: "30 min" }],
    documents: [{ name: "Research proposal — KTH", type: "Google Doc", status: "Revising", updated: "Today" }, { name: "Academic CV — KTH", type: "PDF", status: "Final", updated: "Yesterday" }, { name: "Cover letter — KTH", type: "Google Doc", status: "Drafting", updated: "Aug 6" }],
    milestones: [{ title: "Requirements reviewed", date: "Jul 28", done: true }, { title: "Proposal review", date: "Aug 11" }, { title: "Personal submission target", date: "Aug 13" }, { title: "Official deadline", date: "Aug 14" }]
  },
  {
    id: "2", slug: "luxembourg-urban", university: "University of Luxembourg", title: "Urban Socio-Spatial Inequalities", country: "Luxembourg", stage: "Preparing", risk: "medium", deadline: "Aug 26, 2026", daysLeft: 18, readiness: 72, taskTotal: 14, taskDone: 10, requirementsTotal: 10, requirementsDone: 8, nextAction: "Shape the methodology section", accent: "violet", driveUrl: "https://drive.google.com/", description: "A project on urban inequalities, spatial justice, and data-informed public policy.",
    requirements: [{ name: "CV", status: "Final" }, { name: "Research proposal", status: "Revising", critical: true }, { name: "Motivation letter", status: "Drafting", critical: true }, { name: "Diploma", status: "Final" }, { name: "Transcript", status: "Final" }, { name: "Reference letter", status: "Waiting", critical: true }, { name: "Writing sample", status: "Final" }, { name: "ID copy", status: "Final" }, { name: "English certificate", status: "Final" }, { name: "Online form", status: "Not started", critical: true }],
    tasks: [{ title: "Outline methodology section", due: "Aug 10", priority: "High", estimate: "2 hrs" }, { title: "Draft motivation letter", due: "Aug 13", priority: "High", estimate: "90 min" }, { title: "Compare eligibility requirements", due: "Aug 4", done: true, priority: "Medium", estimate: "30 min" }],
    documents: [{ name: "Research proposal — Luxembourg", type: "Google Doc", status: "Revising", updated: "Aug 5" }, { name: "Master document library", type: "Drive folder", status: "Ready", updated: "Aug 2" }],
    milestones: [{ title: "Supervisor research", date: "Jul 30", done: true }, { title: "Proposal draft complete", date: "Aug 17" }, { title: "Official deadline", date: "Aug 26" }]
  },
  {
    id: "3", slug: "twente-digital-twin", university: "University of Twente", title: "Digital Twins & Spatial Planning", country: "Netherlands", stage: "Ready to submit", risk: "low", deadline: "Sep 3, 2026", daysLeft: 26, readiness: 91, taskTotal: 12, taskDone: 11, requirementsTotal: 9, requirementsDone: 9, nextAction: "Final portal check and submit", accent: "blue", driveUrl: "https://drive.google.com/", description: "A near-finished application combining digital-twin research with participatory spatial planning.",
    requirements: [{ name: "Academic CV", status: "Final" }, { name: "Cover letter", status: "Final" }, { name: "Proposal", status: "Final" }, { name: "Diploma", status: "Final" }, { name: "Transcript", status: "Final" }, { name: "References", status: "Final" }, { name: "Writing sample", status: "Final" }, { name: "Passport", status: "Final" }, { name: "Portal profile", status: "Final" }],
    tasks: [{ title: "Check file names and upload", due: "Aug 12", priority: "High", estimate: "20 min" }, { title: "Submit application", due: "Aug 13", priority: "High", estimate: "20 min" }],
    documents: [{ name: "Application bundle", type: "Drive folder", status: "Final", updated: "Yesterday" }],
    milestones: [{ title: "All documents final", date: "Aug 7", done: true }, { title: "Personal submission target", date: "Aug 13" }, { title: "Official deadline", date: "Sep 3" }]
  },
  {
    id: "4", slug: "cardiff-ai", university: "Cardiff University", title: "AI for Urban Climate Adaptation", country: "United Kingdom", stage: "Evaluating", risk: "low", deadline: "Oct 2, 2026", daysLeft: 55, readiness: 24, taskTotal: 6, taskDone: 1, requirementsTotal: 8, requirementsDone: 2, nextAction: "Decide whether this is a strong fit", accent: "yellow", driveUrl: "https://drive.google.com/", description: "An early-stage opportunity exploring AI methods for climate-ready urban neighbourhoods.",
    requirements: [{ name: "Eligibility review", status: "Drafting" }, { name: "CV", status: "Final" }, { name: "Proposal", status: "Not started" }, { name: "Cover letter", status: "Not started" }],
    tasks: [{ title: "Read vacancy carefully", due: "Aug 15", priority: "Medium", estimate: "30 min" }, { title: "Score research fit", due: "Aug 16", priority: "Medium", estimate: "20 min" }],
    documents: [{ name: "Vacancy notes", type: "Google Doc", status: "Drafting", updated: "Aug 7" }],
    milestones: [{ title: "Fit decision", date: "Aug 16" }, { title: "Official deadline", date: "Oct 2" }]
  }
];

export const getProjectBySlug = (slug: string) => projects.find((project) => project.slug === slug);

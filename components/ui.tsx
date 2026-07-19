import clsx from "clsx";
import { AlertTriangle, ArrowUpRight, Check, Circle, Clock3, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Project, Risk } from "@/lib/demo-data";

export function RiskBadge({ risk }: { risk: Risk }) { return <span className={clsx("risk", risk)}>{risk === "high" && <AlertTriangle size={13}/>}<span>{risk} risk</span></span>; }
export function StatusDot({ done }: { done?: boolean }) { return <span className={done ? "status-dot done" : "status-dot"}>{done && <Check size={12}/>}</span>; }
export function ProjectCard({ project, compact = false }: { project: Project; compact?: boolean }) { return <Link href={`/projects/${project.slug}`} className={clsx("project-card", `accent-${project.accent}`, compact && "compact-card")}>
  <div className="card-top"><span className="country">{project.country}</span><RiskBadge risk={project.risk}/></div><h3>{project.university}</h3><p>{project.title}</p><div className="deadline-line"><Clock3 size={15}/><strong>{project.daysLeft} days left</strong><span>· {project.deadline}</span></div><div className="progress-row"><div className="progress"><i style={{width: `${project.readiness}%`}}/></div><strong>{project.readiness}%</strong></div>{!compact && <div className="card-footer"><span><Circle size={12} fill="currentColor"/> {project.requirementsDone}/{project.requirementsTotal} requirements ready</span><ArrowUpRight size={16}/></div>}
 </Link>; }
export function DriveLink({ href }: { href: string }) { return <a href={href} target="_blank" rel="noreferrer" className="drive-link">Open Drive folder <ExternalLink size={15}/></a>; }

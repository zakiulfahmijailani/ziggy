"use client";

import { ChevronDown, Filter, Plus, Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { projects, ProjectStage } from "@/lib/demo-data";
import { Shell } from "./shell";
import { ProjectCard } from "./ui";

const stages: (ProjectStage | "All")[] = ["All", "Evaluating", "Preparing", "Ready to submit", "Submitted"];

export function ProjectsPage() {
  const [stage, setStage] = useState<(typeof stages)[number]>("All");
  const [query, setQuery] = useState("");
  const visible = projects.filter(p => (stage === "All" || p.stage === stage) && `${p.university} ${p.title}`.toLowerCase().includes(query.toLowerCase()));
  return <Shell><section className="page applications-page"><div className="page-title"><div><p className="eyebrow">Your application constellation</p><h1>Applications in motion</h1><p className="subtle">Every step is a small vote for the future you want.</p></div><button className="button primary"><Plus size={18}/>New application</button></div>
    <div className="application-toolbar"><div className="filter-tabs">{stages.map(item => <button onClick={() => setStage(item)} className={stage === item ? "selected" : ""} key={item}>{item}{item === "All" && <span>{projects.length}</span>}</button>)}</div><div className="toolbar-actions"><label className="mini-search"><Search size={16}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search applications"/></label><button className="filter-button"><Filter size={16}/>Filter<ChevronDown size={14}/></button></div></div>
    <div className="application-summary"><span><strong>{visible.length}</strong> applications shown</span><span className="summary-dot"/><span>Sorted by deadline</span><button><SlidersHorizontal size={15}/> Customize view</button></div>
    {visible.length ? <div className="projects-full-grid">{visible.map(project => <ProjectCard project={project} key={project.id}/>)}</div> : <div className="empty"><span>⌕</span><h2>Nothing matches that search yet.</h2><p>Try a different name or clear the current filter.</p></div>}
  </section></Shell>;
}

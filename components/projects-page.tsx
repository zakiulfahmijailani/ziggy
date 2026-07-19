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
  const [driveOpen, setDriveOpen] = useState(false);
  const [token, setToken] = useState("");
  const [rootId, setRootId] = useState("");
  const [folderName, setFolderName] = useState("Ziggy Applications");
  const [starter, setStarter] = useState(true);
  const [result, setResult] = useState<string | null>(null);
  const createDriveFolder = async () => { const response = await fetch("/api/drive/folder", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ accessToken: token, parentId: rootId || undefined, name: folderName, starter }) }); const data = await response.json(); setResult(response.ok ? data.url : data.error); };
  const visible = projects.filter(p => (stage === "All" || p.stage === stage) && `${p.university} ${p.title}`.toLowerCase().includes(query.toLowerCase()));
  return <Shell><section className="page applications-page"><div className="page-title"><div><p className="eyebrow">Your application constellation</p><h1>Applications in motion</h1><p className="subtle">Every step is a small vote for the future you want.</p></div><button className="button primary"><Plus size={18}/>New application</button></div>
    <div className="application-toolbar"><div className="filter-tabs">{stages.map(item => <button onClick={() => setStage(item)} className={stage === item ? "selected" : ""} key={item}>{item}{item === "All" && <span>{projects.length}</span>}</button>)}</div><div className="toolbar-actions"><label className="mini-search"><Search size={16}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search applications"/></label><button className="filter-button"><Filter size={16}/>Filter<ChevronDown size={14}/></button></div></div>
    <div className="application-summary"><span><strong>{visible.length}</strong> applications shown</span><span className="summary-dot"/><span>Sorted by deadline</span><button><SlidersHorizontal size={15}/> Customize view</button><button className="filter-button" onClick={() => setDriveOpen(true)}>Connect Google Drive</button></div>
    {visible.length ? <div className="projects-full-grid">{visible.map(project => <ProjectCard project={project} key={project.id}/>)}</div> : <div className="empty"><span>⌕</span><h2>Nothing matches that search yet.</h2><p>Try a different name or clear the current filter.</p></div>}
  </section>{driveOpen && <div className="modal-backdrop" onClick={() => setDriveOpen(false)}><div className="modal-card" onClick={e => e.stopPropagation()}><p className="eyebrow">Drive setup</p><h2>Give Ziggy a home for your applications</h2><p className="subtle">Create a parent folder once, then keep every application neatly separated inside it.</p><label>Google OAuth access token<input value={token} onChange={e => setToken(e.target.value)} placeholder="Paste a Drive access token" /></label><label>Parent folder ID (optional)<input value={rootId} onChange={e => setRootId(e.target.value)} placeholder="Use an existing folder, or leave blank" /></label><label>Folder name<input value={folderName} onChange={e => setFolderName(e.target.value)} /></label><label className="check-row"><input type="checkbox" checked={starter} onChange={e => setStarter(e.target.checked)} /> Create starter document folders</label><div className="modal-actions"><button className="button" onClick={() => setDriveOpen(false)}>Cancel</button><button className="button primary" onClick={createDriveFolder} disabled={!token}>Create Drive folder</button></div>{result && <p className="success-note">Created: <a href={result} target="_blank" rel="noreferrer">Open folder</a></p>}<p className="subtle tiny">Ziggy stores folder IDs and links only. Files remain in Google Drive.</p></div></div>}</Shell>;
}

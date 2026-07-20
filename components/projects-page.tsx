"use client";

import { ChevronDown, Filter, Plus, Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { Project, projects, ProjectStage } from "@/lib/demo-data";
import { Shell } from "./shell";
import { ProjectCard } from "./ui";

const stages: (ProjectStage | "All")[] = ["All", "Evaluating", "Preparing", "Ready to submit", "Submitted"];

export function ProjectsPage() {
  const [stage, setStage] = useState<(typeof stages)[number]>("All");
  const [query, setQuery] = useState("");
  const [savedProjects, setSavedProjects] = useState<Project[]>(projects);
  const [driveOpen, setDriveOpen] = useState(false);
  const [institution, setInstitution] = useState("");
  const [applicationTitle, setApplicationTitle] = useState("");
  const [country, setCountry] = useState("");
  const [folderName, setFolderName] = useState("");
  const [starter, setStarter] = useState(true);
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/projects").then((response) => response.json()).then((data) => {
      if (Array.isArray(data.projects) && data.projects.length) setSavedProjects(data.projects);
    }).catch(() => undefined);
  }, []);

  const openNewApplication = () => {
    setResult(null);
    setInstitution("");
    setApplicationTitle("");
    setCountry("");
    setFolderName("");
    setDriveOpen(true);
  };

  const createDriveFolder = async () => {
    const name = folderName.trim() || [institution.trim(), applicationTitle.trim()].filter(Boolean).join(" — ");
    if (!name) {
      setResult("Add a university or application title first.");
      return;
    }
    const response = await fetch("/api/drive/folder", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, starter, institution, title: applicationTitle, country }) });
    const data = await response.json();
    setResult(response.ok ? data.url : data.error);
    if (response.ok && data.project) setSavedProjects((current) => [...current, data.project]);
  };

  const visible = savedProjects.filter((project) => (stage === "All" || project.stage === stage) && `${project.university} ${project.title}`.toLowerCase().includes(query.toLowerCase()));

  return <Shell><section className="page applications-page">
    <div className="page-title"><div><p className="eyebrow">Your application constellation</p><h1>Applications in motion</h1><p className="subtle">Every step is a small vote for the future you want.</p></div><button className="button primary" onClick={openNewApplication}><Plus size={18}/>New application</button></div>
    <div className="application-toolbar"><div className="filter-tabs">{stages.map((item) => <button onClick={() => setStage(item)} className={stage === item ? "selected" : ""} key={item}>{item}{item === "All" && <span>{savedProjects.length}</span>}</button>)}</div><div className="toolbar-actions"><label className="mini-search"><Search size={16}/><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search applications"/></label><button className="filter-button"><Filter size={16}/>Filter<ChevronDown size={14}/></button></div></div>
    <div className="application-summary"><span><strong>{visible.length}</strong> applications shown</span><span className="summary-dot"/><span>Sorted by deadline</span><button><SlidersHorizontal size={15}/> Customize view</button><button className="filter-button" onClick={openNewApplication}>Connect Google Drive</button></div>
    {visible.length ? <div className="projects-full-grid">{visible.map((project) => <ProjectCard project={project} key={project.id}/>)}</div> : <div className="empty"><span>⌕</span><h2>Nothing matches that search yet.</h2><p>Try a different name or clear the current filter.</p></div>}
  </section>{driveOpen && <div className="modal-backdrop" onClick={() => setDriveOpen(false)}><div className="modal-card" onClick={(event) => event.stopPropagation()}><p className="eyebrow">New application</p><h2>Give this application a home</h2><p className="subtle">Ziggy will create a dedicated folder inside your connected Google Drive parent folder.</p><label>University or institution<input value={institution} onChange={(event) => setInstitution(event.target.value)} placeholder="e.g. KTH Royal Institute of Technology" /></label><label>Application or project title<input value={applicationTitle} onChange={(event) => setApplicationTitle(event.target.value)} placeholder="e.g. PhD in GeoAI" /></label><label>Country <span className="subtle tiny">(optional)</span><input value={country} onChange={(event) => setCountry(event.target.value)} placeholder="e.g. Sweden" /></label><label>Drive folder name <span className="subtle tiny">(optional)</span><input value={folderName} onChange={(event) => setFolderName(event.target.value)} placeholder="Generated from the fields above" /></label><label className="check-row"><input type="checkbox" checked={starter} onChange={(event) => setStarter(event.target.checked)} /> Create starter document folders</label><div className="modal-actions"><button className="button" onClick={() => setDriveOpen(false)}>Cancel</button><a className="button" href="/api/auth/google">Connect Google Drive</a><button className="button primary" onClick={createDriveFolder}>Create application</button></div>{result && (result.startsWith("http") ? <p className="success-note">Created: <a href={result} target="_blank" rel="noreferrer">Open folder</a></p> : <p className="success-note">{result}</p>)}<p className="subtle tiny">Your files stay in Google Drive; Ziggy stores the folder link.</p></div></div>}</Shell>;
}

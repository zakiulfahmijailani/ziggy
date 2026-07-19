"use client";

import { ArrowRight, CalendarDays, CheckCircle2, CircleAlert, Flame, Rocket, Sparkles } from "lucide-react";
import Link from "next/link";
import { projects } from "@/lib/demo-data";
import { Shell } from "./shell";
import { ProjectCard, StatusDot } from "./ui";

export function Dashboard() {
  const kth = projects[0];

  return (
    <Shell>
      <section className="page dashboard">
        <div className="welcome">
          <div>
            <p className="eyebrow">Monday, August 8</p>
            <h1>Good morning, Zaki <span>✦</span></h1>
            <p className="subtle">You&apos;re making real progress. Let&apos;s make today count.</p>
          </div>
          <div className="streak"><Flame/><div><strong>5 day streak</strong><span>Keep the momentum!</span></div></div>
        </div>

        <section className="hero-card">
          <div className="hero-copy">
            <span className="pill light"><Sparkles size={14}/> Ziggy&apos;s pick for today</span>
            <p className="eyebrow">Your next critical deadline</p>
            <h2>{kth.university}</h2>
            <p>{kth.title}</p>
            <div className="hero-action"><span className="big-days">{kth.daysLeft}</span><div><strong>days remaining</strong><span>Official deadline · Aug 14</span></div></div>
            <Link href={`/projects/${kth.slug}`} className="button dark">Work on research fit <ArrowRight size={17}/></Link>
          </div>
          <div className="hero-orbit"><div className="orbit orbit-1"/><div className="orbit orbit-2"/><div className="rocket"><Rocket size={39}/></div><div className="planet planet-1"/><div className="planet planet-2"/><div className="spark s1">✦</div><div className="spark s2">✦</div></div>
        </section>

        <section className="stats-grid">
          <div className="stat-card"><span className="stat-icon purple"><Rocket size={20}/></span><div><strong>1</strong><span>Active application</span></div></div>
          <div className="stat-card"><span className="stat-icon peach"><CircleAlert size={20}/></span><div><strong>1</strong><span>Needs attention</span></div></div>
          <div className="stat-card"><span className="stat-icon mint"><CheckCircle2 size={20}/></span><div><strong>0</strong><span>Ready to submit</span></div></div>
          <div className="stat-card"><span className="stat-icon yellow"><CalendarDays size={20}/></span><div><strong>1</strong><span>Due this month</span></div></div>
        </section>

        <section className="content-grid">
          <div className="section-block timeline-block">
            <div className="section-heading"><div><p className="eyebrow">Keep it in view</p><h2>Deadline horizon</h2></div><Link href="/projects">See application <ArrowRight size={15}/></Link></div>
            <div className="timeline"><div className="timeline-head"><span>Today</span><span>7 days</span><span>30 days</span><span>90 days</span></div><div className="timeline-line"/><Link href={`/projects/${kth.slug}`} className="timeline-event urgent" style={{ left: "9%" }}><i/><strong>KTH GeoAI</strong><span>{kth.daysLeft} days</span></Link></div>
            <p className="timeline-note"><span>✦</span> Your only active deadline is now fully in focus.</p>
          </div>
          <div className="section-block today-block">
            <div className="section-heading"><div><p className="eyebrow">One thing at a time</p><h2>Today&apos;s tiny wins</h2></div><button className="text-button">View tasks</button></div>
            <div className="task-list">{kth.tasks.slice(0, 3).map((task, index) => <button className="task-row" key={task.title}><StatusDot done={task.done}/><span className={task.done ? "task-done" : ""}>{task.title}</span><small>{index === 0 ? "★ 90 min" : task.due}</small></button>)}</div>
            <button className="focus-button">Start a focus session <ArrowRight size={16}/></button>
          </div>
        </section>

        <section className="section-block applications-block">
          <div className="section-heading"><div><p className="eyebrow">Your application constellation</p><h2>In motion</h2></div><Link href="/projects">See application <ArrowRight size={15}/></Link></div>
          <div className="project-grid"><ProjectCard project={kth} compact/></div>
        </section>

        <section className="section-block attention"><div className="attention-copy"><span className="attention-icon">!</span><div><p className="eyebrow">A gentle nudge</p><h2>KTH needs your attention</h2><p>KTH is due soon and is waiting on a reference letter. A friendly follow-up today could save future stress.</p></div></div><Link href={`/projects/${kth.slug}`} className="button secondary">See the plan <ArrowRight size={16}/></Link></section>
      </section>
    </Shell>
  );
}

"use client";

import Link from "next/link";
import { Bell, CheckCircle2, ChevronDown, LayoutDashboard, Plus, Search, Sparkles, Target } from "lucide-react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const navItems = [{ href: "/", label: "Home", icon: LayoutDashboard }, { href: "/projects", label: "Applications", icon: Target }] as const;

export function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return <div className="app-shell">
    <aside className="sidebar">
      <Link href="/" className="brand"><span className="brand-mark">z</span><span>Ziggy</span></Link>
      <p className="brand-note">Your PhD sidekick ✦</p>
      <nav>{navItems.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className={pathname === href ? "nav-item active" : "nav-item"}><Icon size={19}/>{label}</Link>)}<a className="nav-item disabled"><CheckCircle2 size={19}/>Tasks <span className="soon">soon</span></a><a className="nav-item disabled"><Bell size={19}/>Deadlines</a></nav>
      <div className="sidebar-bottom"><div className="focus-mini"><Sparkles size={17}/><div><strong>Focus mode</strong><span>Pick one thing. Begin.</span></div></div><div className="profile"><span className="avatar">Z</span><div><strong>Zaki</strong><span>PhD seeker</span></div><ChevronDown size={16}/></div></div>
    </aside>
    <main className="main-content"><header className="topbar"><label className="search"><Search size={18}/><input placeholder="Search your work" aria-label="Search your work" /></label><div className="top-actions"><button className="icon-button" aria-label="Notifications"><Bell size={19}/><i/></button><button className="button primary compact"><Plus size={17}/>New application</button></div></header>{children}</main>
  </div>;
}

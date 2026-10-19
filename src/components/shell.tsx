"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { sections } from "@/lib/sections";

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  return <div className="app-shell">
    <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
      <Link className="brand" href="/" onClick={() => setMenuOpen(false)}><span className="brand-mark">✳</span><span className="brand-copy"><strong>FOREST GUARDIAN</strong><small>CONSERVATION OS</small></span></Link>
      <p className="nav-label">WORKSPACE</p>
      <nav aria-label="Workspace" className="navigation">
        {sections.slice(0, 7).map((item) => <Link key={item.slug} className={`nav-link ${pathname === item.href ? "active" : ""}`} href={item.href} onClick={() => setMenuOpen(false)}><span className="nav-icon">{item.icon}</span><span>{item.title}</span>{item.slug === "alerts" && <em className="nav-count">07</em>}</Link>)}
      </nav>
      <p className="nav-label management-label">MANAGEMENT</p>
      <nav aria-label="Management" className="navigation">
        {sections.slice(7).map((item) => <Link key={item.slug} className={`nav-link ${pathname === item.href ? "active" : ""}`} href={item.href} onClick={() => setMenuOpen(false)}><span className="nav-icon">{item.icon}</span><span>{item.title}</span></Link>)}
      </nav>
      <div className="sidebar-footer"><span className="online-pulse"/><div><strong>All systems operational</strong><small>24 monitoring nodes online</small></div></div>
    </aside>
    {menuOpen && <button aria-label="Close navigation" className="scrim" onClick={() => setMenuOpen(false)} />}
    <div className="content-area">
      <header className="mobile-bar"><button className="menu-toggle" aria-label="Open navigation" onClick={() => setMenuOpen(true)}>☰</button><span className="brand-mark small-mark">✳</span><strong>FOREST GUARDIAN</strong><span className="mobile-live"><i/> LIVE</span></header>
      {children}
    </div>
  </div>;
}

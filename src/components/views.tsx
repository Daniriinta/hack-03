"use client";

import { useState } from "react";

const metricData = [
  ["Forest cover", "91.8%", "+0.6% vs last month", "↗", "up"],
  ["Active alerts", "07", "2 high priority", "!", "bad"],
  ["Wildlife tracked", "1,284", "+6.2% this week", "◉", "up"],
  ["Sensor health", "98.7%", "All critical nodes online", "●", "up"],
  ["CO₂ absorption", "4.8 kt", "+3.1% estimated", "↗", "up"],
];

function Topbar({ title, subtitle }: { title: string; subtitle: string }) {
  const [notice, setNotice] = useState("");
  return <><header className="topbar"><div><div className="eyebrow">CHIANG MAI CONSERVATION ZONE <span className="crumb-dot">/</span> {title.toUpperCase()}</div><h1>{title}</h1><p className="subtitle">{subtitle}</p></div><div className="top-actions"><span className="live-pill"><i/> LIVE MONITORING</span><button className="button button-quiet" onClick={() => setNotice("Report prepared for Chiang Mai")}>⇩ <span>Export report</span></button><button className="profile-button" aria-label="Administrator profile">CM</button></div></header>{notice && <div className="notice" role="status">{notice}<button onClick={() => setNotice("")}>×</button></div>}</>;
}

function Panel({ title, meta, children, className = "" }: { title: string; meta?: string; children: React.ReactNode; className?: string }) {
  return <section className={`panel ${className}`}><div className="panel-heading"><h2>{title}</h2>{meta && <span>{meta}</span>}</div>{children}</section>;
}

function ForestMap({ large = false }: { large?: boolean }) {
  return <div className={`forest-map ${large ? "map-large" : ""}`} role="img" aria-label="Illustrative monitoring map of protected forest zones around Chiang Mai">
    <div className="map-contours"/><div className="map-river"/><span className="map-road road-one"/><span className="map-road road-two"/>
    <div className="map-zone zone-one"/><div className="map-zone zone-two"/><div className="map-zone zone-three"/>
    <span className="map-caption caption-one">Doi Suthep–Pui</span><span className="map-caption caption-two">Mae Rim</span><span className="map-caption caption-three">Mae Taeng</span>
    <span className="map-pin pin-red"/><span className="map-pin pin-yellow"/><span className="map-pin pin-green pin-three"/><span className="map-pin pin-green pin-four"/>
    <div className="map-legend"><span><i className="legend-red"/>Alert</span><span><i className="legend-yellow"/>Anomaly</span><span><i className="legend-green"/>Protected</span></div><span className="map-scale">20 km</span>
  </div>;
}

function MetricCards({ data = metricData }: { data?: string[][] }) {
  return <div className="metric-grid">{data.map(([label, value, trend, icon, trendClass]) => <article className="metric-card" key={label}><div className="metric-label"><span>{label}</span><span className="metric-icon">{icon}</span></div><strong className="metric-value">{value}</strong><span className={`metric-trend ${trendClass}`}>{trendClass === "up" ? "↗" : "•"} {trend}</span></article>)}</div>;
}

function SensorGrid() {
  const data = [["Temperature", "26.8°", "Normal range", 64], ["Humidity", "81%", "+1.4% today", 81], ["Soil moisture", "67%", "Healthy", 67], ["Stream level", "38 cm", "Within range", 48]] as const;
  return <div className="sensor-grid">{data.map(([name, value, note, amount]) => <div className="sensor-card" key={name}><div className="sensor-head"><span>{name}</span><i className="online-pulse"/></div><strong>{value}{name === "Temperature" && <small>C</small>}</strong><p>{note}</p><div className="progress"><i style={{ width: `${amount}%` }}/></div></div>)}</div>;
}

const alerts = [
  ["⌁", "Possible illegal logging detected", "Satellite change detection + acoustic signature · Mae Rim sector", "2 min", "critical"],
  ["♫", "Unusual chainsaw-like sound", "Acoustic node CM-17 · confidence 91%", "8 min", "warning"],
  ["♧", "Elephant corridor movement", "Camera traps detected 8 individuals moving north", "14 min", "good"],
  ["♨", "Vegetation heat anomaly", "Thermal scan · Mae Taeng sector", "22 min", "warning"],
];

function AlertList({ compact = false, acknowledge = false }: { compact?: boolean; acknowledge?: boolean }) {
  const [dismissed, setDismissed] = useState(false);
  return <div className="alert-list">{dismissed ? <div className="empty-state">✓ All current alerts acknowledged. Monitoring continues.</div> : <>{alerts.slice(0, compact ? 3 : 4).map(([icon, title, detail, time, severity]) => <article className="alert-row" key={title}><span className={`alert-symbol ${severity}`}>{icon}</span><div className="alert-copy"><strong>{title}</strong><p>{detail}</p></div><span className="alert-time">{time} ago</span></article>)}{acknowledge && <button className="button button-quiet acknowledge-button" onClick={() => setDismissed(true)}>✓ Acknowledge all alerts</button>}</>}</div>;
}

function AnimalRows() {
  return <div className="animal-list">{[["🐘", "Asian Elephant", "8 detected · Corridor 03 · moving north", "TRACKING"], ["🦌", "Sambar Deer", "31 detected · Mae Taeng · stable population", "STABLE"], ["🐒", "Long-tailed Macaque", "17 detected · Doi Suthep · active", "ACTIVE"]].map(([icon, name, info, status]) => <div className="animal-row" key={name}><span className="animal-avatar">{icon}</span><div><strong>{name}</strong><p>{info}</p></div><span className="status-badge">{status}</span></div>)}</div>;
}

function TrendChart({ compact = false }: { compact?: boolean }) {
  const values = [28, 44, 35, 67, 51, 76, 38, 57, 31, 48, 42, 62];
  return <div className={`trend-chart ${compact ? "chart-compact" : ""}`} aria-label="Weekly forest monitoring trend chart">{values.map((value, index) => <div className="chart-column" key={index}><i style={{ height: `${value}%` }}/><span>{["M", "T", "W", "T", "F", "S", "S"][index % 7]}</span></div>)}</div>;
}

export function Overview() {
  const [simulation, setSimulation] = useState(false);
  return <main className="main-content"><Topbar title="Forest Overview" subtitle="Chiang Mai protected forests · Live ecosystem intelligence"/><MetricCards/><div className="content-grid overview-grid"><Panel title="Digital Twin · Live Forest Map" meta="UPDATED JUST NOW"><ForestMap/></Panel><Panel title="Environmental Sensors" meta="24 NODES"><SensorGrid/><div className="fusion-note"><span className="fusion-mark">✳</span><span>AI sensor fusion <strong>98.7%</strong> of environmental data synchronized with the digital twin.</span></div></Panel></div><div className="content-grid lower-grid"><Panel title="AI Alert Center" meta="REAL-TIME"><AlertList compact acknowledge/></Panel><Panel title="Digital Twin Simulation" meta="VIRTUAL SANDBOX" className="simulation-panel"><p className="panel-description">Explore conservation strategies in a virtual model of Chiang Mai's protected areas.</p><div className="scenario-card"><span>SELECTED SCENARIO</span><strong>Restore wildlife corridor</strong><div className="scenario-results"><div><small>HABITAT CONNECTIVITY</small><b>+18%</b></div><div><small>WILDLIFE RISK</small><b>−24%</b></div></div></div><button className="button button-primary scenario-button" onClick={() => setSimulation(true)}>{simulation ? "✓ Scenario running" : "Run what-if scenario →"}</button>{simulation && <p className="inline-success" role="status">Simulation started · habitat recovery forecast ready in 2 min</p>}</Panel></div><div className="content-grid lower-grid"><Panel title="Wildlife Intelligence" meta="CAMERA TRAPS + AI"><AnimalRows/></Panel><Panel title="Forest change detection" meta="LAST 7 DAYS"><div className="chart-summary"><strong>12.6 ha</strong><span>area monitored for change</span></div><TrendChart compact/></Panel></div><footer className="page-footer">Forest Guardian <span>·</span> Chiang Mai Conservation Network <span>·</span> Data refreshed moments ago</footer></main>;
}

const pageContent: Record<string, { title: string; subtitle: string; metrics: string[][]; panel: string; meta: string; second: string; secondMeta: string }> = {
  "digital-twin": { title: "Digital Twin", subtitle: "A living map of Chiang Mai's protected forest landscape", metrics: [["Mapped area", "2,184 km²", "Across 4 protected zones", "⌖", "up"], ["Habitat zones", "36", "4 priority corridors", "◇", "up"], ["Live data feeds", "124", "98.7% synchronized", "⌁", "up"], ["Scenarios run", "18", "+3 this month", "↗", "up"], ["Model confidence", "94.2%", "Updated today", "✳", "up"]], panel: "Chiang Mai · Protected area model", meta: "4 ZONES · LIVE LAYERS", second: "Scenario planner", secondMeta: "VIRTUAL SANDBOX" },
  satellite: { title: "Satellite Monitoring", subtitle: "Forest cover change and thermal observations across the region", metrics: [["Latest pass", "09:42", "Sentinel-2 · today", "◉", "up"], ["Area scanned", "2,184 km²", "Full coverage", "⌖", "up"], ["Change detected", "12.6 ha", "−18% vs last week", "↗", "warn"], ["Thermal alerts", "02", "1 needs review", "♨", "bad"], ["Cloud coverage", "8.2%", "Clear imaging window", "☼", "up"]], panel: "Satellite change layer", meta: "SENTINEL-2 · 09:42", second: "Recent observations", secondMeta: "LAST 24 HOURS" },
  "iot-sensors": { title: "IoT Sensor Network", subtitle: "Environmental conditions from 24 field monitoring nodes", metrics: [["Nodes online", "24 / 24", "All stations reporting", "⌁", "up"], ["Temperature", "26.8°C", "Regional average", "☼", "up"], ["Humidity", "81%", "+1.4% today", "◌", "up"], ["Soil moisture", "67%", "Healthy range", "⌖", "up"], ["Water level", "38 cm", "Within seasonal range", "≈", "up"]], panel: "Sensor locations · Chiang Mai", meta: "24 NODES · 4 ZONES", second: "Environmental conditions", secondMeta: "LIVE READINGS" },
  "camera-traps": { title: "Camera Traps", subtitle: "AI-assisted wildlife observations from field cameras", metrics: [["Active cameras", "38 / 40", "2 scheduled maintenance", "▣", "up"], ["Captures today", "246", "+12% vs weekly avg", "▧", "up"], ["Species identified", "18", "Across 6 families", "♧", "up"], ["Review queue", "12", "4 high confidence", "◷", "warn"], ["Model confidence", "96.1%", "Updated this week", "✳", "up"]], panel: "Latest wildlife detections", meta: "TODAY · 246 CAPTURES", second: "Camera network", secondMeta: "38 ACTIVE" },
  "acoustic-ai": { title: "Acoustic AI", subtitle: "Soundscape monitoring for biodiversity and forest protection", metrics: [["Listening nodes", "16 / 16", "All nodes connected", "♫", "up"], ["Species calls", "384", "Today across all zones", "♧", "up"], ["Anomalies", "03", "1 requires review", "⚠", "warn"], ["Classifier accuracy", "93.8%", "Last 30 days", "✳", "up"], ["Soundscape health", "Good", "Stable vs baseline", "◖", "up"]], panel: "Recent acoustic events", meta: "LIVE · 16 NODES", second: "Soundscape activity", secondMeta: "PAST 12 HOURS" },
  "drone-fleet": { title: "Drone Fleet", subtitle: "Aerial monitoring and field mission coordination", metrics: [["Fleet status", "6 / 8", "2 charging", "✣", "up"], ["Active missions", "02", "Mae Rim · Doi Suthep", "⌖", "up"], ["Flight time", "18.4 hr", "This week", "◷", "up"], ["Area surveyed", "146 km²", "+24 km² this week", "↗", "up"], ["Battery ready", "75%", "6 available", "▰", "warn"]], panel: "Fleet coverage · Chiang Mai", meta: "2 MISSIONS ACTIVE", second: "Mission schedule", secondMeta: "TODAY" },
  alerts: { title: "Alert Center", subtitle: "Prioritized signals from forest, wildlife, and sensor networks", metrics: [["Open alerts", "07", "2 high priority", "⚠", "bad"], ["High priority", "02", "Requires field review", "!", "bad"], ["Acknowledged", "18", "Today", "✓", "up"], ["Avg. response", "14 min", "−3 min this week", "◷", "up"], ["Teams notified", "04", "Across 3 sectors", "⌖", "up"]], panel: "Active alert queue", meta: "7 OPEN · SORTED BY PRIORITY", second: "Alert activity", secondMeta: "TODAY" },
  wildlife: { title: "Wildlife Intelligence", subtitle: "Population movement and species observations across Chiang Mai", metrics: [["Individuals tracked", "1,284", "+6.2% this week", "♧", "up"], ["Species observed", "42", "Across 6 habitats", "◇", "up"], ["Corridors active", "08", "6 with recent movement", "⌖", "up"], ["At-risk signals", "03", "All under observation", "⚠", "warn"], ["Camera detections", "246", "Today", "▣", "up"]], panel: "Recent wildlife activity", meta: "AI-VERIFIED OBSERVATIONS", second: "Population trends", secondMeta: "LAST 7 DAYS" },
  analytics: { title: "Conservation Analytics", subtitle: "Long-term indicators for Chiang Mai forest protection", metrics: [["Forest cover", "91.8%", "+0.6% this month", "↗", "up"], ["Canopy change", "12.6 ha", "−18% vs prior week", "⌁", "up"], ["Wildlife index", "82 / 100", "+4 points this quarter", "♧", "up"], ["Carbon uptake", "4.8 kt", "+3.1% estimated", "◉", "up"], ["Data completeness", "98.7%", "Across all networks", "✳", "up"]], panel: "Forest change by day", meta: "HECTARES FLAGGED · 7 DAYS", second: "Conservation indicators", secondMeta: "MONTH TO DATE" },
  settings: { title: "Settings", subtitle: "Manage monitoring preferences and workspace configuration", metrics: [["Monitoring zones", "04", "Chiang Mai region", "⌖", "up"], ["Connected users", "12", "3 teams", "♙", "up"], ["Notification rules", "08", "2 high priority", "⚙", "up"], ["Data retention", "365 days", "Regional policy", "◷", "up"], ["System version", "2.4.1", "Up to date", "✳", "up"]], panel: "Workspace preferences", meta: "CHIANG MAI NETWORK", second: "Monitoring configuration", secondMeta: "ACTIVE" },
};

const genericRows: Record<string, string[][]> = {
  "digital-twin": [["Mae Rim corridor", "Habitat restoration scenario", "+18% connectivity", "READY"], ["Doi Suthep–Pui", "Forest health baseline", "94% confidence", "UPDATED"], ["Mae Taeng zone", "Wildlife movement model", "6 active tracks", "LIVE"]],
  satellite: [["Mae Rim · Tile 48Q", "Canopy disturbance", "2.4 ha", "REVIEW"], ["Doi Suthep · Tile 48Q", "Thermal scan clear", "No hotspots", "CLEAR"], ["Mae Taeng · Tile 47Q", "Forest cover stable", "+0.2%", "CLEAR"]],
  "iot-sensors": [["CM-TH-04 · Mae Rim", "Temperature · Humidity", "26.8°C · 81%", "ONLINE"], ["CM-SM-12 · Mae Taeng", "Soil moisture", "67% · Healthy", "ONLINE"], ["CM-WL-03 · Doi Suthep", "Stream level", "38 cm · Normal", "ONLINE"]],
  "camera-traps": [["CAM-038 · Corridor 03", "Asian Elephant · 8 individuals", "09:38 · 96%", "VERIFIED"], ["CAM-021 · Mae Taeng", "Sambar Deer · 3 individuals", "09:16 · 98%", "VERIFIED"], ["CAM-014 · Doi Suthep", "Macaque · 12 individuals", "08:54 · 93%", "REVIEW"]],
  "acoustic-ai": [["AC-17 · Mae Rim", "Chainsaw-like sound detected", "Confidence 91%", "REVIEW"], ["AC-04 · Doi Suthep", "White-handed gibbon call", "Confidence 96%", "VERIFIED"], ["AC-12 · Mae Taeng", "Forest soundscape normal", "Baseline match", "NORMAL"]],
  "drone-fleet": [["Mission CM-204", "Mae Rim · Canopy survey", "10:30 · 42 min", "IN FLIGHT"], ["Mission CM-203", "Doi Suthep · Corridor scan", "09:15 · Complete", "COMPLETE"], ["Mission CM-205", "Mae Taeng · Thermal sweep", "13:00 · 35 min", "SCHEDULED"]],
  alerts: alerts.map(([, title, detail, time, severity]) => [title, detail, `${time} ago`, severity === "critical" ? "HIGH" : severity === "warning" ? "MEDIUM" : "INFO"]),
  wildlife: [["🐘  Asian Elephant", "8 individuals · Corridor 03 · moving north", "09:38 · Camera 038", "TRACKING"], ["🦌  Sambar Deer", "31 observed · Mae Taeng · stable", "09:16 · Camera 021", "STABLE"], ["🐒  Long-tailed Macaque", "17 observed · Doi Suthep · active", "08:54 · Camera 014", "ACTIVE"]],
  analytics: [["Forest cover · Chiang Mai", "91.8% total protected canopy", "+0.6% this month", "ON TRACK"], ["Canopy disturbance", "12.6 hectares flagged for review", "−18% vs prior week", "IMPROVING"], ["Wildlife corridor health", "6 of 8 corridors with movement", "82 / 100 index", "ON TRACK"]],
  settings: [["Field notification channel", "High-priority alerts to response teams", "SMS + in-app", "ENABLED"], ["Regional time zone", "Local time for monitoring events", "Asia / Bangkok", "ACTIVE"], ["Data refresh interval", "Sensor and model synchronization", "Every 5 minutes", "ACTIVE"]],
};

export function WorkspaceView({ section }: { section: string }) {
  const content = pageContent[section];
  if (!content) return <main className="main-content"><Topbar title="Page not found" subtitle="Choose a section from the workspace navigation."/></main>;
  const isSettings = section === "settings";
  return <main className="main-content"><Topbar title={content.title} subtitle={content.subtitle}/><MetricCards data={content.metrics}/><div className={`content-grid workspace-grid ${section === "digital-twin" || section === "satellite" || section === "drone-fleet" ? "map-workspace" : ""}`}><Panel title={content.panel} meta={content.meta}>{section === "settings" ? <SettingsRows rows={genericRows[section]}/> : <><ForestMap large={section === "digital-twin" || section === "satellite" || section === "drone-fleet"}/>{(section === "iot-sensors") && <SensorGrid/>}</>}</Panel><div className="stacked-panels"><Panel title={content.second} meta={content.secondMeta}>{section === "alerts" ? <AlertList acknowledge/> : section === "wildlife" ? <AnimalRows/> : section === "analytics" || section === "acoustic-ai" ? <TrendChart/> : section === "settings" ? <SettingsForm/> : <div className="scenario-list">{genericRows[section]?.map(([title, detail, value, status]) => <article className="scenario-row" key={title}><div className="status-badge">{status}</div><strong>{title}</strong><p>{detail}</p><span>{value}</span></article>)}</div>}</Panel>{!isSettings && <Panel title={section === "alerts" ? "Incident response" : "Recent activity"} meta="UPDATED JUST NOW"><ActivityRows section={section}/></Panel>}</div></div><footer className="page-footer">Forest Guardian <span>·</span> Chiang Mai Conservation Network <span>·</span> Data refreshed moments ago</footer></main>;
}

function SettingsRows({ rows }: { rows: string[][] }) { return <div className="scenario-list">{rows.map(([title, detail, value, status]) => <article className="scenario-row" key={title}><div className="setting-line"><div><strong>{title}</strong><p>{detail}</p></div><span className="status-badge">{status}</span></div><span>{value}</span></article>)}</div>; }

function SettingsForm() {
  const [saved, setSaved] = useState(false);
  return <form className="settings-form" onSubmit={(event) => { event.preventDefault(); setSaved(true); }}><label>Default monitoring zone<select defaultValue="chiang-mai"><option value="chiang-mai">Chiang Mai region</option><option>Mae Rim sector</option><option>Doi Suthep–Pui</option><option>Mae Taeng zone</option></select></label><label>Alert threshold<select defaultValue="high"><option value="high">High priority and above</option><option>All alerts</option><option>Critical only</option></select></label><button className="button button-primary" type="submit">Save preferences</button>{saved && <span className="inline-success" role="status">Preferences saved for this session.</span>}</form>;
}

function ActivityRows({ section }: { section: string }) {
  const labels = section === "drone-fleet" ? ["Mission CM-203 completed", "Aircraft CM-D06 battery charging", "Mission CM-205 scheduled"] : section === "satellite" ? ["Sentinel-2 imagery received", "Mae Rim canopy change flagged", "Thermal layer refreshed"] : ["All regional nodes reporting", "Daily conservation summary updated", "Field teams connected"];
  return <div className="activity-list">{labels.map((label, index) => <div className="activity-row" key={label}><span className={`activity-dot activity-${index}`}/><div><strong>{label}</strong><small>{index === 0 ? "2 minutes ago" : index === 1 ? "18 minutes ago" : "1 hour ago"}</small></div></div>)}</div>;
}

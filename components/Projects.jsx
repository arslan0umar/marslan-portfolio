"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./Projects.module.css";

const PROJECTS = [
  {
    id: 1,
    title: "Spendlyo",
    subtitle: "Android finance app I built for students like me",
    tech: ["Flutter", "Dart", "SQLite"],
    description: "I got tired of tracking expenses in notes apps. Built this to handle budgets, loans, and group trip splits. The debt simplification algorithm was the fun part - greedy approach to minimize transactions. Published it on APKPure because why not.",
    note: "10+ SQLite tables, 5 migrations, fully offline",
    github: "github.com/arslan0umar/Spendlyo",
    tag: "Live on APKPure",
    color: "#ff7a20",
    image: "/projects/spendlyo.png"
  },
  {
    id: 2,
    title: "SparrowOS",
    subtitle: "A fake OS that actually runs real processes",
    tech: ["C++17", "GTK-3", "POSIX", "Linux"],
    description: "University OS course project that got out of hand. Built a GTK-3 desktop with 15 apps running as actual child processes via fork/exec. Wrote the scheduler, resource manager with semaphores, and deadlock detection from scratch. It's janky but it works.",
    note: "3-level MLQ scheduler, POSIX IPC, DFS deadlock detection",
    github: "github.com/arslan0umar/SparrowOS",
    tag: "Systems Course Project",
    color: "#6366f1",
    image: "/projects/sparrowos.png"
  },
  {
    id: 3,
    title: "AS Steel Inventory",
    subtitle: "Real client. Real steel mill. Real money.",
    tech: ["Python", "Tkinter", "SQLite", "PyInstaller"],
    description: "A local steel mill was drowning in Excel sheets. Built them a proper inventory + ledger desktop app. Packaged as a Windows .exe and deployed it myself. They still use it daily - best feeling as a dev.",
    note: "Deployed to production, client still using it",
    github: "github.com/arslan0umar/Inventory-Handling-Application.git",
    tag: "Client Project",
    color: "#10b981",
    image: "/projects/steel-inventory.png"
  },
  {
    id: 4,
    title: "EnergyIQ",
    subtitle: "Stats project that turned into a dashboard",
    tech: ["Python", "Streamlit", "Pandas", "Matplotlib"],
    description: "Had to do a stats project. Instead of a boring report, built an interactive Streamlit dashboard with regression models and hypothesis testing on global energy data. Professor was impressed. I was just procrastinating on the report.",
    note: "Interactive visualizations, regression & hypothesis testing",
    github: null,
    tag: "University Project",
    color: "#f59e0b",
    image: "/projects/energyiq.png"
  },
  {
    id: 5,
    title: "StackPluse",
    subtitle: "24-hour hackathon. Top 10 out of 30+. No sleep.",
    tech: ["React", "Vite", "Node.js", "Gemini 1.5 Flash", "Firebase"],
    description: "Built an AI Chief of Staff for startup founders at GDG's Build with AI hackathon. Integrated Gemini 1.5 Flash for real-time business insights. Didn't win but made top 10. Learned more in 24 hours than a week of lectures.",
    note: "Top 10 out of 30+ teams, built in 24 hours",
    github: "github.com/Huzaifa-12Imran/HackyThong.git",
    tag: "Hackathon Project",
    color: "#ec4899",
    image: "/projects/stackpulse.png"
  }
];

const ProjectCard = ({ project, index, total }) => {
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={cardRef}
      className={styles.cardWrapper}
      style={{ top: `${80 + index * 24}px` }}
    >
      <motion.article
        style={{ scale }}
        className={styles.card}
      >
        {/* Left: Content */}
        <div className={styles.contentSide}>
          <div className={styles.cardMeta}>
            <span className={styles.projectNum} style={{ color: project.color }}>
              {String(project.id).padStart(2, '0')}
            </span>
            <span className={styles.projectTag} style={{ background: `${project.color}15`, color: project.color, borderColor: `${project.color}30` }}>
              {project.tag}
            </span>
          </div>

          <h3 className={styles.projectTitle}>{project.title}</h3>
          <p className={styles.projectSubtitle}>{project.subtitle}</p>

          <p className={styles.projectDesc}>{project.description}</p>

          <div className={styles.projectNote}>
            <span className={styles.noteDot} style={{ background: project.color }}></span>
            {project.note}
          </div>

          <div className={styles.techRow}>
            {project.tech.map((t, i) => (
              <span key={i} className={styles.techPill}>{t}</span>
            ))}
          </div>

          {project.github ? (
            <a href={`https://${project.github}`} target="_blank" rel="noopener noreferrer" className={styles.projectLink} style={{ color: project.color }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              Source on GitHub
            </a>
          ) : (
            <span className={styles.projectLinkDisabled}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
              Private repo - client project
            </span>
          )}
        </div>

        {/* Right: Image */}
        <div className={styles.imageSide}>
          <div className={styles.imageFrame}>
            <img
              src={project.image}
              alt={project.title}
              className={styles.projectImage}
              loading="lazy"
              draggable={false}
            />
          </div>
          <div className={styles.imageOverlay} style={{ background: `linear-gradient(180deg, transparent 50%, ${project.color}20)` }} />
        </div>
      </motion.article>
    </div>
  );
};

export default function Projects() {
  const containerRef = useRef(null);

  return (
    <section id="projects" className={styles.projects}>
      <div id="projects-sentinel" style={{ position: 'absolute', top: 0, height: '1px' }} />
      <div className={styles.header}>
        <span className={styles.headerLabel}>Selected Work</span>
        <h2 className={styles.headerTitle}>Things I&apos;ve shipped</h2>
        <p className={styles.headerDesc}>Not tutorials. Not clones. Real stuff I built and people actually used.</p>
      </div>

      <div ref={containerRef} className={styles.cardsContainer}>
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} total={PROJECTS.length} />
        ))}
      </div>
    </section>
  );
}
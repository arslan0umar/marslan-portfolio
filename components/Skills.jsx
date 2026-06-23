"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styles from "./Skills.module.css";

const skillGroups = [
  {
    title: "Languages",
    skills: ["C / C++", "Python", "Dart", "JavaScript", "HTML / CSS", "x86 Assembly"]
  },
  {
    title: "Mobile & Frameworks",
    skills: ["Flutter", "Tkinter", "Streamlit"]
  },
  {
    title: "Databases",
    skills: ["SQLite", "MySQL", "Oracle", "MS Access"]
  },
  {
    title: "Tools & Platforms",
    skills: ["Git & GitHub", "VS Code", "Linux", "Android Studio"]
  },
  {
    title: "AI & Workflow",
    skills: ["Claude AI", "ChatGPT", "Prompt Engineering", "AI Prototyping"],
    highlight: true
  }
];

export default function Skills() {
  const sectionRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: { trigger: sectionRef.current, start: "top 65%" }
    });

    tl.fromTo(".skill-dot", 
      { scale: 0, opacity: 0 }, 
      { scale: 1, opacity: 1, stagger: 0.04, duration: 0.6, ease: "back.out(1.2)" }
    );
  }, []);

  return (
    <section id="skills" ref={sectionRef} className={styles.skills}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>What I Build With</h2>
          <p className={styles.subtitle}>My current tech arsenal</p>
        </div>

        {/* Category Tabs */}
        <div className={styles.tabs}>
          {skillGroups.map((group, i) => (
            <button
              key={i}
              className={`${styles.tab} ${activeCategory === i ? styles.activeTab : ""} ${group.highlight ? styles.highlightTab : ""}`}
              onClick={() => setActiveCategory(i)}
            >
              {group.title}
            </button>
          ))}
        </div>

        {/* Skills Grid - Minimum Height Fixed */}
        <div className={styles.skillsContent}>
          <div className={styles.skillsGrid}>
            {skillGroups[activeCategory].skills.map((skill, index) => (
              <div key={index} className={styles.skillItem}>
                <div className={styles.skillDot} />
                <span className={styles.skillName}>{skill}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.glowOrb1} />
        <div className={styles.glowOrb2} />
      </div>
    </section>
  );
}
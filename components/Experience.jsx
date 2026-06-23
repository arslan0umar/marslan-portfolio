"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Experience.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo("." + styles.fadeIn,
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: { trigger: section, start: "top 75%" }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

      return (
    <section id="experience" ref={sectionRef} className={styles.experience}>
      <div className={styles.header}>
        <span className={styles.headerEyebrow}>so far</span>
        <h2 className={styles.headerTitle}>
          Work, school,<br />
          <span className={styles.headerAccent}>and random stuff</span>
        </h2>
      </div>

      <div className={styles.timeline}>
        {/* Software Developer - AS Steel */}
        <div className={`${styles.block} ${styles.fadeIn}`}>
          <div className={styles.timelineDot} />
          <div className={styles.blockMeta}>
            <span className={styles.blockWhen}>2025</span>
            <span className={styles.blockWhere}>AS Steel Re-Rolling Mills, Pakistan</span>
          </div>
          <h3 className={styles.blockTitle}>Built an inventory app for a steel mill</h3>
          <p className={styles.blockBody}>
            They were using Excel for everything. I built a Python/Tkinter desktop app with SQLite 
            that actually works. Packaged it as a .exe with PyInstaller and deployed it myself. 
            The client still uses it daily — that's the part I'm most proud of.
          </p>
          <div className={styles.blockTags}>
            <span>Python</span>
            <span>Tkinter</span>
            <span>SQLite</span>
            <span>PyInstaller</span>
          </div>
        </div>

        {/* Teaching Assistant */}
        <div className={`${styles.block} ${styles.fadeIn}`}>
          <div className={styles.timelineDot} />
          <div className={styles.blockMeta}>
            <span className={styles.blockWhen}>Aug – Dec 2025</span>
            <span className={styles.blockWhere}>FAST-NUCES, Faisalabad</span>
          </div>
          <h3 className={styles.blockTitle}>TA for Intro to ICT</h3>
          <p className={styles.blockBody}>
            Helped first-year students not fail their computing course. Weekly tutorials, 
            debugging their code, explaining why their Python script crashes. 
            50+ students. Learned that teaching is harder than coding.
          </p>
        </div>

        {/* Education */}
        <div className={`${styles.block} ${styles.fadeIn}`}>
          <div className={styles.timelineDot} />
          <div className={styles.blockMeta}>
            <span className={styles.blockWhen}>2024 – 2028</span>
            <span className={styles.blockWhere}>FAST-NUCES, Faisalabad</span>
          </div>
          <h3 className={styles.blockTitle}>BS Software Engineering</h3>
          <p className={styles.blockBody}>
            CGPA 3.25/4.0. Not the top of class, but I spend more time building actual projects 
            than chasing grades.<br></br>
            Relevant Coursework:
          </p>
            <div className={styles.blockTags}>
              <span>Data Structures</span>
              <span>OOP</span>
              <span>Database Systems</span>
              <span>Software Design and Architecture</span> 
              <span>x86 Assembly</span>
              <span>Operating Systems</span>
            </div>
        </div>

        {/* Hackathons & Side Quests */}
        <div className={`${styles.block} ${styles.fadeIn}`}>
          <div className={styles.timelineDot} />
          <div className={styles.blockMeta}>
            <span className={styles.blockWhen}>May 2026</span>
            <span className={styles.blockTag}>Top 10</span>
          </div>
          <h3 className={styles.blockTitle}>Build with AI Hackathon</h3>
          <p className={styles.blockBody}>
            Built CoFounder AI in 24 hours. Ranked Top 10 among 30+ teams.
          </p>
        </div>

        <div className={`${styles.block} ${styles.fadeIn}`}>
          <div className={styles.timelineDot} />
          <div className={styles.blockMeta}>
            <span className={styles.blockWhen}>Apr 2026</span>
            <span className={styles.blockTag}>Volunteer</span>
          </div>
          <h3 className={styles.blockTitle}>University Job Fair</h3>
          <p className={styles.blockBody}>
            Facilitated interviews for Rozee.pk at a job fair with 70+ companies.
          </p>
        </div>
      </div>
    </section>
  );
}
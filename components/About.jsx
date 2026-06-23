"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./About.module.css";

export default function About() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const statsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(sectionRef.current, 
            { opacity: 0, y: 60 }, 
            { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
          );

          gsap.fromTo(contentRef.current?.children || [], 
            { opacity: 0, y: 40 }, 
            { opacity: 1, y: 0, stagger: 0.15, duration: 0.9, ease: "power2.out" }
          );

          statsRef.current.forEach((stat, i) => {
            if (!stat) return;
            const target = parseInt(stat.getAttribute("data-value"));
            gsap.fromTo(stat, 
              { innerText: 0 }, 
              { innerText: target, duration: 2, ease: "power1.out", snap: { innerText: 1 }, delay: 0.5 + i * 0.2 }
            );
          });

          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (e, href) => {
  e.preventDefault();
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="about" ref={sectionRef} className={styles.about}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left - Image */}
          <div className={styles.imageSide}>
            <div className={styles.imageWrapper}>
              <div className={styles.imageOverlay} />
              <img 
                src="/profile.jpg" 
                alt="Muhammad Arslan" 
                className={styles.profileImage}
              />
              <div className={styles.imageBorder} />
            </div>
            
            <div className={styles.status}>
              <div className={styles.dot} /> Open to Work
            </div>
          </div>

          {/* Right - Content */}
          <div ref={contentRef} className={styles.content}>
            <div className={styles.badge}>2nd Year Software Engineering Student</div>
            
            <h1 className={styles.title}>
              Hi, I&apos;m <span className={styles.highlight}>Muhammad Arslan</span>
            </h1>

            <p className={styles.description}>
              I&apos;m a 2nd year Software Engineering student at FAST-NUCES (CGPA 3.25/4.0). 
              I love building and shipping real projects - not just university assignments. 
              From publishing my Android app Spendlyo on APKPure, to deploying a production 
              inventory system at a steel mill, and even creating a full simulated operating 
              system from scratch in C++.
            </p>

            <p className={styles.description}>
              I mainly work with Flutter/Dart, C++, Python, and SQL. I&apos;m really into AI/ML 
              and how it can make apps smarter. I also use AI tools like Claude and ChatGPT 
              daily to build faster and better.
            </p>

            {/* Services / Open To */}
            <div className={styles.services}>
              <h3>I&apos;m Open To</h3>
              <div className={styles.serviceList}>
                <div className={styles.serviceItem}>Flutter Developer Intern</div>
                <div className={styles.serviceItem}>Junior Software Developer</div>
                <div className={styles.serviceItem}>Mobile App Developer</div>
                <div className={styles.serviceItem}>Front-End Development (Landing Pages)</div>
              </div>
            </div>

            <div className={styles.ctaGroup}>
              <a href="#projects" className={styles.primaryBtn} onClick={(e) => scrollTo(e, "#projects")}>See My Projects</a>
              <a href="#contact" className={styles.secondaryBtn} onClick={(e) => scrollTo(e, "#contact")}>Get In Touch</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
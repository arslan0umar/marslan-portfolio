"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Contact.module.css";

export default function Contact() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(sectionRef.current,
            { opacity: 0, y: 80 },
            { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
          );
          gsap.fromTo(".contact-item",
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power2.out", delay: 0.3 }
          );
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    const btn = document.getElementById(`copy-${label}`);
    if (btn) {
      const original = btn.textContent;
      btn.textContent = "Copied!";
      setTimeout(() => btn.textContent = original, 2000);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className={styles.contact}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Let&apos;s Build Something Together</h2>
          <p className={styles.subtitle}>Open to opportunities, collaborations, and interesting conversations</p>
        </div>

        <div className={styles.content}>
          {/* Contact Info */}
          <div className={styles.info}>
            <h3 className={styles.infoTitle}>Get In Touch</h3>

            <div className="contact-item" onClick={() => window.open('https://wa.me/923264980263', '_blank')}>
              <div className={styles.contactRow}>
                <div>
                  <div className={styles.label}>WhatsApp / Phone</div>
                  <div className={styles.value}>+92 326 4980263</div>
                </div>
              </div>
            </div>

            <div className="contact-item" onClick={() => copyToClipboard("arslanumar0326@gmail.com", "email")}>
              <div className={styles.contactRow}>
                <div className={styles.emailWrapper}>
                  <div>
                    <div className={styles.label}>Email</div>
                    <div className={styles.value}>arslanumar0326@gmail.com</div>
                  </div>
                  <button id="copy-email" className={styles.copyBtn}>Copy</button>
                </div>
              </div>
            </div>

            <div className="contact-item">
              <a href="https://linkedin.com/in/muhammad-arslan-443922338" target="_blank" rel="noopener noreferrer" className={styles.contactRow}>
                <div>
                  <div className={styles.label}>LinkedIn</div>
                  <div className={styles.value}>linkedin.com/in/muhammad-arslan-443922338</div>
                </div>
              </a>
            </div>

            <div className="contact-item">
              <a href="https://github.com/arslan0umar" target="_blank" rel="noopener noreferrer" className={styles.contactRow}>
                <div>
                  <div className={styles.label}>GitHub</div>
                  <div className={styles.value}>github.com/arslan0umar</div>
                </div>
              </a>
            </div>
          </div>

          {/* Quick Message */}
          <div className={styles.messageBox}>
            <h3>Send me a message</h3>
            <p>I usually reply within a few hours.</p>
            <a href="mailto:arslanumar0326@gmail.com" className={styles.primaryBtn}>
              Send Email
            </a>
            <a href="https://wa.me/923264980263" target="_blank" rel="noopener noreferrer" className={styles.secondaryBtn}>
              Message on WhatsApp
            </a>
          </div>
        </div>

        <div className={styles.footerText}>
          Made with passion in Lahore, Pakistan 🇵🇰
        </div>
      </div>
    </section>
  );
}
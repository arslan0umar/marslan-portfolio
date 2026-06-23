"use client";
import { useEffect, useState, useRef} from "react";
import gsap from "gsap";
import styles from "./Navbar.module.css";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Scroll detection — white bg for About & Experience
useEffect(() => {
  const handleScroll = () => {
    const about = document.getElementById("about");
    const experience = document.getElementById("experience");

    let inWhiteSection = false;

    if (about) {
      const rect = about.getBoundingClientRect();
      if (rect.top < 90 && rect.bottom > 90) inWhiteSection = true;
    }

    if (experience) {
      const rect = experience.getBoundingClientRect();
      if (rect.top < 90 && rect.bottom > 90) inWhiteSection = true;
    }

    setScrolled(inWhiteSection);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleScroll);
  setTimeout(handleScroll, 50);

  return () => {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleScroll);
  };
}, []); // MUST be empty array - run once only

  // Active section highlight
useEffect(() => {
  const updateActive = () => {
    if (isClickScrolling.current) return; // blocked during click scroll

    const threshold = window.innerHeight * 0.35;
    let current = "";
    links.forEach(({ href }) => {
      const section = document.querySelector(href);
      if (!section) return;
      const rect = section.getBoundingClientRect();
      if (rect.top <= threshold) {
        current = section.id;
      }
    });
    setActiveSection(current);
  };

  window.addEventListener("scroll", updateActive, { passive: true });
  return () => window.removeEventListener("scroll", updateActive);
}, []);

const isClickScrolling = useRef(false);

const scrollTo = (e, href) => {
  e.preventDefault();
  setMenuOpen(false);

  isClickScrolling.current = true;

  if (href === "#topofpage") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveSection("");
  } else {
    const section = document.querySelector(href);
    if (section) {
      const navbarHeight = 0; // match your navbar height
      const top = section.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  const onScrollEnd = () => {
    isClickScrolling.current = false;
    const threshold = 90;
    let current = "";
    links.forEach(({ href: h }) => {
      const section = document.querySelector(h);
      if (!section) return;
      const rect = section.getBoundingClientRect();
      if (rect.top <= threshold) current = section.id;
    });
    setActiveSection(current);
    window.removeEventListener("scrollend", onScrollEnd);
  };

  window.addEventListener("scrollend", onScrollEnd);
};
  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <a href="#topofpage" className={styles.logo} onClick={(e) => scrollTo(e, "#topofpage")}>
          <div className={styles.logoBox}>
            <span>MA</span>
          </div>
        </a>

        <div className={styles.desktopMenu}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${activeSection === link.href.slice(1) ? styles.active : ""}`}
              onClick={(e) => scrollTo(e, link.href)}
            >
              {link.label}
              <span className={styles.underline} />
            </a>
          ))}
        </div>

        <a href="#contact" className={styles.hireBtn} onClick={(e) => scrollTo(e, "#contact")}>
          Hire Me
        </a>

        <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          <span className={`${styles.bar} ${menuOpen ? styles.bar1 : ""}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.bar2 : ""}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.bar3 : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ""}`}>
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={(e) => scrollTo(e, link.href)}>
            {link.label}
          </a>
        ))}
        <a href="#contact" onClick={(e) => scrollTo(e, "#contact")}>Hire Me</a>
      </div>
    </nav>
  );
}
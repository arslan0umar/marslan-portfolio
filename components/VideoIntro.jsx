"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import CinematicLayer from "./CinematicLayer";
import styles from "./VideoIntro.module.css";

export default function VideoIntro() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const bgVideoRef = useRef(null);
  const taglineRef = useRef(null);
  const nameRef = useRef(null);
  const subtitleRef = useRef(null);
  const scrollRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showSoundHint, setShowSoundHint] = useState(true);

  // GSAP entrance animation
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2 }
    )
      .fromTo(
        taglineRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(
        nameRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.5"
      )
      .fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.3"
      );

    // Auto-hide sound hint after a few seconds
    const hideHint = setTimeout(() => setShowSoundHint(false), 4500);

    return () => clearTimeout(hideHint);
  }, []);

  // Track when video finishes playing (since loop is removed)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      setIsPlaying(false);
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    const bgVideo = bgVideoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      bgVideo?.pause();
      setIsPlaying(false);
    } else {
      // If video already ended, restart from the beginning
      if (video.ended) {
        video.currentTime = 0;
        if (bgVideo) bgVideo.currentTime = 0;
      }
      video.play();
      bgVideo?.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
    setShowSoundHint(false);
  };

  const scrollToNext = () => {
    const next = containerRef.current?.nextElementSibling;
    next?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={containerRef} className={styles.hero} id = "hero">
      <div id="topofpage" style={{ position: 'absolute', top: 0, height: '1px' }} />
      {/* Blurred ambient background video */}
      <video
        ref={bgVideoRef}
        className={styles.bgVideo}
        src="/videos/intro.mp4"
        autoPlay
        muted
        playsInline
      />

      {/* Foreground sharp video */}
      <div className={styles.fgVideoWrapper}>
        {/* Controls */}
      <div className={styles.controls}>
        <button
          className={styles.controlBtn}
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause video" : "Replay video"}
        >
          {isPlaying ? "❚❚" : videoRef.current?.ended ? "↺" : "►"}
        </button>
        <button
          className={styles.controlBtn}
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
        >
          {isMuted ? "🔇" : "🔊"}
        </button>
      </div>

      {showSoundHint && (
        <div className={styles.soundHint}>Tap for sound</div>
      )}
        <video
          ref={videoRef}
          className={styles.fgVideo}
          src="/videos/intro.mp4"
          autoPlay
          muted={isMuted}
          playsInline
          onCanPlayThrough={() => { window.__videoReady = true; }}
        />
     </div>

      {/* Cinematic gradient overlays */}
      <div className={styles.gradientOverlay} />

      {/* Three.js particle layer */}
      <CinematicLayer />

      {/* Content */}
      <div className={styles.content}>
        <span ref={taglineRef} className={styles.tagline}>
          Software Engineer &amp; Flutter Developer
        </span>
        <h1 ref={nameRef} className={styles.name}>
          <span>Muhammad</span>
          <span>Arslan</span>
        </h1>
        <p ref={subtitleRef} className={styles.subtitle}>
          Building real-world apps with Flutter, exploring AI/ML, and turning
          ideas into shipped software.
        </p>
      </div>


      {/* Scroll indicator */}
      <button
        ref={scrollRef}
        className={styles.scrollIndicator}
        onClick={scrollToNext}
        aria-label="Scroll to next section"
      >
        <span className={styles.scrollLine} />
        <span className={styles.scrollText}>Scroll</span>
      </button>
    </section>
  );
}
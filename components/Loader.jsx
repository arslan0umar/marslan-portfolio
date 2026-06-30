"use client";
import { useEffect, useState } from "react";

const msgs = [
  "git clone portfolio.exe...",
  "npm install awesomeness...",
  "brewing coffee ☕...",
  "fighting off imposter syndrome...",
  "polishing pixels...",
  "loading Muhammad Arslan...",
  "Slow internet Connection",
  "almost there, don't leave!",
];

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const startTime = Date.now();
    
    // Message rotation
    const msgInterval = setInterval(() => {
      setMsgIndex(i => (i + 1) % msgs.length);
    }, 1800);

    // Progress bar
    const progInterval = setInterval(() => {
      setProgress(p => Math.min(p + Math.random() * 8, 92));
    }, 300);

    // Hide function
    const hide = () => {
      clearInterval(msgInterval);
      clearInterval(progInterval);
      setProgress(100);
      setTimeout(() => {
        setOpacity(0);
        setTimeout(() => setVisible(false), 500);
      }, 400);
    };

    // Check if videos are ready + minimum display time
    const checkReady = () => {
      const elapsed = Date.now() - startTime;
      const videosReady = window.__bgVideoReady && window.__fgVideoReady;
      const video = document.querySelector('video');
      const hasFrame = video && video.readyState >= 2 && video.currentTime > 0;
      
      if (videosReady && hasFrame && elapsed >= 3500) {
        hide();
      } else if (elapsed >= 10000) {
        // 10s fallback — hide anyway
        hide();
      }
    };

    const poll = setInterval(checkReady, 200);

    return () => {
      clearInterval(msgInterval);
      clearInterval(progInterval);
      clearInterval(poll);
    };
  }, []);

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, background: "#0a0a0f",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", zIndex: 9999,
      opacity, transition: "opacity 0.5s ease",
    }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%,rgba(255,122,32,0.08),transparent 70%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", marginBottom: "2rem" }}>
        <span style={{ fontSize: "3rem", fontWeight: 800, color: "#ff7a20", fontFamily: "monospace", letterSpacing: "-2px" }}>MA</span>
      </div>

      <div style={{ fontFamily: "monospace", fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", marginBottom: "2rem", height: "1.4rem", textAlign: "center" }}>
        {msgs[msgIndex]}
      </div>

      <div style={{ width: 260, height: 3, background: "rgba(255,255,255,0.08)", borderRadius: 999, overflow: "hidden", marginBottom: "0.6rem" }}>
        <div style={{ height: "100%", background: "linear-gradient(90deg,#ff7a20,#ffb366)", borderRadius: 999, width: `${progress}%`, transition: "width 0.3s ease" }} />
      </div>
      <div style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "rgba(255,122,32,0.7)" }}>
        {Math.floor(progress)}%
      </div>
    </div>
  );
}
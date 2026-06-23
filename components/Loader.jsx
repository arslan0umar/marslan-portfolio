"use client";
import { useEffect, useState } from "react";

const msgs = [
  "git clone portfolio.exe...",
  "npm install awesomeness...",
  "brewing coffee ☕...",
  "fighting off imposter syndrome...",
  "polishing pixels...",
  "loading Muhammad Arslan...",
  "almost there, don't leave!",
];

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const msgInterval = setInterval(() => {
      setMsgIndex(i => (i + 1) % msgs.length);
    }, 1800);

    const progInterval = setInterval(() => {
      setProgress(p => Math.min(p + Math.random() * 8, 92));
    }, 300);

    const hide = () => {
      clearInterval(progInterval);
      setProgress(100);
      setTimeout(() => {
        setOpacity(0);
        setTimeout(() => setVisible(false), 500);
      }, 400);
    };

    // Poll until video signals ready
    const poll = setInterval(() => {
      if (window.__videoReady) {
        clearInterval(poll);
        hide();
      }
    }, 200);

    // Fallback after 10 seconds
    const fallback = setTimeout(() => {
      clearInterval(poll);
      hide();
    }, 10000);

    return () => {
      clearInterval(msgInterval);
      clearInterval(progInterval);
      clearInterval(poll);
      clearTimeout(fallback);
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
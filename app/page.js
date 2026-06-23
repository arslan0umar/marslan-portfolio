import Navbar from "@/components/Navbar";
import VideoIntro from "@/components/VideoIntro";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Loader from "@/components/Loader";

export default function Home() {
  return (
    <main>
      <Loader />
      <Navbar />
      <VideoIntro />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </main>
  );
}
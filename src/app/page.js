import Navbar from "@/components/Navbar";
import Center from "@/components/Center";
import Projects from "@/components/Projects";
import BlogPreview from "@/components/BlogPreview";
import ImagePreview from "@/components/ImagePreview";
import Climax from "@/components/Climax";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--night)] text-white">
      <Navbar />
      <main className="flex-1">
        <Center />
        <Projects />
        <BlogPreview />
        <ImagePreview />
      </main>
      <Climax />
    </div>
  );
}

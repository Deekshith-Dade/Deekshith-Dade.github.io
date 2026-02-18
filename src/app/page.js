import Navbar from "@/components/Navbar";
import Center from "@/components/Center";
import Link from "next/link";
import BlogPreview from "@/components/BlogPreview";
import ImagePreview from "@/components/ImagePreview";
import Climax from "@/components/Climax";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--night)] text-white">
      <Navbar />
      <main className="flex-1">
        <Center />
        <section className="mt-16 px-6">
          <div className="mx-auto max-w-6xl">
            <Link
              href="/projects"
              className="group flex items-center justify-between rounded-[32px] border border-white/10 p-8 transition hover:border-white/20"
            >
              <div>
                <p className="tagline text-white/40">Projects</p>
                <h2 className="text-3xl font-medium tracking-tight">Selected Work</h2>
              </div>
              <span className="text-2xl text-white/40 transition group-hover:text-white" aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
        <BlogPreview />
        <ImagePreview />
      </main>
      <Climax />
    </div>
  );
}

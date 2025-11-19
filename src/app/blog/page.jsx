import Navbar from "@/components/Navbar";
import Climax from "@/components/Climax";
import Link from "next/link";
import { getBlogs } from "@/lib/blogs";
import { Calendar, Clock, BookOpen, Github } from "lucide-react";

function BlogPage() {
  const blogs = getBlogs();

  return (
    <div className="flex min-h-screen flex-col bg-[var(--night)] text-white">
      <Navbar />
      <main className="flex-1 px-6 pt-32 pb-24">
        <section className="mx-auto max-w-4xl space-y-4 text-center">
          <div className="flex items-center justify-center gap-3 text-white/50">
            <BookOpen size={20} />
          </div>
          <h1 className="text-4xl font-medium tracking-tight">LLMs, Vision & Systems</h1>
          <p className="text-white/60">
            Notes from ongoing research, field experiments, and production learnings around agentic AI and computer
            vision.
          </p>
        </section>

        <section className="mx-auto mt-16 max-w-4xl space-y-8">
          {blogs.map((post) => (
            <article key={post.slug} className="rounded-[32px] border border-white/10 p-8">
              <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.35em] text-white/40">
                <span>{post.tags?.[0]}</span>
                <span className="flex items-center gap-2 text-white/50">
                  <Calendar size={14} />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-2 text-white/50">
                  <Clock size={14} />
                  {post.readTime}
                </span>
              </div>
              <Link href={`/blog/${post.slug}`} className="mt-4 block underline-offset-4 hover:underline">
                <h2 className="text-2xl font-medium">{post.title}</h2>
              </Link>
              <p className="mt-3 text-sm text-white/65">{post.excerpt}</p>
              {post.github && (
                <a
                  href={post.github}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm text-white/80 underline-offset-4 hover:underline"
                >
                  <Github size={16} />
                  <span>View code on GitHub</span>
                </a>
              )}
            </article>
          ))}
        </section>
      </main>
      <Climax />
    </div>
  );
}

export default BlogPage;

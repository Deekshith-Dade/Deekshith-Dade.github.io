import Link from "next/link";
import { getBlogs } from "@/lib/blogs";

export default function BlogPreview() {
  const featured = getBlogs().slice(0, 2);

  return (
    <section className="mt-24 px-6">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="tagline text-white/40">Blog</p>
            <h2 className="text-3xl font-medium tracking-tight">Writing & Research Notes</h2>
          </div>
          <Link
            href="/blog"
            className="text-xs uppercase tracking-[0.35em] text-white/60 transition hover:text-white"
          >
            Open Blog
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="space-y-4 rounded-[28px] border border-white/10 p-6 transition hover:border-white/40"
            >
              <div className="flex items-center justify-between text-xs text-white/50">
                <span>{post.tags?.[0]}</span>
                <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
              </div>
              <h3 className="text-xl font-medium">{post.title}</h3>
              <p className="text-sm text-white/65">{post.excerpt}</p>
              <div className="text-xs uppercase tracking-[0.35em] text-white/50">{post.readTime}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


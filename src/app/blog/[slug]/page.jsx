import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Climax from "@/components/Climax";
import BlogRenderer from "@/components/BlogRenderer";
import ViewCounter from "@/components/ViewCounter";
import ClientDate from "@/components/ClientDate";
import { getPostBySlug, renderMDX, getAllPosts as getAllMDXPosts } from "@/lib/mdx";
import { getBlogs, getBlogBySlug } from "@/lib/blogs";
import { Github } from "lucide-react";

export async function generateStaticParams() {
  const mdxPosts = getAllMDXPosts();
  const jsonPosts = getBlogs();
  const allSlugs = [...mdxPosts, ...jsonPosts].map((post) => ({ slug: post.slug }));
  return allSlugs;
}

export default async function BlogPost({ params }) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  // Try MDX first, then fall back to JSON
  let post = getPostBySlug(slug);
  let isMDX = !!post;
  
  if (!post) {
    post = getBlogBySlug(slug);
    if (!post) {
      notFound();
    }
  }

  // For MDX posts, render the content with references
  let mdxContent = null;
  if (isMDX) {
    mdxContent = await renderMDX(post.content, post.references || []);
  }

  return (
    <div className="flex min-h-screen flex-col bg-[var(--night)] text-white">
      <Navbar />
      <main className="flex-1 px-6 pt-32 pb-24">
        <header className="mx-auto max-w-3xl space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-white/50">{post.tags?.join(" · ")}</p>
          <h1 className="text-4xl font-medium tracking-tight">{post.title}</h1>
          <p className="text-white/60">{post.excerpt}</p>
          <div className="flex flex-wrap justify-center gap-4 text-xs uppercase tracking-[0.35em] text-white/50">
            <ClientDate date={post.date} />
            <span>{post.readTime}</span>
            <ViewCounter slug={post.slug} increment />
          </div>
          {post.github && (
            <a
              href={post.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/20 px-5 py-3 text-sm font-medium text-white/80 underline-offset-4 hover:text-white hover:border-white/40 transition-colors"
            >
              <Github size={16} />
              View implementation on GitHub
            </a>
          )}
        </header>

        <article className="mx-auto mt-16 max-w-3xl">
          {isMDX ? (
            <>
              {mdxContent}
              
              {post.references && post.references.length > 0 && (
                <section className="rounded-3xl border border-white/10 p-6 mt-12">
                  <p className="text-xs uppercase tracking-[0.35em] text-white/50">References</p>
                  <ol className="mt-4 space-y-3 text-sm text-white/70 list-none">
                    {post.references.map((ref, idx) => (
                      <li key={ref.url} id={`ref-${idx + 1}`} className="flex gap-3">
                        <span className="text-white/40 font-medium shrink-0">[{idx + 1}]</span>
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noreferrer"
                          className="underline decoration-dotted underline-offset-4 hover:text-white transition-colors"
                        >
                          {ref.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </section>
              )}
            </>
          ) : (
            <>
              <BlogRenderer blocks={post.blocks} allReferences={post.references || []} />
              
              {post.references && post.references.length > 0 && (
                <section className="rounded-3xl border border-white/10 p-6 mt-12">
                  <p className="text-xs uppercase tracking-[0.35em] text-white/50">References</p>
                  <ol className="mt-4 space-y-3 text-sm text-white/70 list-none">
                    {post.references.map((ref, idx) => (
                      <li key={ref.url} id={`ref-${idx + 1}`} className="flex gap-3">
                        <span className="text-white/40 font-medium shrink-0">[{idx + 1}]</span>
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noreferrer"
                          className="underline decoration-dotted underline-offset-4 hover:text-white transition-colors"
                        >
                          {ref.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </section>
              )}
            </>
          )}
        </article>
      </main>
      <Climax />
    </div>
  );
}

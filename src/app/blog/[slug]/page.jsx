import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Climax from "@/components/Climax";
import BlogRenderer from "@/components/BlogRenderer";
import ViewCounter from "@/components/ViewCounter";
import { getBlogs, getBlogBySlug } from "@/lib/blogs";
import { Github } from "lucide-react";

export async function generateStaticParams() {
    return getBlogs().map((post) => ({ slug: post.slug }));
}

export default function BlogPost({ params }) {
    if (!params || !params.slug) {
        notFound();
    }

    const post = getBlogBySlug(params.slug);
    if (!post) {
        notFound();
    }

    return (
        <div className="flex min-h-screen flex-col bg-[var(--night)] text-white">
            <Navbar />
            <main className="flex-1 px-6 pt-32 pb-24">
                <header className="mx-auto max-w-3xl space-y-4 text-center">
                    <p className="text-xs uppercase tracking-[0.35em] text-white/50">{post.tags.join(" · ")}</p>
                    <h1 className="text-4xl font-medium tracking-tight">{post.title}</h1>
                    <p className="text-white/60">{post.excerpt}</p>
                    <div className="flex flex-wrap justify-center gap-4 text-xs uppercase tracking-[0.35em] text-white/50">
                        <span>{new Date(post.date).toLocaleDateString()}</span>
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

                <article className="mx-auto mt-16 max-w-3xl space-y-12">
                    <BlogRenderer blocks={post.blocks} />

                    {post.references?.length > 0 && (
                        <section className="rounded-3xl border border-white/10 p-6">
                            <p className="text-xs uppercase tracking-[0.35em] text-white/50">References</p>
                            <ul className="mt-4 space-y-3 text-sm text-white/70">
                                {post.references.map((ref) => (
                                    <li key={ref.url}>
                                        <a href={ref.url} target="_blank" rel="noreferrer" className="underline decoration-dotted underline-offset-4">
                                            {ref.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
                </article>
            </main>
            <Climax />
        </div>
    );
}


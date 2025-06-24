import Navbar from '@/components/Navbar';
import Climax from '@/components/Climax';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';

function BlogPage() {
    // Placeholder blog posts - replace with real data later
    let blogPosts = [
        {
            id: 1,
            title: "Understanding Contrastive Learning in Computer Vision",
            excerpt: "A deep dive into how contrastive learning techniques are revolutionizing computer vision tasks and improving representation learning.",
            date: "2024-12-15",
            readTime: "8 min read",
            category: "Computer Vision",
            slug: "contrastive-learning-computer-vision"
        },
        {
            id: 2,
            title: "Building Scalable Deep Learning Pipelines",
            excerpt: "Best practices and architectural patterns for creating robust, scalable deep learning systems that can handle production workloads.",
            date: "2024-12-10",
            readTime: "12 min read",
            category: "Deep Learning",
            slug: "scalable-deep-learning-pipelines"
        },
        {
            id: 3,
            title: "The Future of ECG Analysis with AI",
            excerpt: "Exploring the latest advancements in AI-powered ECG analysis and their potential impact on healthcare diagnostics.",
            date: "2024-12-05",
            readTime: "10 min read",
            category: "Healthcare AI",
            slug: "future-ecg-analysis-ai"
        }
    ];

    blogPosts = [];

    return (
        <div className="min-h-screen">
            <Navbar />

            <main className="pt-20">
                {/* Hero Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-dark-900/50 to-transparent">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center space-y-8">
                            <div className="space-y-4 animate-fade-in">
                                <div className="flex items-center justify-center gap-2 text-primary-400 mb-4">
                                    <BookOpen size={24} />
                                    <span className="text-lg font-medium">Tech Blog</span>
                                </div>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text-primary">
                                    Thoughts & Insights
                                </h1>
                                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                                    Exploring the intersection of computer vision, deep learning, and software engineering.
                                    Sharing insights from research and practical experiences.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Blog Posts */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-12">
                            {blogPosts.map((post, index) => (
                                <article
                                    key={post.id}
                                    className="group animate-fade-in"
                                >
                                    <div className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-2xl p-8 hover:border-primary-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/20">
                                        <div className="space-y-6">
                                            {/* Post Meta */}
                                            <div className="flex flex-wrap items-center gap-4 text-sm">
                                                <span className="px-3 py-1 text-primary-400 bg-primary-500/10 rounded-full border border-primary-500/20">
                                                    {post.category}
                                                </span>
                                                <div className="flex items-center gap-2 text-gray-500">
                                                    <Calendar size={16} />
                                                    <span>{new Date(post.date).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}</span>
                                                </div>
                                                <div className="flex items-center gap-2 text-gray-500">
                                                    <Clock size={16} />
                                                    <span>{post.readTime}</span>
                                                </div>
                                            </div>

                                            {/* Post Title */}
                                            <h2 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-primary-400 transition-colors duration-300">
                                                {post.title}
                                            </h2>

                                            {/* Post Excerpt */}
                                            <p className="text-gray-400 leading-relaxed text-lg">
                                                {post.excerpt}
                                            </p>

                                            {/* Read More */}
                                            <div className="flex items-center text-primary-400 group-hover:text-primary-300 transition-colors duration-300">
                                                <span className="text-sm font-medium">Read Article</span>
                                                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Coming Soon Message */}
                        <div className="text-center py-12 animate-slide-up">
                            <div className="bg-dark-800/30 backdrop-blur-sm border border-dark-700 rounded-2xl p-8">
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    More Content Coming Soon
                                </h3>
                                <p className="text-gray-400 max-w-2xl mx-auto">
                                    I&apos;m actively working on new articles about computer vision, deep learning,
                                    and software engineering. Subscribe to stay updated with the latest insights and tutorials.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Climax />
        </div>
    );
}

export default BlogPage; 
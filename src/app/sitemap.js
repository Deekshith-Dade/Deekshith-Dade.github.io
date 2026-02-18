import { getAllPosts } from "@/lib/mdx";
import { getBlogs } from "@/lib/blogs";

export default function sitemap() {
  const mdxPosts = getAllPosts();
  const jsonPosts = getBlogs();
  const allPosts = [...mdxPosts, ...jsonPosts];

  const blogEntries = allPosts.map((post) => ({
    url: `https://deekshith.me/blog/${post.slug}`,
    lastModified: post.date,
  }));

  return [
    { url: "https://deekshith.me", lastModified: new Date() },
    { url: "https://deekshith.me/projects", lastModified: new Date() },
    { url: "https://deekshith.me/blog", lastModified: new Date() },
    { url: "https://deekshith.me/about", lastModified: new Date() },
    { url: "https://deekshith.me/images", lastModified: new Date() },
    ...blogEntries,
  ];
}

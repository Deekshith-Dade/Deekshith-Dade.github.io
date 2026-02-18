import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import CiteComponent from "@/components/mdx/Cite";

const postsDirectory = path.join(process.cwd(), "src/content/blog");

// Base HTML element overrides - no client components
const baseComponents = {
  h1: (props) => <h1 className="text-4xl font-bold leading-tight text-white mt-12 mb-6" {...props} />,
  h2: (props) => <h2 className="text-3xl font-semibold leading-tight text-white mt-10 mb-5" {...props} />,
  h3: (props) => <h3 className="text-2xl font-semibold leading-tight text-white mt-8 mb-4" {...props} />,
  p: (props) => <p className="text-base leading-7 text-white/80 mb-4" {...props} />,
  ul: (props) => <ul className="list-disc list-inside ml-4 space-y-2 text-white/80 mb-4" {...props} />,
  ol: (props) => <ol className="list-decimal list-inside ml-4 space-y-2 text-white/80 mb-4" {...props} />,
  li: (props) => <li className="leading-relaxed pl-2" {...props} />,
  a: (props) => <a className="text-blue-400 hover:text-blue-300 underline decoration-dotted underline-offset-4 transition-colors" {...props} />,
  code: (props) => <code className="px-1.5 py-0.5 rounded bg-white/10 text-white/90 text-sm font-mono" {...props} />,
  pre: (props) => <pre className="overflow-x-auto rounded-2xl bg-[#141414] p-5 text-sm leading-relaxed mb-4" {...props} />,
  strong: (props) => <strong className="font-semibold text-white" {...props} />,
  em: (props) => <em className="italic text-white/90" {...props} />,
  hr: (props) => <hr className="border-white/10 my-8" {...props} />,
  blockquote: (props) => (
    <blockquote className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/80 mb-4" {...props} />
  ),
  img: (props) => (
    <img {...props} className="block w-full rounded-3xl border border-white/10 my-8" />
  ),
};

export function getAllPosts() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        ...data,
      };
    });

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    content,
    ...data,
  };
}

export async function renderMDX(content, references = []) {
  // Create a Cite component with references bound
  const Cite = (props) => {
    // MDX passes the number as the 'n' prop
    return <CiteComponent n={props.n} references={references} />;
  };
  
  const { content: mdxContent } = await compileMDX({
    source: content,
    components: { ...baseComponents, Cite },
    options: {
      parseFrontmatter: false,
    },
  });
  
  return mdxContent;
}

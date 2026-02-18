"use client";

import BlogImage from "./BlogImage";
import BlogCallout from "./BlogCallout";
import BlogCode from "./BlogCode";
import BlogQuote from "./BlogQuote";
import BlogAnnotation from "./BlogAnnotation";

export const mdxComponents = {
  Image: BlogImage,
  Callout: BlogCallout,
  CodeBlock: BlogCode,
  Quote: BlogQuote,
  Annotation: BlogAnnotation,
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
};

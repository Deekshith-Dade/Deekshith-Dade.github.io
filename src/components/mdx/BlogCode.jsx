"use client";

import { Highlight } from "prism-react-renderer";
import { useState } from "react";
import { cn } from "@/lib/utils";

const darkTheme = {
  plain: {
    color: "#ffffff",
    backgroundColor: "#141414",
  },
  styles: [
    { types: ["comment", "prolog", "doctype", "cdata"], style: { color: "#9ca3af", fontStyle: "italic" } },
    { types: ["punctuation"], style: { color: "#e5e7eb" } },
    { types: ["property", "tag", "boolean", "number", "constant", "symbol"], style: { color: "#60a5fa" } },
    { types: ["selector", "attr-name", "string", "char", "builtin", "inserted"], style: { color: "#7dd3fc" } },
    { types: ["operator", "entity", "url", "variable", "language-css"], style: { color: "#a78bfa" } },
    { types: ["deleted"], style: { color: "#f87171" } },
    { types: ["keyword"], style: { color: "#f472b6" } },
    { types: ["function"], style: { color: "#a78bfa" } },
    { types: ["class-name"], style: { color: "#34d399" } },
    { types: ["regex"], style: { color: "#60a5fa" } },
  ],
};

export default function BlogCode({ 
  children, 
  language = "javascript",
  title,
  caption,
  collapsible = false,
  defaultCollapsed = false
}) {
  const [isExpanded, setIsExpanded] = useState(!defaultCollapsed);
  const code = typeof children === "string" ? children.trim() : "";

  const codeBlock = (
    <Highlight theme={darkTheme} code={code} language={language}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={cn(
            "relative overflow-x-auto rounded-2xl bg-[#141414] p-5 text-sm leading-relaxed",
            className
          )}
          style={{ ...style, backgroundColor: "transparent" }}
        >
          {!title && (
            <span className="absolute right-5 top-4 text-[10px] uppercase tracking-[0.35em] text-white/30">
              {language.toUpperCase()}
            </span>
          )}
          {tokens.map((line, lineIndex) => {
            const lineProps = getLineProps({ line, key: lineIndex });
            const { key: lineKey, ...restLineProps } = lineProps;
            return (
              <div key={lineKey ?? lineIndex} {...restLineProps}>
                {line.map((token, tokenIndex) => {
                  const tokenProps = getTokenProps({ token, key: tokenIndex });
                  const { key: tokenKey, ...restTokenProps } = tokenProps;
                  return <span key={tokenKey ?? tokenIndex} {...restTokenProps} />;
                })}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );

  if (collapsible || title) {
    return (
      <figure className="space-y-3 rounded-3xl border border-white/10 bg-[var(--night-muted)] overflow-hidden my-6">
        <button
          onClick={() => collapsible && setIsExpanded(!isExpanded)}
          className={cn(
            "w-full px-6 py-4 flex items-center justify-between",
            collapsible && "hover:bg-white/5 transition-colors"
          )}
          disabled={!collapsible}
        >
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-white/90">{title || "Code"}</span>
            <span className="text-[10px] uppercase tracking-[0.35em] text-white/40 px-2 py-1 rounded bg-white/5">
              {language.toUpperCase()}
            </span>
          </div>
          {collapsible && (
            <svg
              className={cn("w-5 h-5 text-white/60 transition-transform", isExpanded && "rotate-180")}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </button>
        {isExpanded && (
          <div className="px-6 pb-6">
            {caption && <figcaption className="text-xs uppercase tracking-[0.3em] text-white/50 mb-3">{caption}</figcaption>}
            {codeBlock}
          </div>
        )}
      </figure>
    );
  }

  return (
    <figure className="space-y-3 rounded-3xl border border-white/10 bg-[var(--night-muted)] p-6 my-6">
      {caption && <figcaption className="text-xs uppercase tracking-[0.3em] text-white/50">{caption}</figcaption>}
      {codeBlock}
    </figure>
  );
}

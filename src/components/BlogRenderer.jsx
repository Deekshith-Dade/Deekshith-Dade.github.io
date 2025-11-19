"use client";
import Image from "next/image";
import { Highlight } from "prism-react-renderer";
import { cn } from "@/lib/utils";
import { createElement, useState, useEffect } from "react";

// Mature, minimal dark theme with high contrast
const darkTheme = {
  plain: {
    color: "#ffffff",
    backgroundColor: "#141414",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: {
        color: "#9ca3af",
        fontStyle: "italic",
      },
    },
    {
      types: ["punctuation"],
      style: {
        color: "#e5e7eb",
      },
    },
    {
      types: ["property", "tag", "boolean", "number", "constant", "symbol"],
      style: {
        color: "#60a5fa",
      },
    },
    {
      types: ["selector", "attr-name", "string", "char", "builtin", "inserted"],
      style: {
        color: "#7dd3fc",
      },
    },
    {
      types: ["operator", "entity", "url", "variable", "language-css"],
      style: {
        color: "#a78bfa",
      },
    },
    {
      types: ["deleted"],
      style: {
        color: "#f87171",
      },
    },
    {
      types: ["keyword"],
      style: {
        color: "#f472b6",
      },
    },
    {
      types: ["function"],
      style: {
        color: "#a78bfa",
      },
    },
    {
      types: ["class-name"],
      style: {
        color: "#34d399",
      },
    },
    {
      types: ["regex"],
      style: {
        color: "#60a5fa",
      },
    },
  ],
};

// Parse inline markdown-like formatting: **bold**, *italic*, `code`, ==highlight==
function parseInlineFormatting(text) {
  if (!text) return [];

  const parts = [];
  let currentIndex = 0;

  // Regex patterns in order of precedence (most specific first)
  const patterns = [
    { regex: /\*\*([^*]+)\*\*/g, type: 'bold' },           // **bold**
    { regex: /__([^_]+)__/g, type: 'bold' },               // __bold__
    { regex: /==([^=]+)==/g, type: 'highlight' },          // ==highlight==
    { regex: /`([^`]+)`/g, type: 'code' },                 // `code`
    { regex: /\*([^*]+)\*/g, type: 'italic' },             // *italic* (not **)
    { regex: /_([^_]+)_/g, type: 'italic' },               // _italic_ (not __)
  ];

  // Find all matches with their positions
  const matches = [];
  patterns.forEach(({ regex, type }) => {
    let match;
    regex.lastIndex = 0; // Reset regex
    while ((match = regex.exec(text)) !== null) {
      matches.push({
        start: match.index,
        end: match.index + match[0].length,
        content: match[1],
        type,
        fullMatch: match[0]
      });
    }
  });

  // Sort by start position
  matches.sort((a, b) => a.start - b.start);

  // Remove overlapping matches (keep first one)
  const nonOverlapping = [];
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    let overlaps = false;
    for (let j = 0; j < nonOverlapping.length; j++) {
      const existing = nonOverlapping[j];
      if (match.start < existing.end && match.end > existing.start) {
        overlaps = true;
        break;
      }
    }
    if (!overlaps) {
      nonOverlapping.push(match);
    }
  }

  // Build React elements
  const elements = [];
  let lastIndex = 0;

  nonOverlapping.forEach((match, idx) => {
    // Add text before match
    if (match.start > lastIndex) {
      const beforeText = text.substring(lastIndex, match.start);
      if (beforeText) {
        elements.push(beforeText);
      }
    }

    // Add formatted element
    const key = `format-${idx}`;
    switch (match.type) {
      case 'bold':
        elements.push(<strong key={key}>{match.content}</strong>);
        break;
      case 'italic':
        elements.push(<em key={key}>{match.content}</em>);
        break;
      case 'code':
        elements.push(
          <code key={key} className="px-1.5 py-0.5 rounded bg-white/10 text-white/90 text-sm font-mono">
            {match.content}
          </code>
        );
        break;
      case 'highlight':
        elements.push(
          <mark key={key} className="bg-yellow-500/30 text-yellow-100 px-1 rounded">
            {match.content}
          </mark>
        );
        break;
      default:
        elements.push(match.content);
    }

    lastIndex = match.end;
  });

  // Add remaining text
  if (lastIndex < text.length) {
    elements.push(text.substring(lastIndex));
  }

  return elements.length > 0 ? elements : [text];
}

function CollapsibleCodeBlock({ block, index }) {
  const [isExpanded, setIsExpanded] = useState(block.collapsed !== true); // Default to expanded unless explicitly collapsed
  const codeContent = Array.isArray(block.code)
    ? block.code.join('\n')
    : (block.code || "");

  return (
    <figure className="space-y-3 rounded-3xl border border-white/10 bg-[var(--night-muted)] overflow-hidden">
      {(block.title || block.collapsible) && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-white/90">{block.title || "Code"}</span>
            {block.language && (
              <span className="text-[10px] uppercase tracking-[0.35em] text-white/40 px-2 py-1 rounded bg-white/5">
                {block.language.toUpperCase()}
              </span>
            )}
          </div>
          <svg
            className={cn(
              "w-5 h-5 text-white/60 transition-transform",
              isExpanded && "rotate-180"
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}
      {isExpanded && (
        <div className="px-6 pb-6">
          {block.caption && !block.title && (
            <figcaption className="text-xs uppercase tracking-[0.3em] text-white/50 mb-3">{block.caption}</figcaption>
          )}
          <Highlight
            theme={darkTheme}
            code={codeContent.trim()}
            language={block.language || "javascript"}
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre
                className={cn(
                  "relative overflow-x-auto rounded-2xl bg-[#141414] p-5 text-sm leading-relaxed",
                  className
                )}
                style={{ ...style, backgroundColor: "transparent" }}
              >
                {!block.title && (
                  <span className="absolute right-5 top-4 text-[10px] uppercase tracking-[0.35em] text-white/30">
                    {(block.language || "text").toUpperCase()}
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
        </div>
      )}
    </figure>
  );
}

function ImageLightbox({ src, alt, caption, onClose }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden"; // Prevent background scrolling

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-7xl max-h-[90vh] w-full h-full flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex-1 flex items-center justify-center overflow-auto min-h-0">
          <div className="relative w-full h-full min-h-[320px]">
            <Image
              src={src}
              alt={alt || ""}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-contain"
              priority
            />
          </div>
        </div>
        {caption && (
          <figcaption className="mt-4 text-center text-sm text-white/70">
            {caption}
          </figcaption>
        )}
      </div>
    </div>
  );
}

export default function BlogRenderer({ blocks }) {
  const [lightboxImage, setLightboxImage] = useState(null);

  return (
    <>
      <div className="space-y-5">
        {blocks.map((block, index) => {
          switch (block.type) {
            case "heading":
              const level = Math.min(Math.max(block.level || 2, 1), 3); // Clamp between 1-3
              const headingStyles = {
                1: "text-4xl font-bold leading-tight text-white mt-12 mb-6",
                2: "text-3xl font-semibold leading-tight text-white mt-10 mb-5",
                3: "text-2xl font-semibold leading-tight text-white mt-8 mb-4",
              };
              return createElement(
                `h${level}`,
                {
                  key: index,
                  className: headingStyles[level] || headingStyles[2],
                },
                block.text
              );
            case "paragraph":
              return (
                <p key={index} className="text-base leading-7 text-white/80">
                  {parseInlineFormatting(block.text)}
                </p>
              );
            case "code":
              // If title or collapsible is set, use collapsible version
              if (block.title || block.collapsible) {
                return <CollapsibleCodeBlock key={index} block={block} index={index} />;
              }
              // Otherwise, use regular code block
              const codeContent = Array.isArray(block.code)
                ? block.code.join('\n')
                : (block.code || "");
              return (
                <figure key={index} className="space-y-3 rounded-3xl border border-white/10 bg-[var(--night-muted)] p-6">
                  {block.caption && (
                    <figcaption className="text-xs uppercase tracking-[0.3em] text-white/50">{block.caption}</figcaption>
                  )}
                  <Highlight
                    theme={darkTheme}
                    code={codeContent.trim()}
                    language={block.language || "javascript"}
                  >
                    {({ className, style, tokens, getLineProps, getTokenProps }) => (
                      <pre
                        className={cn(
                          "relative overflow-x-auto rounded-2xl bg-[#141414] p-5 text-sm leading-relaxed",
                          className
                        )}
                        style={{ ...style, backgroundColor: "transparent" }}
                      >
                        <span className="absolute right-5 top-4 text-[10px] uppercase tracking-[0.35em] text-white/30">
                          {(block.language || "text").toUpperCase()}
                        </span>
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
                </figure>
              );
            case "callout":
              return (
                <div
                  key={index}
                  className={cn(
                    "rounded-3xl border p-6",
                    block.variant === "warn"
                      ? "border-red-400/30 bg-red-500/5 text-red-50"
                      : "border-white/15 bg-white/5 text-white"
                  )}
                >
                  <p className="text-xs uppercase tracking-[0.35em] text-white/50">{block.title}</p>
                  <p className="mt-3 text-sm text-white/80">{parseInlineFormatting(block.text)}</p>
                </div>
              );
            case "annotation":
              return (
                <p
                  key={index}
                  className={cn(
                    "rounded-full px-5 py-2 text-xs uppercase tracking-[0.35em]",
                    block.variant === "tip"
                      ? "bg-emerald-500/10 text-emerald-200"
                      : "bg-white/10 text-white/90"
                  )}
                >
                  {parseInlineFormatting(block.text)}
                </p>
              );
            case "image":
              return (
                <figure key={index} className="space-y-3">
                  <div
                    className="overflow-hidden rounded-3xl border border-white/10 bg-[var(--night-muted)] cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setLightboxImage({ src: block.src, alt: block.alt, caption: block.caption })}
                  >
                    <Image
                      src={block.src}
                      alt={block.alt}
                      width={block.width || 960}
                      height={block.height || 540}
                      className="w-full object-cover"
                      priority={false}
                    />
                  </div>
                  {block.caption && <figcaption className="text-sm text-white/50">{block.caption}</figcaption>}
                </figure>
              );
            case "quote":
              return (
                <figure key={index} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/80">
                  <blockquote className="text-lg italic leading-relaxed">
                    &ldquo;{parseInlineFormatting(block.text)}&rdquo;
                  </blockquote>
                  {block.cite && (
                    <figcaption className="mt-4 text-sm uppercase tracking-[0.35em] text-white/60">
                      &mdash; {block.cite}
                    </figcaption>
                  )}
                </figure>
              );
            case "list":
              const ListTag = block.ordered ? "ol" : "ul";
              return (
                <div key={index} className="space-y-3">
                  {block.title && <p className="text-xs uppercase tracking-[0.35em] text-white/50">{block.title}</p>}
                  <ListTag className={cn(
                    "space-y-2 text-white/80",
                    block.ordered ? "list-decimal list-inside ml-4" : "list-disc list-inside ml-4"
                  )}>
                    {block.items?.map((item, idx) => (
                      <li key={idx} className="leading-relaxed pl-2">
                        {parseInlineFormatting(item)}
                      </li>
                    ))}
                  </ListTag>
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
      {lightboxImage && (
        <ImageLightbox
          src={lightboxImage.src}
          alt={lightboxImage.alt}
          caption={lightboxImage.caption}
          onClose={() => setLightboxImage(null)}
        />
      )}
    </>
  );
}


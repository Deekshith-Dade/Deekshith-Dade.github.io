"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function BlogImage({ 
  src, 
  alt = "", 
  caption,
  width = 960,
  height = 540
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const hasCustomWidth = width && width < 960;

  return (
    <>
      <figure className={cn("space-y-3 my-8", hasCustomWidth && "flex flex-col items-center")}>
        <div
          className="overflow-hidden rounded-3xl border border-white/10 bg-[var(--night-muted)] cursor-pointer hover:opacity-90 transition-opacity"
          style={hasCustomWidth ? { maxWidth: width } : undefined}
          onClick={() => setLightboxOpen(true)}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className="w-full object-cover"
          />
        </div>
        {caption && (
          <figcaption className={cn("text-sm text-white/50", hasCustomWidth && "text-center")}>
            {caption}
          </figcaption>
        )}
      </figure>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex flex-col">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex-1 flex items-center justify-center overflow-auto min-h-0">
              <div className="relative w-full h-full min-h-[320px]">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            {caption && (
              <figcaption className="mt-4 text-center text-sm text-white/70">{caption}</figcaption>
            )}
          </div>
        </div>
      )}
    </>
  );
}

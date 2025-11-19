"use client";
import Masonry from "react-masonry-css";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Climax from "@/components/Climax";
import { galleryImages } from "@/lib/content";

function Page() {
  const breakpointColumnsObj = {
    default: 4,
    1280: 3,
    900: 2,
    600: 1,
  };

  return (
    <div className="flex min-h-screen flex-col bg-[var(--night)] text-white">
      <Navbar />
      <main className="flex-1 px-6 pt-32 pb-24">
        <section className="mx-auto max-w-4xl space-y-4 text-center">
          <p className="tagline text-white/40">Images & Field Notes</p>
          <h1 className="text-4xl font-medium tracking-tight">Minimal captures from travels</h1>
          <p className="text-white/60">
            Minimal captures from travels and quiet moments.
          </p>
        </section>

        <section className="mt-16">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {galleryImages.map((image) => (
              <div key={image.src} className="overflow-hidden rounded-[24px] border border-white/10 bg-[var(--night-muted)]">
                <Image
                  className="w-full object-cover opacity-80 hover:opacity-100 transition"
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                />
              </div>
            ))}
          </Masonry>
        </section>
      </main>
      <Climax />
    </div>
  );
}

export default Page;
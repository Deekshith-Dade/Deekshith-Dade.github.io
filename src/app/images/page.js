"use client";
import { useState } from "react";
import Masonry from "react-masonry-css";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Climax from "@/components/Climax";
import ImageLightbox from "@/components/ImageLightbox";
import { galleryImages } from "@/lib/content";

function Page() {
  const [selectedImage, setSelectedImage] = useState(null);

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
              <div
                key={image.src}
                className="group cursor-pointer overflow-hidden rounded-[24px] border border-white/10 bg-[var(--night-muted)] transition-all duration-300 hover:border-white/20 hover:shadow-lg hover:shadow-white/5"
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  className="w-full object-cover opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:scale-[1.02]"
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

      {selectedImage && (
        <ImageLightbox
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}

export default Page;
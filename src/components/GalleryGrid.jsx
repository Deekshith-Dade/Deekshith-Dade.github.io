"use client";
import { useState } from "react";
import Masonry from "react-masonry-css";
import Image from "next/image";
import ImageLightbox from "@/components/ImageLightbox";

const breakpointColumnsObj = {
  default: 4,
  1280: 3,
  900: 2,
  600: 1,
};

export default function GalleryGrid({ images }) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {images.map((image) => (
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

      {selectedImage && (
        <ImageLightbox
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
}

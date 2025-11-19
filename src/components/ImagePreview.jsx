import Image from "next/image";
import Link from "next/link";
import { galleryImages } from "@/lib/content";

export default function ImagePreview() {
  const featured = galleryImages.slice(0, 4);

  return (
    <section className="mt-24 px-6">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="tagline text-white/40">Images</p>
            <h2 className="text-3xl font-medium tracking-tight">Field Notes & Photography</h2>
          </div>
          <Link
            href="/images"
            className="text-xs uppercase tracking-[0.35em] text-white/60 transition hover:text-white"
          >
            View Archive
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {featured.map((image) => (
            <div
              key={image.src}
              className="overflow-hidden rounded-[24px] border border-white/10 bg-[var(--night-muted)]"
            >
              <div className="relative aspect-[5/3]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-80"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


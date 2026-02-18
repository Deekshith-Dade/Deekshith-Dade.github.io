import Navbar from "@/components/Navbar";
import Climax from "@/components/Climax";
import GalleryGrid from "@/components/GalleryGrid";
import { galleryImages } from "@/lib/content";

export const metadata = {
  title: "Images",
  description: "Minimal captures from travels and quiet moments.",
};

function Page() {
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
          <GalleryGrid images={galleryImages} />
        </section>
      </main>
      <Climax />
    </div>
  );
}

export default Page;
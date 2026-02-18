import fs from "fs";
import path from "path";
import Navbar from "@/components/Navbar";
import ProjectItem from "@/components/ProjectItem";
import Climax from "@/components/Climax";
import { FolderOpen } from "lucide-react";

export const metadata = {
  title: "Projects",
  description:
    "A curated archive of experiments and deployments across contrastive learning, agentic tooling, and applied computer vision.",
};

async function Project() {
  const filePath = path.join(process.cwd(), "public", "project.json");
  const projects = JSON.parse(fs.readFileSync(filePath, "utf8")).sort(
    (a, b) => a.s_no - b.s_no
  );

  return (
    <div className="flex min-h-screen flex-col bg-[var(--night)] text-white">
      <Navbar />
      <main className="flex-1 px-6 pt-32 pb-24">
        <section className="mx-auto max-w-4xl space-y-4 text-center">
          <div className="flex items-center justify-center gap-3 text-white/50">
            <FolderOpen size={20} />
            <p className="tagline text-white/50">Project Index</p>
          </div>
          <h1 className="text-4xl font-medium tracking-tight">Systems, Agents & Research</h1>
          <p className="text-white/60">
            A curated archive of experiments and production deployments across contrastive learning,
            agentic tooling, and applied computer vision.
          </p>
        </section>

        <section className="mx-auto mt-16 max-w-6xl space-y-8">
          {projects.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </section>
      </main>
      <Climax />
    </div>
  );
}
export default Project;

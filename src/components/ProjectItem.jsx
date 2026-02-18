import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

function ProjectItem({ project }) {
  return (
    <div className="rounded-[32px] border border-white/10 p-6 lg:p-10">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.35em] text-white/40">
            <span>{project.category}</span>
            <span className="text-white/30">{project.date}</span>
          </div>
          <Link href={`/projects/${project.id}`} className="hover:underline underline-offset-4">
            <h3 className="text-2xl font-medium">{project.title}</h3>
          </Link>
          <div className="flex flex-wrap gap-4 text-xs uppercase tracking-[0.35em] text-white/50">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-white/60 hover:text-white"
              >
                Code
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-white/10">
          <Image
            src={project.img}
            alt={project.title}
            fill
            className="object-cover opacity-80 transition duration-500 hover:opacity-100"
          />
        </div>
      </div>
    </div>
  );
}
export default ProjectItem;

import fs from "fs";
import path from "path";
import Link from "next/link";

async function Projects() {
  const filePath = path.join(process.cwd(), "public", "project.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const selection = data.sort((a, b) => a.s_no - b.s_no).slice(0, 3);

  return (
    <section className="mt-16 px-6">
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="tagline text-white/40">Projects</p>
            <h2 className="text-3xl font-medium tracking-tight">Selected Work</h2>
          </div>
          <Link
            href="/projects"
            className="text-xs uppercase tracking-[0.35em] text-white/60 transition hover:text-white"
          >
            Browse All
          </Link>
        </div>

        <div className="space-y-6">
          {selection.map((project) => (
            <div key={project.id} className="rounded-[32px] border border-white/10 p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-white/40">{project.category}</p>
                  <h3 className="text-2xl font-medium">{project.title}</h3>
                  <p className="text-sm text-white/60">
                    {project.description ||
                      "Applied research project built with a sharp focus on reliability, evaluation, and deployability."}
                  </p>
                  <Link
                    href={`/projects/${project.id}`}
                    className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-white/60 underline-offset-4 hover:text-white"
                  >
                    Open Case Study
                    <span aria-hidden="true">↗</span>
                  </Link>
                </div>
                <div className="text-right text-xs uppercase tracking-[0.35em] text-white/50">
                  {project.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
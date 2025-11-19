import { Github, Linkedin, Mail, Instagram } from "lucide-react";
import Image from "next/image";

const socials = [
  { icon: Linkedin, url: "https://www.linkedin.com/in/deekshith-dade/", label: "LinkedIn" },
  { icon: Github, url: "https://github.com/deekshith-dade", label: "GitHub" },
  { icon: Instagram, url: "https://www.instagram.com/momento_diei/", label: "Instagram" },
];

function Climax() {
  return (
    <footer className="mt-auto border-t border-white/10">
      <div className="mx-auto max-w-3xl px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <Image src="/images/birdman.jpg" alt="Birdman" width={40} height={40} className="rounded-full" />
            <div className="flex flex-col">
              <p className="text-sm tracking-[0.2em]">Deekshith Dade</p>
              <a
                href="mailto:deekshithreddy1300@gmail.com"
                className="text-xs text-white/60 hover:text-white/80"
              >
                deekshithreddy1300@gmail.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, url, label }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/15 p-2 text-white/70 transition hover:text-white"
                  aria-label={label}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">
              © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Climax;

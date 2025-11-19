// src/app/Navbar.js
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/images", label: "Images" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClass =
    "relative uppercase tracking-[0.35em] text-[0.65rem] text-white/60 transition hover:text-white pb-3 after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-px after:bg-white after:scale-x-0 hover:after:scale-x-100 after:origin-center after:transition";

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-white/5",
        scrolled ? "bg-[var(--night)]/95 backdrop-blur-md" : "bg-[var(--night)]/80"
      )}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/images/birdman.jpg" alt="Birdman" width={80} height={80} />
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-[0.2em] text-white">
              DEEKSHITH DADE
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass}>
              {item.label}
            </Link>
          ))}
        </div>

        <button
          className="rounded-full border border-white/20 p-2 text-white/70 hover:text-white md:hidden"
          aria-label="Toggle navigation"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-white/10 bg-[var(--night)]/95 px-6 py-6 md:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm uppercase tracking-[0.3em] text-white/70 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

// src/app/Navbar.js
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const linkClass = (href) =>
    cn(
      "relative uppercase tracking-[0.35em] text-[0.65rem] transition pb-3 after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-px after:bg-white after:origin-center after:transition",
      isActive(href)
        ? "text-white after:scale-x-100"
        : "text-white/60 hover:text-white after:scale-x-0 hover:after:scale-x-100"
    );

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-white/5",
        isOpen
          ? "bg-[var(--night)] backdrop-blur-md"
          : scrolled
            ? "bg-[var(--night)]/95 backdrop-blur-md"
            : "bg-[var(--night)]/80"
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
            <Link key={item.href} href={item.href} className={linkClass(item.href)}>
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
        <div className="border-t border-white/10 bg-[var(--night)] backdrop-blur-md px-6 py-6 md:hidden">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-4 py-3 text-sm uppercase tracking-[0.3em] transition-colors",
                  isActive(item.href)
                    ? "bg-white/10 text-white"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
                )}
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

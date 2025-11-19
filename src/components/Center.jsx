"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { lerp } from "canvas-sketch-util/math";
import random from "canvas-sketch-util/random";

export default function Center() {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        const draw = () => {
            const dpr = window.devicePixelRatio || 1;
            const size = container.clientWidth;
            canvas.style.width = `${size}px`;
            canvas.style.height = `${size}px`;
            canvas.width = Math.floor(size * dpr);
            canvas.height = Math.floor(size * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, size, size);
            ctx.fillStyle = "#0a0a0a";
            ctx.fillRect(0, 0, size, size);

            const margin = size * 0.12;
            const count = 26;
            for (let i = 0; i < count; i++) {
                for (let j = 0; j < count; j++) {
                    const u = count <= 1 ? 0.5 : i / (count - 1);
                    const v = count <= 1 ? 0.5 : j / (count - 1);
                    const noise = Math.abs(random.noise2D(u * 1.5, v * 1.5));
                    const radius = noise * 0.006 * count;
                    const x = lerp(margin, size - margin, u);
                    const y = lerp(margin, size - margin, v);
                    ctx.beginPath();
                    ctx.arc(x, y, size * radius, 0, Math.PI * 2, false);
                    ctx.fillStyle = `rgba(255,255,255,${0.08 + noise * 0.25})`;
                    ctx.fill();
                }
            }

            ctx.strokeStyle = "rgba(255,255,255,0.2)";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(size / 2, size / 2, size * 0.38, 0, Math.PI * 2);
            ctx.stroke();
        };

        const observer = new ResizeObserver(() => draw());
        observer.observe(container);
        draw();

        return () => observer.disconnect();
    }, []);

    const stats = [
        { label: "Years in research", value: "3+" },
        { label: "Projects shipped", value: "10+" },
        { label: "Disciplines", value: "Vision · Agents" },
    ];

    return (
        <section className="relative flex min-h-[80vh] items-center pt-32">
            <div className="mx-auto max-w-4xl px-6">
                <div className="flex flex-col items-center space-y-12 text-center">
                    <div className="space-y-4">
                        <p className="tagline text-white/40">University of Utah · SCI Institute</p>
                        <h1 className="text-4xl font-medium tracking-tight text-white sm:text-5xl lg:text-6xl">
                            Deekshith Dade
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg text-white/70">
                            AI specialist focused on computer vision research, data-centric agentic systems, and
                            streamlined product delivery for enterprise teams.
                        </p>
                    </div>

                    <div className="relative">
                        <div
                            ref={containerRef}
                            className="relative mx-auto aspect-square w-48 rounded-2xl border border-white/10 p-4"
                        >
                            <canvas
                                ref={canvasRef}
                                className="h-full w-full rounded-xl border border-white/10 bg-[var(--night)]"
                            />
                        </div>
                    </div>

                    <div className="w-full max-w-2xl space-y-8">
                        <div className="rounded-[32px] border border-white/10 p-6 text-left">
                            <p className="text-xs uppercase tracking-[0.3em] text-white/40">About</p>
                            <p className="mt-3 text-base text-white/75">
                                Over three years of building deep learning pipelines, leading advertising technology
                                initiatives, and collaborating with research labs to translate algorithms into
                                production software. I thrive in minimal, purposeful tooling and bring that mindset to
                                every project.
                            </p>
                        </div>

                        <div className="flex flex-wrap justify-center gap-3 text-xs uppercase tracking-[0.35em]">
                            <Link
                                href="/projects"
                                className="rounded-full border border-white/40 px-6 py-3 text-white hover:border-white"
                            >
                                View Projects
                            </Link>
                            <Link
                                href="/deekshith_resume.pdf"
                                className="rounded-full border border-white/20 px-6 py-3 text-white/70 hover:text-white"
                            >
                                Download CV
                            </Link>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-3">
                            {stats.map((stat) => (
                                <div key={stat.label} className="space-y-2 border-l border-white/15 pl-4 text-left">
                                    <p className="text-2xl font-semibold text-white">{stat.value}</p>
                                    <p className="text-xs uppercase tracking-[0.3em] text-white/50">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

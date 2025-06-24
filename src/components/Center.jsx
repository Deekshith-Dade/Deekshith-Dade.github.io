// src/app/Center.js
"use client";
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { annotate, annotationGroup } from 'rough-notation';
import { lerp } from 'canvas-sketch-util/math';
import random from 'canvas-sketch-util/random';
import palettes from 'nice-color-palettes';

export default function Center() {
    const canvasRef = useRef(null);
    const [textColor, setTextColor] = useState('');

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'black';

        const palette = random.shuffle(random.pick(palettes)).slice(1, 6);

        const createGrid = () => {
            const points = [];
            const count = 20;
            for (let i = 0; i < count; i++) {
                for (let j = 0; j < count; j++) {
                    const u = count <= 1 ? 0.5 : i / (count - 1);
                    const v = count <= 1 ? 0.5 : j / (count - 1);
                    const radius = Math.abs(random.noise2D(u, v)) * 0.005 * count;
                    points.push({
                        color: random.pick(palette),
                        radius,
                        position: [u, v]
                    });
                }
            }
            return points;
        };

        const points = createGrid();
        const margin = 100;
        const width = canvas.offsetWidth;
        const height = canvas.offsetHeight;

        ctx.fillStyle = 'white';

        points.forEach(data => {
            const { color, position, radius } = data;
            const [u, v] = position;
            const x = lerp(margin, width - margin, u);
            const y = lerp(margin, height - margin, v);

            ctx.beginPath();
            ctx.arc(x, y, width * radius, 0, Math.PI * 2, false);
            ctx.fillStyle = color;
            ctx.fill();
        });

        // Annotations
        const n1 = document.querySelector('.name');
        const n2 = document.querySelector('.course');
        const n3 = document.querySelector('.highlight1');
        const n4 = document.querySelector('.highlight2');

        if (n1 && n2 && n3 && n4) {
            const a1 = annotate(n1, { type: 'underline', color: palette[0] });
            const a2 = annotate(n2, { type: 'box', color: palette[1] });
            const a3 = annotate(n3, { type: 'circle', color: palette[2] });
            const a4 = annotate(n4, { type: 'circle', color: palette[2] });
            const ag = annotationGroup([a1, a2, a3, a4]);
            setTextColor(palette[1]);
            ag.show();
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content */}
                    <div className="space-y-8 ">
                        <div className="space-y-4">
                            <p className="text-primary-400 font-mono text-sm tracking-wider animate-fade-in">
                                Hello, I&apos;m
                            </p>

                            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight ">
                                <span className="name gradient-text-primary">Deekshith Dade</span>
                            </h1>

                            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-gray-300 font-medium ">
                                Computer Vision Researcher & Full-Stack Developer
                            </h2>
                        </div>

                        <p className="text-lg text-gray-400 leading-relaxed max-w-2xl ">
                            I&apos;m currently a <span className="course text-primary-400 font-semibold">Masters in Computer Science</span> student at the University of Utah,
                            working as a <a href="https://www.sci.utah.edu/people/deekshith.dade.html" className="link-primary">Graduate Research Assistant</a> at the Scientific Computing and Imaging (SCI) Institute.
                            My research focuses on <span className="highlight1 text-accent-400 font-semibold">Computer Vision</span> using cutting-edge <span className="highlight2 text-accent-400 font-semibold">Deep Learning</span> techniques.
                        </p>

                        <p className="text-lg text-gray-400 leading-relaxed max-w-2xl animate-fade-in">
                            When I&apos;m not coding or researching, you&apos;ll find me watching sci-fi movies, reading philosophical fiction,
                            capturing moments through photography, or listening to industrial rock music.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4 animate-slide-up">
                            <a
                                href="/deekshith_resume.pdf"
                                className="btn-primary group"
                            >
                                <Download size={18} className="mr-2" />
                                Download CV
                                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </a>

                            <a
                                href="https://github.com/deekshith-dade"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-secondary group"
                            >
                                <Github size={18} className="mr-2" />
                                View Projects
                            </a>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-dark-700 animate-slide-up">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary-400">3+</div>
                                <div className="text-sm text-gray-400">Years Experience</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary-400">10+</div>
                                <div className="text-sm text-gray-400">Projects</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-primary-400">5+</div>
                                <div className="text-sm text-gray-400">Technologies</div>
                            </div>
                        </div>
                    </div>

                    {/* Visual Element */}
                    <div className="flex justify-center lg:justify-end animate-fade-in">
                        <div className="relative">
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full blur-3xl animate-float"></div>
                            <canvas
                                ref={canvasRef}
                                className="relative rounded-full border-2 border-primary-500/30 shadow-2xl"
                                height={500}
                                width={500}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

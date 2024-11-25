// src/app/Center.js
'use client';
import Image from 'next/image'; // Ensure you have an appropriate profile image to display
import { useEffect, useState } from 'react';
import { annotate, annotationGroup } from 'rough-notation'
import React, { useRef } from 'react';

import { lerp } from 'canvas-sketch-util/math';
import random from 'canvas-sketch-util/random';
import palettes from 'nice-color-palettes';
import { brightestandlightest } from '../app/utils'

export default function Center() {
    const canvasRef = useRef(null);
    const [textColor, setTextColor] = useState('');

    useEffect(() => {
        const canvas = canvasRef.current;
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = 'black';


        const palette = random.shuffle(random.pick(palettes)).slice(1, 6);

        const creatGrid = () => {
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

        const points = creatGrid();
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

        const n1 = document.querySelector('.name');
        const n2 = document.querySelector('.course');
        const n3 = document.querySelector('.highlight1');
        const n4 = document.querySelector('.highlight2');
        const a1 = annotate(n1, { type: 'underline', color: palette[0] });
        const a2 = annotate(n2, { type: 'box', color: palette[1] });
        const a3 = annotate(n3, { type: 'circle', color: palette[2] });
        const a4 = annotate(n4, { type: 'circle', color: palette[2] });
        const ag = annotationGroup([a1, a2, a3, a4]);
        setTextColor(palette[1]);
        ag.show();

        return () => {

        }
    }, [])



    return (
        <div className="flex flex-col lg:flex-row items-center justify-around py-4 lg:py-4">
            <div className="max-w-2xl text-center md:text-left mb-8 md:mb-0">
                <h1 className="text-3xl sm:text-6xl lg:text-6xl font-bold mb-8 mt-8">

                    Hello! I&apos;m <span className={`name`} style={{ color: textColor }}>Deekshith....</span>
                </h1>
                <p className="text-base sm:text-lg mb-4 text-gray-400">
                    I am currently a Masters in <span className='course'>Computer Science</span> student at the University of Utah, where I&apos;m currenlty working as a <a className='text-red-500 hover:underline hover:underline-offset-4' href="https://www.sci.utah.edu/people/deekshith.dade.html">Graduate Research Assistant</a> at the Scientific Computing and Imaging (SCI) Institute
                    My research intersets are in the field of <span className="highlight1">Computer Vision</span> using latest <span className="highlight2">Deep Learning</span>  Techniques.
                </p>
                <p className="text-base sm:text-lg text-gray-400">
                    I am passionate about programming and learning in general. Watching sci-fi movies, reading philosophical fiction, looking at photos I shoot and listening to industrial rock music is how I keep my sanity.

                </p>
                <div className="flex justify-center lg:justify-start mt-6">

                    <a href="https://www.linkedin.com/in/deekshith-dade" target="_blank" className="btn-primary mr-4">
                        <div className='border-[0.15px] flex justify-between px-8 py-2 m-1  transition delay-150 duration-400 ease-in-out transform hover:scale-105 hover:bg-s-green hover:border-black' >LinkedIn
                        </div>
                    </a>

                    <a href="/deekshith_resume.pdf" className="btn-primary mr-4">
                        <div className='border-[0.15px] flex justify-between text-gray-900 bg-white px-8 py-2 m-1  transition delay-150 duration-400 ease-in-out transform hover:scale-105 hover:bg-s-green hover:border-black hover:text-white' >CV
                        </div>
                    </a>

                    <a href="https://github.com/deekshith-dade" target="_blank" className="btn-primary">
                        <div className='border-[0.15px] flex justify-between  px-8 py-2 m-1 transition delay-150 duration-400 ease-in-out transform hover:scale-105 hover:bg-s-green hover:border-black '>Github
                        </div>
                    </a >



                </div >
            </div >
            <div className="flex justify-center ">
                {/* <Image
                    src="/test.jpg" // Replace with the actual path to your profile image
                    alt="Profile Image"
                    width={300}
                    height={300}
                    className="rounded-full"
                /> */}
                <canvas className='rounded-full' ref={canvasRef} height={500} width={500}>This</canvas>
            </div>
        </div >
    );
}

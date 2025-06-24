"use client";
import React from 'react';
import ProjectItem from './ProjectItem';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';

function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/project.json')
            .then(response => response.json())
            .then(data => {
                setProjects(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
                setLoading(false);
            });
    }, []);

    // const len = projects.length;
    // let randInd = Math.floor(Math.random() * len);
    let randInd = 0; // Keep the first project as featured
    const mainProject = projects[randInd];

    if (loading) {
        return (
            <section className="py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="animate-pulse">
                        <div className="h-8 bg-dark-700 rounded w-1/3 mb-8"></div>
                        <div className="h-64 bg-dark-700 rounded-lg"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="space-y-12">
                    {/* Section Header */}
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 animate-fade-in">
                        <div className="space-y-4">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text-primary">
                                Featured Project
                            </h2>
                            <p className="text-lg text-gray-400 max-w-2xl">
                                Here&apos;s a highlight of my latest work in computer vision and deep learning research.
                            </p>
                        </div>

                        <div>
                            <Link
                                href="/projects"
                                className="btn-secondary group inline-flex items-center"
                            >
                                View All Projects
                                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Featured Project */}
                    {mainProject && (
                        <div className="animate-slide-up">
                            <Link href={`/projects/${mainProject.id}`}>
                                <div className="group relative overflow-hidden rounded-2xl bg-dark-800/50 backdrop-blur-sm border border-dark-700 hover:border-primary-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/20">
                                    <div className="grid lg:grid-cols-2 gap-8 p-8">
                                        {/* Project Image */}
                                        <div className="relative overflow-hidden rounded-xl">
                                            <div className="aspect-video bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-xl overflow-hidden">
                                                <img
                                                    src={mainProject.img}
                                                    alt={mainProject.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>

                                        {/* Project Content */}
                                        <div className="space-y-6 flex flex-col justify-center">
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="px-3 py-1 text-xs font-medium text-primary-400 bg-primary-500/10 rounded-full border border-primary-500/20">
                                                        {mainProject.category}
                                                    </span>
                                                    <span className="text-sm text-gray-500 font-mono">
                                                        {mainProject.date}
                                                    </span>
                                                </div>

                                                <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-primary-400 transition-colors duration-300">
                                                    {mainProject.title}
                                                </h3>

                                                <p className="text-gray-400 leading-relaxed">
                                                    A cutting-edge research project exploring the latest advancements in {mainProject.category.toLowerCase()}.
                                                    This work demonstrates innovative approaches to solving complex problems in computer vision and machine learning.
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-4 pt-4">
                                                <div className="flex items-center text-primary-400 group-hover:text-primary-300 transition-colors duration-300">
                                                    <span className="text-sm font-medium">View Project</span>
                                                    <ExternalLink size={16} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                                </div>

                                                {mainProject.github && (
                                                    <a
                                                        href={mainProject.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
                                                        onClick={(e) => e.stopPropagation()}
                                                    >
                                                        <ExternalLink size={16} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )}

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 animate-slide-up">
                        <div className="card text-center">
                            <div className="text-3xl font-bold text-primary-400 mb-2">{projects.length}</div>
                            <div className="text-gray-400">Total Projects</div>
                        </div>
                        <div className="card text-center">
                            <div className="text-3xl font-bold text-primary-400 mb-2">3+</div>
                            <div className="text-gray-400">Years Research</div>
                        </div>
                        <div className="card text-center">
                            <div className="text-3xl font-bold text-primary-400 mb-2">5+</div>
                            <div className="text-gray-400">Technologies</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Projects;
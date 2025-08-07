"use client";
import Navbar from '@/components/Navbar'
import React from 'react'
import ProjectItem from '@/components/ProjectItem'
import Climax from '@/components/Climax';
import { useState, useEffect } from 'react'
import { FolderOpen, Filter } from 'lucide-react';

function Project() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const sortProjects = (projects) => {
        return projects.sort((a, b) => {
            return a.s_no - b.s_no;
        });
    }

    useEffect(() => {
        // Fetch the projects data from the JSON file
        fetch('./project.json')
            .then(response => response.json())
            .then(data => {
                setProjects(sortProjects(data));
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen">
                <Navbar />
                <main className="pt-20">
                    <section className="py-20 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-7xl mx-auto">
                            <div className="animate-pulse space-y-8">
                                <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
                                <div className="space-y-6">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
                <Climax />
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <Navbar />
            
            <main className="pt-20">
                {/* Hero Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center space-y-8">
                            <div className="space-y-4 animate-fade-in">
                                <div className="flex items-center justify-center gap-2 text-gray-700 mb-4">
                                    <FolderOpen size={24} />
                                    <span className="text-lg font-medium">Portfolio</span>
                                </div>
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900">
                                    All Projects
                                </h1>
                                <p className="text-xl text-black/80 max-w-3xl mx-auto">
                                    A collection of my research work, personal projects, and contributions to the field of computer vision and deep learning.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Projects Grid */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="space-y-16">
                            {projects.map((project, index) => (
                                <div
                                    key={project.id}
                                    className="relative animate-fade-in"
                                >
                                    <ProjectItem project={project} />
                                    {index < projects.length - 1 && (
                                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Stats Section */}
                        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-up">
                            <div className="card text-center">
                                <div className="text-3xl font-bold text-gray-900 mb-2">{projects.length}</div>
                                <div className="text-gray-600">Total Projects</div>
                            </div>
                            <div className="card text-center">
                                <div className="text-3xl font-bold text-gray-900 mb-2">3+</div>
                                <div className="text-gray-600">Years Research</div>
                            </div>
                            <div className="card text-center">
                                <div className="text-3xl font-bold text-gray-900 mb-2">5+</div>
                                <div className="text-gray-600">Technologies</div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Climax />
        </div>
    );
}
export default Project

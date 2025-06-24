import React from 'react'
import Image from 'next/image'
import { ExternalLink, Calendar, Tag } from 'lucide-react'
import Link from 'next/link'

function ProjectItem({ project }) {
    return (
        <div className="group animate-fade-in ">
            <div className="bg-dark-800/50 backdrop-blur-sm border border-dark-700 rounded-2xl overflow-hidden hover:border-primary-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-500/20">
                <div className="grid lg:grid-cols-3 gap-8 p-8">
                    {/* Project Image */}
                    <div className="lg:col-span-1">
                        <div className="relative overflow-hidden rounded-xl aspect-video">
                            <Image
                                src={project.img}
                                alt={project.title}
                                width={400}
                                height={300}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                    </div>

                    {/* Project Content */}
                    <div className="lg:col-span-2 space-y-6 flex flex-col justify-center">
                        <div className="space-y-4">
                            {/* Project Meta */}
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="flex items-center gap-2 text-primary-400">
                                    <Tag size={16} />
                                    <span className="text-sm font-medium">{project.category}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500">
                                    <Calendar size={16} />
                                    <span className="text-sm font-mono">{project.date}</span>
                                </div>
                            </div>

                            {/* Project Title */}
                            <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-primary-400 transition-colors duration-300">
                                {project.title}
                            </h3>

                            {/* Project Description */}
                            <p className="text-gray-400 leading-relaxed">
                                A comprehensive research project exploring advanced techniques in {project.category.toLowerCase()}.
                                This work showcases innovative methodologies and cutting-edge approaches to solving complex problems
                                in computer vision and machine learning domains.
                            </p>
                        </div>

                        {/* Project Actions */}
                        <div className="flex items-center gap-4 pt-4">
                            <div className="flex items-center text-primary-400 group-hover:text-primary-300 transition-colors duration-300">
                                <span className="text-sm font-medium">View Details</span>
                                <Link href={`/projects/${project.id}`}>
                                    <ExternalLink size={16} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                </Link>
                            </div>

                            {project.github && (
                                <a
                                    href={project.github}
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
        </div>
    )
}

export default ProjectItem
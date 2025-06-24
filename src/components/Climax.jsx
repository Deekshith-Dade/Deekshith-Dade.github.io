import React from 'react';
import { Github, Linkedin, Mail, Instagram, Heart } from 'lucide-react';

function Climax() {
    const socialLinks = [
        {
            icon: Linkedin,
            url: 'https://www.linkedin.com/in/deekshith-dade/',
            label: 'LinkedIn',
            color: 'hover:text-blue-400'
        },
        {
            icon: Github,
            url: 'https://github.com/deekshith-dade',
            label: 'GitHub',
            color: 'hover:text-gray-300'
        },
        {
            icon: Mail,
            url: 'mailto:deekshithreddy1300@gmail.com',
            label: 'Email',
            color: 'hover:text-red-400'
        },
        {
            icon: Instagram,
            url: 'https://www.instagram.com/momento_diei/',
            label: 'Instagram',
            color: 'hover:text-pink-400'
        },
    ];

    return (
        <footer className="bg-dark-900/50 backdrop-blur-sm border-t border-dark-700 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="space-y-8">
                    {/* Main Footer Content */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Brand Section */}
                        <div className="space-y-4 animate-fade-in">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">DD</span>
                                </div>
                                <span className="text-xl font-bold gradient-text-primary">
                                    Deekshith Dade
                                </span>
                            </div>
                            <p className="text-gray-400 leading-relaxed">
                                Computer Vision Researcher and Full-Stack Developer passionate about
                                creating innovative solutions through cutting-edge technology.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-4 animate-fade-in">
                            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="/about" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                                        About Me
                                    </a>
                                </li>
                                <li>
                                    <a href="/projects" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                                        Projects
                                    </a>
                                </li>
                                <li>
                                    <a href="/blog" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a href="/images" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                                        Photography
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-4 animate-fade-in">
                            <h3 className="text-lg font-semibold text-white">Get In Touch</h3>
                            <div className="space-y-2">
                                <p className="text-gray-400">
                                    <span className="text-primary-400">Email:</span> deekshithreddy1300@gmail.com
                                </p>
                                <p className="text-gray-400">
                                    <span className="text-primary-400">Location:</span> Salt Lake City, UT
                                </p>
                                <p className="text-gray-400">
                                    <span className="text-primary-400">Institution:</span> University of Utah
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex flex-col items-center space-y-6 pt-8 border-t border-dark-700 animate-slide-up">
                        <div className="flex items-center space-x-6">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={social.url}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-3 rounded-full bg-dark-800 border border-dark-600 text-gray-400 transition-all duration-300 ${social.color} hover:border-primary-500/50 hover:bg-primary-500/10 hover:scale-110`}
                                >
                                    <social.icon size={20} />
                                </a>
                            ))}
                        </div>

                        {/* Copyright */}
                        <div className="text-center space-y-2">
                            <p className="text-gray-500 text-sm">
                                © {new Date().getFullYear()} Deekshith Dade. All rights reserved.
                            </p>
                            <p className="text-gray-600 text-xs flex items-center justify-center gap-1">
                                Made with <Heart size={12} className="text-red-500 animate-pulse" />
                                using Next.js & Tailwind CSS
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Climax;
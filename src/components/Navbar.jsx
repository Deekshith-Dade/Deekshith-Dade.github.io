// src/app/Navbar.js
"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, Instagram } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About' },
        { href: '/projects', label: 'Projects' },
        { href: '/blog', label: 'Blog' },
        { href: '/images', label: 'Images' },
    ];

    const socialLinks = [
        { href: 'https://github.com/deekshith-dade', icon: Github, label: 'GitHub' },
        { href: 'https://www.linkedin.com/in/deekshith-dade/', icon: Linkedin, label: 'LinkedIn' },
        { href: 'mailto:deekshithreddy1300@gmail.com', icon: Mail, label: 'Email' },
        { href: 'https://www.instagram.com/momento_diei/', icon: Instagram, label: 'Instagram' },
    ];

    return (
        <nav className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
            scrolled
                ? "bg-dark-900/80 backdrop-blur-md border-b border-dark-700"
                : "bg-transparent"
        )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">DD</span>
                            </div>
                            <span className="text-xl font-bold gradient-text-primary">
                                Deekshith Dade
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item, index) => (
                            <div key={item.href}>
                                <Link
                                    href={item.href}
                                    className="text-gray-300 hover:text-white transition-colors duration-200 relative group"
                                >
                                    {item.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Social Links */}
                    <div className="hidden md:flex items-center space-x-4">
                        {socialLinks.map((social, index) => (
                            <a
                                key={social.href}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                            >
                                <social.icon size={20} />
                            </a>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-700 transition-colors duration-200"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden bg-dark-900/95 backdrop-blur-md border-t border-dark-700">
                    <div className="px-4 py-6 space-y-4">
                        {navItems.map((item, index) => (
                            <div key={item.href}>
                                <Link
                                    href={item.href}
                                    className="block text-gray-300 hover:text-white transition-colors duration-200 py-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            </div>
                        ))}

                        {/* Mobile Social Links */}
                        <div className="flex items-center space-x-4 pt-4 border-t border-dark-700">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={social.href}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-primary-400 transition-colors duration-200"
                                >
                                    <social.icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

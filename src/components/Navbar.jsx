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
                ? "bg-white/90 backdrop-blur-md border-b border-gray-200"
                : "bg-transparent"
        )}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-lg border border-gray-900 flex items-center justify-center">
                                <span className="text-gray-900 font-bold text-sm">DD</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900">
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
                                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200 relative group"
                                >
                                    {item.label}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
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
                                className="text-gray-500 hover:text-gray-900 transition-colors duration-200"
                            >
                                <social.icon size={20} />
                            </a>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                        className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200">
                    <div className="px-4 py-6 space-y-4">
                        {navItems.map((item, index) => (
                            <div key={item.href}>
                                <Link
                                    href={item.href}
                                    className="block text-gray-700 hover:text-gray-900 transition-colors duration-200 py-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            </div>
                        ))}

                        {/* Mobile Social Links */}
                        <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={social.href}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-500 hover:text-gray-900 transition-colors duration-200"
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

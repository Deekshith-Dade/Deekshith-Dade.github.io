// src/app/Navbar.js
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="pt-8">
            <div className="flex justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:justify-between">


                <div className="flex text-sm font-bold text-gray-400 sm:text-xl">
                    Deekshith Dade
                </div>

                <div className="hidden md:flex space-x-4 ml-10">
                    <Link className="text-gray-500 hover:text-gray-800" href="/">
                        Home
                    </Link>
                    <Link className="text-gray-500 hover:text-gray-800" href="/about">
                        About
                    </Link>
                    <Link className="text-gray-500 hover:text-gray-800" href="/projects">
                        Projects
                    </Link>
                    <Link className="text-gray-500 hover:text-gray-800" href="/contact">
                        Contact
                    </Link>
                </div>

            </div>
        </nav>
    );
}

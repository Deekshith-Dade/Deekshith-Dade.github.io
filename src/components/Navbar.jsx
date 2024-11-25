// src/app/Navbar.js
import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="mt-8 px-12 md:px-24">
            <div className="flex-row md:flex justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:justify-between">


                <div className="flex text-sm bg-white px-1 py-2 font-bold text-black md:text-xl">
                    <Link className='mx-auto' href="/">
                        DEEKSHITH DADE
                    </Link>
                </div>

                <div className="flex justify-between space-x-4 md:ml-10 mt-4 md:mt-0 ">
                    <Link className="text-gray-500 hover:text-gray-800" href="/">
                        Home
                    </Link>
                    <Link className="text-gray-500 hover:text-gray-800" href="/about">
                        About
                    </Link>
                    <Link className="text-gray-500 hover:text-gray-800" href="/projects">
                        Projects
                    </Link>
                    <Link className="text-gray-500 hover:text-gray-800" href="/images">
                        Images
                    </Link>
                </div>

            </div>
        </nav>
    );
}

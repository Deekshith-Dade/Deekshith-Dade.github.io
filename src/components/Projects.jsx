"use client";
import React from 'react'
import ProjectItem from './ProjectItem'
import { useState, useEffect } from 'react'
import Link from 'next/link';

function Projects() {

    const [projects, setProjects] = useState([]);


    useEffect(() => {
        // Fetch the projects data from the JSON file
        fetch('/project.json')
            .then(response => response.json())
            .then(data => setProjects(data))
            .catch(error => console.error('Error fetching projects:', error));


    }, []);
    const mainProject = projects[0];

    return (
        <>
            <div className='flex flex-col justify-center md:flex-row md:justify-between'>
                <h1 className='font-bold text-4xl mx-auto mb-4 md:my-auto md:mx-0'>Current Project</h1>
                <Link href="/projects" className="my-auto flex justify-center">
                    <div className='border-[0.15px] px-8 py-2 transition delay-150 duration-400 ease-in-out transform hover:scale-105 hover:bg-s-green hover:border-black '>See all
                    </div>
                </Link >
            </div>

            {mainProject && (<Link href={`/projects/${mainProject.id}`}> <ProjectItem project={mainProject} /> </Link>)}

        </>
    )
}

export default Projects
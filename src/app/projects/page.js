"use client";
import Navbar from '@/components/Navbar'
import React from 'react'
import ProjectItem from '@/components/ProjectItem'
import Climax from '@/components/Climax';
import { useState, useEffect } from 'react'
import Link from 'next/link';

function Project() {
    const [projects, setProjects] = useState([]);

    const sortProjects = (projects) => {
        return projects.sort((a, b) => {
            return a.s_no - b.s_no;
        });
    }

    useEffect(() => {
        // Fetch the projects data from the JSON file
        fetch('./project.json')
            .then(response => response.json())
            .then(data => setProjects(sortProjects(data)))
            .catch(error => console.error('Error fetching projects:', error));
    }, []);

  return (
    <div>
        <Navbar />
        <div className='font-bold px-12 md:px-32 my-16'>
            <h1 className='text-4xl my-8'>All Projects</h1>

            {projects.map((project, index) => (
                <div key={project.id}>
                    <Link  href={`/projects/${project.id}`}> <ProjectItem project={project} /> </Link>
                    <hr className='border-red-800 my-8 font-bold' />
                </div>
            ))}
        </div>
        <Climax />
    </div>
  )
}

export default Project
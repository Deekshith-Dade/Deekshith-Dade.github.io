"use client";
import Navbar from '@/components/Navbar'
import React, {useEffect, useState} from 'react'

function Page() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch the projects data from the JSON file
    fetch('/project.json')
        .then(response => response.json())
        .then(data => setProjects(data))
        .catch(error => console.error('Error fetching projects:', error));


}, []);

  const project = projects.find(project => project.id === 'dolor-tes');

  return (
    <div>
        <Navbar />
        {project && 
        <div className='px-8 md:px-32 my-16 sm:px-12'>
        <h1 className='font-bold text-5xl sm:text-6xl'>{project.title}</h1>
        <h2 className='font-bold my-6 text-3xl  sm:text-4xl sm:my-8'>Section 1</h2>
        <h3 className='my-6 text-lg sm:my-8 italic'>Sub-Section</h3>
        <p className=''>The development of medical applications of machine learning has required manual annotation of data, often by medical experts.
Yet, the availability of large-scale unannotated data provides opportunities for the development of better machine-learning
models. In this Review, we highlight self-supervised methods and models for use in medicine and healthcare, and discuss the
advantages and limitations of their application to tasks involving electronic health records and datasets of medical images, bio-
electrical signals, and sequences and structures of genes and proteins. We also discuss promising applications of self-supervised
learning for the development of models leveraging multimodal datasets, and the challenges in collecting unbiased data for their
training. Self-supervised learning may accelerate the development of medical artificial intelligence.</p>
        </div>}
    </div>
  )
}

export default Page
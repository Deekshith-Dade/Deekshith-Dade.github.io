"use client";
import Navbar from '@/components/Navbar'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

function Page() {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        // Fetch the projects data from the JSON file
        fetch('/project.json')
            .then(response => response.json())
            .then(data => setProjects(data))
            .catch(error => console.error('Error fetching projects:', error));


    }, []);

    const project = projects.find(project => project.id === 'ecg-contrastive');

    return (
        <div>
            <Navbar />
            {project &&
                <div className='px-8 md:px-16 xl:px-96  my-16'>
                    <h1 className='font-bold text-5xl sm:text-6xl'>{project.title}</h1>
                    <a className='text-red-500' href={project.github}>Github</a>
                    <h2 className='font-bold my-6 text-3xl  sm:text-4xl sm:my-8'>Introduction</h2>
                    {/* <h3 className='my-6 text-lg sm:my-8 italic'>Sub-Section</h3> */}
                    <p className=''>Building on previous work on contrastive learning and augmentations, I started looking at literature to understand how the best contrastive learning methods were being built, specially for ECG Representation learning. </p>
                    <p>
                        The best methods were a combination of:
                        <ol className='ml-4 list-decimal list-inside'>
                            <li>Patient Contrastive Learning</li>
                            <li>Contrastive Learning of Cardiac Signals Across Space, Time and Patients</li>
                            <li>Augmentation in Vectorcardiograph space</li>
                        </ol>
                    </p>

                    <h2 className='font-bold my-6 text-3xl  sm:text-4xl sm:my-8'>Methods</h2>
                    <h3 className='my-6 text-lg sm:my-8 italic'>1. Patient Contrastive Learning</h3>
                    <p>There is no augmentations present in this setup. The contrastive objective here is the ECGs from the same patient across time are considered positive and ECGs from other patients are considered negative. This objective helps the model learn representations that resolve patients identity over time. </p>

                    <h3 className='my-6 text-lg sm:my-8 italic'>2. Contrastive Learning of cardiac signals across Space, Time and Patients </h3>
                    <p> Since each lead is a projection of the same electrical activity of the heart onto different places, they can be thought of augmentations of each other, and among the leads, each segment can be thought of augmentation of the other. These two augmentations can be thought of as spatial and temporal augmentation, hence positive examples for the contrastive learning setup </p>



                    <div className='flex-row'>
                        <Image
                            src="/proj-images/ecg-contrastive/clocs1.png"
                            alt="Leads"
                            width={1000}
                            height={300}
                            className="my-5 mx-auto"
                        />

                        <Image
                            src="/proj-images/ecg-contrastive/clocs2.png"
                            alt="Leads"
                            width={1000}
                            height={300}
                            className="my-5 mx-auto"
                        />

                        <h3 className='my-6 text-lg sm:my-8 italic'>3. Augmentation in VCG Space</h3>
                        <p>Can possibly simulate a slight change in placement of leads maybe or patient moving during ECG measurement(Rotation) or Differences in patients chest sizes compared to a big vs thin patient (scaling especially)
                        </p>
                        <div className='flex-row'>
                            <Image
                                src="/proj-images/ecg-contrastive/3kg_arch.png"
                                alt="Leads"
                                width={1000}
                                height={300}
                                className="my-5 mx-auto"
                            />

                            <Image
                                src="/proj-images/ecg-contrastive/vcg_aug.png"
                                alt="Leads"
                                width={1000}
                                height={300}
                                className="my-5 mx-auto"
                            />

                            <Image
                                src="/proj-images/ecg-contrastive/vcged_ecg.png"
                                alt="Leads"
                                width={1000}
                                height={300}
                                className="my-5 mx-auto"
                            />
                        </div>
                    </div>

                    <h2 className='font-bold my-6 text-3xl  sm:text-4xl sm:my-8'>References</h2>
                    <ol className='ml-4 list-decimal list-inside'>
                        <li>Self-supervised representation learning from 12-lead ECG data <a className='text-red-500' href='https://arxiv.org/pdf/2103.12676'>[https://arxiv.org/pdf/2103.12676]</a></li>
                        <li>Patient Contrastive Learning: a Performant, Expressive, and Practical Approach to ECG Modeling <a className='text-red-500' href='https://arxiv.org/abs/2104.04569'>[https://arxiv.org/abs/2104.04569]</a></li>
                        <li>CLOCS: Contrastive Learning of Cardiac Signals Across Space, Time, and Patients <a className='text-red-500' href="https://arxiv.org/abs/2005.13249">[https://arxiv.org/abs/2005.13249]</a></li>
                        <li>3KG: Contrastive Learning of 12-Lead Electrocardiograms using Physiologically-Inspired Augmentations
                            <a className='text-red-500' href="https://arxiv.org/abs/2106.04452">[https://arxiv.org/abs/2106.04452]</a>
                        </li>
                    </ol>


                </div>}
        </div>
    )
}

export default Page
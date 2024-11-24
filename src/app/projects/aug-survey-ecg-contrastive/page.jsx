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

    const project = projects.find(project => project.id === 'aug-survey-ecg-contrastive');

    return (
        <div>
            <Navbar />
            {project &&
                <div className='px-8 md:px-16 lg:px-64 xl:px-[48rem]  my-16'>
                    <h1 className='font-bold text-4xl sm:text-6xl'>{project.title}</h1>
                    <a className='text-red-500' href={project.github}>Github</a>
                    <h2 className='font-bold my-6 text-3xl  sm:text-4xl sm:my-8'>Introduction</h2>
                    {/* <h3 className='my-6 text-lg sm:my-8 italic'>Sub-Section</h3> */}
                    <p className=''>The electrocardiogram (ECG) is the most common noninvasive tool to measure the electrical activity of the heart and assess cardiac health. Despite their ubiquity and utility, traditional ECG analysis methods are limited in many impactful diseases. Machine learning tools can be employed to automate task-specific detection of diseases, and to detect patterns that are ignored by traditional ECG analysis. Contemporary machine learning tools are limited by requirements for large labeled datasets, which can be scarce for rare diseases. Self-supervised learning (SSL) can address this data scarcity. We implemented the momentum contrast(MoCo) framework, a form of SSL, using a large clinical ECG dataset. We then assessed the learning using Low Left Ventricular Ejection Fraction (LVEF) Detection as the downstream task. We compared the SSL improvement of LVEF classification across different input augmentations. We observed that optimal augmentation hyperparameters varied substantially based on the training dataset size, indicating that augmentation strategies may need to be tuned based on problem and dataset size.</p>

                    <h2 className='font-bold my-6 text-3xl  sm:text-4xl sm:my-8'>ECGs</h2>
                    <p className=''>The electrocardiogram (ECG) is a foundational tool in diagnosing cardiovascular conditions. With the growth in the volume of ECG data, machine learning techniques present a promising way to boost ECG diagnostic accuracy in various diseases. Innovative applications of machine learning to ECG analysis could extend the utility of ECG beyond its conventional  scope, uncovering cardiac irregularities and conditions previously unavailable to traditional analysis.
                    </p>

                    <h2 className='font-bold my-6 text-3xl  sm:text-4xl sm:my-8'>Self Supervised Learning</h2>
                    <div >

                        <p className='my-3'>
                            Achieving a good model that can be utilized in clinical settings require a huge amount of labelled data to train the model in a supervised way. However, finding labelled ECG data specially for rare diseases is a challenging task. Self-supervised learning (SSL) is a promising approach to address this data scarcity. SSL is a type of unsupervised learning that learns representations without any labels. We use contrastive learning, a form of SSL to learn ECG representations. Contrastive learning uses a pretext task of bringing the representations of similar instances together and pushing the representations of dissimlar instances apart. We can test the model trained this way by using it on a downstream task on labelled data, which shows the models ability to learn ECG representations.
                        </p>
                        <Image
                            src={'/proj-images/aug-survey-ecg-contrastive/simclr.png'}
                            alt="SimCLR"
                            width={300}
                            height={300}
                            className="my-5 mx-auto"
                        />
                    </div>

                    <div>
                        <h2 className='font-bold my-6 text-3xl  sm:text-4xl sm:my-8'>Augmentations</h2>
                        <p className='my-3'>
                            Augmentations play a crucial role in many SSL techniques. The goal of these augmentations is to alter the data in a way that enhances the models ability to recognize and distinguish subtle nuances within signals. We explore various augmentations with a wide range of hyperparameters that the model might encounter in real-world scenarios and measure the performance to learn the scope of these augmentations in ECG representation learning.
                        </p>
                        <h2 className='font-bold my-6 text-3xl  sm:text-4xl sm:my-8'>Momentum Contrast</h2>
                        <p className='my-3'>
                            Momentum contrast (MoCo) is the contrastive learning framework used for learning ECG representations. MoCo has shown promising results in learning image representations, which has performed well on downstream tasks such as classification, segmentation, and detection. The contrastive learning in MoCo is framed as a dictionary-lookup task. The dictionary is a dynamic queue of fixed size, and a moving-averaged encoder is used to update the dictionary. The moving-average encoder is updated based on the momentum of the main encoder, which is updated by the backpropagation of gradients. The encoder and the momentum encoder are then challenged to produce representations with low contrastive loss for positive keys and high contrastive loss for all the negative keys in the dictionary. A query and the key are considered positive if they are augmentations of the same image and negative if not.
                        </p>

                        <Image
                            src={'/proj-images/aug-survey-ecg-contrastive/mocov3.png'}
                            alt="Moco"
                            width={600}
                            height={600}
                            className="my-5 mx-auto bg-white p-2"
                        />

                        <h2 className='font-bold my-6 text-3xl  sm:text-4xl sm:my-8'>Encoder</h2>
                        <Image
                            src={'/proj-images/aug-survey-ecg-contrastive/encoder.png'}
                            alt="Residual Spatio Temporal Encoder"
                            width={600}
                            height={600}
                            className="my-5 mx-auto bg-white p-2"
                        />
                    </div>

                    <h2 className='font-bold my-6 text-3xl  sm:text-4xl sm:my-8'>Augmentaions for ECGs</h2>
                    <h3 className='my-6 text-lg sm:my-8 italic'>Gaussian Noise</h3>

                    <Image
                        src='/proj-images/aug-survey-ecg-contrastive/gaussian_noise.png'
                        alt="Gaussian Noise"
                        width={1400}
                        height={200}
                        className=""
                    />

                    <h3 className='my-6 text-lg sm:my-8 italic'>Gaussian Blur</h3>
                    <Image
                        src='/proj-images/aug-survey-ecg-contrastive/gaussian_blur.png'
                        alt="Gaussian Blur"
                        width={1400}
                        height={200}
                        className=""
                    />

                    <h3 className='my-6 text-lg sm:my-8 italic'>Scaling</h3>

                    <Image
                        src='/proj-images/aug-survey-ecg-contrastive/scaling.png'
                        alt="Scaling"
                        width={1400}
                        height={200}
                        className=""
                    />

                    <h3 className='my-6 text-lg sm:my-8 italic'>Magnitude Warping</h3>
                    <Image
                        src='/proj-images/aug-survey-ecg-contrastive/magnitude_warping.png'
                        alt="Magnitude Warping"
                        width={1400}
                        height={200}
                        className=""
                    />

                    <h3 className='my-6 text-lg sm:my-8 italic'>Baseline Warping</h3>
                    <Image
                        src='/proj-images/aug-survey-ecg-contrastive/baseline_warping.png'
                        alt="Baseline Warping"
                        width={1400}
                        height={200}
                        className=""
                    />

                    <h3 className='my-6 text-lg sm:my-8 italic'>Window Warping</h3>
                    <Image
                        src='/proj-images/aug-survey-ecg-contrastive/window_warping.png'
                        alt="Window Warping"
                        width={1400}
                        height={200}
                        className=""
                    />

                    <h3 className='my-6 text-lg sm:my-8 italic'>Time Warping</h3>
                    <Image
                        src='/proj-images/aug-survey-ecg-contrastive/time_warping.png'
                        alt="Time Warping"
                        width={1400}
                        height={200}
                        className=""
                    />


                    <p className='my-5'>Look for more @ <a className='text-blue' href='https://cinc.org/2024/Program/accepted/223_Preprint.pdf'>A Survey of Augmentation Techniques for Enhancing ECG Representation Through Self-Supervised Contrastive Learning</a> </p>

                    <h2 className='font-bold my-6 text-3xl  sm:text-4xl sm:my-8'>References</h2>


                </div>}
        </div>
    )
}

export default Page
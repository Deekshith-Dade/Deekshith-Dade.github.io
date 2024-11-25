"use client";
import Navbar from '@/components/Navbar'
import Experience from '@/components/Experience';
import SmallExperience from '@/components/SmallExperience';
import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'


function Page() {


  const [experience, setExperience] = useState([]);

  useEffect(() => {
    // Fetch the projects data from the JSON file
    fetch('./experience.json')
      .then(response => response.json())
      .then(data => setExperience(data))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  return (
    <>
      <Navbar />
      <div className='flex-row lg:flex mx-10 my-20 xl:px-20'>
        <div className='basis-1/2 m-10'>
          <Image
            src={'/next.svg'}
            alt='Profile'
            width={200}
            height={200}
          />
          <h1 className='font-bold text-4xl sm:text-6xl'>Deekshith Dade</h1>
          <p className='my-2 text-xl font-thin'>Over 3 years of experience in software development and research with proficiency in Deep Learning and Web Dev. Ability to
            collaborate with talented teams and contribute to cutting-edge projects, leveraging technical expertise and research acumen
            to deliver impactful solutions with the ability to master new technologies and adapt to evolving tech stacks quickly.</p>
        </div>

        <div className='m-10'>
          <div className='p-8  bg-red-500 rounded-2xl'>
            <h1>Skills</h1>
            <ol className="list-disc ml-3">
              <li>Programming Languages: Python, C++, Java, JavaScript, TypeScript, Go, Node.js</li>
              <li>Data Science and Machine Learning: Statistics, Probability, Scikit-Learn, Pandas, Numpy, Matplotlib, Pyspark, OpenCV</li>
              <li>Frameworks: Pytorch, Tensorflow, ReactJS, Flask, Django, Spring, Spring Boot</li>
              <li>Cloud Technologies: Amazon Web Services(AWS), Microsoft Azure, Google Cloud Platform(GCP)</li>
            </ol>
          </div>


          <div className='my-32'>
            <h1 className='font-bold text-2xl sm:text-4xl'>Experience</h1>
            {experience.map((exp, index) => {
              return (
                <Experience
                  key={index}
                  open={false}
                  title={exp.title}
                  company={exp.company}
                  duration={exp.duration}
                  icon={exp.icon}
                >
                  <ul>
                    {exp.description.map((desc, idx) => {
                      return (
                        <li className='ml-4 list-disc' key={idx}>{desc}</li>
                      )
                    })}
                  </ul>
                </Experience>
              )
            })}

          </div>

          <hr className="border-t-[2px] border-r-green p-4"></hr>
          <div>
            <h1>Education</h1>
          </div>

          <hr className="border-t-[2px] border-r-green p-4"></hr>
          <div>
            <h1>Projects</h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
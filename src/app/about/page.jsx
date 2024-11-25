"use client";
import Navbar from '@/components/Navbar'
import Experience from '@/components/Experience';
import Climax from "@/components/Climax";
import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'


function Page() {


  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);

  useEffect(() => {
    // Fetch the projects data from the JSON file
    fetch('./experience.json')
      .then(response => response.json())
      .then(data => setExperience(data))
      .catch(error => console.error('Error fetching projects:', error));

    fetch('./education.json')
      .then(response => response.json())
      .then(data => setEducation(data))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  return (
    <>
      <div className=''>
        <Navbar />
        <div className='flex-row lg:flex my-20 px-0 lg:px-16 xl:px-32'>
          <div className='basis-1/2 m-10'>
            <Image
              src={'/next.svg'}
              alt='Profile'
              width={200}
              height={200}
              className=''
            />
            <h1 className='font-bold text-4xl sm:text-6xl'>Deekshith Dade</h1>
            <p className='my-2 text-xl font-thin'>Over 3 years of experience in software development and research with proficiency in Deep Learning and Web Dev. Ability to
              collaborate with talented teams and contribute to cutting-edge projects, leveraging technical expertise and research acumen
              to deliver impactful solutions with the ability to master new technologies and adapt to evolving tech stacks quickly.</p>
          </div>

          <div className='m-10'>
            <div className='p-8  bg-red-500 rounded-2xl'>
              <h1 className='font-bold text-2xl sm:text-4xl mb-8'>Skills</h1>
              <ol className="list-disc ml-3">
                <li>Programming Languages: Python, C++, Java, JavaScript, TypeScript, Go, Node.js</li>
                <li>Data Science and Machine Learning: Statistics, Probability, Scikit-Learn, Pandas, Numpy, Matplotlib, Pyspark, OpenCV</li>
                <li>Frameworks: Pytorch, Tensorflow, ReactJS, Flask, Django, Spring, Spring Boot</li>
                <li>Cloud Technologies: Amazon Web Services(AWS), Microsoft Azure, Google Cloud Platform(GCP)</li>
              </ol>
            </div>


            <div className='my-16'>
              <h1 className='font-bold text-2xl sm:text-4xl my-8'>Experience</h1>
              {experience && experience.map((exp, index) => {
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


            <div>
              <h1 className='font-bold text-2xl sm:text-4xl my-8'>Education</h1>
              {education && education.map((edu, index) => {
                return (
                  <Experience
                    key={index}
                    open={false}
                    title={edu.title}
                    company={edu.company}
                    duration={edu.duration}
                    icon={edu.icon}
                  >
                    <ul>
                      {edu.description.map((desc, idx) => {
                        return (
                          <li className='ml-4 list-disc' key={idx}>{desc}</li>
                        )
                      })}
                    </ul>
                  </Experience>



                )
              })}
            </div>


            <div>
              <h1 className='font-bold text-2xl sm:text-4xl mt-8 mb-2'>Projects</h1>
              <a className='text-red-500' href="/projects">Look here!</a>
            </div>
          </div>
        </div >
        <Climax />
      </div>
    </>
  )
}

export default Page
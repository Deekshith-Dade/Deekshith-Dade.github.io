import React from 'react'
import Image from 'next/image'

function ProjectItem({ project }) {
    return (
        <div className='my-8'>
            <div className='flex flex-col md:flex-row justify-end'>
                <div className='md:basis-5/6'>
                    <p className='text-4xl text-white py-1'>
                        {project.title}
                    </p>
                </div>
                <div className='ml-8 md:basis-1/6'>
                    <p className='text-xl text-gray-500 py-1'>{project.category}</p>
                    <p className='text-xs text-gray-500 py-1'>{project.date.toUpperCase()}</p>
                </div>

            </div>
            <div className='mx-auto my-5'>
                <Image
                    src={project.img} // Replace with the actual path to your profile image
                    alt="Profile Image"
                    width={1400}
                    height={200}
                    className=""
                />
            </div>

        </div>
    )
}

export default ProjectItem
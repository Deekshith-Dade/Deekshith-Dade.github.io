import React from 'react'
import Image from 'next/image'

function SmallExperience({ title, company, duration, icon, onClick }) {
    return (
        <>
            <div className='flex justify-between p-4 px-4 hover:cursor-pointer' onClick={onClick}>
                <div className='my-auto basis-1/12'>
                    <Image
                        src={icon}
                        alt="icon"
                        width={50}
                        height={50}
                        className=""
                    />
                </div>
                <div className='basis-8/12'>
                    <h1 className='font-light text-left my-auto ml-4 mr-2'>{title}</h1>
                    <p className='font-bold text-left my-auto ml-4 mr-2'>{company}</p>
                </div>
                <div className='my-auto basis-3/12'>
                    <p className='text-gray-400'>{duration}</p>
                </div>
            </div>
        </>
    )
}

export default SmallExperience
import React from 'react'
import Image from 'next/image'

function Climax() {

    const icons = [


        {
            icon: '/assets/icons/linkedin.png',
            url: 'https://www.linkedin.com/in/deekshith-dade/',
        },

        {
            icon: '/assets/icons/github.svg',
            url: 'https://github.com/deekshith-dade',
        },
        {
            icon: '/assets/icons/gmail.png',
            url: 'mailto:deekshithreddy1300@gmail.com',
        },
        {
            icon: '/assets/icons/insta.png',
            url: 'https://www.instagram.com/momento_diei/?locale=en-GB',
        },

    ]

    return (
        <footer className='flex justify-center'>
            {icons && icons.map((inst, index) => {
                return (
                    <div className='px-4 mb-8 md:px-16 md:py-8' key={index}>
                        <a href={inst.url} target="_blank" rel="noreferrer">
                            <Image
                                src={inst.icon}
                                alt="icon"
                                width={20}
                                height={20}
                                className=""
                            />
                        </a>
                    </div>
                )
            })}
        </footer>
    )
}

export default Climax
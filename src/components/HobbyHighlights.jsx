"use client";
import React, { useEffect } from 'react'
import Image from 'next/image';
import { annotate, annotationGroup } from 'rough-notation'

function HobbyHighlights() {

    const bookDetails = {
        "src": "https://m.media-amazon.com/images/I/61OhrED6UwL.jpg"
        // "src": "https://covers.openlibrary.org/b/isbn/9781534431010-L.jpg"
    }

    const movieDetails = {
        "title": "Alien Romulus",
        "src": "https://i.redd.it/cd92l4whqd4d1.jpeg"
    }

    useEffect(() => {

    }, [])

    return (
        <div className=''>
            <h1 className='text-4xl font-bold mx-auto mb-4 md:my-auto md:mx-0'>Hobby Highlights</h1>
            <div className='flex flex-col lg:flex-row lg:justify-around'>
                <div className='m-2'>
                    <h2 className='my-8 text-2xl mx-auto'>I am Currently Reading </h2>
                    <Image
                        className="m-auto"
                        src={bookDetails.src}
                        alt={bookDetails.title}
                        width={230}
                        height={300}
                    />
                </div>
                <div className='m-2'>
                    <h2 className='my-8 text-2xl'>I am listening to </h2>
                    <iframe style={{ borderRadius: "12px" }} src="https://open.spotify.com/embed/track/4qobOJfBSSVkUGM2pAJBiX?utm_source=generator" width="100%" height="352" frameBorder="0" allowFullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                </div>
                <div className='m-2'>
                    <h2 className='my-8 text-2xl'>I recently loved Watching </h2>
                    <Image
                        className="m-auto"
                        src={movieDetails.src}
                        alt={movieDetails.title}
                        width={280}
                        height={300}
                    />
                </div>
            </div>
        </div>
    )
}

export default HobbyHighlights
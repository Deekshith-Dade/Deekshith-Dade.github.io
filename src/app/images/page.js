import React from 'react'

import Masonry from 'react-masonry-css';
import Image from 'next/image';
// Import lightgallery with a couple nice-to-have plugins
import LightGalleryComponent from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';

import lgThumbnail from 'lightgallery/plugins/thumbnail';
import 'lightgallery/css/lg-thumbnail.css';

import lgZoom from 'lightgallery/plugins/zoom';
import 'lightgallery/css/lg-zoom.css';

import { useRef } from 'react';
import Navbar from '@/components/Navbar';

function page() {

    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
      };

    const images = [
        {src: "/images/12.jpg", width: 800, height: 500, alt: "A cat"},
        {src: "/images/13.jpg", width: 800, height: 500, alt: "A cat"},
        {src: "/images/14.jpg", width: 800, height: 500, alt: "A cat"},
        {src: "/images/15.jpg", width: 800, height: 500, alt: "A cat"},
        {src: "/images/16.jpg", width: 800, height: 500, alt: "A cat"},
        {src: "/images/17.jpg", width: 800, height: 500, alt: "A cat"},
        {src: "/images/18.jpg", width: 800, height: 500, alt: "A cat"},
        {src: "/images/19.jpg", width: 800, height: 500, alt: "A cat"},
        {src: "/images/20.jpg", width: 800, height: 500, alt: "A cat"},
        {src: "/images/21.jpg", width: 800, height: 500, alt: "A cat"},
        {src: "/images/22.jpg", width: 800, height: 500, alt: "A cat"},
        {src: "/images/23.jpg", width: 800, height: 500, alt: "A cat"},

        {src: "/images/1.jpg", width: 800, height: 500, alt: "A cat"},
        {src: "/images/2.jpg", width: 800, height: 500, alt: "A cat"},
        {src: "/images/3.jpg", width: 800, height: 500, alt: "A cat"},
        {src: "/images/4.jpg", width: 800, height: 500, alt: "A cat"},
        {src: "/images/5.jpg", width: 800, height: 500, alt: "A cat"},
        {src: "/images/7.jpg", width: 800, height: 500, alt: "A cat"},
        {src: "/images/8.jpg", width: 800, height: 500, alt: "A cat"},
        {src: "/images/9.jpg", width: 800, height: 500, alt: "A cat"},
        {src: "/images/10.jpg", width: 800, height: 500, alt: "A cat"},
        {src: "/images/11.jpg", width: 800, height: 500, alt: "A cat"},
        
    ]

  return (
    <>
    <Navbar />
    <Masonry
    breakpointCols={breakpointColumnsObj}
    className="my-masonry-grid mt-10"
    columnClassName="my-masonry-grid_column">
      {images.map((image) => (
        <Image
          key={image.src}
          className="opacity-50 hover:opacity-100 cursor-pointer m-2"
          src={image.src}
          alt={image.alt}
          width={800}
          height={image.height}
        />
      ))}
    </Masonry>
  </>
  )
}

export default page
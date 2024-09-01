"use client";
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

function page() {

    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
      };

    const images = [
        {"src": "/images/1_long.jpeg", "width": 300, "height": 400, "alt": "A cat"},

        {"src": "/images/2_long.jpeg", "width": 300, "height": 300, "alt": "A cat"},
        {"src": "/images/9_wide.jpg", "width": 800, "height": 500, "alt": "A cat"},
        {"src": "/images/8_wide.jpg", "width": 800, "height": 500, "alt": "A cat"},
        {"src": "/images/4_wide.jpg", "width": 800, "height": 500, "alt": "A cat"},
        {"src": "/images/7_wide.jpg", "width": 800, "height": 500, "alt": "A cat"},

        {"src": "/images/3_long.jpeg", "width": 300, "height": 400, "alt": "A cat"},

        {"src": "/images/5_long.jpg", "width": 300, "height": 200, "alt": "A cat"},

        {"src": "/images/6_long.jpg", "width": 300, "height": 300, "alt": "A cat"},
        
    ]

  return (
    <>
    {/* Lightbox that opens on image clicks */}
    <Masonry
    breakpointCols={breakpointColumnsObj}
    className="my-masonry-grid"
    columnClassName="my-masonry-grid_column">
      {images.map((image) => (
        <Image
          key={image.src}
          className="opacity-50 hover:opacity-100 cursor-pointer m-2"
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
        />
      ))}
    </Masonry>
  </>
  )
}

export default page
"use client";
import React from 'react'
import { useState, useRef, useEffect } from 'react'
import SmallExperience from '@/components/SmallExperience';


function Experience({ open, children, title, company, duration, icon }) {

    const [isOpen, setIsOpen] = useState(open);
    const ref = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (isOpen) setHeight(ref.current?.getBoundingClientRect().height);
        else setHeight(0);
    }, [isOpen, ref]);

    const handleFilterOpening = () => {
        setIsOpen((prev) => !prev);
    };


    return (
        <>
            <div className='card border rounded-2xl my-4'>
                {/* <button type="button" className="btn" onClick={handleFilterOpening}> */}
                <SmallExperience title={title} onClick={handleFilterOpening} company={company} duration={duration} icon={icon} />
                {/* </button> */}

                <div className="">
                    <div className=' my-collapse' style={{ height }}>
                        <div className="p-4">{children}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Experience
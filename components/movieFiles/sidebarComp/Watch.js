'use client'
import React, { useState } from 'react'
import { FaAngleRight } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";

const Watch = () => {
    const [showDetails, setShowDetails] = useState(false);
    
    function handleShowDetails() {
        setShowDetails((prev) => !prev);
    }

  return (
    <div className='flex flex-col gap-3 py-3 border border-slate-300 shadow-lg rounded-xl'>

        <div className='flex items-center justify-between px-3'>
            <p className='font-semibold text-lg text-gray-900'>Where To Watch</p>
            
            <div onClick={() => handleShowDetails()} className='cursor-pointer'>
                {showDetails ?  <FaAngleDown /> : <FaAngleRight />}
            </div>
        </div>

        <div className={showDetails ? 'border border-slate-200' : 'hidden'}></div>

        <div className={showDetails ? '' : 'hidden'}>

        </div>

    </div>
  )
}

export default Watch
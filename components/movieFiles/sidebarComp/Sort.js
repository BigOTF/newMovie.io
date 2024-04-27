'use client'
import React, { useState } from 'react'
import { FaAngleRight } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";

const Sort = () => {
    
    const [selectOpt, setSelectOpt] = useState('Popularity Descending');
    const [showDetails, setShowDetails] = useState(false);

    function handleShowDetails() {
        setShowDetails((prev) => !prev);
    }

  return (
    <div className='flex flex-col gap-3 py-3 border border-slate-300 shadow-lg rounded-xl'>

        <div className='flex items-center justify-between px-3'>
            <p className='font-semibold text-lg text-gray-900'>Sort</p>
            
            <div onClick={() => handleShowDetails()} className='cursor-pointer'>
                {showDetails ?  <FaAngleDown /> : <FaAngleRight />}
            </div>
        </div>

        <div className={showDetails ? 'border border-slate-200' : 'hidden'}></div>

        <div className={showDetails ? 'flex flex-col px-3 gap-3 ' : 'hidden'}>
            
            <p>Sort Results By</p>

            <select className={'w-full cursor-pointer bg-slate-300 text-sm border border-gray-300 hover:border-gray-400 px-3 py-2 rounded-lg shadow leading-tight focus:outline-none focus:shadow-outline'} value={selectOpt} onChange={(e) => setSelectOpt(e.target.value)}>
                <option className='bg-white'>Popularity Descending</option>
                <option className='bg-white'>Popularity Ascending</option>
                <option className='bg-white'>Rating Descending</option>
                <option className='bg-white'>Rating Ascending</option>
                <option className='bg-white'>Release Date Descending</option>
                <option className='bg-white'>Release Date Ascending</option>
                <option className='bg-white'>Title(A-Z)</option>
                <option className='bg-white'>Title(Z-A)</option>
            </select>

        </div>

    </div>
  )
}

export default Sort
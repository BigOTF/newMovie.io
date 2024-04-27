import React from 'react'
import Series from '@/components/seriesFile/Series';

const page = () => {
   
  return (
    <main className='md:px-12 py-4 px-5 flex flex-col gap-5'>

      <h2 className='text-black font-semibold text-2xl'>Popular Series</h2>

      <div className='sm:flex gap-12'>
        <Series />
      </div>
        
    </main>
  )
}

export default page
import React from 'react'
import Sidebar from '@/components/movieFiles/Sidebar';
import Movie from '@/components/movieFiles/Movie';

const page = () => {
   
  return (
    <main className='md:px-12 py-4 px-5 flex flex-col gap-5'>

      <h2 className='text-black font-semibold text-2xl'>Popular Movies</h2>

      <div className='sm:flex gap-12'>
       {/*    <Sidebar /> */}
        <Movie />
      </div>
        
    </main>
  )
}

export default page
import React from "react";
import Movie from "@/components/movieFiles/Movie";

export default function Home() {

  return ( 
    <div className='md:px-12 py-4 px-5 flex flex-col gap-5'>

      <h2 className='text-black font-semibold text-2xl'>Movies</h2>

      <div className='sm:flex gap-12'>
       {/*    <Sidebar /> */}
        <Movie />
      </div>
      
    </div>
  );
}

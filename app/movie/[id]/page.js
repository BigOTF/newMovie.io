'use client'
import React, { useEffect, useState } from 'react'
import { FaListUl } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { CiLocationArrow1 } from "react-icons/ci";
import Image from 'next/image';

import Cast from '@/components/Cast/Cast';


const page = ({params}) => {

   const [movieProfile, setMovieProfile] = useState();
   const [backdropImage, setBackDropImage] = useState('');
   const API_KEY = 'b7d5ac5675fb1f1ea7f753e09c59d982'
    
    function fetchMovieInfo() {
        const fetchMovie = async() => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${API_KEY}`)
                const data = await response.json();
                setMovieProfile(data);
                const backdropPath = data.backdrop_path
                if (backdropPath) {
                    const backdropUrl = `https://image.tmdb.org/t/p/original${backdropPath}`;
                    setBackDropImage(backdropUrl);
                  }
            } catch(err) {
                console.log('movie id',err.message);
            }
        }
        fetchMovie()
    }

    useEffect(() => {
        fetchMovieInfo()
    }, [])

    function TimeConverter(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h ${minutes}m`;
    }  
    
  return (
    <>
        {movieProfile && <section className='relative mt-5 md:px-12 px-5 '>

                
            <div className='absolute inset-0 '>

                {/* THE MAIN PAGE */}
               
                <div style={{ backgroundImage: `url(${backdropImage})`, backgroundPositionX: '10dvw'}} className='bg-cover bg-no-repeat'>
                    <div className='backdrop'>
                        <div className='flex items-center flex-wrap p-10'>
                            <div className='md:basis-1/3 max-w-[300px]'>
                                <Image className='rounded-xl' style={{width: 'auto', maxWidth: "100%", height: 'auto'}} width='500' height='500' src={`https://image.tmdb.org/t/p/w500${movieProfile.poster_path}`} alt='poster path'/>
                            </div>

                            <div className='flex flex-col md:basis-2/3 md:pl-10'>

                                <div>
                                    <h2 className='text-5xl font-semibold text-slate-100 hover:text-slate-300 transition-all duration-500'>{movieProfile.title}</h2>
                                </div>

                                <div className='flex items-center gap-3 mt-2'>

                                    <div className='px-2 text-center border border-gray-400 rounded text-gray-400 font-semibold'>
                                        R
                                    </div>

                                    <div className='flex items-center gap-2'>
                                        <p className='text-slate-100 flex items-center gap-1'>{movieProfile.release_date} <span>({movieProfile.production_companies[0].origin_country})</span></p>
                                        
                                        <div className=''>
                                            <ol className='flex items-center gap-1 order-list'>
                                            {movieProfile.genres.map((genre) => <li className='text-slate-100' key={genre.id}>{genre.name},&nbsp;</li>)}
                                            </ol>
                                        </div>

                                        <p className='text-slate-100'>
                                            {TimeConverter(`${movieProfile.runtime}`)}
                                        </p>
                                    </div>

                                </div>

                                <div className='flex items-center gap-4 mt-5'>

                                    <div className='flex items-center gap-2'>
                                        <p className='p-round transition-all duration-500 bg-black text-slate-100 relative flex items-center justify-center font-semibold text-2xl hover:text-3xl'>{Math.round(movieProfile.vote_average * 10)}<span className='text-[8px] transform translate-y-[-4px]'>%</span></p>
                                        <p className='text-slate-100 font-bold '>User <br/> Score</p>
                                    </div>

                                    <div className='flex items-center gap-6'>

                                        <div className='px-4 py-4 rounded-3xl bg-blue-950 text-slate-100 cursor-pointer' title='Add to list'>
                                            <FaListUl className='cursor-pointer text-sm'/>
                                        </div>
                                        
                                        <div className='px-4 py-4 rounded-3xl bg-blue-950 text-slate-100 cursor-pointer' title='Mark as favourite'>
                                            <FaHeart className='cursor-pointer text-sm'/>
                                        </div>

                                        <div className='px-4 py-4 rounded-3xl bg-blue-950 text-slate-100 cursor-pointer' title='Add to your watchlist'>
                                            <FaBookmark className='cursor-pointer text-sm'/>
                                        </div>

                                        <div className='px-4 py-4 rounded-3xl bg-blue-950 text-slate-100 cursor-pointer' title='Rate it!'>
                                            <FaStar className='cursor-pointer text-sm'/>
                                        </div>

                                    </div>

                                    <div className='flex items-center gap-3'>

                                        <CiLocationArrow1 className='text-xl text-slate-100'/>
                                        <p className='text-slate-100 font-bold'>Play Trailer</p>

                                    </div>
                                </div>

                                <div className='flex flex-col mt-5 gap-2'>

                                    <p className='font-semibold italic text-slate-400'>{movieProfile.tagline}</p>

                                    <div className='flex flex-col gap-2'>
                                        <h3 className='text-2xl font-semibold text-slate-100'>Overview</h3>
                                        <p className='text-slate-100'>{movieProfile.overview}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                       
                    </div>
                </div>

                {/* THE CAST PAGE */}
                <div>
                    <div>
                        <Cast params={params} movieProfile={movieProfile}/>
                    </div>

                    <div>

                    </div>
                </div>
                
            </div>
    
        </section>}
        
    </>
    
  )
}

export default page
'use client'
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation';
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLink } from "react-icons/fa";

import CastReview from './CastReview';

const Cast = ({ params, movieProfile }) => {
    const API_KEY = 'b7d5ac5675fb1f1ea7f753e09c59d982'

    const [castProfile, setCastProfile] = useState([]);
    const [keyword, setKeyword] = useState([]);
    const router = useRouter();

    useEffect(() => {
        getCastProfile()
        getKeyWords()
    }, [])

    function getCastProfile() {
        const fetchCast = async() => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=${API_KEY}`);
                const data = await response.json();
                const castData = data.cast
                setCastProfile(castData)
            } catch(err) {
                console.log(err.message);
            }
        }
        fetchCast()
    }

    function getKeyWords() {
        const fetchKeywords = async() => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${params.id}/keywords?api_key=${API_KEY}`);
                const data = await response.json();
                const keywordData = data.keywords;
                setKeyword(keywordData)
            } catch(err) {
                console.log(err);
            }
        } 
        fetchKeywords();
    }

    function castRoute() {
        return router.push(`/movie/${params.id}/cast`)
    }

    function personRoute(personID, personName) {
        return router.push(`/person/${personID}-${personName}`)
    }

  return (
    <div className='px-10 py-4 flex gap-10'>

        <div className='flex flex-col gap-5 w-[76%]'>
            <h2 className='text-black font-semibold text-2xl'>Top Billed Cast</h2>

            <div className='flex gap-3 overflow-x-scroll'>
                {
                    castProfile.map((profile) => {
                        return (
                            <ol key={profile.id} className='shadow rounded-lg border mb-5'>
                                <li style={{minWidth: '140px', width: '140px'}}>
                                    <div>
                                        {
                                            profile.profile_path ? <img src={`https://image.tmdb.org/t/p/w500${profile.profile_path}`} className='rounded-t-lg cursor-pointer' onClick={() => personRoute(profile.id, profile.name)}/> : <div className='w-[100%] h-[210px] bg-slate-100'></div>
                                        }
                                    </div>
                                    <div className='flex flex-col px-3 py-1'>
                                        <p className='font-bold text-sm text-gray-950'>{profile.name}</p>
                                        <p>{profile.character}</p>
                                    </div>
                                </li>
                            </ol>
                            )
                    }).slice(0,9)
                }
                <div className='flex items-center gap-1' style={{minWidth: '140px', width: '140px'}}>
                    <p className='font-bold text-sm text-gray-950 hover:text-gray-500 cursor-pointer transition-all duration-500' onClick={() => castRoute()}>
                        View More
                    </p>
                    <div>
                        <FaLongArrowAltRight className='text-xl'/>
                    </div>
                </div>
                
            </div>

            <div>
                <button className='mt-3 text-xl font-semibold text-gray-950 hover:text-gray-500 transition-all duration-500 cursor-pointer' onClick={() => castRoute()}>Full Cast & Crew</button>
            </div>

            <div className='border my-5'></div>

            <div>
                <CastReview params={params}/>
            </div>
        </div>

        <div className=' w-full flex flex-col gap-10'>
            <FaLink className='text-2xl'/>

            {
                movieProfile && <div className='flex flex-col gap-5'>

                    <div className='flex flex-col gap-5'>
                        <div className='flex flex-col'>
                            <p className='text-lg font-bold text-gray-950'>Status</p>
                            <p className='text-gray-700'>{movieProfile.status}</p>
                        </div>
                        
                        <div className='flex flex-col'>
                            <p className='text-lg font-bold text-gray-950'>Original Language</p>
                            <p className='text-gray-700'>{movieProfile.spoken_languages[0].name}</p>
                        </div>
                        
                        <div className='flex flex-col'>
                            <p className='text-lg font-bold text-gray-950'>Budget</p>
                            <p className='text-gray-700'>${(movieProfile.budget).toLocaleString()}</p>
                        </div>
                        
                        <div className='flex flex-col'>
                            <p className='text-lg font-bold text-gray-950'>Revenue</p>
                            <p className='text-gray-700'>${(movieProfile.revenue).toLocaleString()}</p>
                        </div>

                        {/* KEYWORDS */}
                        <div className='flex flex-col gap-2'>
                            <p className='text-lg font-bold text-gray-950'>Keywords</p>

                            <ol className='flex flex-wrap gap-2'>
                                {
                                    keyword.map((word) => {
                                        return (
                                            <li key={word.id} className='px-3 py-2 border rounded bg-gray-200 text-sm cursor-pointer'>{word.name}</li>
                                        )
                                    })
                                }
                            </ol>
                        </div>
                    </div>

                    <div className='border my-5'></div>
                    
                </div>
            }
        </div>
            
    </div>
  )
}

export default Cast
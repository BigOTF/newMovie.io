'use client'
import React, { useState, useEffect } from 'react'
import { FaLongArrowAltLeft } from "react-icons/fa";
import { MdPerson3 } from "react-icons/md";
import { useRouter } from 'next/navigation';

const page = ({params}) => {
    const [seriesData, setSeriesData] = useState();
    const [castProfile, setCastProfile] = useState([]);
    const [crewProfile, setCrewProfile] = useState([]);

    const API_KEY = 'b7d5ac5675fb1f1ea7f753e09c59d982'
    const router = useRouter();

    useEffect(() => {
        getSeriesPoster();
        getCastProfile()
        getCrewProfile()
    }, [])

    function getSeriesPoster() {
        const fetchSeriesPoster = async() => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/tv/${params.id}?api_key=${API_KEY}`)
                const data = await response.json();
                setSeriesData(data);
            } catch(err) {
                console.log('Series data cast',err.message);
            }
        }
        fetchSeriesPoster();
    }

    function getCastProfile() {
        const fetchCast = async() => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/tv/${params.id}/credits?api_key=${API_KEY}`);
                const data = await response.json();
                const castData = data.cast
                setCastProfile(castData)
            } catch(err) {
                console.log('Cast Series Profile', err.message);
            }
        }
        fetchCast()
    }

    function getCrewProfile() {
        const fetchCrew = async() => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/tv/${tvSeriesId}/credits?api_key=${API_KEY}`);
                const data = await response.json();
                const crewData = data.crew
                setCrewProfile(crewData)
            } catch(err) {
                console.log('Crew Series Data', err.message);
            }
        }
        fetchCrew()
    }

    function backPageRoute() {
        return router.push(`/series/${params.id}`)
    }

  return (
    <>
        {
            seriesData && <section className='mt-5'>

            <div className='cast-bacgroundColor px-10 flex items-center gap-3 py-3'>
                <div>
                    <img className='w-[70px] h-[120px] rounded'  src={`https://image.tmdb.org/t/p/w500${seriesData.poster_path}`} alt='poster path'/>
                </div>

                <div className='flex flex-col gap-3'>
                    <div className='flex items-center gap-2'>
                        <p className='text-5xl font-semibold text-slate-100'>{seriesData.original_title}</p>
                        <p className='text-slate-300 text-2xl'>({seriesData.release_date})</p>
                    </div>

                    <div className='flex items-center gap-1'>
                        <div>
                            <FaLongArrowAltLeft className='text-slate-400 text-lg'/>
                        </div>
                        <p className='text-slate-400 hover:text-slate-600 cursor-pointer font-semibold transition-all duration-500 text-lg' onClick={() => backPageRoute()}>Back to main</p>
                    </div>
                </div>
                
            </div>

            <div className='px-10 py-6 flex w-[100%]'>

                {/* CAST */}
                <div className='flex flex-col gap-4 w-[50%]'>
                    <div className='flex items-center gap-1'>
                        <p className='text-gray-950 text-xl font-semibold'>Cast</p>
                        <p className='text-gray-500 text-xl font-semibold'>{castProfile.length}</p>
                    </div>

                    <div className='flex flex-col gap-3'>
                        {
                            castProfile.map((cast) => {
                                return (
                                    <ul key={cast.id}>
                                        <li className='flex items-center gap-6'>
                                            <div>
                                                {
                                                    cast.profile_path ? <div>
                                                        <img src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`} className='w-[70px] h-[90px] rounded-xl'/>
                                                    </div>  : <div className='w-[70px] h-[90px] bg-slate-400 rounded-xl flex items-center justify-center'>
                                                        <MdPerson3 className='text-3xl'/>
                                                    </div>
                                                }
                                                
                                            </div>
                                            <div className='flex flex-col gap-1'>
                                                <p className='font-bold text-sm text-gray-950'>{cast.name}</p>
                                                <p>{cast.character}</p>
                                            </div>
                                        </li>
                                    </ul>
                                )
                            })
                        }
                    </div>
                </div>

                {/* CREW */}
                <div className='flex flex-col gap-4'>
                    <div className='flex items-center gap-1'>
                        <p className='text-gray-950 text-xl font-semibold'>Crew</p>
                        <p className='text-gray-500 text-xl font-semibold'>{crewProfile.length}</p>
                    </div>

                    <div className='flex flex-col gap-3'>
                        {
                            crewProfile.map((crew) => {
                                return (
                                    <ul key={crew.credit_id}>
                                        <li className='flex items-center gap-6'>
                                            <div>
                                                {
                                                    crew.profile_path ? <div>
                                                        <img src={`https://image.tmdb.org/t/p/w500${crew.profile_path}`} className='w-[70px] h-[90px] rounded-xl'/>
                                                    </div> : <div className='w-[70px] h-[90px] bg-slate-400 rounded-xl flex items-center justify-center'>
                                                        <MdPerson3 className='text-3xl'/>
                                                    </div>
                                                }
                                                
                                            </div>
                                            <div className='flex flex-col gap-1'>
                                                <p className='font-bold text-sm text-gray-950'>{crew.name}</p>
                                                <p>{crew.job}</p>
                                            </div>
                                        </li>
                                    </ul>
                                )
                            })
                        }
                    </div>
                </div>


            </div>

        </section>
        }
    </>
    
    
  )
}

export default page
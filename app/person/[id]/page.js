'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';

const page = ({params}) => {
    const API_KEY = 'b7d5ac5675fb1f1ea7f753e09c59d982';
    const [movieProfile, setMovieProfile] = useState();
    const [movieCastedIn, setMovieCastedIn] = useState([]);

    const router = useRouter()

    useEffect(() => {
        fetchActor();
        fetchActorInfo()
        fetchMoreActorInfo()
    }, [])

    function getAge(year) {
        const birthDate = new Date(year);
        const currentDate = new Date();
        const ageInMilliseconds = currentDate - birthDate;
        const ageInYears = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));
        return ageInYears;
    }

    function fetchActor() {
        const fetchActor = async() => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/person/${params.id}?api_key=${API_KEY}`);
                const data = await response.json();
                setMovieProfile(data);
            } catch(err) {
                console.log(err.message);
            }
        }
        fetchActor()
    }

    function fetchActorInfo() {
        const fetchActorInfo = async() => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/person/${params.id}/movie_credits?api_key=${API_KEY}`);
                const data = await response.json();
                const castData = data.cast;
                setMovieCastedIn(castData)
            } catch(err) {
                console.log(err.message);
            }
        }
        fetchActorInfo()
    }

    function fetchMoreActorInfo() {
        const fetchActorInfo = async() => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${2}`);
                const data = await response.json();
                console.log(data);
            } catch(err) {
                console.log(err.message);
            }
        }
        fetchActorInfo()
    }

    function pageRoute(movieID, movieTitle) {
        return router.push(`/movie/${movieID}-${movieTitle}`)
    }

  return (
    <section className='mt-5 px-12 flex gap-10 overflow-hidden'>

        <div>
            {
                movieProfile && <div className='flex flex-col gap-4' style={{width: '300px', minWidth: '300px'}}>
                    <div>
                        <img src={`https://image.tmdb.org/t/p/w500${movieProfile.profile_path}`} className='rounded-xl'/>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <div>
                            <p className='text-2xl font-semibold text-gray-950'>Personal Info</p>
                        </div>

                        <div className='flex flex-col gap-3'>

                            {/* KNOWN FOR */}
                            <div className='flex flex-col'>
                                <p className='text-xl font-semibold text-gray-950'>Known For</p>
                                <p className='text-gray-700'>{movieProfile.known_for_department}</p>
                            </div>
                            
                            {/* KNOWN CREDITS */}
                            <div className='flex flex-col'>
                                <p className='text-xl font-semibold text-gray-950'>Known Credits</p>
                                <p className='text-gray-700'>{movieProfile.known_for_department}</p>
                            </div>

                            {/* GENDER */}
                            <div className='flex flex-col'>
                                <p className='text-xl font-semibold text-gray-950'>Gender</p>
                                <p className='text-gray-700'>{movieProfile.gender === 1 ? 'Female' : movieProfile.gender === 2 ? 'Male' : 'Person'}</p>
                            </div>

                            {/* BIRTHDAY */}
                            <div className='flex flex-col'>
                                <p className='text-xl font-semibold text-gray-950'>Birthday</p>
                                <p className='text-gray-700'>{movieProfile.birthday} 
                                    <span> ({getAge(movieProfile.birthday)} years old)</span>
                                </p>
                            </div>

                            {/* PLACE OF BIRTH */}
                            <div className='flex flex-col'>
                                <p className='text-xl font-semibold text-gray-950'>Place of Birth</p>
                                <p className='text-gray-700'>{movieProfile.place_of_birth}</p>
                            </div>
                            
                            {/* ALSO KNOWN AS */}
                            <div className='flex flex-col'>
                                <p className='text-xl font-semibold text-gray-950'>Place of Birth</p>
                                <ol className='flex flex-col gap-1'>
                                    {
                                        (movieProfile.also_known_as).map((names, index) => {
                                            return (
                                                <li key={index} className='text-gray-700'>{names}</li>
                                            )
                                        })
                                    }
                                </ol>
                            </div>
                            
                        </div>
                    </div>
                </div>
            }
        </div>

        <div>
            {
                movieProfile && <div className='flex flex-col gap-7 w-[70%]'>
                    <p className='text-4xl font-bold text-gray-950'>{movieProfile.name}</p>

                    {/* BIOGRAPHY */}
                    <div className='flex flex-col gap-2'>
                        <p className='text-2xl font-semibold text-gray-950'>Personal Info</p>
                        <p>{movieProfile.biography}</p>
                    </div>

                    {/* KNOWN FOR */}
                    <div className='flex flex-col gap-2'>
                        <p className='text-2xl font-semibold text-gray-950'>Known For</p>
                        <div className='flex gap-3 overflow-x-scroll'>
                            {
                                movieCastedIn.map((movie) => {
                                    return (
                                        <ol key={movie.id} className='shadow rounded-lg border mb-5'>
                                            <li style={{minWidth: '140px', width: '140px'}}>
                                                <div>
                                                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className='rounded-t-lg cursor-pointer' onClick={() => pageRoute(movie.id, movie.title)}/>
                                                </div>
                                                <div className='flex flex-col px-3 py-1'>
                                                    <p className='font-bold text-sm text-gray-950'>{movie.title}</p>
                                                </div>
                                            </li>
                                        </ol>
                                        )
                                }).slice(0,8)
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    </section>
  )
}

export default page
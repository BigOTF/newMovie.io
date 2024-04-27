'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';

const Movie = () => {
    const [seriesList, setSeriesList] = useState([]);
    const [moreSeriesList, setMoreSeriesList] = useState([]);
    const [currentPage, setCurrentPage] = useState(2);

    const router = useRouter();

    const API_KEY = 'b7d5ac5675fb1f1ea7f753e09c59d982'

    useEffect(() => {
        getSeries()
    }, []);

    function getSeries() {
        const fetchSeries = async() => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`);
                const data = await response.json();
                const seriesData = data.results;
                setSeriesList(seriesData);
            } catch(err) {
                console.log('Error Fetching the series', err.message);
            }
        }
        fetchSeries();
    }

   function getMoreSeries() {
        const fetchMoreSeries = async(page) => {
            try{
               
                const response = await fetch(` https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&page=${page}`);
                const data = await response.json();
                const getMoreSeries = data.results;
                
                setCurrentPage(page + 1);
                setMoreSeriesList((prev) => [...prev, ...getMoreSeries]);
            } catch(err) {
                console.log('Error fetching More Movies', err.message);
            }
        }
       fetchMoreSeries(currentPage);
    }

   function showMore() {
        return getMoreSeries();
    }

    function pageRoute(seriesID, seriesTitle) {
        return router.push(`/series/${seriesID}-${seriesTitle}`)
    }

  return (
    <div className='flex flex-col gap-8'>

        <div className='grid xl:grid-cols-6 lg:grid-cols-5 gap-8 md:grid-cols-4 sm:grid-cols-3 grid-cols-1'>
            {
                seriesList.map((series) => {
                    return (
                        <div key={series.id} className='flex flex-col shadow-xl rounded-2xl'>

                            <div>
                                <a title={series.title} className='cursor-pointer'>
                                    <img src={`https://image.tmdb.org/t/p/w500${series.poster_path}`} className='xl:w-[100%] xl:h-[270px] lg:w-[100%] lg:h-[320px] md:w-[100%] md:h-[300px] sm:w-[100%] sm:h-[350px] h-[550px] w-[100%] rounded-t-lg' onClick={() => pageRoute(series.id, series.name)}/>
                                </a>
                            </div>
                            
                            <div className='px-3 transform translate-y-[-20px]'>
                                <p className='bg-black rating-radius text-slate-200 text-sm relative flex items-center justify-center font-bold'>{Math.round(series.vote_average * 10)}<span className='text-[8px] transform translate-y-[-4px]'>%</span></p>
                                <p className='font-bold text-gray-800 hover:text-blue-500 transition-all duration-500 cursor-pointer'>{series.name}</p>
                                <p className='text-gray-600'>{series.first_air_date}</p>
                            </div>
                        </div>
                    )
                })
            }
            {   
                moreSeriesList.map((series) => {
                    return (
                        <div key={series.title} className='flex flex-col shadow-xl rounded-2xl'>

                            <div>
                                <a title={series.title} className='cursor-pointer'>
                                    <img src={`https://image.tmdb.org/t/p/w500${series.poster_path}`} className='xl:w-[100%] xl:h-[270px] lg:w-[100%] lg:h-[320px] md:w-[100%] md:h-[300px] sm:w-[100%] sm:h-[350px] h-[550px] w-[100%] rounded-t-lg' onClick={() => pageRoute(series.id, series.title)}/>
                                </a>
                            </div>
                            
                            <div className='px-3 transform translate-y-[-20px]'>
                                <p className='bg-black rating-radius text-slate-200 text-sm relative flex items-center justify-center font-bold'>{Math.round(series.vote_average * 10)}<span className='text-[8px] transform translate-y-[-4px]'>%</span></p>
                                <p className='font-bold text-gray-800 hover:text-blue-500 transition-all duration-500 cursor-pointer'>{series.name}</p>
                                <p className='text-gray-600'>{series.first_air_date}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
       

        <div className='grid grid-cols-none w-[100%]'>
            <button className='bg-blue-500 hover:bg-blue-900 transition-all duration-500 text-slate-100 font-semibold w-full py-4 rounded-xl text-xl' onClick={() => showMore()}>Load More</button>
        </div>
    </div>
  )
}

export default Movie
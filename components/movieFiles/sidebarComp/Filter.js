'use client'
import React, { useState, useEffect } from 'react'
import Select from 'react-select';
import { FaAngleRight } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";

import singleReleaseData from '@/data/release';
import filterData from '@/data/filter';
import availabilityData from '@/data/availability';
import newData from '@/data/releaseData';

const Filter = () => {
    const [showDetails, setShowDetails] = useState(false);
    const [filters, setFilters] = useState(filterData)
    const [availability, setAvailability] = useState(availabilityData)
    const [releaseData, setReleaseData] = useState(singleReleaseData)
    const [allReleaseData, setAllReleaseData] = useState(newData);
    const [date, setDate] = useState('')
    const [country, setCountry] = useState([])
    const [genres, setGenres] = useState([]);
    const [searchByCountry, setSearchByCountry] = useState([
        {
            id: 1,
            checked: false,
            details: 'Search all countries?'
        }
    ])

    useEffect(() => {
        getCountry()
        getAllGenre()
        getLanguage()
    }, []);

    const API_KEY = 'b7d5ac5675fb1f1ea7f753e09c59d982'

    function handleShowDetails() {
        setShowDetails((prev) => !prev);
    }

    function getCountry() {
        const fetchCountry = async() => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all')
                const data = await response.json();
                const formattedOptions = data.map((country) => ({
                    value: country.name.common,
                    label: (
                      <div className="flex items-center">
                        <img src={country.flags.png} alt={country.name.common} className="w-6 h-4 mr-2" />
                        <span>{country.name.common}</span>
                      </div>
                    ),
                }))
                setCountry(formattedOptions);
            } catch(err) {
                console.log(err.message);
            }
        }
        fetchCountry();
    }

    function getLanguage() {
        const fetchLanguage = async() => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`);
                const data = await response.json();
                
            } catch(err) {
                console.log(err);
            }
        }
        fetchLanguage()
    }

    function getAllGenre() {
        const fetchGenre = async() => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`)
                const data = await response.json();
                setGenres(data.genres);
            } catch(err) {
                console.log(err.message);
            }
        }
        fetchGenre()
    }

    function handleChecked(id) {
        const updatedFilter = filters.map((filter) => {
            return filter.id === id ? {...filter, checked: !filter.checked} : filter
        })
        setFilters(updatedFilter);
    }

    function handleAvailability(id) {
        const updatedAvailability = availability.map((avail) => {
            return avail.id === id ? {...avail, checked: !avail.checked} : avail
        })
        setAvailability(updatedAvailability)
    }

    function handleReleaseData(id) {
        const updatedReleaseDate = releaseData.map((data) => {
            return data.id === id ? {...data, checked: !data.checked} : data
        })
        setReleaseData(updatedReleaseDate)
    }
    function handleSearchByCountryData(id) {
        const updatedSearchCountry = searchByCountry.map((data) => {
            return data.id === id ? {...data, checked: !data.checked} : data
        })
        setSearchByCountry(updatedSearchCountry)
    }
    function handleAllReleaseData(id) {
        const updatedNewRelease = newData.map((data) => {
            return data.id === id ? {...data, checked: !data.checked} : data
        })
        setAllReleaseData(updatedNewRelease)
    }

  return (
    <div className='flex flex-col gap-3 py-3 border border-slate-300 shadow-lg rounded-xl'>

        <div className='flex items-center justify-between px-3'>
                <p className='font-semibold text-lg text-gray-900'>Filters</p>
                
                <div onClick={() => handleShowDetails()} className='cursor-pointer'>
                    {showDetails ?  <FaAngleDown /> : <FaAngleRight />}
                </div>
        </div>

        {/* FILTERS SHOW ME */}
        <div className={showDetails ? 'border-t border-slate-200 px-3 py-2 flex flex-col gap-2' : 'hidden'}>

                <p>Show me</p>

                <div className='flex flex-col gap-1'>
                    {
                        filters.map((filter) => {
                            return (
                                <div key={filter.id} className='flex items-center gap-2'>
                                    <input className='cursor-pointer w-[15px] h-[15px]'
                                        type='checkbox'
                                        checked={filter.checked}
                                        onChange={() => handleChecked(filter.id)}
                                    />
                                    <label>
                                        {filter.details}
                                    </label>
                                </div>
                            )
                        })
                    }
                </div>

        </div>

        {/* FILTERS AVAILABILITY */}
        <div className={showDetails ? 'border-t border-slate-200 px-3 py-2 flex flex-col gap-2' : 'hidden'}>

                <p>Availabilities</p>

                <div className='flex flex-col gap-1'>
                    {
                        availability.map((avail) => {
                            return (
                                <div key={avail.id} className='flex items-center gap-2'>
                                    <input className='cursor-pointer w-[15px] h-[15px]'
                                        type='checkbox'
                                        checked={avail.checked}
                                        onChange={() => handleAvailability(avail.id)}
                                    />
                                    <label>
                                        {avail.details}
                                    </label>
                                </div>
                            )
                        })
                    }
                </div>

        </div>

        {/* FILTERS RELEASE DATES */}
        <div className={showDetails ? 'border-t border-slate-200 px-3 py-2 flex flex-col gap-2' : 'hidden'}>
                
                <p>Release Dates</p>

                <div className='flex flex-col gap-1'>
                    {
                        releaseData.map((data) => {
                            return (
                                <div key={data.id} className='flex items-center gap-2'>
                                    <input className='cursor-pointer w-[15px] h-[15px]'
                                        type='checkbox'
                                        checked={data.checked}
                                        onChange={() => handleReleaseData(data.id)}
                                    />
                                    <label>
                                        {data.details}
                                    </label>
                                </div>
                            )
                        })
                    }
                </div>

                <div className={releaseData.map((data) => data.checked === true ? 'flex flex-col gap-2' : 'hidden')}>

                    <div className='flex flex-col gap-1'>
                        {
                            searchByCountry.map((data) => {
                                return (
                                    <div key={data.id} className='flex items-center gap-2'>
                                        <input className='cursor-pointer w-[15px] h-[15px]'
                                            type='checkbox'
                                            checked={data.checked}
                                            onChange={() => handleSearchByCountryData(data.id)}
                                        />
                                        <label>
                                            {data.details}
                                        </label>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className={searchByCountry.map((data) => data.checked === true ? 'flex mt-4' : 'hidden')}>
                        <Select className='w-full'
                            options={country}
                            isSearchable
                            placeholder="Search"
                        />
                    </div>
                    
                </div>

                <div className={releaseData.map((data) => data.checked === true ? 'flex flex-col gap-2' : 'hidden')}>
                {
                            allReleaseData.map((data) => {
                                return (
                                    <div key={data.id} className='flex items-center gap-2'>
                                        <input className='cursor-pointer w-[15px] h-[15px]'
                                            type='checkbox'
                                            checked={data.checked}
                                            onChange={() => handleAllReleaseData(data.id)}
                                        />
                                        <label>
                                            {data.details}
                                        </label>
                                    </div>
                                )
                            })
                        }
                </div>

        </div>

        <div className='flex flex-col gap-3 px-4'>
                <div className='flex items-center gap-10'>
                    <label htmlFor='from' className='text-gray-400 text-sm'>From</label>
                    <input className='border border-gray-300 rounded px-2 py-2 text-sm cursor-pointer w-full'
                        type='date'
                        id='from'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                    <div className='flex items-center gap-14'>
                        <label htmlFor='to' className='text-gray-400 text-sm'>To</label>
                        <input className='border border-gray-300 rounded px-2 py-2 text-sm cursor-pointer w-full'
                            type='date'
                            id='to'
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
        </div>

        {/* GENRE */}
        <div className='border-t border-slate-200 px-3 py-2 flex flex-col gap-2'>
            <p className='text-gray-500'>Genres</p>
            <div className='flex flex-wrap w-[230px] gap-2'>
                {
                    genres.map((genre) => {
                        return (
                            <div key={genre.id}>
                                <div className='border text-center py-1 px-3 rounded-3xl text-sm font-semibold text-gray-400 hover:bg-blue-400 hover:text-slate-100 cursor-pointer transform transition-all duration-500'>{genre.name}</div>
                            </div>
                        )
                    })
                }
            </div>
            
        </div>

        {/* CERTIFICATION */}
        <div className='border-t border-slate-200 px-3 py-2'>
            <p className='text-gray-500'>Certification</p>
        </div>

        {/* LANGUAGE */}
        <div className='border-t border-slate-200 px-3 py-2 flex flex-col gap-2'>
            <p className='text-gray-500'>Language</p>
        </div>

    </div>
  )
}

export default Filter
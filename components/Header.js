'use client'
import React, { useState, useEffect } from 'react'
import { IoMdMenu } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Header = () => {
    const API_KEY = 'b7d5ac5675fb1f1ea7f753e09c59d982'
    const [showNav, setShowNav] = useState(true);
    const [showSearch, setShowSearch] = useState(true);

    const [search, setSearch] = useState('');
    const [searchData, setSearchData] = useState([]);

    const router = useRouter();

    function handleShowNav() {
        setShowNav((prev) => !prev);    
    }

    function showSearchDisplay() {
        setShowSearch((prev) => !prev);
    }

    useEffect(() => {
        searchFunction()
    }, [search])

    function searchFunction() {
        const fetchSearch = async() => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(search)}`);
                const data = await response.json();
                const dataResult = data.results;
                setSearchData(dataResult);
            } catch(err) {
                console.log('Search Error', err.message)
            }
        }
        fetchSearch()
    }

    function goToSearchPage() {
        router.push(`/search`);
    }

  return (
    <header className='grid grid-cols-1'>

        <div className='px-0 static z-50 md:px-12 py-0 headerColor'>
            {/* WEB SCREEN */}
            <div className='flex items-center justify-between py-4 px-5'>
                <div>
                    <h1 className='flex items-center gap-1 text-yellow-400 font-semibold'><span className='px-2 py-2 rounded text-black bg-yellow-400'>NEW</span>MOVIE</h1>
                </div>

                <nav className='md:flex items-start gap-10 hidden'>
                    <ul className='flex items-center gap-7'>
                        <li><Link href='/movie' className='hover:underline underline-offset-8 transition-all duration-500 cursor-pointer text-slate-200'>Popular Movie</Link></li>
                        <li><Link href='/series' className='hover:underline underline-offset-8 transition-all duration-500 cursor-pointer text-slate-200'>Popular Series</Link></li>
                    </ul>

                    <div>
                        {
                            showSearch ?  <CiSearch className='text-slate-100 text-2xl cursor-pointer' onClick={() => showSearchDisplay()}/> : <FaTimes className='text-2xl text-slate-100 cursor-pointer' onClick={() => showSearchDisplay()}/>
                        }
                       
                    </div>
                </nav>

                <div className='md:hidden'>
                    <IoMdMenu className='text-4xl text-slate-200 cursor-pointer' onClick={() => handleShowNav()}/>
                </div>
            </div>

            {/* MOBILE SCREEN */}
            <nav className={showNav ? 'hidden' : 'flex pb-5'}>
                <ul className='flex flex-col w-[100%] gap-2'>
                    <li className='px-5'><a className='transition-all duration-500 cursor-pointer text-slate-200'>New Movie</a></li>
                    <li className='px-5'><a className='transition-all duration-500 cursor-pointer text-slate-200'>Genre</a></li>
                    <li className='px-5'><a className='transition-all duration-500 cursor-pointer text-slate-200'>Country</a></li>
                    <li className='px-5'><a className='transition-all duration-500 cursor-pointer text-slate-200'>Movie</a></li>
                    <li className='px-5'><a className='transition-all duration-500 cursor-pointer text-slate-200'>Tv Series</a></li>
                </ul>
            </nav>
        </div>

        <div className={showSearch ? 'hidden' : 'border-b bg-white px-20'}>

            <div className='flex items-center gap-3 border-b'>
                <CiSearch className='text-2xl'/>
                <input className='w-full p-3 bg-white italic text-gray-500 text-lg'
                    type='search'
                    placeholder='Search for movie, tv show and person....'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div>
                {
                    searchData.map((data) => {
                        return (
                            <ul key={data.id}>
                                <li className='border-b py-1 cursor-pointer hover:bg-gray-200 transition-all duration-500' onClick={() => goToSearchPage()}>{data.title}</li>
                            </ul>
                        )
                    }).slice(0, 10)
                }
            </div>
           
        </div>
        
    </header>
  )
}

export default Header
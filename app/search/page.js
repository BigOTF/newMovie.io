'use client'
import React, { useState, useEffect } from 'react'

const search = () => {
    const API_KEY = 'b7d5ac5675fb1f1ea7f753e09c59d982'
    const [search, setSearch] = useState('')
    const [searchData, setSearchData] = useState([]);

    useEffect(() => {
        searchFunction();
    }, [search])

    function searchFunction() {
        const fetchSearch = async() => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(search)}`);
                const data = await response.json();
                const dataResult = data.results;
                console.log(dataResult)
                setSearchData(dataResult);
            } catch(err) {
                console.log('Search Error', err.message)
            }
        }
        fetchSearch()
    }
  return (
    <div>
        {
            searchData.map((search) => {
                return (
                    <div>
                        <div>
                            <img src={`https://image.tmdb.org/t/p/w500${search.profile_path}`}/>
                        </div>
                        <div></div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default search
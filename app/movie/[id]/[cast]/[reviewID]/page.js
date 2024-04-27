'use client'
import React, { useState, useEffect } from 'react'
import { FaPencilAlt } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const page = ({params}) => {
  const API_KEY = 'b7d5ac5675fb1f1ea7f753e09c59d982';
  const [movieData, setMovieData] = useState();
  const [review, setReview] = useState([]);
  

  useEffect(() => {
    movieReview()
    getMoviePoster()
  }, [])

  const movieReview = () => {
    const fetchMovieReview = async() => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${params.id}/reviews?api_key=${API_KEY}`);
        const data = await response.json();
        const reviewData = data.results;
        console.log(reviewData)
        setReview(reviewData);
      } catch(err) {
        console.log(err.message);
      }
    }
    fetchMovieReview()
  }

  function showReviewData() {
    return (
      review.map((rev) => {
        return (
          <div className='px-3 py-5 border shadow-lg rounded-lg flex flex-col gap-5' key={rev.id}>
            <div className='flex gap-5 items-center'>
                <div className='px-6 py-6 rounded-3xl bg-black'>
                  <img />
                </div>
                <div className='flex flex-col gap-1'>
                  <p className='text-xl font-semibold text-gray-950'>A review by {rev.author}</p>

                  <div className='flex items-center gap-2'>
                    <div className='bg-black text-slate-100 px-3 flex items-center gap-2 rounded-xl'>
                        <FaStar className='text-slate-100 text-sm'/>
                        <p className='text-sm'>{rev.author_details.rating}</p>
                    </div>
                    <div>
                      <p className='text-gray-600 flex items-center gap-1 text-sm'>Written by
                        <span className='text-gray-950'>{rev.author}</span>
                        <span>On March</span>
                      </p>
                    </div>
                  </div>

                </div>
            </div>
              <div>
                  <p>{(rev.content).slice(0, 300)}..... <span>read the rest</span></p>
              </div>
          </div>
        )
        })
    )
  }

  function getMoviePoster() {
    const fetchMoviePoster = async() => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${API_KEY}`)
            const data = await response.json();
            setMovieData(data);
        } catch(err) {
            console.log(err.message);
        }
    }
    fetchMoviePoster();
  }

  return (
    <>
      {
        movieData && <section className='mt-5'>
          <div className='cast-bacgroundColor px-10 flex items-center gap-3 py-3'>
            <div>
              <img className='w-[70px] h-[120px] rounded'  src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} alt='poster path'/>
            </div>

            <div className='flex flex-col gap-3'>
              <div className='flex items-center gap-2'>
                  <p className='text-5xl font-semibold text-slate-100'>{movieData.original_title}</p>
                  <p className='text-slate-300 text-2xl'>({movieData.release_date})</p>
              </div>

              <div className='flex items-center gap-1'>
                  <div>
                      <FaLongArrowAltLeft className='text-slate-400 text-lg'/>
                  </div>
                  <p className='text-slate-400 hover:text-slate-600 cursor-pointer font-semibold transition-all duration-500 text-lg' onClick={() => backPageRoute()}>Back to main</p>
              </div>
            </div>
          </div>

          <div className='flex items-start gap-32 px-14 mt-6'>
            <div className='cast-bacgroundColor py-2 rounded-3xl flex items-center gap-2 w-[400px] justify-center cursor-pointer'>
              <FaPencilAlt className='text-slate-100 text-sm'/>
              <p className='uppercase font-semibold text-slate-100'>Write Review</p>
            </div>

            <div className='flex flex-col gap-5'>
              {showReviewData()}
            </div>
          </div>
        </section>
      }
    </>
   
  )
}

export default page
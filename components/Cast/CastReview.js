import React, { useState, useEffect } from 'react'
import { FaStar } from "react-icons/fa";
import { useRouter } from 'next/navigation';

const CastReview = ({params}) => {
    const API_KEY = 'b7d5ac5675fb1f1ea7f753e09c59d982';

    const [review, setReview] = useState([]);
    const [reviewDataPosition, setReviewDataPosition] = useState(0);
    const router = useRouter();
    
    useEffect(() => {
        movieReview()
    }, []);

    function movieReview() {
        const fetchMovieReview = async() => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${params.id}/reviews?api_key=${API_KEY}`);
                const data = await response.json();
                const reviewData = data.results;
                setReview(reviewData);
            } catch(err) { 
                console.log(err.message);
            }
        }
        fetchMovieReview()
    }

    function NavigateToReviewPage() {
        router.push(`/movie/${params.id}/review/reviews`)
    }

    function showReviewData() {
        return (
            review.map((rev) => {
                return (
                    <div className='px-3 py-5 border shadow-lg rounded-lg flex flex-col gap-5' key={rev.id}>

                        <div className='flex gap-5 items-center'>
                            <div className='px-7 py-7 rounded-3xl bg-black'>
                                <img />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <p className='text-2xl font-semibold text-gray-950'>A review by {rev.author}</p>
            
                                <div className='flex items-center gap-4'>
                                    <div className='bg-black text-slate-100 px-4 py-2 flex items-center gap-2 rounded-xl'>
                                        <FaStar className='text-slate-100'/>
                                        <p>{rev.author_details.rating}</p>
                                    </div>
                                    <div>
                                        <p className='text-gray-600 flex items-center gap-1'>Written by
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

    const handleReviewDataChange = () => {
        setReviewDataPosition((reviewDataPosition + 1) % review.length);
        console.log(reviewDataPosition)
    };

   

  return (
    <div className='py-34 flex flex-col gap-5'>

        <div className='flex items-center gap-10'>
            <p className='text-2xl font-semibold text-gray-950'>Social</p>

            <div className='flex items-center gap-6'>
                <div>
                    <p onClick={() => handleReviewDataChange()} className='text-xl font-semibold text-gray-950 hover:underline underline-offset-[12px] cursor-pointer'>Review <span className='text-sm'>{review.length}</span></p>
                </div>
               
                <p className='text-xl font-semibold text-gray-950 hover:underline underline-offset-[12px] cursor-pointer'>Discussions</p>
            </div>
        </div>

        <div className='flex flex-col gap-5'>
            {showReviewData()[reviewDataPosition]}
        </div>

        <div>
            <button className='text-gray-950 font-semibold my-3 text-lg cursor-pointer hover:text-gray-700 transition-all duration-300'  onClick={() => NavigateToReviewPage()}>Read All Reviews</button>
        </div>

        <div className='border my-2'></div>

    </div>
  )
}

export default CastReview
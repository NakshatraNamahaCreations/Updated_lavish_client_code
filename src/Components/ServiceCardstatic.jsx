// import React, { useState } from 'react'
// import img from "../assets/img/grid6.jpg"
// import { GoHeartFill, GoHeart } from "react-icons/go";
// import { Link } from 'react-router-dom';


// const ServiceCardstatic = () => {
//     const [togglelike, setToggleLike] = useState(true)
//     return (
//         <div className='group relative mb-4 shadow-lg rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 break-inside-avoid md:p-3 md:py-4  md:w-[300px] w-[170px] border border-gray-300 ' >
//             <div className='rounded-full bg-white p-2  absolute top-6 right-6 text-2xl cursor-pointer' onClick={() => setToggleLike(!togglelike)}>
//                 {togglelike ? <GoHeartFill className='text-red-600' /> : <GoHeart className='text-gray-600' />}
//             </div>
//             <Link to={`/service/bjbvj/1`}>
//                 <div>
//                     <div>
//                         <img src={img} className=' object-cover ' />
//                     </div>
//                     <div className='px-1 pt-4'>
//                         <p className='font-bold'>Marry me <br /> Decoration</p>
//                         {/* <p className='font-bold'>Decoration</p> */}
//                         <p className='py-2'>At your location</p>
//                         <div className='flex justify-between'>
//                             <p className='font-bold'>Rs. 1499</p>
//                             <p>⭐ 4.5</p>
//                         </div>
//                     </div>
//                 </div>
//             </Link>

//             {/* Overlay */}
//             {/* <div className="px-3 absolute inset-0 bg-gradient-to-t from-purple-800 via-purple-600 to-[#464669]  bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
//                     <div className="text-white transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 mt-2 md:text-4xl text-lg font-bold">
//                         Book now
//                     </div>
//                 </div> */}
//         </div>

//     )
// }

// export default ServiceCardstatic




import React, { useState } from 'react'

import { Link } from 'react-router-dom';
import img from "../assets/img/grid6.jpg"
import { GoHeartFill, GoHeart } from "react-icons/go";
import { AiFillLike } from "react-icons/ai";

import { CiBookmark  } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";



const ServiceCardstatic = () => {
    const [togglelike, setToggleLike] = useState(false)
    return (
        <div className='mx-auto group relative mb-4 shadow-lg rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 break-inside-avoid px-3 pt-4 w-[300px]  border border-gray-300 '  >
        {/* // <div className='mx-auto group relative mb-4 shadow-lg rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 break-inside-avoid md:p-3 md:py-4  md:w-[300px] w-[170px] border border-gray-300  '  > */}
            <div className='rounded-full bg-white p-2  absolute lg:top-6 lg:right-6 top-2 right-1 text-2xl cursor-pointer' onClick={() => setToggleLike(!togglelike)}>
                          {togglelike ? <GoHeartFill className='text-red-600' /> : <GoHeart className='text-gray-600' />}
                        </div>
            <Link to={`/service/bjbvj/1`}>
                <div>
                    <div>
                        <img src={img} className=' object-cover h-40 lg:h-56 w-full ' />
                    </div>
                    <div className='px-1  flex  flex-col justify-between'>
                        <div>
                            <p className='pt-2'>At your location</p>
                            <p className=' text-xl font-semibold'>Butterfly themes</p>
                        </div>
                        <div className='flex justify-between pt-3 pb-1'>
                            <p className='font-medium text-gray-600'>Rs. 2199</p>
                            <p className='flex gap-1 text-primary items-center'><AiFillLike/> 4.5</p>
                        </div>
                    </div>
                </div>
            </Link>
            {/* Overlay */}
            {/* <div className="px-3 absolute inset-0 bg-gradient-to-t from-purple-800 via-purple-600 to-[#464669]  bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                <div className="text-white transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 mt-2 text-4xl font-bold">
                    Book now
                </div>
            </div> */}
        </div>
    )
}

export default ServiceCardstatic
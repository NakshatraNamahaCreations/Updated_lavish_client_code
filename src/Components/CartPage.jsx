import React, { useLayoutEffect } from 'react'
import support from "../assets/support.png"
import phone from "../assets/phone.png"
import whatsapp from "../assets/whatsapp.png"
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { IoMdTime } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from 'react-router-dom';

const CartPage = () => {

    return (
        <div className='lg:p-20 md:p-10 p-2 pt-28  mx-auto'>
            <h1 className='text-2xl font-bold poppins pb-5 md:pt-10'>Your Cart</h1>
            <div className='md:flex items-center justify-between gap-2 border border-gray-300 lg:w-[45%] md:w-[80%] w-full px-2 py-4 my-4 rounded-2xl'>
                <div className='flex items-center gap-4'>
                    <img src={support} className='w-10' />
                    <p className=''>Need assistance?</p>
                </div>
                <div className='flex items-center justify-end gap-4 '>
                    <button className='flex gap-2 items-center border border-green-500 text-green-500 rounded-full px-4 py-1 '> <img src={whatsapp} className='w-6' />Whatsapp</button>
                    <button className='flex gap-2 items-center border border-blue-500 text-blue-500 rounded-full px-6 py-1'> <img src={phone} className='w-6' />Call us</button>
                </div>
            </div>
            <div className=' border border-gray-300 lg:w-1/2 md:w-3/5 lg:p-4 p-2 my-4 rounded-2xl shadow-xl'>
                <h2 className='text-xl font-medium '>Order Details</h2>
                    <div key={item.id} className='relative my-5 border border-gray-300 lg:p-6 p-2 pb-14  flex justify-between rounded-2xl'>
                        <div className='flex md:gap-4  gap-2 items-center'>
                            <img src={item.img} className='w-24 h-28 rounded-2xl' />
                            <div className='space-y-1'>
                                <p className='text-lg font-normal poppins'>{item.name}</p>
                                <p className='text-gray-600 font-medium flex items-center gap-2'> <HiOutlineCalendarDateRange /> {item.date}</p>
                                <p className='text-gray-600 font-medium flex items-center gap-2'> <IoMdTime /> 08:00 AM - 11:00 AM</p>
                            </div>
                        </div>
                        <div className='absolute bottom-0 right-2 flex flex-row-reverse lg:items-end items-center lg:flex-col justify-between gap-4 w-full px-4 lg:px-0'>
                            <RiDeleteBin6Line />
                            <h1 className='font-medium lg:text-lg text-xl'>Rs. {item.price}</h1>
                        </div>
                    </div>
            </div>
            <Link to="/Checkout"><button className='bg-purple-900 text-center py-3 mt-5 lg:w-1/2 md:w-3/5 w-full text-white rounded-xl font-semibold text-xl'>CHECK OUT</button></Link>
        </div>
    )
}

export default CartPage
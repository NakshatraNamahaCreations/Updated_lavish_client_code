import React from 'react'
import { MdLocationOn } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";


const ContactUs = () => {
  return (
    <div className='container md:pt-24 pt-32  px-2 mx-auto'>
      <div className=' lg:grid grid-cols-2 gap-20  '>
        <div className='lg:mt-28'>
          <h1 className='md:text-8xl text-4xl font-bold'>Contact</h1>
          <hr className='w-52 flex justify-end h-2 bg-primary my-2' />
          <p className='lg:text-2xl md:text-4xl text-2xl  pb-3'>Looking for top-tier and highly experienced décor professionals in Bangalore? Feel free to reach out to us without hesitation. Call us or fill out the form today!</p>
        </div>
        <div className='place-items-center p-4 md:p-10 lg:p-0'>
          <img src="https://plus.unsplash.com/premium_photo-1674644777961-0bbb1fde69d9?q=80&w=1384&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="shadow-[15px_20px_2px_black] md:w-[80%] md:h-[500px] object-cover " />
        </div>
      </div>
      <div className='lg:grid grid-cols-2 gap-20 mt-20 '>
        <div className='mt-10'>
          <h1 className='md:text-7xl text-6xl font-bold'>Contact Info</h1>
          <div className='my-16 space-y-10'>
            <div className='flex gap-10 md:px-10'>
              <div className=' h-full  border border-double border-primary p-1 rounded-full'>
                <MdLocationOn size={60} className='border border-primary text-primary rounded-full p-2' />
              </div>
              <div>
                <h2 className='text-2xl font-semibold'>Address</h2>
                <p className='text-xl py-4'>No.26 Veeranjaneya Layout,
                  Turahalli, Bangalore-560061</p>
              </div>
            </div>
            <div className='flex gap-10 md:px-10'>
              <div className=' h-full  border border-double border-primary p-1 rounded-full'>
                <FaPhoneAlt size={60} className='border border-primary text-primary rounded-full p-2' />
              </div>
              <div>
                <h2 className='text-2xl font-semibold'>Phone</h2>
                <p className='text-xl pt-4'>797668688979</p>
                <p className='text-xl pb-4'>797668688979</p>
              </div>
            </div>
            <div className='flex gap-10 md:px-10'>
              <div className=' h-full  border border-double border-primary p-1 rounded-full'>
                <IoIosMail size={60} className='border border-primary text-primary rounded-full p-2' />
              </div>
              <div>
                <h2 className='text-2xl font-semibold'>Email</h2>
                <p className='text-xl py-4'>email@gmail.com</p>
              </div>
            </div>

          </div>
        </div>
        <div>
          <h1 className='text-7xl font-medium poppins'>We are here to Help You</h1>
          <form className='flex gap-4 flex-col mt-4'>
            <input type='text' placeholder='Name*'  required className='outline-none p-4 text-xl border-b-2 border-black'/>
            <input type='text' placeholder='Phone*'  required className='outline-none p-4 text-xl border-b-2 border-black'/>
            <input type='text' placeholder='Email*' required className='outline-none p-4 text-xl border-b-2 border-black' />
            <input type='text' placeholder='Services you want'  className='outline-none p-4 text-xl border-b-2 border-black'/>
            <input type='text' placeholder='Meesage'  className='outline-none p-4 text-xl border-b-2 border-black'/>
            <input type='submit' value="Submit" className='bg-primary text-white p-3 text-2xl poppins'/>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
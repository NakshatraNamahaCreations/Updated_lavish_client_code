
import React, { useLayoutEffect, useState } from 'react'
import entertainmentBanner from "../assets/banner/entertainmentBanner.png"
import entertainmentBanner2 from "../assets/banner/photoshootactivity.png"
import adultBanner3 from "../assets/banner/trustedBanner.png"
import addonsbanner from "../assets/banner/addonsbanner.png"
import video from "../assets/services/video.mp4"

import decor1 from "../assets/services/activitysimple.png"
import decor2 from "../assets/services/activityPremimum.png"

import gallery1 from "../assets/services/activity1.png"
import gallery2 from "../assets/services/activity2.png"
import gallery3 from "../assets/services/gallery3.png"
import gallery4 from "../assets/services/activity4.png"
import gallery5 from "../assets/services/activity5.png"
import gallery6 from "../assets/services/activity6.png"
import gallery7 from "../assets/services/activity7.png"
import BasicSlider from './BasicSlider'

import kidsactivity1 from "../assets/bday/kidsbday/kidsactivity1.png"
import kidsactivity2 from "../assets/bday/kidsbday/kidsactivity2.png"
import kidsactivity3 from "../assets/bday/kidsbday/kidsactivity3.png"
import kidsactivity4 from "../assets/bday/kidsbday/kidsactivity4.png"

import FAQ from './FAQ'
import Testimonials from './Testimonials'
import { Link } from 'react-router-dom'
import CancellationPolicy from './CancellationPolicy'



const kidsactivityList = [
    {
        serviceName: "Male Anchor for Entertainment",
        price: "1,499",
        cardImg: kidsactivity1
    },
    {
        serviceName: "Caricature Artist",
        price: "1,499",
        cardImg: kidsactivity2
    },
    {
        serviceName: "Cartoon Mascot",
        price: "1,499",
        cardImg: kidsactivity3
    },
    {
        serviceName: "Cotton Candy",
        price: "1,499",
        cardImg: kidsactivity4
    },
    {
        serviceName: "Cartoon Mascot",
        price: "1,499",
        cardImg: kidsactivity3
    },
    {
        serviceName: "Caricature Artist",
        price: "1,499",
        cardImg: kidsactivity2
    },
]


const Entertainment = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    };

    return (
        <div className='lg:py-24 md:pt-20 pt-32  p-3  mx-auto'>
            <div>
                <img src={entertainmentBanner} className='mx-auto w-[1600px]' />
            </div>  
              
            {/* gallery */}
            <div className='relative mx-auto text-center md:mt-10'>
                <p className='py-8 font-bold poppins md:text-2xl'>#Entertainment&ActivitiesBestMovements</p>
                <div className='flex justify-center items-center gap-1'>
                    <div className='place-items-end lg:space-y-2  space-y-1'>
                        <img src={gallery1} className=' lg:h-40 md:h-28 h-10' />
                        <img src={gallery2} className=' lg:h-64  ' />
                        <div className=' bg-gray-600 relative overflow-hidden rounded md:h-20 md:w-36 lg:w-auto lg:h-auto h-8 w-16'>
                            <img src={gallery3} className='rounded' />
                            <video
                                className='absolute top-0 left-0 w-full h-full object-cover opacity-80'
                                src={video}
                                autoPlay
                                loop
                                muted
                            />
                        </div>

                    </div>
                    <div>
                        <img src={gallery4} />
                    </div>
                    <div className='lg:space-y-2 space-y-1'>
                        <img src={gallery5} />
                        <img src={gallery6} />
                    </div>
                    <div>
                        <img src={gallery7} />
                    </div>
                </div>
                <p className='lg:absolute bottom-10 right-2 [text-shadow:_-4px_4px_3px_#7D7C7C] playfair-display md:text-7xl text-4xl font-bold text-[#FFD1D1]'>Wonderful Moments</p>
            </div>
            <Link to="/photograpghy">
                <div className='md:pt-20 pt-10'>
                    <img src={entertainmentBanner2} className='mx-auto w-[2000px]' />
                </div>
            </Link>
            <div className='md:pt-20 pt-10'>
                <p className='font-bold poppins md:py-6 pb-4 md:text-2xl'>Why Celebrate With Lavisheventzz</p>
                <img src={adultBanner3} className='mx-auto w-[1600px]' />
            </div>
            <div className='md:pt-10 pt-7'>
                <p className='font-bold poppins md:text-2xl'>Kids Special Activities</p>
                <BasicSlider data={kidsactivityList} />
            </div>
            <div className='my-4'>
                <p className='text-center font-bold poppins text-2xl'>FAQs</p>
                <p className='text-right text-lg underline cursor-pointer' onClick={toggleModal}>Cancellation Policy</p>
                <CancellationPolicy isOpen={isOpen} toggleModal={toggleModal} />
                <p className='text-center font-bold poppins text-sm'>Need help? Contact us for any queries related to us</p>
                <div className='lg:w-[70%]  md:w-[80%] mx-auto my-6'>
                    <p className='font-bold poppins py-8 '>Pick a query related to your issue</p>
                    <FAQ />
                    {/* <FAQServices/> */}
                </div>
            </div>
            <div>
                <p className='font-bold poppins md:text-2xl'>Recent Customer Reviews</p>
                <Testimonials />

            </div>
            <div className='md:px-10 px-4'>
                <p className='font-bold poppins py-8 text-2xl'>Hire the Best Balloon Decorators for Your Child’s Entertainment & Activities Party</p>
                <p className='font-bold'>
                    Hosting an entertainment and activities party? Elevate the fun with vibrant and creative balloon décor! Our expert decorators transform any venue into a lively and dynamic space with eye-catching balloon arches, playful centerpieces, and interactive balloon sculptures. Whether it’s a game night, carnival-themed party, or a fun-filled celebration, we customize every detail to match your theme and keep the energy high. Let us bring the wow factor while you and your guests enjoy an unforgettable experience. Book your party balloon décor today and make the celebration truly spectacular!
                </p>
            </div>
        </div>
    )
}

export default Entertainment
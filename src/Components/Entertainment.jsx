
import React, { useEffect, useState } from 'react'
import entertainmentBanner from "../assets/banner/entertainmentBanner.png"
import entertainmentBanner2 from "../assets/banner/photoshootactivity.png"
import adultBanner3 from "../assets/banner/trustedBanner.png"
import video from "../assets/services/video.mp4"

import gallery1 from "../assets/services/activity1.png"
import gallery2 from "../assets/services/activity2.png"
import gallery3 from "../assets/services/gallery3.png"
import gallery4 from "../assets/services/activity4.png"
import gallery5 from "../assets/services/activity5.png"
import gallery6 from "../assets/services/activity6.png"
import gallery7 from "../assets/services/activity7.png"

import FAQ from './FAQ'
import Testimonials from './Testimonials'
import { useNavigate } from 'react-router-dom'
import CardCarousel from './CardCarousel'
import { getAxios } from '../utils/api'
import { navigateToSubcategory } from '../utils/navigationsUtils'

import Caricature from "../assets/entertainment/Caricature.png"
import chocolatefountain from "../assets/entertainment/chocolatefountain.png"
import cottonCandy from "../assets/entertainment/cottonCandy.png"
import keychainMaking from "../assets/entertainment/Keychain Making.png"
import pottery from "../assets/entertainment/pottery.png"
import tattoo from "../assets/entertainment/tattoo.png"
import BalloonShooting from "../assets/entertainment/BalloonShooting.png"
import BirthdayPool from "../assets/entertainment/birthdayPool.png"
import coordinator from "../assets/entertainment/coordinator.png"
import NailArtist from "../assets/entertainment/NailArtist.png"
import popcorn from "../assets/entertainment/popcorn.png"
import Magician from "../assets/entertainment/Magician.png"


const imagelist = [
    {
        src: Caricature,
        title: "Caricature",

    },
    {
        src: chocolatefountain,
        title: "Chocolate Fountain",

    },
    {
        src: cottonCandy,
        title: "Cotton Candy",

    },
    {
        src: keychainMaking,
        title: "Keychain Making",

    },
    {
        src: pottery,
        title: "Pottery",

    },
    {
        src: tattoo,
        title: "Tattoo",

    },
    {
        src: BirthdayPool,
        title: "Birthday Party Ball Pool",

    },
    {
        src: popcorn,
        title: "Popcorn Counter",

    },
    {
        src: BalloonShooting,
        title: "Balloon Shooting",

    },
    {
        src: Magician,
        title: "Magician",

    },
    {
        src: coordinator,
        title: "Game Coordinator",

    },
    {
        src: NailArtist,
        title: "Nail Artist",

    },
    // {
    //     src: M,
    //     title: "Hoopla Game",

    // },
    // {
    //     src: M,
    //     title: "Balloon Modelling",

    // },

]

const Entertainment = () => {
    const [recentPurchase, setRecentPurchase] = useState([]);
    const [serviceDetails, setServiceDetails] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    const storedUser = localStorage.getItem('user');
    const userData = JSON.parse(storedUser);
    const customerId = userData?.id;


    const fetchRecentPurchase = async () => {
        try {
            const response = await getAxios().get(`/orders/recent-orders/${customerId}`);
            const data = await response.data;
            setRecentPurchase(data.services);
        } catch (error) {
            console.error("Error fetching recent purchase:", error);
        }
    }

    const handleNavigation = (text, baseRoute) => {
        navigateToSubcategory({
            text,
            baseRoute,
            navigate,
            setLoading,
            setError,
        });
    };



    useEffect(() => {
        const serviceDetails = recentPurchase?.map((item) => item.serviceDetails);
        setServiceDetails(serviceDetails);
    }, [recentPurchase]);


    useEffect(() => {
        fetchRecentPurchase();
    }, [customerId]);


    return (
        <div className='lg:py-24 md:pt-20 pt-32  p-3  mx-auto'>
            <div>
                <img src={entertainmentBanner} className='mx-auto w-[1600px]' />
            </div>

            <div className="grid grid-cols-2 gap-x-2 md:gap-y-14 gap-y-5 md:place-items-center lg:mt-20 mt-10">
                {imagelist.map((item, index) => (
                    <div
                        key={index}
                        className={`flex flex-col items-center ${imagelist.length % 2 !== 0 && index === imagelist.length - 1
                            ? "col-span-2"
                            : ""
                            }`}
                        onClick={() => handleWhatsappRedirect(item.title)}
                    >

                        <img
                            src={item.src}
                            alt={item.title}
                            className="rounded-3xl md:w-[500px] md:h-auto w-48 h-40"
                        />
                        <p className="text-purple-800  md:text-3xl  text-center font-medium carter">
                            {item.title}
                        </p>


                    </div>

                ))}
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

            <div className='md:pt-20 pt-10' onClick={() => handleNavigation("photography", "/photography")}>
                <img src={entertainmentBanner2} className='mx-auto w-[2000px]' />
            </div>

            <div className='md:pt-20 pt-10'>
                <p className='font-bold poppins md:py-6 pb-4 md:text-2xl'>Why Celebrate With Lavisheventzz</p>
                <img src={adultBanner3} className='mx-auto w-[1600px]' />
            </div>
            {customerId && <div className="md:pt-10 pt-7">
                <p className="font-bold poppins md:text-2xl">Recently Purchased</p>
                <CardCarousel centercardData={serviceDetails} />
            </div>}
            <div className='my-4'>
                <p className='text-center font-bold poppins text-2xl'>FAQs</p>
                <p className='text-center font-bold poppins text-sm'>Need help? Contact us for any queries related to us</p>
                <div className='lg:w-[70%]  md:w-[80%] mx-auto my-6'>
                    <p className='font-bold poppins py-8 '>Pick a query related to your issue</p>
                    <FAQ />
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
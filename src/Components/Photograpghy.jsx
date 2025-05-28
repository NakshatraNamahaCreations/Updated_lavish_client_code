
import React, { useEffect, useLayoutEffect, useState } from 'react'
import photograpghyBanner from "../assets/banner/photograpghyBanner.png"
import photographyBanner2 from "../assets/banner/photoShootPhotograpghy.png"
import adultBanner3 from "../assets/banner/trustedBanner.png"
import addonsbanner from "../assets/banner/addonsbanner.png"
import video from "../assets/services/video.mp4"


import gallery1 from "../assets/services/photography1.png"
import gallery2 from "../assets/services/photography2.png"
import gallery3 from "../assets/services/gallery3.png"
import gallery4 from "../assets/services/photography4.png"
import gallery5 from "../assets/services/photography5.png"
import gallery6 from "../assets/services/photography6.png"
import gallery7 from "../assets/services/photography7.png"


import maternaityShoot from "../assets/services/maternityShoot.png"
import babyshowerShoot from "../assets/services/babyshowerShoot.png"
import kidsbdayShoot from "../assets/services/kidsbdayShoot.png"
import adultbdayShoot from "../assets/services/adultbdayShoot.png"
import engagementShoot from "../assets/services/engagementShoot.png"
import housewarmingShoot from "../assets/services/housewarmingShoot.png"
import namingceremonyShoot from "../assets/services/namingceremonyShoot.png"
import upanayanamShoot from "../assets/services/upanayanamShoot.png"
import coupleShoot from "../assets/services/coupleShoot.png"
import baptismShoot from "../assets/services/baptismShoot.png"
import bornbabyShoot from "../assets/services/bornbabyShoot.png"


import FAQ from './FAQ'
import PhotograpghySlider from './PhotograpghySlider'
import Testimonials from './Testimonials'
import { Link } from 'react-router-dom'
import CancellationPolicy from './CancellationPolicy'
import { getAxios } from '../utils/api'
import CardCarousel from './CardCarousel'


const imagelist = [
    {
        src: maternaityShoot,
        title: "Maternity  Shoot",

    },
    {
        src: babyshowerShoot,
        title: "Baby shower Shoot",

    },
    {
        src: kidsbdayShoot,
        title: "Kid's Birtdhay Shoot",

    },
    {
        src: adultbdayShoot,
        title: "Adult's Birthday Shoot",

    },
    {
        src: engagementShoot,
        title: "Engagement Shoot",

    },
    {
        src: housewarmingShoot,
        title: "Housewarming Shoot",

    },
    {
        src: namingceremonyShoot,
        title: "Naming ceremony Shoot",

    },
    {
        src: upanayanamShoot,
        title: "Upanayanam Shoot",

    },
    {
        src: coupleShoot,
        title: "Couple Shoot",

    },
    {
        src: baptismShoot,
        title: "Baptism Shoot",

    },
    {
        src: bornbabyShoot,
        title: "Bornbaby Shoot",

    },

]



const Photograpghy = () => {

    const [recentPurchase, setRecentPurchase] = useState([]);
    const [serviceDetails, setServiceDetails] = useState([]);

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



    const handleWhatsappRedirect = (value) => {
        const message = `Hello, I want to know more about ${value}.`
        const encodedMessage = encodeURIComponent(message);
        const WhatsAppLink = `https://wa.me/919611430158?text=${encodedMessage}`;
        window.open(WhatsAppLink, "_blank")
        console.log(WhatsAppLink)
    }


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
                <img src={photograpghyBanner} className='mx-auto w-[1600px]' />
            </div>

            {/* <PhotograpghySlider imagelist={imagelist} /> */}

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
            <div className='relative mx-auto text-center lg:mt-10'>
                <p className='md:py-8 py-4 font-bold poppins md:text-2xl'>#PhotograpghyBestMovements</p>
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
                <div className='md:pt-20 py-5'>
                    <img src={photographyBanner2} className='mx-auto w-[2000px]' />
                </div>
            </Link>
            <div className=''>
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
                    {/* <FAQServices/> */}
                </div>
            </div>
            <div>
                <p className='font-bold poppins md:text-2xl'>Recent Customer Reviews</p>
                <Testimonials />
                {/* <ReviewSlider /> */}
            </div>
            <div className='md:px-10 px-4'>
                <p className='font-bold poppins py-8 text-2xl'>Hire the Best Balloon Decorators for Your best PhotoShoot</p>
                <p className='font-bold'>
                    Make your photography Shoot truly magical with breathtaking balloon décor! Whether it’s a pre-wedding Shoot, maternity session, birthday, or any special occasion, our expert decorators create mesmerizing balloon setups that add charm and elegance to every frame. From dreamy balloon arches and elegant backdrops to creative themed arrangements, we customize every detail to enhance your photoShoot’s aesthetic. Let us set the perfect scene while you focus on capturing unforgettable memories. Book your balloon décor for photography Shoots today and elevate your pictures with a touch of magic!
                </p>
            </div>
        </div>
    )
}

export default Photograpghy
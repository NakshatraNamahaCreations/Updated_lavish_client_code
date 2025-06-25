import React, { useEffect, useState } from 'react'

import sash from "../assets/bday/add_ons/sash.png"
import welcomeboard from "../assets/bday/add_ons/welcomeboard.png"
import flwrbouqt from "../assets/bday/add_ons/flwrbouqt.png"
import photography from "../assets/bday/add_ons/photography.png"
import cakes from "../assets/bday/add_ons/cakes.png"
import FAQ from './FAQ'
import Testimonials from './Testimonials'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { getAuthAxios, getAxios } from '../utils/api'
import CardCarousel from './CardCarousel'
import { MdArrowRightAlt } from "react-icons/md";
import { navigateToSubcategory } from '../utils/navigationsUtils'

const addOns = [
    {
        src: sash,
        title: "Sash"
    },
    {
        src: welcomeboard,
        title: "Welcome Board",
    },
    {
        src: flwrbouqt,
        title: "Flower Bouquet",
    },
    {
        src: photography,
        title: "Photography",
    },
    {
        src: cakes,
        title: "Cakes"
    }
]


const WelcomeBaby = () => {

    const [subSubCategories, setSubSubCategories] = useState([]);
    const [allServices, setAllServices] = useState([]);
    const [recentPurchase, setRecentPurchase] = useState([]);
    const [serviceDetails, setServiceDetails] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const { subcat_id } = useParams();
    const storedUser = localStorage.getItem('user');
    const userData = JSON.parse(storedUser);
    const customerId = userData?.id;
    const navigate = useNavigate()


    const fetchRecentPurchase = async () => {
        try {
            const response = await getAxios().get(`/orders/recent-orders/${customerId}`);
            const data = await response.data;
            setRecentPurchase(data.services);
        } catch (error) {
            console.error("Error fetching recent purchase:", error);
        }
    }


    const message = "Hello, I want to know more about Welcome Baby's Cakes.";
    const encodedMessage = encodeURIComponent(message);
    const WhatsAppLink = `https://wa.me/919620558000?text=${encodedMessage}`;

    const fetchSubSubcategoriesBySubCategory = async () => {
        if (!subcat_id) return;
        try {
            const res = await getAxios().get(
                `/subsubcategories/subcategory/${subcat_id}`
            );
            setSubSubCategories(res.data.data);
            console.log("subSubCategories", res.data.data);
        } catch (err) {
            console.error("error", err);
            setError("Failed to load subcategories");
        }
    };

    const fetchServices = async () => {
        try {
          const response = await getAxios().get(
            `/services/filter/${subcat_id}`
          );
      
          const data = response.data;
      
          if (response.status === 404 || !data.success) {
            console.warn("No services found for this subcategory.");
            setAllServices([]);
            return;
          }
      
          console.log("data", data.data);
          setAllServices(data.data);
      
        } catch (error) {
          if (error.response?.status === 404) {
            console.warn("No services found for this subcategory (404).");
          } else {
            console.error("Error fetching services:", error.message || error);
          }
          setAllServices([]);
        }
      };

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
        fetchSubSubcategoriesBySubCategory();
        fetchServices();
    }, [subcat_id]);

    useEffect(() => {
        const serviceDetails = recentPurchase?.map((item) => item.serviceDetails);
        setServiceDetails(serviceDetails);
    }, [recentPurchase]);


    useEffect(() => {
        fetchRecentPurchase();
    }, [customerId]);




    return (
        <div className='lg:py-24  pt-32  p-3  mx-auto'>
            <div>
                <img src="https://lavisheventzz-bangalore.b-cdn.net/banner/welcomeBabybanner1.png" className='mx-auto w-[1600px]' />
            </div>

            <div className='grid grid-cols-2 md:gap-10 gap-3   lg:mt-20 mt-10'>

                {subSubCategories.map((item, idx) => (
                    <div className="relative" key={item._id}>
                        <Link to={`/service/${item._id}`}>

                            <img
                                src={`${item.image}`}
                                alt={item.subSubCategory}
                                className='rounded-3xl mx-auto md:w-[400px] w-auto'
                            />
                        </Link>
                        <p className="pt-4 md:text-3xl  text-primary text-center font-medium carter">
                            {item.subSubCategory}
                        </p>
                    </div>
                ))}
                <Link to={WhatsAppLink} target="_blank" rel="noopener noreferrer">
                    <div className='relative'>
                        <img src="https://lavisheventzz-bangalore.b-cdn.net/WelcomeBaby/welcomebabyCake.png" alt="Welcome baby cake" className='rounded-3xl mx-auto md:w-[400px] w-auto ' key="Welcome baby cake" />
                        <p className="pt-4 md:text-3xl  text-primary text-center font-medium carter">
                            Welcome Baby Cake
                        </p>

                    </div>
                </Link>

            </div>
            {/* Simple Decoration Section */}
            <div className="mt-5 px-10">
                <div className="flex justify-between">
                    <p className="lg:text-2xl text-primary font-bold playfair-display">
                        All Decoration Service
                    </p>
                    {/* <div className="text-secondary font-bold flex items-center text-sm md:text-base">
                        View All <MdArrowRightAlt className="md:text-2xl text-xl" />
                    </div> */}
                </div>

                {allServices.length > 0 ? (
                    <CardCarousel centercardData={allServices} />
                ) : (
                    <p className="text-gray-500 text-center mt-4">Simple Decoration Service Not Found</p>
                )}
            </div>
            {/* Add ons */}
            <div className="relative inset-0 flex flex-col items-center justify-center text-center gap-5 my-10">
                <img src="https://lavisheventzz-bangalore.b-cdn.net/banner/adultbanner4.png" alt="adultBanner4" className="w-[2000px] mx-auto " />
                <h1 className="absolute top-5 md:top-10 lg:text-4xl md:text-2xl text-xs font-bold text-[#761337] playfair-display md:w-[50%]">
                    Make It Unforgettable with Our Exclusive Add-Ons!
                </h1>

                <div className="absolute top-16 lg:top-48 md:top-32 grid grid-cols-5  lg:gap-5  gap-0 place-items-center px-3">
                    {addOns.map((item, idx) => (

                        <img
                            key={idx}
                            src={item.src}
                            alt={item.title}
                            className="cursor-pointer object-cover md:px-3 px-1"
                        />
                    ))}
                </div>
            </div>


            <div className='relative mx-auto text-center lg:mt-10'>
                <p className='md:py-8 py-4 font-bold poppins md:text-2xl'>#WelcomeBabyDecorationBestMovements</p>
                <div className='flex justify-center items-center gap-1'>
                    <div className='place-items-end lg:space-y-2  space-y-1'>
                        <img src="https://lavisheventzz-bangalore.b-cdn.net/WelcomeBaby/baby1.png" className=' lg:h-40 md:h-28 h-10' />
                        <img src="https://lavisheventzz-bangalore.b-cdn.net/WelcomeBaby/baby2.png" className=' lg:h-64  ' />
                        {/* <div className=' bg-gray-600 relative overflow-hidden rounded md:h-20 md:w-36 lg:w-auto lg:h-auto h-8 w-16'>
                            <img src="https://lavisheventzz-bangalore.b-cdn.net/KidsBirthday/bdayGallery3.png" className='rounded' />
                            <video
                                className='absolute top-0 left-0 w-full h-full object-cover opacity-80'
                                src="https://lavisheventzz-bangalore.b-cdn.net/groomtobe/video.mp4"
                                autoPlay
                                loop
                                muted
                            />
                        </div> */}
   <img src="https://lavisheventzz-bangalore.b-cdn.net/image.jpg" className=" lg:h-40 md:h-28 h-10 rounded-xl" />
                    </div>
                    <div>
                        <img src="https://lavisheventzz-bangalore.b-cdn.net/WelcomeBaby/baby4.png" />
                    </div>
                    <div className='lg:space-y-2 space-y-1'>
                        <img src="https://lavisheventzz-bangalore.b-cdn.net/WelcomeBaby/baby5.png" />
                        <img src="https://lavisheventzz-bangalore.b-cdn.net/WelcomeBaby/baby6.png" />
                    </div>
                    <div>
                        <img src="https://lavisheventzz-bangalore.b-cdn.net/WelcomeBaby/baby7.png" />
                    </div>
                </div>
                <p className='lg:absolute bottom-10 right-2 [text-shadow:_-4px_4px_3px_#7D7C7C] playfair-display md:text-7xl text-4xl font-bold text-[#FFD1D1]'>Magical Moments</p>
            </div>

            <div className='md:pt-20 py-5' onClick={() => handleNavigation("photography", "/photography")}>
                <img src="https://lavisheventzz-bangalore.b-cdn.net/banner/photoshootbaby.png" className='mx-auto w-[2000px]' />
            </div>

            {customerId && <div className="md:pt-10 pt-7">
                <p className="font-bold poppins md:text-2xl">Recently Purchased</p>
                <CardCarousel centercardData={serviceDetails} />
            </div>}
            <div className=''>
                <p className='font-bold poppins md:py-6 pb-4 md:text-2xl'>Why Celebrate With Lavisheventzz</p>
                <img src="https://lavisheventzz-bangalore.b-cdn.net/banner/trustedBanner.png" className='mx-auto w-[1600px]' />
            </div>
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
                <p className='font-bold poppins py-8 text-2xl'>Hire the Best Balloon Decorators for Your Kid's welcome Party</p>
                <p className='font-bold'>
                    Celebrate the arrival of your precious baby with stunning balloon décor that fills your space with love and joy! Our expert decorators create heartwarming designs, from charming balloon arches and adorable centerpieces to personalized arrangements that match your theme. Whether you’re planning an intimate home celebration or a grand welcome party, we tailor every detail to make the moment extra special. Let us handle the decorations while you cherish this beautiful milestone with family and friends. Book your baby welcome balloon décor today and make the celebration truly unforgettable!
                </p>
            </div>
        </div>
    )
}

export default WelcomeBaby
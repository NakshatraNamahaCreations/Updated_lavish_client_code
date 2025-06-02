import React, { useEffect, useState } from 'react'
import SingleCarousel from './SingleCarousel'


import ganesha from "../assets/ganesha.jpg"
import independence from "../assets/independence.webp"
import CardCarousel from './CardCarousel';
import PhotoGrid from './PhotoGrid';
import Testimonials from './Testimonials';

import candleImg1 from "../assets/candleImg1.png"
import candleImg2 from "../assets/candleImg2.png"
import candleImg3 from "../assets/candleImg3.png"
import candleImg4 from "../assets/candleImg4.png"

import bride from "../assets/bridetobe_decor.png"
import groom from "../assets/groomtobe_decor.png"
import banner5 from "../assets/banner/banner5.png"
import banner6 from "../assets/banner/banner6.png"
import banner7 from "../assets/banner/banner7.png"
import bannermobile7 from "../assets/banner/bannermobile7.png"
import banner8 from "../assets/banner/banner8.png"
import banner9 from "../assets/banner/banner9.png"

import kid from "../assets/kid_bday.png"
import adult from "../assets/adult_bday.png"
import welcomebaby from "../assets/wlcm_baby.png"
import babyshower from "../assets/baby_shower.png"
import aniversary from "../assets/Aniversary.png"
import NamingCermony from "../assets/Naming.png"
import bday from "../assets/bday_party.png"
import Photography from "../assets/photography.png"
import proposal from "../assets/proposal.png"
import firstnight from "../assets/first_night.png"
import ballon from "../assets/ballon.png"
import surprise from "../assets/surprise.png"

import bettertogether from "../assets/better_together.png"
import ring from "../assets/ring.png"
import party from "../assets/party.png"
import car from "../assets/car.png"
import housewarming from "../assets/house_warming.png"
import retirement from "../assets/retirement.png"
import mundan from "../assets/mundan.png"
import ricecermony from "../assets/rice_cermony.png"
import congratulationsDecor from "../assets/congratulations_Decor.png"
import halfSareeDecoration from "../assets/half_Saree_Decoration.png"
import baptismdecoration from "../assets/baptism_Decoration.png"
import cardecorImg from "../assets/cardecorImg.png"

import shopDecor from "../assets/shop_decoration.png"
import officeDecor from "../assets/office_decor.png"

import haldi from "../assets/haldi.png"
import Mehendi from "../assets/Mehendi.png"
import decor1 from "../assets/decor1.png"
import decor2 from "../assets/decor2.png"
import love from "../assets/love.png"
import mahashivratri from "../assets/mahashivratri.png"
import valentine from "../assets/valentine.png"
import banner4 from "../assets/banner/banner4.jpg"
import { MdArrowRightAlt } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import WhatsappandCallFeature from './WhatsappandCallFeature';
import PurchasePopup from './PurchasePopup';
import axios from 'axios';

import { navigateToSubcategory } from '../utils/navigationsUtils';
import { getAxios } from '../utils/api';


const occasions = [
  {
    src: bettertogether,
    title: "Better together",
    link: "/service"
  },
  {
    src: ring,
    title: "Ring Ceremony",
    link: "/ringceremonydecor"
  },
  {
    src: party,
    title: "Let's Party Decor",
    link: "/service"
  },
  {
    src: car,
    title: "Car Boot Decoration",
    link: "/service"
  },
  {
    src: housewarming,
    title: "House warming",
    link: "/service"
  },
  {
    src: retirement,
    title: "Retirement Decor",
    link: "/service"
  },
  {
    src: mundan,
    title: "Mundan Ceremony",
    link: "/service"
  },
  {
    src: ricecermony,
    title: "Rice Ceremony Decor",
    link: "/service"
  },
  {
    src: congratulationsDecor,
    title: "Congratulations Decor",
    link: "/service"
  },
  {
    src: halfSareeDecoration,
    title: "Half Saree Decoration",
    link: "/service"
  },
  {
    src: baptismdecoration,
    title: "Baptism Decoration",
    link: "/service"
  },
  {
    src: cardecorImg,
    title: "Car Decoration",
    link: "/service"
  },

]

const varities = [
  {
    src: kid,
    text: "Kids Birthday",
    link: "/kidsBirthdaydecor"
  },
  {
    src: adult,
    text: "Adult birthday Decoration",
    link: "/adultBirthdaydecor"
  },
  {
    src: welcomebaby,
    text: "Welcome Baby Decoration",
    link: "/welcomebabydecor"
  },
  {
    src: babyshower,
    text: "Baby Shower Decoration",
    link: "/babyshowerdecor"
  },
  {
    src: aniversary,
    text: "Anniversary Decoration",
    link: "/anniversarydecor"
  },
  {
    src: NamingCermony,
    text: "Naming Ceremony Decoration",
    link: "/namingceremonydecor"
  },
  {
    src: bday,
    text: "Entertainment",
    link: "/entertainmentdecor"
  },
  {
    src: Photography,
    text: "Photography",
    link: "/photography"
  },
  {
    src: proposal,
    text: "Proposal Decoration",
    link: "/service/",
  },
  {
    src: firstnight,
    text: "First Night Decoration",
    link: "/service",
  },
  {
    src: ballon,
    text: "Balloon Bouquet",
    link: "/service/",
  },
  {
    src: surprise,
    text: "Surprise Gifts",
    link: "/service/",
  },


]

const HomePage = () => {

  const [services, setServices] = useState([]);
  const [servicesbySubcategory, setServicesbySubcategory] = useState([]);
  const [banner, setBanner] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const upcomingBanner = banner.filter(item => item.bannerType === "upcoming banner");

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await getAxios().get(
        `/services/`
      );
      const { data } = response.data;
      setServices(data);
      // console.log(data)

    } catch (error) {
      console.error("Error fetching services:", error.message);
      setError("Failed to fetch services. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchServivesbySubcategory = async (subcategory) => {
    setLoading(true);
    try {
      const response = await getAxios().get(
        `/services/by-subcategory/${subcategory}`
      );
      const { data } = response.data;
      setServicesbySubcategory(data);
      // console.log("servicesbySubcategory", data)

    } catch (error) {
      console.error("Error fetching services:", error.message);
      setError("Failed to fetch services. Please try again later.");
    } finally {
      setLoading(false);
    }
  };


  const fetchBanner = async () => {
    try {
      const response = await getAxios().get(
        `/banners/`
      );
      const { data } = response.data;
      setBanner(data);
      // console.log("banner", data)
    } catch (error) {
      console.error("Error fetching banner:", error.message);
      setError("Failed to fetch banner. Please try again later.");
    }
  }

  useEffect(() => {
    fetchServices();
    fetchServivesbySubcategory("Kids Birthday")
    fetchBanner()
  }, []);



  const handleNavigation = (text, baseRoute) => {
    navigateToSubcategory({
      text,
      baseRoute,
      navigate,
      setLoading,
      setError,
    });
  };


  const handleWhatsappRedirect = (value) => {
    const message = `Hello, I want to know more about ${value} Decoration.`
    const encodedMessage = encodeURIComponent(message);
    const WhatsAppLink = `https://wa.me/919620558000?text=${encodedMessage}`;
    window.open(WhatsAppLink, "_blank")

  }

  return (
    <div className='container md:pt-24 pt-32  mx-auto'>
      {/* // Whatsapp and call Icons */}
      {/* <div className=" fixed bottom-5 right-5 lg:flex flex-col gap-3 z-50">
        <WhatsappandCallFeature />
      </div> */}

      <PurchasePopup />

      <SingleCarousel banner={banner} />
      <section className='lg:py-20 p-2 '>
        <h1 className=' font-bold text-center text-primary playfair-display lg:text-5xl text-2xl'>Upcoming Festivals</h1>
        <div className="relative flex justify-center md:py-10 py-4 cursor-pointer" onClick={() => handleNavigation("Festival Decoration", "/service/")} >
          <img src={`${upcomingBanner[0]?.bannerImage}`} alt="banner" className="w-full lg:h-[400px] md:h-[250px] h-[180px] object-cover rounded-2xl" />
        </div>

        <div>
          <img src={banner5} alt="banner" className='lg:py-10 w-screen' />
        </div>
        <div className='flex justify-center items-center max-w-4xl mx-auto lg:gap-72 gap-20'>
          {/* <Link to="/kidsBirthdaydecor" > */}
          <motion.div
            className="rounded-full text-center text-xl"
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: .5, ease: "easeOut" }}
            onClick={() => handleNavigation("Kids Birthday", "/kidsBirthdaydecor")}
          // viewport={{ once: true, amount: 0.2 }}
          >
            <img src={decor1} alt="img" className="" />
            <p className="py-3 md:text-2xl text-sm font-bold carter">
              Kids Decorations
            </p>
          </motion.div>
          {/* </Link> */}

          <motion.div
            className="rounded-full text-center mx-auto text-xl"
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: .5, ease: "easeOut" }}
            onClick={() => handleNavigation("Entertainment", "/entertainmentdecor")}
          // viewport={{ once: true, amount: 0.2 }}
          >
            <img src={decor2} alt="img" className="" />
            <p className="py-3 md:text-2xl text-sm font-bold carter ">
              Entertainment & Activities
            </p>
          </motion.div>


        </div>
      </section>

      <section className=''>
        <h1 className=' font-bold text-center text-primary poppins text-xl'>Serving All over Bangalores</h1>
        <h1 className='lg:text-4xl text-3xl tracking-tighter font-bold text-center playfair-display text-primary'>Make every Occasion Special</h1>
        <div className='grid grid-cols-2 lg:flex flex-wrap md:justify-between justify-center py-10 lg:gap-14 gap-y-5 lg:w-[80%] mx-auto px-4 lg:px-0 '>
          {varities.map((item, index) => (
            <div
              key={index}
              className='lg:my-5 md:rounded-[80px] rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-300'
              onClick={() => handleNavigation(item.text, item.link)}
            >
              <img src={item.src} alt={item.text} className='mx-auto lg:h-[400px] h-[170px] border-2 border-primary object-cover md:rounded-[80px] rounded-lg' />
              <p className='text-center md:text-2xl mx-2 px-2 text-black rounded-md py-3 carter my-3'>{item.text}</p>
            </div>
          ))}
        </div>

        <div className='flex flex-wrap lg:gap-x-40 lg:gap-y-20 md:gap-3 gap-1 justify-center lg:py-20 md:py-10 py-0 mx-auto lg:px-0 md:my-0 my-5'>
          {occasions.map((item, idx) => (
            <div
              key={idx}
              className='lg:w-[260px] md:w-[230px] w-[120px] cursor-pointer hover:shadow-lg transition-shadow duration-300'
              onClick={() => handleNavigation(item.title, item.link)}
            >
              <img src={item.src} alt={item.title} className='' />
              <p className='md:text-2xl text-center carter py-3 text-xs'>{item.title}</p>
            </div>
          ))}
        </div>



        <div className="relative flex justify-center lg:py-10" >
          <img src={banner6} alt="banner" className="w-full" />

          <div className="absolute top-1/2 lg:left-44 md:left-24 left-12 transform -translate-y-1/2     " onClick={() => handleWhatsappRedirect("Shop")}>
            <div className=' md:p-2 p-1  lg:w-[350px] md:w-[240px] w-[120px]  mx-auto'>
              <img src={shopDecor} alt="Shop decor" className="w-full max-h-full object-contain  " />
            </div>

            <p className="carter lg:text-3xl md:text-2xl text-xs text-center text-black ">Shop Opening Decoration</p>
          </div>

          <div className="absolute top-1/2 lg:right-44 md:right-24 right-12 transform -translate-y-1/2 " onClick={() => handleWhatsappRedirect("Office")} >
            <div className=' md:p-2 p-1  lg:w-[350px] md:w-[240px] w-[120px]  mx-auto'>
              <img src={officeDecor} alt="office decor" className="w-full max-h-full object-contain" />
            </div>
            <p className="carter lg:text-3xl md:text-2xl text-xs text-center text-black ">Office Decoration</p>
          </div>

        </div>
      </section>

      <section className='md:pt-10 pt-5  px-4 lg:px-0'>
        <div className='flex justify-between '>
          <p className='lg:text-2xl text-primary font-bold playfair-display'>Kids Celebration</p>
          <div className='text-secondary font-bold flex items-center text-sm md:text-base  ' onClick={() => handleNavigation("Kids Birthday", "/service/")}>View All <MdArrowRightAlt className='md:text-2xl text-xl ' /></div>
        </div>
        <CardCarousel centercardData={servicesbySubcategory} />

        <div className="relative md:flex hidden justify-center lg:py-10" >
          <img src={banner7} alt="banner" className="w-full" />
          <div className="absolute top-1/2 lg:left-44 md:left-24 left-12 transform -translate-y-1/2"
            onClick={() => handleNavigation("Bride to be Decoration", "/bridetobedecor")}
            style={{ cursor: 'pointer' }}>
            <div className=' lg:rounded-tr-[60px] lg:rounded-bl-[80px] rounded-tr-3xl rounded-bl-3xl lg:w-[420px] md:w-[240px] w-[120px]  mx-auto'>
              <img src={bride} alt="office decor" className="w-full max-h-full object-contain lg:rounded-tr-[60px] lg:rounded-bl-[80px] rounded-tr-3xl rounded-bl-3xl " />
            </div>
            <p className="carter lg:text-3xl md:text-xl text-xs text-center text-black lg:pt-4">Bride to be Decoration</p>
          </div>
          <div className="absolute top-1/2 lg:right-44 md:right-24 right-12 transform -translate-y-1/2"
            onClick={() => handleNavigation("Groom to be Decoration", "/groomtobedecor")}
            style={{ cursor: 'pointer' }}>
            <div className='  lg:rounded-tl-[60px] lg:rounded-br-[80px] rounded-tl-3xl rounded-br-3xl lg:w-[420px] md:w-[240px] w-[120px]  mx-auto'>
              <img src={groom} alt="office decor" className="w-full max-h-full object-contain lg:rounded-tl-[60px] lg:rounded-br-[80px] rounded-tl-3xl rounded-br-3xl " />
            </div>
            <p className="carter lg:text-3xl md:text-xl text-xs text-center text-black lg:pt-4">Groom to be Decoration</p>
          </div>
        </div>


        <div className="relative md:hidden " >
          <img src={bannermobile7} alt="banner" className="w-full" />
          <div className="absolute top-44  left-1/2 transform -translate-x-1/2 w-[300px]"
            onClick={() => handleNavigation("Bride to be Decoration", "/bridetobedecor")}
            style={{ cursor: 'pointer' }}>
            <p className="carter  text-2xl pb-5 text-center text-black ">Bride to be Decoration</p>
            <img src={bride} alt="office decor" className="w-full max-h-full object-contain " />
          </div>
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-[300px]"
            onClick={() => handleNavigation("Groom to be Decoration", "/groomtobedecor")}
            style={{ cursor: 'pointer' }}>
            <p className="carter text-2xl pb-5  text-center text-black ">Groom to be Decoration</p>
            <img src={groom} alt="office decor" className="w-full max-h-full object-contain  " />
          </div>
        </div>

        <div className='flex justify-between mt-5 '>
          <p className='lg:text-2xl text-primary font-bold playfair-display '>New Trendings Design</p>
          <div className='text-secondary font-bold flex items-center text-sm md:text-base cursor-pointer' onClick={() => navigate('/all-services')}>
            View All <MdArrowRightAlt className='md:text-2xl text-xl' />
          </div>
        </div>
        <CardCarousel centercardData={services} />
        <div className="relative lg:mt-44 md:mt-32 mt-16 mb-5 flex flex-col items-center" onClick={() => handleNavigation("Candlelight", "/service")}>
          <img src={banner8} alt="banner" className="w-full h-auto" />
          <div className="absolute lg:-top-24  md:-top-16 -top-8 lg:left-[9%] flex md:gap-4 gap-1 items-center  ">
            <img src={candleImg1} alt="candleImg1" className="lg:w-64 lg:h-56 md:w-40 md:h-32 w-20 h-20 object-cover rounded-s-3xl" />
            <img src={candleImg2} alt="candleImg2" className="lg:w-64 lg:h-56 md:w-40 md:h-32 w-20 h-20 object-cover" />
            <img src={candleImg3} alt="candleImg3" className="lg:w-64 lg:h-56 md:w-40 md:h-32 w-20 h-20 object-cover" />
            <img src={candleImg4} alt="candleImg4" className="lg:w-64 lg:h-56 md:w-40 md:h-32 w-20 h-20 object-cover rounded-e-3xl" />
          </div>

          <div className="absolute lg:bottom-24 bottom-4 left-1/2 transform -translate-x-1/2 text-center text-[#0a3f39] lg:space-y-6">
            <button className="lg:px-10 px-4 bg-[#0a3f39] text-white rounded-2xl lg:py-3 py-1 lg:text-xl font-semibold lg:mt-4">
              BOOK NOW
            </button>
          </div>
        </div>



      </section>

      <section className='pb-5'>
        <h1 className='lg:text-4xl text-2xl font-bold text-center  text-primary playfair-display'>Curating moments that shine </h1>
        <h1 className='text-sm font-bold text-center poppins text-primary'>Love designs, flawless execution, unforgattable results. </h1>

        {/* <div className='flex justify-end  lg:py-4 py-2 px-3 '>
          <Link to='#' className='text-secondary font-bold flex items-center text-sm md:text-base  '>View All <MdArrowRightAlt className='md:text-2xl text-xl ' /></Link>
        </div> */}
        <PhotoGrid />
      </section>


      <div className="relative flex justify-center lg:py-10" >
        <img src={banner9} alt="banner" className="w-full" />
        {/* <Link to="/service/7"> */}
        <div className="absolute top-1/2 lg:left-44 md:left-24 left-12 transform -translate-y-1/2     "
          onClick={() => handleNavigation("Haldi", "/service")}>
          <div className='bg-[#FF9500] md:p-2 p-1 lg:rounded-tr-[60px] lg:rounded-bl-[80px] rounded-tr-3xl rounded-bl-3xl lg:w-[420px] md:w-[240px] w-[120px]  mx-auto'>
            <img src={haldi} alt="office decor" className="w-full max-h-full object-contain lg:rounded-tr-[60px] lg:rounded-bl-[80px] rounded-tr-3xl rounded-bl-3xl " />
          </div>
          <p className="carter lg:text-3xl md:text-2xl text-xs text-center text-black lg:pt-4">Haldi Decoration</p>
        </div>
        {/* </Link> */}

        <div className="absolute top-1/2 lg:right-44 md:right-24 right-12 transform -translate-y-1/2   "
          onClick={() => handleNavigation("Mehendi", "/service")}>
          <div className='bg-[#FF9500] md:p-2 p-1 lg:rounded-tl-[60px] lg:rounded-br-[80px] rounded-tl-3xl rounded-br-3xl lg:w-[420px] md:w-[240px] w-[120px]  mx-auto'>

            <img src={Mehendi} alt="office decor" className="w-full max-h-full object-contain lg:rounded-tl-[60px] lg:rounded-br-[80px] rounded-tl-3xl rounded-br-3xl " />
          </div>
          <p className="carter lg:text-3xl md:text-2xl text-xs text-center text-black lg:pt-4">Mehendi Decoration</p>
        </div>

      </div>

      <section className='pt-10 text-primary lg:px-0 px-4'>
        <h1 className='text-xl font-bold  text-pimary'>Testimonials </h1>
        <h1 className='md:text-4xl text-2xl tracking-tighter font-bold lg:py-4  text-pimary'>Hear from our <span className='md:text-5xl text-3xl italic'>Lavish</span> Clients </h1>
        <h1 className='text-md tracking-tighter font-bold   text-pimary'>Reacl experience from our happy Clients </h1>
        <Testimonials />

      </section>

      {/* Loading and Error States */}
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            {/* <p className="text-lg">Loading...</p> */}
            <img src="images/loader.gif" alt="loading" className="w-20 h-20" />
          </div>
        </div>
      )}

      {error && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {error}
        </div>
      )}
    </div >
  )
}

export default HomePage
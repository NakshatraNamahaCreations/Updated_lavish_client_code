import React, { useEffect, useState } from "react";
import SingleCarousel from "./SingleCarousel";

import CardCarousel from "./CardCarousel";
import PhotoGrid from "./PhotoGrid";
import Testimonials from "./Testimonials";
import { MdArrowRightAlt } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PurchasePopup from "./PurchasePopup";
import { navigateToSubcategory } from "../utils/navigationsUtils";
import { getAxios } from "../utils/api";
import WhatsappandCallFeature from "./WhatsappandCallFeature"
import { useDispatch } from "react-redux";
import { resetCurrentOrder } from "../features/orderdetails/orderSlice";
import { persistor } from "../app/store";
import { Helmet } from "react-helmet-async";

const occasions = [
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/better_together.png",
    title: "Better together",
    link: "/service",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/ring.png",
    title: "Ring Ceremony",
    link: "/ringceremonydecor",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/party.png",
    title: "Let's Party Decor",
    link: "/service",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/car.png",
    title: "Car Boot Decoration",
    link: "/service",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/house_warming.png",
    title: "House warming",
    link: "/service",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/retirement.png",
    title: "Retirement Decor",
    link: "/service",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/mundan.png",
    title: "Mundan Ceremony",
    link: "/service",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/rice_cermony.png",
    title: "Rice Ceremony Decor",
    link: "/service",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/congratulations_Decor.png",
    title: "Congratulations Decor",
    link: "/service",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/half_Saree_Decoration.png",
    title: "Half Saree Decoration",
    link: "/service",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/baptism_Decoration.png",
    title: "Baptism Decoration",
    link: "/service",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/cardecorImg.png",
    title: "Car Decoration",
    link: "/service",
  },
];

const varities = [
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/kid_bday.png",
    text: "Kids Birthday",
    link: "/kidsBirthdaydecor",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/adult_bday.png",
    text: "Adult birthday Decoration",
    link: "/adultBirthdaydecor",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/wlcm_baby.png",
    text: "Welcome Baby Decoration",
    link: "/welcomebabydecor",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/baby_shower.png",
    text: "Baby Shower Decoration",
    link: "/babyshowerdecor",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/Aniversary.png",
    text: "Anniversary Decoration",
    link: "/anniversarydecor",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/Naming.png",
    text: "Naming Ceremony Decoration",
    link: "/namingceremonydecor",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/bday_party.png",
    text: "Entertainment",
    link: "/entertainmentdecor",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/photography.png",
    text: "Photography",
    link: "/photography",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/proposal.png",
    text: "Proposal Decoration",
    link: "/service/",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/first_night.png",
    text: "First Night Decoration",
    link: "/service",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/ballon.png",
    text: "Balloon Bouquet",
    link: "/service/",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/surprise.png",
    text: "Surprise Gifts",
    link: "/service/",
  },
];

const HomePage = () => {




  const [services, setServices] = useState([]);
  const [servicesbySubcategory, setServicesbySubcategory] = useState([]);
  const [banner, setBanner] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const hanlderesetCurrentOrder = async () => {
      if (persistor && persistor.purge) {
        await persistor.purge();
      }
      dispatch(resetCurrentOrder());
    };
    hanlderesetCurrentOrder();
  }, [dispatch]);

  const upcomingBanner = banner.filter(
    (item) => item.bannerType === "upcoming banner"
  );

  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await getAxios().get(`/services/`);
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
      const response = await getAxios().get(`/banners/`);
      const { data } = response.data;
      setBanner(data);
      // console.log("banner", data)
    } catch (error) {
      console.error("Error fetching banner:", error.message);
      setError("Failed to fetch banner. Please try again later.");
    }
  };

  useEffect(() => {
    fetchServices();
    fetchServivesbySubcategory("Kids Birthday");
    fetchBanner();
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
    const message = `Hello, I want to know more about ${value} Decoration.`;
    const encodedMessage = encodeURIComponent(message);
    const WhatsAppLink = `https://wa.me/919620558000?text=${encodedMessage}`;
    window.open(WhatsAppLink, "_blank");
  };

  return (

<>
<Helmet>
      {/* Primary Meta Tags */}
      <title>Event Management Company in Bangalore | Lavish Eventzz</title>
      <meta
        name="description"
        content="Lavish Eventzz is a professional event management company in Bangalore offering services for weddings, birthdays, corporate events, decor, and more."
      />
      <link rel="canonical" href="https://www.lavisheventzz.com" />
      <meta
        name="keywords"
        content="Event Management Company in Bangalore, Wedding Event Organizers in Bangalore, Birthday Party Planners Bangalore, Corporate Event Solutions Bangalore, Event Decor Services Bangalore, Luxury Event Planners in Bangalore"
      />

      {/* Open Graph Tags */}
      <meta property="og:title" content="Event Management Company in Bangalore | Lavish Eventzz" />
      <meta property="og:description" content="Lavish Eventzz is a professional event management company in Bangalore offering services for weddings, birthdays, corporate events, decor, and more." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.lavisheventzz.com" />
      <meta property="og:image" content="https://lavisheventzz-bangalore.b-cdn.net/banner/banner5.png" />
      <meta property="og:site_name" content="Lavish Eventzz" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Event Management Company in Bangalore | Lavish Eventzz" />
      <meta name="twitter:description" content="Lavish Eventzz is a professional event management company in Bangalore offering services for weddings, birthdays, corporate events, decor, and more." />
      <meta name="twitter:url" content="https://www.lavisheventzz.com/" />
      <meta name="twitter:image" content="https://lavisheventzz-bangalore.b-cdn.net/banner/banner5.png" />
      <meta name="twitter:site" content="@LavishEvents25" />

       {/* Schema.org JSON-LD - LocalBusiness */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Lavish Eventzz",
      "url": "https://www.lavisheventzz.com",
      "logo": "https://www.lavisheventzz.com/assets/logo-sUNpuNY_.png",
      "description": "Lavish Eventzz is a professional event management company in Bangalore offering services for weddings, birthdays, corporate events, decor, and more.",
      "telephone": "+91-9620558000",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "55, 17th Main Rd, RIEHS Layout, JC Nagar, Kurubarahalli, Basaweshwara Nagar",
        "addressLocality": "Bengaluru",
        "addressRegion": "Karnataka",
        "postalCode": "560086",
        "addressCountry": "IN"
      },
      "sameAs": [
        "https://www.facebook.com/people/Lavish-Eventzz/61577120475321/",
        "https://x.com/LavishEvents25",
        "https://www.youtube.com/@LavishEventzz-2025",
        "https://www.linkedin.com/in/lavish-eventzz-917b43366/",
        "https://www.instagram.com/lavisheventzz.com_/",
        "https://www.instagram.com/lavisheventzz"
      ],
      "openingHours": "Mo-Su 00:00-23:59",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "12.9155",
        "longitude": "77.5739"
      }
    })}
  </script>
    </Helmet>
    
    <div className="container md:pt-24 pt-32  mx-auto">
      {/* // Whatsapp and call Icons */}
      <div className=" fixed bottom-[100px] right-5 lg:flex flex-col gap-3 z-50">
        <WhatsappandCallFeature />
      </div>

      

      <PurchasePopup />

      <SingleCarousel banner={banner} />
      <section className="lg:py-20 p-2 ">
        <h2 className=" font-bold text-center text-primary playfair-display lg:text-5xl text-2xl">
          Upcoming Festivals
        </h2>
        <div
          className="relative flex justify-center md:py-10 py-4 cursor-pointer"
          onClick={() => handleNavigation("Festival Decoration", "/service/")}
        >
          <img
            src={`${upcomingBanner[0]?.bannerImage}`}
            alt="banner"
            className="w-full lg:h-[400px] md:h-[250px] h-[180px] object-cover rounded-2xl"
          />
        </div>

        <div>
          <img
            src="https://lavisheventzz-bangalore.b-cdn.net/banner/banner5.png"
            alt="banner"
            className="lg:py-10 w-screen"
          />
        </div>
        <div className="flex justify-center items-center max-w-4xl mx-auto lg:gap-72 gap-20">
          <motion.div
            className="rounded-full text-center text-xl"
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onClick={() =>
              handleNavigation("Kids Birthday", "/kidsBirthdaydecor")
            }
          >
            <img
              src="https://lavisheventzz-bangalore.b-cdn.net/decor1.png"
              alt="img"
              className=""
            />
            <p className="py-3 md:text-2xl text-sm font-bold carter">
              Kids Decorations
            </p>
          </motion.div>

          <motion.div
            className="rounded-full text-center mx-auto text-xl"
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            onClick={() =>
              handleNavigation("Entertainment", "/entertainmentdecor")
            }
          >
            <img
              src="https://lavisheventzz-bangalore.b-cdn.net/decor2.png"
              alt="img"
              className=""
            />
            <p className="py-3 md:text-2xl text-sm font-bold carter ">
              Entertainment & Activities
            </p>
          </motion.div>
        </div>
      </section>

      <section className="">
        <h2 className=" font-bold text-center text-primary poppins text-xl">
          Serving All over Bangalores
        </h2>
        <h1 className="lg:text-4xl text-3xl tracking-tighter font-bold text-center playfair-display text-primary">
          Make every Occasion Special
        </h1>
        <div className="grid grid-cols-2 lg:flex flex-wrap md:justify-between justify-center py-10 lg:gap-14 gap-y-5 lg:w-[80%] mx-auto px-4 lg:px-0 ">
          {varities.map((item, index) => (
            <div
              key={index}
              className="lg:my-5 md:rounded-[80px] rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => handleNavigation(item.text, item.link)}
            >
              <img
                src={item.src}
                alt={item.text}
                className="mx-auto lg:h-[400px] h-[170px] border-2 border-primary object-cover md:rounded-[80px] rounded-lg"
              />
              <p className="text-center md:text-2xl mx-2 px-2 text-black rounded-md py-3 carter my-3">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap lg:gap-x-40 lg:gap-y-20 md:gap-3 gap-1 justify-center lg:py-20 md:py-10 py-0 mx-auto lg:px-0 md:my-0 my-5">
          {occasions.map((item, idx) => (
            <div
              key={idx}
              className="lg:w-[260px] md:w-[230px] w-[120px] cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => handleNavigation(item.title, item.link)}
            >
              <img src={item.src} alt={item.title} className="" />
              <p className="md:text-2xl text-center carter py-3 text-xs">
                {item.title}
              </p>
            </div>
          ))}
        </div>

        <div className="relative flex justify-center lg:py-10">
          <img
            src="https://lavisheventzz-bangalore.b-cdn.net/banner/banner6.png"
            alt="banner"
            className="w-full"
          />

          <div
            className="absolute top-1/2 lg:left-44 md:left-24 left-12 transform -translate-y-1/2     "
            onClick={() => handleWhatsappRedirect("Shop")}
          >
            <div className=" md:p-2 p-1  lg:w-[350px] md:w-[240px] w-[120px]  mx-auto">
              <img
                src="https://lavisheventzz-bangalore.b-cdn.net/shop_decoration.png"
                alt="Shop decor"
                className="w-full max-h-full object-contain  "
              />
            </div>

            <p className="carter lg:text-3xl md:text-2xl text-xs text-center text-black ">
              Shop Opening Decoration
            </p>
          </div>

          <div
            className="absolute top-1/2 lg:right-44 md:right-24 right-12 transform -translate-y-1/2 "
            onClick={() => handleWhatsappRedirect("Office")}
          >
            <div className=" md:p-2 p-1  lg:w-[350px] md:w-[240px] w-[120px]  mx-auto">
              <img
                src="https://lavisheventzz-bangalore.b-cdn.net/office_decor.png"
                alt="office decor"
                className="w-full max-h-full object-contain"
              />
            </div>
            <p className="carter lg:text-3xl md:text-2xl text-xs text-center text-black ">
              Office Decoration
            </p>
          </div>
        </div>
      </section>

      <section className="md:pt-10 pt-5  px-4 lg:px-0">
        <div className="flex justify-between ">
          <p className="lg:text-2xl text-primary font-bold playfair-display">
            Kids Celebration
          </p>
          <div
            className="text-secondary font-bold flex items-center text-sm md:text-base  "
            onClick={() => handleNavigation("Kids Birthday", "/service/")}
          >
            View All <MdArrowRightAlt className="md:text-2xl text-xl " />
          </div>
        </div>
        <CardCarousel centercardData={servicesbySubcategory} />

        <div className="relative md:flex hidden justify-center lg:py-10">
          <img src="https://lavisheventzz-bangalore.b-cdn.net/banner/banner7.png" alt="banner" className="w-full" />
          <div
            className="absolute top-1/2 lg:left-44 md:left-24 left-12 transform -translate-y-1/2"
            onClick={() =>
              handleNavigation("Bride to be Decoration", "/bridetobedecor")
            }
            style={{ cursor: "pointer" }}
          >
            <div className=" lg:rounded-tr-[60px] lg:rounded-bl-[80px] rounded-tr-3xl rounded-bl-3xl lg:w-[420px] md:w-[240px] w-[120px]  mx-auto">
              <img
                src="https://lavisheventzz-bangalore.b-cdn.net/bridetobe_decor.png"
                alt="office decor"
                className="w-full max-h-full object-contain lg:rounded-tr-[60px] lg:rounded-bl-[80px] rounded-tr-3xl rounded-bl-3xl "
              />
            </div>
            <p className="carter lg:text-3xl md:text-xl text-xs text-center text-black lg:pt-4">
              Bride to be Decoration
            </p>
          </div>
          <div
            className="absolute top-1/2 lg:right-44 md:right-24 right-12 transform -translate-y-1/2"
            onClick={() =>
              handleNavigation("Groom to be Decoration", "/groomtobedecor")
            }
            style={{ cursor: "pointer" }}
          >
            <div className="  lg:rounded-tl-[60px] lg:rounded-br-[80px] rounded-tl-3xl rounded-br-3xl lg:w-[420px] md:w-[240px] w-[120px]  mx-auto">
              <img
                src="https://lavisheventzz-bangalore.b-cdn.net/groomtobe_decor.png"
                alt="office decor"
                className="w-full max-h-full object-contain lg:rounded-tl-[60px] lg:rounded-br-[80px] rounded-tl-3xl rounded-br-3xl "
              />
            </div>
            <p className="carter lg:text-3xl md:text-xl text-xs text-center text-black lg:pt-4">
              Groom to be Decoration
            </p>
          </div>
        </div>

        <div className="relative md:hidden ">
          <img src="https://lavisheventzz-bangalore.b-cdn.net/banner/bannermobile7.png" alt="banner" className="w-full" />
          <div
            className="absolute top-44  left-1/2 transform -translate-x-1/2 w-[300px]"
            onClick={() =>
              handleNavigation("Bride to be Decoration", "/bridetobedecor")
            }
            style={{ cursor: "pointer" }}
          >
            <p className="carter  text-2xl pb-5 text-center text-black ">
              Bride to be Decoration
            </p>
            <img
              src="https://lavisheventzz-bangalore.b-cdn.net/bridetobe_decor.png"
              alt="office decor"
              className="w-full max-h-full object-contain "
            />
          </div>
          <div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-[300px]"
            onClick={() =>
              handleNavigation("Groom to be Decoration", "/groomtobedecor")
            }
            style={{ cursor: "pointer" }}
          >
            <p className="carter text-2xl pb-5  text-center text-black ">
              Groom to be Decoration
            </p>
            <img
              src="https://lavisheventzz-bangalore.b-cdn.net/groomtobe_decor.png"
              alt="office decor"
              className="w-full max-h-full object-contain  "
            />
          </div>
        </div>

        <div className="flex justify-between mt-5 ">
          <p className="lg:text-2xl text-primary font-bold playfair-display ">
            New Trendings Design
          </p>
          <div
            className="text-secondary font-bold flex items-center text-sm md:text-base cursor-pointer"
            onClick={() => navigate("/all-services")}
          >
            View All <MdArrowRightAlt className="md:text-2xl text-xl" />
          </div>
        </div>
        <CardCarousel centercardData={services} />
        <div
          className="relative lg:mt-44 md:mt-32 mt-16 mb-5 flex flex-col items-center"
          onClick={() => handleNavigation("Candlelight", "/service")}
        >
          <img src="https://lavisheventzz-bangalore.b-cdn.net/banner/banner8.png" alt="banner" className="w-full h-auto" />
          <div className="absolute lg:-top-24  md:-top-16 -top-8 lg:left-[9%] flex md:gap-4 gap-1 items-center  ">
            <img
              src="https://lavisheventzz-bangalore.b-cdn.net/candleImg1.png"
              alt="candleImg1"
              className="lg:w-64 lg:h-56 md:w-40 md:h-32 w-20 h-20 object-cover rounded-s-3xl"
            />
            <img
              src="https://lavisheventzz-bangalore.b-cdn.net/candleImg2.png"
              alt="candleImg2"
              className="lg:w-64 lg:h-56 md:w-40 md:h-32 w-20 h-20 object-cover"
            />
            <img
              src="https://lavisheventzz-bangalore.b-cdn.net/candleImg3.png"
              alt="candleImg3"
              className="lg:w-64 lg:h-56 md:w-40 md:h-32 w-20 h-20 object-cover"
            />
            <img
              src="https://lavisheventzz-bangalore.b-cdn.net/candleImg4.png"
              alt="candleImg4"
              className="lg:w-64 lg:h-56 md:w-40 md:h-32 w-20 h-20 object-cover rounded-e-3xl"
            />
          </div>

          <div className="absolute lg:bottom-24 bottom-4 left-1/2 transform -translate-x-1/2 text-center text-[#0a3f39] lg:space-y-6">
            <button className="lg:px-10 px-4 bg-[#0a3f39] text-white rounded-2xl lg:py-3 py-1 lg:text-xl font-semibold lg:mt-4">
              BOOK NOW
            </button>
          </div>
        </div>
      </section>

      <section className="pb-5">
        <h2 className="lg:text-4xl text-2xl font-bold text-center  text-primary playfair-display">
          Curating moments that shine{" "}
        </h2>
        <h2 className="text-sm font-bold text-center poppins text-primary">
          Love designs, flawless execution, unforgattable results.{" "}
        </h2>

        {/* <div className='flex justify-end  lg:py-4 py-2 px-3 '>
          <Link to='#' className='text-secondary font-bold flex items-center text-sm md:text-base  '>View All <MdArrowRightAlt className='md:text-2xl text-xl ' /></Link>
        </div> */}
        <PhotoGrid />
      </section>

      <div className="relative flex justify-center lg:py-10">
        <img src="https://lavisheventzz-bangalore.b-cdn.net/banner/banner9.png" alt="banner" className="w-full" />
        {/* <Link to="/service/7"> */}
        <div
          className="absolute top-1/2 lg:left-44 md:left-24 left-12 transform -translate-y-1/2     "
          onClick={() => handleNavigation("Haldi", "/service")}
        >
          <div className="bg-[#FF9500] md:p-2 p-1 lg:rounded-tr-[60px] lg:rounded-bl-[80px] rounded-tr-3xl rounded-bl-3xl lg:w-[420px] md:w-[240px] w-[120px]  mx-auto">
            <img
              src="https://lavisheventzz-bangalore.b-cdn.net/haldi.png"
              alt="office decor"
              className="w-full max-h-full object-contain lg:rounded-tr-[60px] lg:rounded-bl-[80px] rounded-tr-3xl rounded-bl-3xl "
            />
          </div>
          <p className="carter lg:text-3xl md:text-2xl text-xs text-center text-black lg:pt-4">
            Haldi Decoration
          </p>
        </div>
        {/* </Link> */}

        <div
          className="absolute top-1/2 lg:right-44 md:right-24 right-12 transform -translate-y-1/2   "
          onClick={() => handleNavigation("Mehendi", "/service")}
        >
          <div className="bg-[#FF9500] md:p-2 p-1 lg:rounded-tl-[60px] lg:rounded-br-[80px] rounded-tl-3xl rounded-br-3xl lg:w-[420px] md:w-[240px] w-[120px]  mx-auto">
            <img
              src="https://lavisheventzz-bangalore.b-cdn.net/Mehendi.png"
              alt="office decor"
              className="w-full max-h-full object-contain lg:rounded-tl-[60px] lg:rounded-br-[80px] rounded-tl-3xl rounded-br-3xl "
            />
          </div>
          <p className="carter lg:text-3xl md:text-2xl text-xs text-center text-black lg:pt-4">
            Mehendi Decoration
          </p>
        </div>
      </div>

      <section className="pt-10 text-primary lg:px-0 px-4">
        <h2 className="text-xl font-bold  text-pimary">Testimonials </h2>
        <h2 className="md:text-4xl text-2xl tracking-tighter font-bold lg:py-4  text-pimary">
          Hear from our{" "}
          <span className="md:text-5xl text-3xl italic">Lavish</span> Clients{" "}
        </h2>
        <h2 className="text-md tracking-tighter font-bold   text-pimary">
          Reacl experience from our happy Clients{" "}
        </h2>
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
    </div>
    </>
  );
};

export default HomePage;

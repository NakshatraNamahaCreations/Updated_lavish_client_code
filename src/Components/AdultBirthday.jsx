import React, { useEffect, useState } from "react";
import adultBanner1 from "../assets/banner/adultBanner1.png";
import adultBanner2 from "../assets/banner/photoshootBday.png";
import adultBanner3 from "../assets/banner/trustedBanner.png";
import adultBanner4 from "../assets/banner/adultbanner4.png";

import bdayGallery1 from "../assets/bday/adultbday/gallery1.png";
import bdayGallery2 from "../assets/bday/adultbday/gallery2.png";

import bdayGallery3 from "../assets/services/gallery3.png";
import bdayGallery4 from "../assets/bday/adultbday/gallery4.png";
import bdayGallery5 from "../assets/bday/adultbday/gallery5.png";
import bdayGallery6 from "../assets/bday/adultbday/gallery6.png";
import bdayGallery7 from "../assets/bday/adultbday/gallery7.png";

import sash from "../assets/bday/add_ons/sash.png";
import welcomeboard from "../assets/bday/add_ons/welcomeboard.png";
import flwrbouqt from "../assets/bday/add_ons/flwrbouqt.png";
import photography from "../assets/bday/add_ons/photography.png";
import cakes from "../assets/bday/add_ons/cakes.png";
import FAQ from "./FAQ";
import video from "../assets/services/video.mp4";
import Testimonials from "./Testimonials";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAuthAxios, getAxios } from "../utils/api";
import CardCarousel from "./CardCarousel";
import { navigateToSubcategory } from "../utils/navigationsUtils";

const addOns = [
  {
    src: sash,
    title: "Sash",
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
    title: "Cakes",
  },
];

const AdultBirthday = () => {

  const [subSubCategories, setSubSubCategories] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [recentPurchase, setRecentPurchase] = useState([]);
  const [serviceDetails, setServiceDetails] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const { subcat_id } = useParams();
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
      const response = await getAxios().get(`/services/filter/${subcat_id}`);
  
      const data = response.data;
  
      if (response.status === 404) {
        console.warn("No services found for this subcategory.");
        setAllServices([]);
        return;
      }
  
      if (data.success) {
        console.log("data", data.data);
        setAllServices(data.data);
      } else {
        console.warn("API returned success: false");
        setAllServices([]);
      }
  
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.warn("No services found (404).");
        setAllServices([]);
      } else {
        console.error("Error fetching services:", error.message);
      }
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
    <div className="lg:py-24 md:pt-20 pt-32  p-3  mx-auto">
      <div>
        <img src={adultBanner1} className="mx-auto w-[1600px]" />
      </div>

      <div className="grid grid-cols-2 md:gap-10 gap-3  place-items-center lg:my-10 my-5 ">

        {subSubCategories.map((item, idx) => (
          <div className="relative" key={item._id}>
            <Link to={`/service/${item._id}`}>

              <img
                src={`${item.image}`}
                alt={item.subSubCategory}
                className="rounded-3xl "
              />
            </Link>

          </div>
        ))}
      </div>


      <div className="mt-5 px-10">
        <div className="flex justify-between">
          <p className="lg:text-2xl text-primary font-bold playfair-display">
            All Decoration Service
          </p>
        </div>

        {allServices.length > 0 ? (
          <CardCarousel centercardData={allServices} />
        ) : (
          <p className="text-gray-500 text-center mt-4">Simple Decoration Service Not Found</p>
        )}
      </div>



      {/* Add ons */}
      <div className="relative inset-0 flex flex-col items-center justify-center text-center gap-5 my-10">
        <img
          src={adultBanner4}
          alt="adultBanner4"
          className="w-[2000px] mx-auto "
        />
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

      {/* gallery */}
      <div className="relative mx-auto text-center lg:mt-10">
        <p className="md:py-8 py-4 font-bold poppins md:text-2xl">
          #AdultsBirthdayDecorationBestMovements
        </p>
        <div className="flex justify-center items-center gap-1">
          <div className="place-items-end lg:space-y-2  space-y-1">
            <img src={bdayGallery1} className=" lg:h-40 md:h-28 h-10" />
            <img src={bdayGallery2} className=" lg:h-64  " />
            <div className=" bg-gray-600 relative overflow-hidden rounded md:h-20 md:w-36 lg:w-auto lg:h-auto h-8 w-16">
              <img src={bdayGallery3} className="rounded" />
              <video
                className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
                src={video}
                autoPlay
                loop
                muted
              />
            </div>
          </div>
          <div>
            <img src={bdayGallery4} />
          </div>
          <div className="lg:space-y-2 space-y-1">
            <img src={bdayGallery5} />
            <img src={bdayGallery6} />
          </div>
          <div>
            <img src={bdayGallery7} />
          </div>
        </div>
        <p className="lg:absolute bottom-10 right-2 [text-shadow:_-4px_4px_3px_#7D7C7C] playfair-display md:text-7xl text-4xl font-bold text-[#FFD1D1]">
          Magical Moments
        </p>
      </div>


      <div className="md:pt-20 py-5" onClick={() => handleNavigation("photography", "/photography")}>
        <img src={adultBanner2} className="mx-auto w-[2000px]" />
      </div>


      {customerId && <div className="md:pt-10 pt-7">
        <p className="font-bold poppins md:text-2xl">Recently Purchased</p>
        <CardCarousel centercardData={serviceDetails} />
      </div>}

      <div className="">
        <p className="font-bold poppins md:py-6 pb-4 md:text-2xl">
          Why Celebrate With Lavisheventzz
        </p>
        <img src={adultBanner3} className="mx-auto w-[1600px]" />
      </div>

      <div className="my-4">
        <p className="text-center font-bold poppins text-2xl">FAQs</p>
        <p className="text-center font-bold poppins text-sm">
          Need help? Contact us for any queries related to us
        </p>
        <div className="lg:w-[70%]  md:w-[80%] mx-auto my-6">
          <p className="font-bold poppins py-8 ">
            Pick a query related to your issue
          </p>
          <FAQ />
          {/* <FAQServices/> */}
        </div>
      </div>

      <div>
        <p className="font-bold poppins md:text-2xl">Recent Customer Reviews</p>
        <Testimonials />
      </div>
      <div className="md:px-10 px-4">
        <p className="font-bold poppins py-8 text-2xl">
          Hire the Best Balloon Decorators for Adult's Birthday Party
        </p>
        <p className="font-bold">
          Planning a magical birthday celebration for your special one? Look no
          further! We specialize in creative and eye-catching balloon
          decorations that transform any space into a fun-filled wonderland. Our
          expert decorators bring your child’s favorite themes to life with
          vibrant colors, unique designs, and playful arrangements. Whether
          you're hosting an indoor gathering or an outdoor extravaganza, we
          tailor every detail to match your chosen theme and venue. From
          stunning balloon arches and adorable centerpieces to fun balloon
          sculptures and customized bouquets, we add that special touch to make
          the day unforgettable. Let us handle the decorations while you focus
          on making memories. Book your Adult's birthday balloon décor with us
          today and watch the magic unfold!
        </p>
      </div>
    </div>
  );
};

export default AdultBirthday;

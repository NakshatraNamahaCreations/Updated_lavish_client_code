import React, { useEffect, useState } from "react";
import ringceremonyBanner from "../assets/banner/ringceremonyBanner.png";
import engagementBanner2 from "../assets/banner/photoshootring.png";
import adultBanner3 from "../assets/banner/trustedBanner.png";
import addonsbanner from "../assets/banner/addonsbanner.png";

import img1 from "../assets/butterfly_theme.png";
import img2 from "../assets/candleImg3.png";
import img3 from "../assets/categoryimg1.png";
import img4 from "../assets/categoryimg8.png";
import img5 from "../assets/momentsgallery7.png";
import img6 from "../assets/navImg4.png";
import decor1 from "../assets/services/ceremonydecor1.png";
import decor2 from "../assets/services/ceremonydecor2.png";

import gallery1 from "../assets/services/ringcer1.png";
import gallery2 from "../assets/services/ringcer2.png";
import gallery3 from "../assets/services/gallery3.png";
import gallery4 from "../assets/services/ringcer4.png";
import gallery5 from "../assets/services/ringcer5.png";
import gallery6 from "../assets/services/ringcer6.png";
import gallery7 from "../assets/services/ringcer7.png";


import sash from "../assets/services/sash.png";
import cakes from "../assets/services/cakes.png";
import chairs from "../assets/services/chairs.png";
import envites from "../assets/services/envites.png";
import photography from "../assets/services/photography.png";
import welcomeboard from "../assets/services/welcomeboard.png";
import flwrbouqt from "../assets/services/flwrbouqt.png";
import activity from "../assets/services/activity.png";
import video from "../assets/services/video.mp4";
import { Link, useNavigate, useParams } from "react-router-dom";
import { service } from "../json/services";
import { MdArrowRightAlt } from "react-icons/md";
import ServiceSlider from "./ServiceSlider";

import FAQ from "./FAQ";
import Testimonials from "./Testimonials";
import CancellationPolicy from "./CancellationPolicy";
import { getAuthAxios, getAxios } from "../utils/api";
import CardCarousel from "./CardCarousel";
import axios from "axios";
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
  {
    src: activity,
    title: "Activity",
  },
  {
    src: chairs,
    title: "Chairs",
  },
  {
    src: envites,
    title: "Envites",
  },
];



const RingCermony = () => {
  const [premiumData, setPremiumdata] = useState([]);
  const [simpleData, setSimpledata] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
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

  const fetchServices = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/services/filter/${subcat_id}`
      );

      const data = await response.json();

      // If the response is not OK but contains a known 404 message, treat it gracefully
      if (!response.ok && response.status === 404) {
        console.warn("No services found for this subcategory.");
        setSimpledata([]);
        setPremiumdata([]);
        return;
      }

      if (!response.ok) {
        throw new Error(`Failed to fetch services: ${response.statusText}`);
      }

      if (data.success) {
        const simpleData = data.data.filter(
          (item) =>
            item.subSubCategoryId?.subSubCategory?.toLowerCase() ===
            "simple decoration"
        );

        const premiumData = data.data.filter(
          (item) =>
            item.subSubCategoryId?.subSubCategory?.toLowerCase() ===
            "premium decoration"
        );

        setSimpledata(simpleData);
        setPremiumdata(premiumData);
      } else {
        // API responded but without success — treat it as "no data"
        console.warn("API returned success: false");
        setSimpledata([]);
        setPremiumdata([]);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      // Optional: Show a user-friendly message to the UI
      setSimpledata([]);
      setPremiumdata([]);
    }
  };


  const fetchSubSubcategoriesBySubCategory = async () => {
    if (!subcat_id) return;
    try {
      const res = await getAxios().get(
        `/subsubcategories/subcategory/${subcat_id}`
      );
      setSubSubCategories(res.data.data);
    } catch (err) {
      console.error("error", err);
      setError("Failed to load subcategories");
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
        <img src={ringceremonyBanner} className="mx-auto w-[1600px]" />
      </div>

      <div className="grid grid-cols-2 md:gap-10 gap-3  place-items-center md:my-16 mt-4 md:mx-10">
        {subSubCategories.map((item, idx) => {
          return (
            <div className="relative" key={item._id}>
              {/* <Link to={subSubAvailable ? `/service/${item.sub_SubId}` : `/service/${item.subId}`}> */}
              <Link to={`/service/${item._id}`}>
                <img
                  src={`http://localhost:5000/images/${item.image}`}
                  alt={item.subSubCategory}
                  className="rounded-3xl w-[500px] "
                />
                <p className="text-primary pt-4 md:text-3xl text-xl text-center font-medium carter">
                  {item.subSubCategory}
                </p>
              </Link>
            </div>
          );
        })}
      </div>


      <div className="px-10">

        {/* Simple Decoration Section */}
        <div className="mt-5">
          <div className="flex justify-between">
            <p className="lg:text-2xl text-primary font-bold playfair-display">
              Simple Decoration Service
            </p>

          </div>

          {simpleData.length > 0 ? (
            <CardCarousel centercardData={simpleData} />
          ) : (
            <p className="text-gray-500 text-center mt-4">Simple Decoration Service Not Found</p>
          )}
        </div>

        {/* Premium Decoration Section */}
        <div className="mt-10">
          <div className="flex justify-between">
            <p className="lg:text-2xl text-primary font-bold playfair-display">
              Premium Decoration Service
            </p>

          </div>

          {premiumData.length > 0 ? (
            <CardCarousel centercardData={premiumData} />
          ) : (
            <p className="text-gray-500 text-center mt-4">Premium Decoration Service Not Found</p>
          )}
        </div>

      </div>

      {/* Add ons */}
      <div className="relative inset-0 flex flex-col items-center justify-center text-center gap-5 md:my-10 my-4">
        <img
          src={addonsbanner}
          alt="adultBanner4"
          className="w-[2000px] mx-auto max-h-[650px]"
        />
        <h1 className="absolute top-4 md:text-4xl  text-sm font-bold text-[#1C256C] playfair-display lg:w-[50%]">
          Make It Unforgettable with Our Exclusive Add-Ons!
        </h1>
        <div className="absolute top-14  md:top-36 grid grid-cols-4  lg:gap-10  gap-2 place-items-center ">
          {addOns.map((item, idx) => (
            <img
              key={idx}
              src={item.src}
              className="cursor-pointer object-cover lg:px-10 md:px-4 px-1"
            />
          ))}
        </div>
      </div>

      {/* gallery */}
      <div className="relative mx-auto text-center lg:mt-10">
        <p className="md:py-8 py-4 font-bold poppins md:text-2xl">
          #RingCeremonyDecorationBestMovements
        </p>
        <div className="flex justify-center items-center gap-1">
          <div className="place-items-end lg:space-y-2  space-y-1">
            <img src={gallery1} className=" lg:h-40 md:h-28 h-10" />
            <img src={gallery2} className=" lg:h-64  " />
            <div className=" bg-gray-600 relative overflow-hidden rounded md:h-20 md:w-36 lg:w-auto lg:h-auto h-8 w-16">
              <img src={gallery3} className="rounded" />
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
            <img src={gallery4} />
          </div>
          <div className="lg:space-y-2 space-y-1">
            <img src={gallery5} />
            <img src={gallery6} />
          </div>
          <div>
            <img src={gallery7} />
          </div>
        </div>
        <p className="lg:absolute bottom-10 right-2 [text-shadow:_-4px_4px_3px_#7D7C7C] playfair-display md:text-7xl text-4xl font-bold text-[#FFD1D1]">
          Wonderful Moments
        </p>
      </div>

      <div className="md:pt-20 py-5" onClick={() => handleNavigation("photography", "/photography")}>
        <img src={engagementBanner2} className="mx-auto w-[2000px]" />
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
          Hire the Best Balloon Decorators for Your Ring Ceremony Celebration
        </p>
        <p className="font-bold">
          Make your ring ceremony truly magical with elegant and romantic
          balloon décor! Our expert decorators craft breathtaking designs, from
          dreamy balloon arches and sophisticated centerpieces to personalized
          arrangements that perfectly complement your theme. Whether you're
          hosting an intimate gathering or a grand celebration, we ensure every
          detail enhances the beauty of your special moment. Let us create a
          charming ambiance while you focus on celebrating love and
          togetherness. Book your ring ceremony balloon décor today and make
          your day unforgettable!
        </p>
      </div>
    </div>
  );
};

export default RingCermony;

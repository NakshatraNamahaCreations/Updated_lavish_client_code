import React, { useEffect, useState } from "react";

import sash from "../assets/bday/add_ons/sash.png";
import welcomeboard from "../assets/bday/add_ons/welcomeboard.png";
import flwrbouqt from "../assets/bday/add_ons/flwrbouqt.png";
import photography from "../assets/bday/add_ons/photography.png";
import cakes from "../assets/bday/add_ons/cakes.png";
import FAQ from "./FAQ";
import Testimonials from "./Testimonials";
import { Link, useNavigate, useParams } from "react-router-dom";
import {  getAxios } from "../utils/api";
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



const Anniversary = () => {
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

  const fetchSubSubcategoriesBySubCategory = async () => {
    if (!subcat_id) return;
    try {
      const res = await getAxios().get(
        `/subsubcategories/subcategory/${subcat_id}`
      );
      setSubSubCategories(res.data.data);
      // console.log("subSubCategories", res.data.data);
    } catch (err) {
      console.error("error", err);
      setError("Failed to load subcategories");
    }
  };

  const fetchServices = async () => {
    try {
      const { data, status } = await getAxios().get(
        `/services/filter/${subcat_id}`
      );
  
      // Handle 404 Not Found
      if (status === 404 || !data.success || !Array.isArray(data.data)) {
        console.warn("No valid services found.");
        setSimpledata([]);
        setPremiumdata([]);
        return;
      }
  
      const services = data.data;
  
      // Filter decorations by type
      const simpleData = services.filter(
        item =>
          item.subSubCategoryId?.subSubCategory?.toLowerCase() === 'simple decoration'
      );
  
      const premiumData = services.filter(
        item =>
          item.subSubCategoryId?.subSubCategory?.toLowerCase() === 'premium decoration'
      );
  
      setSimpledata(simpleData);
      setPremiumdata(premiumData);
  
    } catch (error) {
      console.error("Error fetching services:", error?.response?.data?.message || error.message);
      setSimpledata([]);
      setPremiumdata([]);
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
    fetchServices();
    fetchSubSubcategoriesBySubCategory();
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
        <img src="https://lavisheventzz-bangalore.b-cdn.net/banner/anniversaryBanner1.png" className="mx-auto w-[1600px]" />
      </div>

      <div className="grid grid-cols-2 gap-10  md:place-items-center lg:mt-10 mt-5">
        {subSubCategories.map((item, idx) => (
          <div className="relative" key={item._id}>
            <Link to={`/service/${item._id}`}>
              {" "}
              <img
                src={`${item?.image}`}
                alt={item.subSubCategory}
                className="rounded-3xl w-[500px] "
              />

            </Link>
          </div>
        ))}
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
      <div className="relative inset-0 flex flex-col items-center justify-center text-center gap-5 my-10">
        <img
          src="https://lavisheventzz-bangalore.b-cdn.net/banner/adultbanner4.png"
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

      <div className="relative mx-auto text-center lg:mt-10">
        <p className="md:py-8 py-4 font-bold poppins md:text-2xl">
          #AnniversaryDecorationBestMovements
        </p>
        <div className="flex justify-center items-center gap-1">
          <div className="place-items-end lg:space-y-2  space-y-1">
            <img src="https://lavisheventzz-bangalore.b-cdn.net/Anniversary/anniversary1.png" className=" lg:h-40 md:h-28 h-10" />
            <img src="https://lavisheventzz-bangalore.b-cdn.net/Anniversary/anniversary2.png" className=" lg:h-64  " />
            <img src="https://lavisheventzz-bangalore.b-cdn.net/image.jpg" className=" lg:h-40 md:h-28 h-10 rounded-xl" />
            {/* <div className=" bg-gray-600 relative overflow-hidden rounded md:h-20 md:w-36 lg:w-auto lg:h-auto h-8 w-16">
              <img src="https://lavisheventzz-bangalore.b-cdn.net/groomtobe/gallery3.png" className="rounded" />
              <video
                className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
                src="https://lavisheventzz-bangalore.b-cdn.net/groomtobe/video.mp4"
                autoPlay
                loop
                muted
              />
            </div> */}
          </div>
          <div>
            <img src="https://lavisheventzz-bangalore.b-cdn.net/Anniversary/anniversary4.png" />
          </div>
          <div className="lg:space-y-2 space-y-1">
            <img src="https://lavisheventzz-bangalore.b-cdn.net/Anniversary/anniversary5.png" />
            <img src="https://lavisheventzz-bangalore.b-cdn.net/Anniversary/anniversary6.png" />
          </div>
          <div>
            <img src="https://lavisheventzz-bangalore.b-cdn.net/Anniversary/anniversary7.png" />
          </div>
        </div>
        <p className="lg:absolute bottom-10 right-2 [text-shadow:_-4px_4px_3px_#7D7C7C] playfair-display md:text-7xl text-4xl font-bold text-[#FFD1D1]">
          Magical Moments
        </p>
      </div>

      <div className="md:pt-20 py-5" onClick={() => handleNavigation("photography", "/photography")}>
        <img src="https://lavisheventzz-bangalore.b-cdn.net/banner/photoshootAnniversary.png" className="mx-auto w-[2000px]" />
      </div>

      {customerId && <div className="md:pt-10 pt-7">
        <p className="font-bold poppins md:text-2xl">Recently Purchased</p>
        <CardCarousel centercardData={serviceDetails} />
      </div>}
      <div className="">
        <p className="font-bold poppins md:py-6 pb-4 md:text-2xl">
          Why Celebrate With Lavisheventzz
        </p>
        <img src="https://lavisheventzz-bangalore.b-cdn.net/banner/trustedBanner.png" className="mx-auto w-[1600px]" />
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
          Hire the Best Balloon Decorators for Your Anniversary's Party
        </p>
        <p className="font-bold">
          Make your anniversary celebration truly special with stunning balloon
          décor! Our expert decorators transform any venue into a romantic and
          elegant setting, perfect for commemorating your love. From
          sophisticated balloon arches and beautiful centerpieces to custom
          arrangements that match your theme, we create a magical ambiance for
          your special day. Whether it's an intimate dinner or a grand
          celebration, we tailor every detail to suit your vision. Let us handle
          the decorations while you cherish unforgettable moments with your
          loved ones. Book your anniversary balloon décor today and celebrate in
          style!
        </p>
      </div>
    </div>
  );
};

export default Anniversary;

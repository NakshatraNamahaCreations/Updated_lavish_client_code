import React, { useEffect, useState } from "react";

import FAQ from "./FAQ";
import Testimonials from "./Testimonials";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getAxios } from "../utils/api";
import CardCarousel from "./CardCarousel";
import { navigateToSubcategory } from "../utils/navigationsUtils";

const Kidsbirthday = () => {
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [allServices, setAllServices] = useState([]);

  const navigate = useNavigate();
  const [recentPurchase, setRecentPurchase] = useState([]);
  const [serviceDetails, setServiceDetails] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { subcat_id } = useParams();
  const storedUser = localStorage.getItem("user");
  const userData = JSON.parse(storedUser);
  const customerId = userData?.id;

  console.log("subSubCategories",subSubCategories)

  const fetchRecentPurchase = async () => {
    try {
      const response = await getAxios().get(
        `/orders/recent-orders/${customerId}`
      );
      const data = await response.data;
      setRecentPurchase(data.services);
    } catch (error) {
      console.error("Error fetching recent purchase:", error);
    }
  };

  const message = "Hello, I want to know more about kid's birthday Cakes.";
  const encodedMessage = encodeURIComponent(message);
  const WhatsAppLink = `https://wa.me/919620558000?text=${encodedMessage}`;

  const fetchSubSubcategoriesBySubCategory = async () => {
    if (!subcat_id) return;
    try {
      setLoading(true);
      const res = await getAxios().get(
        `/subsubcategories/subcategory/${subcat_id}`
      );
      setSubSubCategories(res.data.data);
      console.log("subSubCategories", res.data.data);
    } catch (err) {
      console.error("error", err);
      setError("Failed to load subcategories");
    } finally {
      setLoading(false);
    }
  };
 const fetchServices = async () => {
  try {
    const response = await getAxios().get(`/services/filter/${subcat_id}`);
    const data = response.data;

    if (data.success) {
      setAllServices(data.data); // <-- Set the array of services here
    } else {
      console.warn("API returned success: false");
      setAllServices([]); // Set to empty array if not successful
    }

    console.log("all data", data.data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        console.warn("No services found for this subcategory.");
        setAllServices([]); // Set to empty array on 404
        return;
      }
      console.error("Axios error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    setAllServices([]); // Set to empty array on error
  }
};

  const checkForThemes = async (subSubCategoryId) => {
    try {
      const res = await getAxios().get(
        `/themes/subsubcategory/${subSubCategoryId}`
      );
      return res.data.data && res.data.data.length > 0;
    } catch (err) {
      console.error("Error checking themes:", err);
      return false;
    }
  };

  const handleSubSubCategoryClick = async (subSubCategoryId) => {
    try {
      console.log("Checking themes for subSubCategoryId:", subSubCategoryId);
      const hasThemes = await checkForThemes(subSubCategoryId);
      console.log("Has themes:", hasThemes);

      if (hasThemes) {
        console.log("Navigating to themes page");
        // If themes exist, navigate to themes page
        navigate(`/themes/${subSubCategoryId}`);
      } else {
        console.log("No themes found, navigating to services");
        // If no themes, navigate directly to services
        navigate(`/service/${subSubCategoryId}`);
      }
    } catch (err) {
      console.error("Error in navigation:", err);
      // If error occurs, navigate to services as fallback
      navigate(`/service/${subSubCategoryId}`);
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
      {loading && (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-xl text-primary">Loading...</div>
        </div>
      )}

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      <div>
        <img
          src="https://lavisheventzz-bangalore.b-cdn.net/banner/kidsbdayBanner1.png"
          className="mx-auto w-[1600px]"
        />
      </div>

      <div className="grid grid-cols-2 gap-x-12 md:gap-y-14 gap-y-5 md:place-items-center lg:mt-20 mt-10">
        {subSubCategories.map((item) => (
          <div className="relative" key={item._id}>
            <div
              onClick={() => handleSubSubCategoryClick(item._id)}
              className="cursor-pointer transition-shadow duration-300"
            >
              <img
                src={`${item.image}`}
                alt={item.subSubCategory}
                className="rounded-3xl border-4 border-primary md:w-auto md:h-auto w-40 h-40"
              />
              <p className="text-primary pt-4 md:text-3xl text-xl text-center font-medium carter">
                {item.subSubCategory}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Link to={WhatsAppLink} target="_blank" rel="noopener noreferrer">
        <div className="">
          <img
            src="https://lavisheventzz-bangalore.b-cdn.net/KidsBirthday/kidscake.png"
            alt="Kid's Birthday Cakes"
            className="rounded-3xl border-4 border-primary md:w-auto md:h-auto w-40 h-40 mx-auto"
          />
          <p className="text-primary pt-4 md:text-3xl  text-center font-medium carter">
            Kid's Birthday Cakes
          </p>
        </div>
      </Link>

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
          <p className="text-gray-500 text-center mt-4">
            Simple Decoration Service Not Found
          </p>
        )}
      </div>

      <div className="relative mx-auto text-center lg:mt-10">
        <p className="md:py-8 py-4 font-bold poppins md:text-2xl">
          #KidsBirthdayDecorationBestMovements
        </p>
        <div className="flex justify-center items-center gap-1">
          <div className="place-items-end lg:space-y-2  space-y-1">
            <img
              src="https://lavisheventzz-bangalore.b-cdn.net/KidsBirthday/bdayGallery1.png"
              className=" lg:h-40 md:h-28 h-10"
            />
            <img
              src="https://lavisheventzz-bangalore.b-cdn.net/KidsBirthday/bdayGallery2.png"
              className=" lg:h-64  "
            />
            {/* <div className=" bg-gray-600 relative overflow-hidden rounded md:h-20 md:w-36 lg:w-auto lg:h-auto h-8 w-16">
              <img
                src="https://lavisheventzz-bangalore.b-cdn.net/KidsBirthday/bdayGallery3.png"
                className="rounded"
              />
              <video
                className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
                src="https://lavisheventzz-bangalore.b-cdn.net/groomtobe/video.mp4"
                autoPlay
                loop
                muted
              />
            </div> */}
               <img src="https://lavisheventzz-bangalore.b-cdn.net/image.jpg" className=" lg:h-40 md:h-28 h-10 rounded-xl" />
          </div>
          <div>
            <img src="https://lavisheventzz-bangalore.b-cdn.net/KidsBirthday/bdayGallery4.png" />
          </div>
          <div className="lg:space-y-2 space-y-1">
            <img src="https://lavisheventzz-bangalore.b-cdn.net/KidsBirthday/bdayGallery5.png" />
            <img src="https://lavisheventzz-bangalore.b-cdn.net/KidsBirthday/bdayGallery6.png" />
          </div>
          <div>
            <img src="https://lavisheventzz-bangalore.b-cdn.net/KidsBirthday/bdayGallery7.png" />
          </div>
        </div>
        <p className="lg:absolute bottom-10 right-2 [text-shadow:_-4px_4px_3px_#7D7C7C] playfair-display md:text-7xl text-4xl font-bold text-[#FFD1D1]">
          Magical Moments
        </p>
      </div>

      <div
        className="md:pt-20 py-5"
        onClick={() => handleNavigation("photography", "/photography")}
      >
        <img
          src="https://lavisheventzz-bangalore.b-cdn.net/banner/photoshootkidsBday.png"
          className="mx-auto w-[2000px]"
        />
      </div>

      <div className="">
        <p className="font-bold poppins md:py-6 pb-4 md:text-2xl">
          Why Celebrate With Lavisheventzz
        </p>
        <img
          src="https://lavisheventzz-bangalore.b-cdn.net/banner/kidsbdayBanner3.png"
          className="mx-auto w-[2000px]"
        />
      </div>
      {customerId && (
        <div className="md:pt-10 pt-7">
          <p className="font-bold poppins md:text-2xl">Recently Purchased</p>
          <CardCarousel centercardData={serviceDetails} />
        </div>
      )}
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
          Hire the Best Balloon Decorators for Your Child's Birthday Party
        </p>
        <p className="font-bold">
          Planning a magical birthday celebration for your little one? Look no
          further! We specialize in creative and eye-catching balloon
          decorations that transform any space into a fun-filled wonderland. Our
          expert decorators bring your child's favorite themes to life with
          vibrant colors, unique designs, and playful arrangements. Whether
          you're hosting an indoor gathering or an outdoor extravaganza, we
          tailor every detail to match your chosen theme and venue. From
          stunning balloon arches and adorable centerpieces to fun balloon
          sculptures and customized bouquets, we add that special touch to make
          the day unforgettable. Let us handle the decorations while you focus
          on making memories. Book your kid's birthday balloon décor with us
          today and watch the magic unfold!
        </p>
      </div>
    </div>
  );
};

export default Kidsbirthday;

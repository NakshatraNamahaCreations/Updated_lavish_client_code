import React, { useEffect, useState } from "react";
import adultBanner1 from "../assets/banner/adultbanner1.png";
import adultBanner2 from "../assets/banner/photoshootBday.png";
import adultBanner3 from "../assets/banner/trustedBanner.png";
import adultBanner4 from "../assets/banner/adultbanner4.png";

import decor1 from "../assets/bday/adultbday/decor1.png";
import decor2 from "../assets/bday/adultbday/decor2.png";
import decor3 from "../assets/bday/adultbday/decor3.png";
import decor4 from "../assets/bday/adultbday/decor4.png";
import decor5 from "../assets/bday/adultbday/decor5.png";
import decor6 from "../assets/bday/adultbday/decor6.png";
import decor7 from "../assets/bday/adultbday/decor7.png";
import decor8 from "../assets/bday/adultbday/decor8.png";

import bdayGallery1 from "../assets/bday/adultbday/gallery1.png";
import bdayGallery2 from "../assets/bday/adultbday/gallery2.png";

import bdayGallery3 from "../assets/services/gallery3.png";
import bdayGallery4 from "../assets/bday/adultbday/gallery4.png";
import bdayGallery5 from "../assets/bday/adultbday/gallery5.png";
import bdayGallery6 from "../assets/bday/adultbday/gallery6.png";
import bdayGallery7 from "../assets/bday/adultbday/gallery7.png";

import img1 from "../assets/butterfly_theme.png";
import img2 from "../assets/candleImg3.png";
import img3 from "../assets/categoryimg1.png";
import img4 from "../assets/categoryimg8.png";
import img5 from "../assets/momentsgallery7.png";
import img6 from "../assets/navImg4.png";

import sash from "../assets/bday/add_ons/sash.png";
import welcomeboard from "../assets/bday/add_ons/welcomeboard.png";
import flwrbouqt from "../assets/bday/add_ons/flwrbouqt.png";
import photography from "../assets/bday/add_ons/photography.png";
import cakes from "../assets/bday/add_ons/cakes.png";
import FAQ from "./FAQ";
import video from "../assets/services/video.mp4";
import Testimonials from "./Testimonials";
import { Link, useParams } from "react-router-dom";
import BasicSlider from "./BasicSlider";
import FAQServices from "./FAQServices";
import CancellationPolicy from "./CancellationPolicy";
import { getAuthAxios } from "../utils/api";

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

const imagelist = [
  {
    src: decor1,
    title: "Simple Decoration",
    sub_SubId: "114",
  },
  {
    src: decor2,
    title: "Premium Decoration",
    sub_SubId: "115",
  },
  {
    src: decor3,
    title: "Room Decoration",
    sub_SubId: "116",
  },
  {
    src: decor4,
    title: "Romantic Decoration",
    sub_SubId: "117",
  },
  {
    src: decor5,
    title: "Canopy Decoration",
    sub_SubId: "118",
  },
  {
    src: decor6,
    title: "Terrace decoration",
    sub_SubId: "119",
  },
  {
    src: decor7,
    title: "Mom birthday decoration",
    sub_SubId: "120",
  },
  {
    src: decor8,
    title: "Dad birthday decoration",
    sub_SubId: "121",
  },
];

const recentlyViewed = [
  {
    serviceName: "Male Anchor for Entertainment",
    price: "1,499",
    cardImg: img1,
  },
  {
    serviceName: "Caricature Artist",
    price: "1,499",
    cardImg: img2,
  },
  {
    serviceName: "Cartoon Mascot",
    price: "1,499",
    cardImg: img3,
  },
  {
    serviceName: "Cotton Candy",
    price: "1,499",
    cardImg: img4,
  },
  {
    serviceName: "Cartoon Mascot",
    price: "1,499",
    cardImg: img5,
  },
  {
    serviceName: "Caricature Artist",
    price: "1,499",
    cardImg: img6,
  },
];

const AdultBirthday = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [error, setError] = useState("");
  const { subcat_id } = useParams();

  const fetchSubSubcategoriesBySubCategory = async () => {
    if (!subcat_id) return;
    try {
      const res = await getAuthAxios().get(
        `subsubcategories/subcategory/${subcat_id}`
      );
      setSubSubCategories(res.data.data);
      console.log("subSubCategories", res.data.data);
    } catch (err) {
      console.error("error", err);
      setError("Failed to load subcategories");
    }
  };

  useEffect(() => {
    fetchSubSubcategoriesBySubCategory();
  }, [subcat_id]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

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
                src={`http://localhost:5000/images/${item.image}`}
                alt={item.subSubCategory}
                className="rounded-3xl "
              />
            </Link>

          </div>
        ))}
      </div>

      <div className="">
        <p className="font-bold poppins md:text-2xl">All Decorations</p>
        <BasicSlider data={recentlyViewed} />
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

      <Link to="/photograpghy">
        <div className="md:pt-20 py-5">
          <img src={adultBanner2} className="mx-auto w-[2000px]" />
        </div>
      </Link>

      <div className="md:pt-10 pt-7">
        <p className="font-bold poppins md:text-2xl">Recently Viewed</p>
        <BasicSlider data={recentlyViewed} />
      </div>

      <div className="">
        <p className="font-bold poppins md:py-6 pb-4 md:text-2xl">
          Why Celebrate With Lavisheventzz
        </p>
        <img src={adultBanner3} className="mx-auto w-[1600px]" />
      </div>

      <div className="my-4">
        <p className="text-center font-bold poppins text-2xl">FAQs</p>
        <p
          className="text-right text-lg underline cursor-pointer"
          onClick={toggleModal}
        >
          Cancellation Policy
        </p>
        <CancellationPolicy isOpen={isOpen} toggleModal={toggleModal} />
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

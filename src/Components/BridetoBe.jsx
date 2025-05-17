import React, { useEffect, useState } from "react";
import bridetobebanner from "../assets/banner/bridetobebanner.png";
import bridetobeBanner2 from "../assets/banner/photoshootbride.png";
import adultBanner3 from "../assets/banner/trustedBanner.png";
import addonsbanner from "../assets/banner/addonsbanner.png";

import img1 from "../assets/butterfly_theme.png";
import img2 from "../assets/candleImg3.png";
import img3 from "../assets/categoryimg1.png";
import img4 from "../assets/categoryimg8.png";
import img5 from "../assets/momentsgallery7.png";
import img6 from "../assets/navImg4.png";

import decor1 from "../assets/services/bridetobedecor1.png";
import decor2 from "../assets/services/bridetobedecor2.png";

import gallery1 from "../assets/services/bridetobe1.png";
import gallery2 from "../assets/services/bridetobe2.png";
import gallery3 from "../assets/services/gallery3.png";
import gallery4 from "../assets/services/bridetobe4.png";
import gallery5 from "../assets/services/bridetobe5.png";
import gallery6 from "../assets/services/bridetobe6.png";
import gallery7 from "../assets/services/bridetobe7.png";
import BasicSlider from "./BasicSlider";

import sash from "../assets/services/sash.png";
import cakes from "../assets/services/cakes.png";
import chairs from "../assets/services/chairs.png";
import envites from "../assets/services/envites.png";
import photography from "../assets/services/photography.png";
import welcomeboard from "../assets/services/welcomeboard.png";
import flwrbouqt from "../assets/services/flwrbouqt.png";
import activity from "../assets/services/activity.png";
import video from "../assets/services/video.mp4";

import FAQ from "./FAQ";
import Testimonials from "./Testimonials";
import { Link, useParams } from "react-router-dom";
import { service } from "../json/services";
import { MdArrowRightAlt } from "react-icons/md";
import ServiceSlider from "./ServiceSlider";
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

const imagelist = [
  {
    src: decor1,
    title: "Simple Decoration",
    sub_SubId: "103",
  },
  {
    src: decor2,
    title: "Premium Decoration",
    sub_SubId: "104",
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

const BridetoBe = () => {
  const [premiumData, setPremiumdata] = useState([]);
  const [simpleData, setSimpledata] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [error, setError] = useState("");
  const { subcat_id } = useParams();

  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  useEffect(() => {
    setPremiumdata(service.filter((item) => item.sub_SubId === "104"));
    setSimpledata(service.filter((item) => item.sub_SubId === "103"));
  }, []);

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

  return (
    <div className="lg:py-24 md:pt-20 pt-32  p-3  mx-auto">
      <div>
        <img src={bridetobebanner} className="mx-auto w-[1600px]" />
      </div>

      <div className="grid grid-cols-2 md:gap-10 gap-3  place-items-center md:my-16 mt-4 md:mx-10">
        {subSubCategories.map((item, idx) => (
          <div className="relative" key={item._id}>
            <Link to={`/service/${item._id}`}>
         
              <img
                src={`http://localhost:5000/images/${item.image}`}
                alt={item.subSubCategory}
                className="rounded-3xl w-[500px] "
              />
            </Link>
            <p className="text-primary pt-4 md:text-3xl text-xl text-center font-medium carter">
              {item.subSubCategory}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5">
        <div className="flex justify-between ">
          <p className="lg:text-2xl text-primary font-bold playfair-display">
            Simple Decoration Service
          </p>
          <Link
            to={`/service/103`}
            className="text-secondary font-bold flex items-center text-sm md:text-base  "
          >
            View All <MdArrowRightAlt className="md:text-2xl text-xl " />
          </Link>
        </div>

        {<BasicSlider data={simpleData} />}
      </div>

      <div>
        <div className="flex justify-between ">
          <p className="lg:text-2xl text-primary font-bold playfair-display">
            Premium Decoration Service
          </p>
          <Link
            to={`/service/104`}
            className="text-secondary font-bold flex items-center text-sm md:text-base  "
          >
            View All <MdArrowRightAlt className="md:text-2xl text-xl " />
          </Link>
        </div>
        {<BasicSlider data={premiumData} />}
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
          #BridetobeDecorationBestMovements
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
      <Link to="/photograpghy">
        {" "}
        <div className="md:pt-20 py-5">
          <img src={bridetobeBanner2} className="mx-auto w-[2000px]" />
        </div>
      </Link>
      <div className="md:pt-20 pt-10">
        <p className="font-bold poppins md:py-6 pb-4 md:text-2xl">
          Why Celebrate With Lavisheventzz
        </p>
        <img src={adultBanner3} className="mx-auto w-[1600px]" />
      </div>
      <div className="md:pt-10 pt-7">
        <p className="font-bold poppins md:text-2xl">Recently Viewed</p>
        <BasicSlider data={recentlyViewed} />
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
          Hire the Best Balloon Decorators for Your Bride to be Party
        </p>
        <p className="font-bold">
          Celebrate the bride-to-be in style with stunning balloon decorations
          that create a dreamy and elegant ambiance! Whether it’s a bridal
          shower, bachelorette party, or pre-wedding gathering, our expert
          decorators craft beautiful balloon arches, chic centerpieces, and
          customized designs to match your theme. From soft pastels to glamorous
          golds, we tailor every detail to make her special moments even more
          magical. Let us handle the décor while you focus on making
          unforgettable memories. Book your bride-to-be balloon décor today and
          make her celebration truly spectacular!
        </p>
      </div>
    </div>
  );
};

export default BridetoBe;

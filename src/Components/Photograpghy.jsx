import React, { useEffect, useLayoutEffect, useState } from "react";
import FAQ from "./FAQ";
import Testimonials from "./Testimonials";
import { Link } from "react-router-dom";
import { getAxios } from "../utils/api";
import CardCarousel from "./CardCarousel";

const imagelist = [
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/Photography/maternityshoot.png",
    title: "Maternity  Shoot",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/Photography/babyshowershoot.png",
    title: "Baby shower Shoot",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/Photography/kidsbdayshoot.png",
    title: "Kid's Birtdhay Shoot",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/Photography/adultbdayshoot.png",
    title: "Adult's Birthday Shoot",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/Photography/engagementshoot.png",
    title: "Engagement Shoot",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/Photography/housewarmingshoot.png",
    title: "Housewarming Shoot",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/Photography/namingceremonyshoot.png",
    title: "Naming ceremony Shoot",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/Photography/upanayanamshoot.png",
    title: "Upanayanam Shoot",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/Photography/coupleshoot.png",
    title: "Couple Shoot",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/Photography/baptismshoot.png",
    title: "Baptism Shoot",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/Photography/bornbabyshoot.png",
    title: "Bornbaby Shoot",
  },
];

const Photograpghy = () => {
  const [recentPurchase, setRecentPurchase] = useState([]);
  const [serviceDetails, setServiceDetails] = useState([]);

  const storedUser = localStorage.getItem("user");
  const userData = JSON.parse(storedUser);
  const customerId = userData?.id;

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

  const handleWhatsappRedirect = (value) => {
    const message = `Hello, I want to know more about ${value}.`;
    const encodedMessage = encodeURIComponent(message);
    const WhatsAppLink = `https://wa.me/919611430158?text=${encodedMessage}`;
    window.open(WhatsAppLink, "_blank");
    console.log(WhatsAppLink);
  };

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
        <img
          src="https://lavisheventzz-bangalore.b-cdn.net/banner/photograpghyBanner.png"
          className="mx-auto w-[1600px]"
        />
      </div>

      {/* <PhotograpghySlider imagelist={imagelist} /> */}

      <div className="grid grid-cols-2 gap-x-2 md:gap-y-14 gap-y-5 md:place-items-center lg:mt-20 mt-10">
        {imagelist.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center ${
              imagelist.length % 2 !== 0 && index === imagelist.length - 1
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
      <div className="relative mx-auto text-center lg:mt-10">
        <p className="md:py-8 py-4 font-bold poppins md:text-2xl">
          #PhotograpghyBestMovements
        </p>
        <div className="flex justify-center items-center gap-1">
          <div className="place-items-end lg:space-y-2  space-y-1">
            <img
              src="https://lavisheventzz-bangalore.b-cdn.net/Photography/photography1.png"
              className=" lg:h-40 md:h-28 h-10"
            />
            <img
              src="https://lavisheventzz-bangalore.b-cdn.net/Photography/photography2.png"
              className=" lg:h-64  "
            />
            <div className=" bg-gray-600 relative overflow-hidden rounded md:h-20 md:w-36 lg:w-auto lg:h-auto h-8 w-16">
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
            </div>
          </div>
          <div>
            <img src="https://lavisheventzz-bangalore.b-cdn.net/Photography/photography4.png" />
          </div>
          <div className="lg:space-y-2 space-y-1">
            <img src="https://lavisheventzz-bangalore.b-cdn.net/Photography/photography5.png" />
            <img src="https://lavisheventzz-bangalore.b-cdn.net/Photography/photography6.png" />
          </div>
          <div>
            <img src="https://lavisheventzz-bangalore.b-cdn.net/Photography/photography7.png" />
          </div>
        </div>
        <p className="lg:absolute bottom-10 right-2 [text-shadow:_-4px_4px_3px_#7D7C7C] playfair-display md:text-7xl text-4xl font-bold text-[#FFD1D1]">
          Wonderful Moments
        </p>
      </div>
      <Link to="/photograpghy">
        <div className="md:pt-20 py-5">
          <img
            src="https://lavisheventzz-bangalore.b-cdn.net/banner/photoshootPhotograpghy.png"
            className="mx-auto w-[2000px]"
          />
        </div>
      </Link>
      <div className="">
        <p className="font-bold poppins md:py-6 pb-4 md:text-2xl">
          Why Celebrate With Lavisheventzz
        </p>
        <img
          src="https://lavisheventzz-bangalore.b-cdn.net/banner/trustedBanner.png"
          className="mx-auto w-[1600px]"
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
        {/* <ReviewSlider /> */}
      </div>
      <div className="md:px-10 px-4">
        <p className="font-bold poppins py-8 text-2xl">
          Hire the Best Balloon Decorators for Your best PhotoShoot
        </p>
        <p className="font-bold">
          Make your photography Shoot truly magical with breathtaking balloon
          décor! Whether it’s a pre-wedding Shoot, maternity session, birthday,
          or any special occasion, our expert decorators create mesmerizing
          balloon setups that add charm and elegance to every frame. From dreamy
          balloon arches and elegant backdrops to creative themed arrangements,
          we customize every detail to enhance your photoShoot’s aesthetic. Let
          us set the perfect scene while you focus on capturing unforgettable
          memories. Book your balloon décor for photography Shoots today and
          elevate your pictures with a touch of magic!
        </p>
      </div>
    </div>
  );
};

export default Photograpghy;

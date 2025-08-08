import React from "react";
import Slider from "react-slick";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { IoIosStar } from "react-icons/io";
import { useNavigate } from "react-router-dom";

// CenterCarousalCard Component
const CenterCarousalCard = ({ item }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    if (item._id) {
      navigate(`/service/details/${item.serviceName.toLowerCase().replace(/\s+/g, "-")}/${item._id}`);
    }
  };

  return (
    <div className="mx-auto h-[420px] bg-white max-w-xs shadow-xl rounded-lg mt-5 z-10">
      <div className="md:px-4 md:pt-4 p-2 border-2 rounded-lg  h-full">
        <img
          src={item?.images[0]}
          alt={item.serviceName}
          className="rounded-lg mb-2 w-full h-[70%] object-cover"
        />
        <div className="poppins text-center">
          <p className="text-sm md:text-base">{item.serviceName}</p>
          <div className=" flex gap-1 md:justify-start justify-center items-center py-2 text-yellow-500">
            <IoIosStar size={16} />
            <IoIosStar size={16} />
            <IoIosStar size={16} />
            <IoIosStar size={16} />
            <IoIosStar size={16} />
          </div>
          <div className="lg:flex gap-2 justify-between items-center">
            <p className="font-bold text-sm md:text-xl">Rs. {item.offerPrice}</p>
            <button
              className="bg-primary rounded-md lg:px-4 px-2 py-1 md:px-6 md:py-2 font-semibold text-white text-sm"
              onClick={handleBookNow}
            >
              BOOK NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Custom Previous Arrow
const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute md:left-[-20px] left-[-10px] top-1/2 transform -translate-y-1/2 z-20 bg-primary text-white p-1 rounded-full hover:bg-gray-600"
    >
      <AiOutlineArrowLeft size={20} />
    </button>
  );
};

// Custom Next Arrow
const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute md:right-[-20px] right-[-10px] top-1/2 transform -translate-y-1/2 z-20 bg-primary text-white p-1 rounded-full hover:bg-gray-600"
    >
      <AiOutlineArrowRight size={20} />
    </button>
  );
};

// CardCarousel Component
function CardCarousel({ centercardData }) {
  const itemCount = centercardData?.length || 0;

  const settings = {
    infinite: itemCount > 3, // Disable infinite scroll if items are less than slides
    slidesToShow: itemCount >= 3 ? 3 : itemCount,
    slidesToScroll: itemCount >= 3 ? 3 : 1,
    speed: 500,
    autoplay: itemCount > 1,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: itemCount > 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: itemCount >= 3 ? 3 : itemCount,
          slidesToScroll: 1,
          infinite: itemCount > 3,
          dots: itemCount > 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: itemCount >= 2 ? 2 : itemCount,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: itemCount >= 1 ? 1 : itemCount,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <div className="relative lg:my-10 md:px-4">
      <Slider {...settings}>
        {centercardData?.map((item, idx) => (
          <CenterCarousalCard item={item} key={idx} />
        ))}
      </Slider>
    </div>
  );
}


export default CardCarousel;

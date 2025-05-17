import React, { useState } from "react";
import Slider from "react-slick";

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
import party from "../assets/party.png"
import car from "../assets/car.png"
import housewarming from "../assets/house_warming.png"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { IoClose } from "react-icons/io5";


const reviews = [
  { id: 1, img: kid },
  { id: 2, img: adult },
  { id: 3, img: welcomebaby },
  { id: 4, img: babyshower },
  { id: 5, img: aniversary },
  { id: 6, img: NamingCermony },
  { id: 7, img: bday },
  { id: 8, img: Photography },
  { id: 9, img: proposal },
  { id: 10, img: firstnight },
  { id: 11, img: ballon },
  { id: 12, img: surprise },
  { id: 13, img: bettertogether },
  { id: 14, img: car },
  { id: 15, img: party },
  { id: 16, img: housewarming },
];

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className={`z-10 absolute -left-14 top-1/2 transform -translate-y-1/2
      bg-primary text-white p-2 rounded-full shadow-md hover:bg-gray-900`}
  >
  <AiOutlineArrowLeft size={25} />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className={`z-10 absolute -right-14 top-1/2 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full shadow-md hover:bg-gray-900`}
  >
   <AiOutlineArrowRight size={25} /> 
  </button>
);

const ReviewGallery = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const settings = {
      
    infinite: true,
    slidesToShow: 1,
    speed: 500,
    arrows: true,
    pauseOnHover: true,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
   
};

  // Function to open modal at a specific index
  const handleOpenModal = (index) => {
    setSelectedIndex(index);
    setOpenModal(true);
  };

  // Function to close modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="md:p-4  mt-10">
      {/* Review Images */}
      <div className="grid lg:grid-cols-10 md:grid-cols-6 grid-cols-3 gap-4 ">
        {reviews.slice(0, 13).map((review, index) => (
          <img
            key={review.id}
            src={review.img}
            alt={`Review ${review.id}`}
            className="w-24 h-24 object-cover cursor-pointer rounded-lg z-[999px]"
            onClick={() => handleOpenModal(index)}
          />
        ))}

        {/* 14th Image (Show Remaining Count) */}
        {reviews.length > 14 && (
          <div
            className="relative w-24 h-24 bg-gray-300 cursor-pointer flex justify-center items-center rounded-lg"
            onClick={() => handleOpenModal(13)}
          >
            <img
              src={reviews[13].img}
              alt={`Review ${reviews[13].id}`}
              className="absolute top-0 left-0 w-full h-full object-cover opacity-50 rounded-lg"
            />
            <span className="text-white font-bold text-lg z-10">
              +{reviews.length - 14}
            </span>
          </div>
        )}
      </div>

      {/* Modal with React Slick Carousel */}
      {openModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50 p-20">
          <div className="relative md:w-3/4 w-[300px]   max-w-xl  p-4 rounded-lg ">

            <Slider
              initialSlide={selectedIndex}
              {...settings}
              
            >
              {reviews.map((review, index) => (
                <div key={index} className="flex justify-center">
                  <img
                    src={review.img}
                    alt={`Review ${index + 1}`}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              ))}
            </Slider>
          </div>
          <button
            className="absolute top-4 right-4  bg-white text-black text-2xl rounded-full "
            onClick={handleCloseModal}
          >
            <IoClose/>
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewGallery;

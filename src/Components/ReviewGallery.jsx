import React, { useState } from "react";
import Slider from "react-slick";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { IoClose } from "react-icons/io5";

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="z-10 absolute -left-10 top-1/2 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full shadow-md hover:bg-gray-900"
  >
    <AiOutlineArrowLeft size={25} />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="z-10 absolute -right-10 top-1/2 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full shadow-md hover:bg-gray-900"
  >
    <AiOutlineArrowRight size={25} />
  </button>
);

const ReviewGallery = ({ images = [] }) => {
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
    centerMode: true,
  };

  const handleOpenModal = (index) => {
    setSelectedIndex(index);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  if (images.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No images to display.</p>;
  }

  return (
    <div className="md:p-4 mt-10">
      {/* Thumbnails */}
      <div className="grid lg:grid-cols-10 md:grid-cols-6 grid-cols-3 gap-4">
        {images.slice(0, 13).map((img, index) => (
          <img
            key={index}
            src={`http://localhost:5000/images/${img}`}
            alt={`Review ${index}`}
            className="w-24 h-24 object-cover cursor-pointer rounded-lg"
            onClick={() => handleOpenModal(index)}
          />
        ))}

        {/* 14th Image with "+N" */}
        {images.length > 14 && (
          <div
            className="relative w-24 h-24 bg-gray-300 cursor-pointer flex justify-center items-center rounded-lg"
            onClick={() => handleOpenModal(13)}
          >
            <img
              src={`http://localhost:5000/images/${images[13]}`}
              alt="Review 13"
              className="absolute top-0 left-0 w-full h-full object-cover opacity-50 rounded-lg"
            />
            <span className="text-white font-bold text-lg z-10">+{images.length - 14}</span>
          </div>
        )}
      </div>

      {/* Modal Slider */}
      {openModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50 p-4">
          <div className="relative md:w-3/4 w-[300px] max-w-xl p-4 rounded-lg">
            <Slider initialSlide={selectedIndex} {...settings}>
              {images.map((img, index) => (
                <div key={index} className="flex justify-center mx-auto px-20">
                  <img
                    src={`http://localhost:5000/images/${img}`}
                    alt={`Review ${index}`}
                    className="w-[300px] h-auto rounded-lg"
                  />
                </div>
              ))}
            </Slider>
          </div>
          <button
            className="absolute top-4 right-4 bg-white text-black text-2xl rounded-full"
            onClick={handleCloseModal}
          >
            <IoClose />
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewGallery;

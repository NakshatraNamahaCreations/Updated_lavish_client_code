// import React, { useState } from "react";
// import Slider from "react-slick";
// import { motion, AnimatePresence } from "framer-motion";
// import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

// const PrevArrow = ({ className, onClick }) => (
//   <div onClick={onClick} className={`${className} custom-arrow top-9 lg:-left-5 -left-2 `}>
//     <AiOutlineArrowLeft className="text-white bg-primary rounded-full p-1 w-6 h-6 " />
//   </div>
// );

// const NextArrow = ({ className, onClick }) => (
//   <div onClick={onClick} className={`${className} custom-arrow top-9 lg:-right-5 -right-2`}>
//     <AiOutlineArrowRight className="text-white bg-primary rounded-full p-1 w-6 h-6" />
//   </div>
// );

// const ProductCarousel = ({ images = [] }) => {
//   const [selectedImage, setSelectedImage] = useState(images[0]);

//   const settings = {
//     dots: false,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     arrow:true,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//     responsive: [
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 3,
//           dots: false,
//         },
//       },

//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 3,
//           dots: false,
//         },
//       },
//     ],
//   };

//   const handleImageClick = (image) => {
//     setSelectedImage(image);
//   };

//   return (
//     <div className="container mx-auto">
//       {/* Main Image with Animation */}
//       <div className="flex justify-center mb-5">
//         <AnimatePresence mode="wait">
//           <motion.img
//             key={selectedImage} 
//             src={selectedImage || images[0]}
//             alt="Selected"
//             className="w-full max-h-64 sm:max-h-80 md:max-h-96  rounded-xl object-cover" 
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//             transition={{ duration: 0.3, ease: "easeInOut" }}
//           />
//         </AnimatePresence>
//       </div>



//       {/* Thumbnail Carousel */}
//       <Slider {...settings}>
//         {images.map((image, index) => (
//           <div key={index} onClick={() => handleImageClick(image)}>
//             <img
//               src={image}
//               alt={`Thumbnail ${index + 1}`}
//               className={`h-32 object-cover border-2 cursor-pointer outline-none mx-auto rounded-tl-3xl rounded-br-3xl ${selectedImage === image ? "border-blue-600" : ""
//                 }`}
//             />
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default ProductCarousel;


// import React, { useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { motion, AnimatePresence } from "framer-motion";
// import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

// // Custom Prev Arrow (Top Arrow)
// const PrevArrow = ({ onClick }) => (
//   <button
//     onClick={onClick}
//     className="absolute -top-5 left-[50%] transform -translate-x-1/2 bg-primary text-white p-1 rounded-full shadow-md hover:bg-gray-900"
//   >
//     <AiOutlineArrowUp size={10} />
//   </button>
// );

// // Custom Next Arrow (Bottom Arrow)
// const NextArrow = ({ onClick }) => (
//   <button
//     onClick={onClick}
//     className="absolute -bottom-5 left-[50%] transform -translate-x-1/2 bg-primary text-white p-1 rounded-full shadow-md hover:bg-gray-900"
//   >
//     <AiOutlineArrowDown size={10} />
//   </button>
// );

// const ProductImageSlider = ({ images = [] }) => {
//   const [selectedImage, setSelectedImage] = useState(images[0]);

//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     vertical: true,
//     verticalSwiping: true,
//     autoplay: true,
//     autoplaySpeed: 2000,
//     pauseOnHover: true,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//   };

//   return (
//     <div className="flex flex-col md:flex-row items-center md:items-start gap-4 w-full max-w-4xl mx-auto mt-4">
//       {/* Thumbnail Slider (Left Side) */}
//       <div className="w-1/4 max-h-96 relative">
//         <Slider {...settings} className="h-full">
//           {images.map((image, index) => (
//             <div key={index} className="p-1">
//               <img
//                 src={image}
//                 alt={`Thumbnail ${index + 1}`}
//                 className={`mx-auto w-20 h-20 object-cover border-2 cursor-pointer rounded-lg transition-all ${selectedImage === image ? "border-gray-600 scale-105" : "border-gray-300"
//                   }`}
//                 onClick={() => setSelectedImage(image)}
//               />
//             </div>
//           ))}
//         </Slider>
//       </div>

//       {/* Main Image Display (Right Side) */}
//       <div className="w-3/4 flex justify-center">
//         <AnimatePresence mode="wait">

//           <motion.img
//             src={selectedImage}
//             alt="Selected Product"
//             className="w-full max-h-[500px] object-cover rounded-2xl shadow-[4px_4px_10px_#5E5E5E] outline-none"
//             key={selectedImage}
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//             transition={{ duration: 0.3, ease: "easeInOut" }}
//           />
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default ProductImageSlider;


import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";

// Custom Prev Arrow (Top/Left Arrow)
const PrevArrow = ({ onClick, isMobile }) => (
  <button
    onClick={onClick}
    className={`absolute ${isMobile ? "-left-3 top-1/2 transform -translate-y-1/2" : "-top-7 left-[50%] transform -translate-x-1/2"}
      bg-primary text-white  p-1 rounded-full shadow-md hover:bg-gray-900`}
  >
    {isMobile ? <AiOutlineArrowLeft size={15} /> : <AiOutlineArrowUp size={15} />}
  </button>
);

// Custom Next Arrow (Bottom/Right Arrow)
const NextArrow = ({ onClick, isMobile }) => (
  <button
    onClick={onClick}
    className={`absolute ${isMobile ? "-right-3 top-1/2 transform -translate-y-1/2" : "-bottom-9 left-[50%] transform -translate-x-1/2"}
      bg-primary text-white  p-1 rounded-full shadow-md hover:bg-gray-900`}
  >
    {isMobile ? <AiOutlineArrowRight size={15} /> : <AiOutlineArrowDown size={15} />}
  </button>
);

const ProductImageSlider = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 3 : 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    nextArrow: <NextArrow isMobile={isMobile} />,
    prevArrow: <PrevArrow isMobile={isMobile} />,
    vertical: !isMobile,
    verticalSwiping: !isMobile,
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-4 w-full max-w-4xl mx-auto mt-4 ">
      
      {/* Main Image Display */}
      <div className="w-full md:w-3/4 flex justify-center">
        <AnimatePresence mode="wait">
          <motion.img
            src={selectedImage}
            alt="Selected Product"
            className="w-full max-h-[400px] md:max-h-[500px] object-cover rounded-2xl shadow-lg"
            key={selectedImage}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>

      {/* Thumbnail Slider - Adjusts for Mobile & Desktop */}
      <div className={`w-full md:w-1/4 max-h-96 relative ${isMobile ? "mt-4" : ""}`}>
        <Slider {...settings} className={`h-full ${isMobile ? "flex items-center justify-center" : ""}`}>
          {images.map((image, index) => (
            <div key={index} className="p-1">
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className={`mx-auto w-24 h-24 object-cover border-2 cursor-pointer rounded-lg transition-all 
                  ${selectedImage === image ? "border-gray-600 scale-105" : "border-gray-300"}`}
                onClick={() => setSelectedImage(image)}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductImageSlider;


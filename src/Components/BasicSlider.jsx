import React from "react";
import Slider from "react-slick";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

// Arrow Components
const PrevArrow = ({ onClick }) => (
    <button
        onClick={onClick}
        className="z-10 absolute -left-3 top-1/2 transform -translate-y-1/2 bg-primary text-white md:p-2 p-1 rounded-full shadow-md hover:bg-gray-900"
    >
        <AiOutlineArrowLeft size={15} />
    </button>
);

const NextArrow = ({ onClick }) => (
    <button
        onClick={onClick}
        className="z-10 absolute -right-3 top-1/2 transform -translate-y-1/2 bg-primary text-white md:p-2 p-1 rounded-full shadow-md hover:bg-gray-900"
    >
        <AiOutlineArrowRight size={15} />
    </button>
);

function BasicSlider({ data }) {
    const settings = {
        infinite: true,
        slidesToShow: 3,
        speed: 500,
        arrows: true,
        pauseOnHover: true,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    dots: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false,
                },
            },
        ],
    };

    return (
        <div className="md:my-10 my-3 px-4">
            <Slider {...settings}>
                {data.map((item, index) => (
                    <div key={index} className="flex flex-col items-center text-center px-2">
                        <div className="w-56 h-56 mx-auto flex justify-center items-center overflow-hidden rounded-lg">
                            <img
                                src={item.cardImg}
                                alt={item.serviceName}
                                className="object-cover h-full w-full rounded-lg"
                            />
                        </div>
                        <div className="mt-2">
                            <p className="font-semibold text-gray-800">{item.serviceName}</p>
                            <p className="text-primary font-medium">₹{item.price}</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default BasicSlider;



      {/* <Slider {...settings}>
                {data.map((item, index) => (
                <ServiceCardstatic item={item} key={index}/>
                // <Ser item={item} key={index}/>
                ))}
            </Slider> */}
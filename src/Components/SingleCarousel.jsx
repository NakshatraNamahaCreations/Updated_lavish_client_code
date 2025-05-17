import React from "react";
import Slider from "react-slick";
import vector from "../assets/banner/vector.png";
import banner1 from "../assets/banner/banner1.png";
import banner2 from "../assets/banner/banner2.png";
import banner3 from "../assets/banner/banner3.png";




export default function SingleCarousel() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,

    };
    return (
        <Slider {...settings} className="outline-none">
            <div className="relative">
                <img
                    src={banner1}
                    alt="banner1"
                    className="w-full "
                    style={{
                        maskImage: `url(${vector})`,
                        WebkitMaskImage: `url(${vector})`,
                        maskSize: "cover",
                        maskRepeat: "no-repeat",
                        maskPosition: "center"
                    }}
                />
                <p className="absolute lg:bottom-28 bottom-5 underline lg:text-2xl left-[18%] cursor-pointer font-medium">Know more</p>
            </div>
            <div className="relative">
                <img
                    src={banner2}
                    alt="banner1"
                    className="w-full "
                    style={{
                        maskImage: `url(${vector})`,
                        WebkitMaskImage: `url(${vector})`,
                        maskSize: "cover",
                        maskRepeat: "no-repeat",
                        maskPosition: "center"
                    }}
                />

                <div className="absolute top-1/2 lg:right-10 right-0 transform -translate-y-1/2 text-white text-center poppins lg:space-y-3">
                    <h1 className="lg:text-7xl">FOR ALL YOUR</h1>
                    <h1 className="lg:text-8xl satisfy">Celebrations</h1>
                    <p className="lg:text-2xl text-xs ">STUNNING PARTY DECORATIONS</p>
                    <button className="bg-[#FEB395] lg:px-4 lg:py-2 px-2 text-sm lg:text-base text-black rounded-md font-bold">Book now</button>
                </div>
                {/* <p className="absolute bottom-28 underline text-2xl left-[20%] ">Know more</p> */}
            </div>
            <div className="relative">

                <img
                    src={banner3}
                    alt="banner1"
                    className="w-full "
                    style={{
                        maskImage: `url(${vector})`,
                        WebkitMaskImage: `url(${vector})`,
                        maskSize: "cover",
                        maskRepeat: "no-repeat",
                        maskPosition: "center"
                    }}
                />

                <div className="absolute top-1/2 lg:right-20 right-5 transform -translate-y-1/2 text-black text-center poppins lg:space-y-3">
                    <h1 className="lg:text-7xl">MARRY ME</h1>
                    <h1 className="lg:text-8xl satisfy">Decoration</h1>
                    <p className="lg:text-2xl ">No. 1 in treanding</p>
                    <button className="bg-[#680f0f] px-1 lg:px-4 lg:py-2 text-sm lg:text-base text-white rounded-md font-bold">Book now</button>
                </div>
                {/* <p className="absolute bottom-28 underline text-2xl left-[20%] ">Know more</p> */}
            </div>

        </Slider>

    );
}



import React from "react";
import Slider from "react-slick";
import vector from "../assets/banner/vector.png";
import banner1 from "../assets/banner/banner1.png";
import banner2 from "../assets/banner/banner2.png";
import banner3 from "../assets/banner/banner3.png";




export default function SingleCarousel({ banner }) {
    const filteredBanner = banner.filter(item => item.bannerType === "main banner");
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
            {filteredBanner.map((item) => (
                <div className="relative">
                    <img
                        src={`http://localhost:5000/images/${item?.bannerImage}`}
                        alt="banner1"
                        className="w-full "
                    />
                </div>
            ))}


     

        </Slider>

    );
}



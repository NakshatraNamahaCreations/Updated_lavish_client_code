import React from "react";
import Slider from "react-slick";

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
                        src={`${item?.bannerImage}`}
                        alt="banner1"
                        className="w-full "
                    />
                </div>
            ))}
        </Slider>

    );
}



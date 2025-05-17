import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GoHeartFill, GoHeart } from "react-icons/go";
import { IoIosStar } from "react-icons/io";

const ServiceCard = ({ service }) => {
  const [togglelike, setToggleLike] = useState(false);
  
  // If service is undefined or null, return a placeholder card
  if (!service) {
    return (
      <div className="relative mx-auto group mb-4 shadow-lg rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 break-inside-avoid md:px-3 md:pt-4 md:w-[300px] w-[180px] md:h-[360px] h-[280px] border border-gray-300">
        <p className="text-center pt-20">Service data not available</p>
      </div>
    );
  }

  return (
    <div className="relative mx-auto group mb-4 shadow-lg rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 break-inside-avoid md:px-3 md:pt-4 md:w-[300px] w-[180px] md:h-[360px] h-[280px] border border-gray-300">
      <div
        className="rounded-full bg-white p-2 absolute lg:top-6 lg:right-6 top-2 right-1 text-2xl cursor-pointer"
        onClick={() => setToggleLike(!togglelike)}
      >
        {togglelike ? (
          <GoHeartFill className="text-red-600" />
        ) : (
          <GoHeart className="text-gray-600" />
        )}
      </div>

      <Link to={`/service/details/${service._id || '1'}`}>
        <div>
          <div>
            <img
              src={service.cardImg || (service.images && `http://localhost:5000/images/${service.images[0]}`) || "https://via.placeholder.com/300x200?text=No+Image"}
              className="object-cover h-40 lg:h-56 w-full"
              alt={service.serviceName || "Service"}
            />
          </div>
          <div className="px-1 flex flex-col justify-between">
            <div>
              <p className="pt-2">At your location</p>
              <p className="text-md font-semibold">{service.serviceName || "Service Name"}</p>
            </div>

            <div className="flex justify-between pt-3 pb-1 absolute bottom-0 left-0 w-full md:px-4 px-1">
              <p className="font-medium text-gray-600">
                Rs. {service.offerPrice || service.price || "0"}
              </p>
              <p className="flex gap-1 text-primary items-center">
                <IoIosStar /> 4.5
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ServiceCard;

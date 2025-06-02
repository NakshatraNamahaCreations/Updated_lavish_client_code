import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GoHeartFill, GoHeart } from "react-icons/go";
import { IoIosStar } from "react-icons/io";
import axios from "axios";
import { getAuthAxios, getAxios } from "../utils/api";

const ServiceCard = ({ service }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const storedUser = localStorage.getItem('user');
  const userData = JSON.parse(storedUser);
  const customerId = userData?.id;
const authAxios = getAuthAxios()
  useEffect(() => {
    const checkWishlistStatus = async () => {
      if (!customerId || !service?._id) return;
      
      try {
        const response = await getAxios().get(`/wishlist/${customerId}`);
        const wishlistItems = response.data.wishlist;
        const isServiceInWishlist = wishlistItems.some(item => item.serviceId._id === service._id);
        setIsInWishlist(isServiceInWishlist);
        
      } catch (error) {
        console.error("Error checking wishlist status:", error);
      }
    };

    checkWishlistStatus();
  }, [customerId, service?._id]);

  const handleWishlist = async () => {
    if (!customerId) {
      // Handle case when user is not logged in
      alert("Please login to add items to wishlist");
      return;
    }

    setIsLoading(true);
    try {
      if (isInWishlist) {
        // Remove from wishlist
        await authAxios.delete(`/wishlist/remove-item/${customerId}/${service._id}`);
        setIsInWishlist(false);
      } else {
        // Add to wishlist with all required fields
        await authAxios.post(`/wishlist/create/`, {
          serviceId: service._id,
          serviceName: service.serviceName,
          customerId,
          servicePrice: service.offerPrice || service.price || 0,
          serviceImages: service.images || []
        });
        setIsInWishlist(true);
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      alert(error.response?.data?.message || "Error updating wishlist");
    } finally {
      setIsLoading(false);
    }
  };

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
        onClick={handleWishlist}
        style={{ pointerEvents: isLoading ? 'none' : 'auto' }}
      >
        {isInWishlist ? (
          <GoHeartFill className="text-red-600" />
        ) : (
          <GoHeart className="text-gray-600" />
        )}
      </div>

      <Link to={`/service/details/${service._id}`}>
        <div>
          <div>
            <img
              src={`${service?.images[0]}`}
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
                Rs. {service.offerPrice}
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



import React, { useEffect, useState } from 'react';
import { GoHeartFill, GoHeart } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { getAuthAxios, getAxios } from '../utils/api';

// WishlistCard Component
const WishlistCard = ({ item, onRemove }) => {
    const navigate = useNavigate();
    const authAxios = getAuthAxios()
    if (!item?.serviceId) return null;

    const { serviceId, customerId, serviceName, servicePrice, serviceImages } = item;


    const handleRemove = async () => {
        try {
            const serviceIdToUse = serviceId?._id;
            const customerIdToUse = customerId?._id;

            const res = await authAxios.delete(`/wishlist/remove-item/${customerIdToUse}/${serviceIdToUse}`);

            if (res.status === 200) {
                onRemove(serviceIdToUse);
            }
        } catch (error) {
            console.error('Error removing from wishlist:', error);
        }
    };

    return (
        <div className="group relative mb-4 shadow-lg rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 break-inside-avoid md:p-3 md:py-4 md:w-[300px] w-[170px] border border-gray-300">
            <img
                src={serviceImages?.[0]
                    ? `${serviceImages[0]}`
                    : serviceId.images?.[0]
                        ? `${serviceId.images[0]}`
                        : 'https://via.placeholder.com/300x200?text=No+Image'}
                className="object-cover w-full h-56"
                alt={serviceName || serviceId.name || 'Service'}
            />

            {/* Red heart for removal */}
            <div
                className="rounded-full bg-white p-2 absolute top-6 right-6 text-2xl cursor-pointer"
                onClick={handleRemove}
                title="Remove from Wishlist"
            >
                <GoHeartFill className="text-red-600" />
            </div>

            <div className="px-2 py-2">
                <p className="font-bold">{serviceName || serviceId.name || 'Service Name'}</p>
                <p className="py-2">At your location</p>
                <div className="flex justify-between items-end text-sm md:text-base">
                    <p className="font-bold">Rs. {servicePrice || serviceId.offerPrice || serviceId.price || '0'}</p>
                    <button
                        onClick={() => navigate(`/service/details/${serviceId._id || serviceId}`)}
                        className="md:px-3 p-2 md:py-2 bg-[#AA6300] rounded-md text-white font-semibold"
                    >
                        Check out
                    </button>
                </div>
            </div>
        </div>
    );
};


// Wishlist Component
const Wishlist = () => {
    const storedUser = localStorage.getItem('user');
    const userData = JSON.parse(storedUser);
    const customerId = userData?.id;
    const [wishlistItems, setWishlistItems] = useState([]);


    useEffect(() => {
        const checkWishlistStatus = async () => {
            if (!customerId) return;
            try {
                const response = await getAxios().get(`/api/wishlist/${customerId}`);
                const wishlistItems = response.data.wishlist;
                setWishlistItems(wishlistItems);
                console.log("wishlistItems", wishlistItems);
            } catch (error) {
                console.error("Error checking wishlist status:", error);
            }
        };

        checkWishlistStatus();
    }, [customerId]);

    // Handle removing an item from the wishlist
    const handleRemove = (serviceIdToRemove) => {
        setWishlistItems(prevItems =>
            prevItems.filter(item =>
                (item.serviceId?._id) !== serviceIdToRemove
            )
        );
    };

    return (
        <div className='lg:p-2 lg:pt-24 pt-32 p-4 mx-auto'>
            <h1 className='text-3xl text-center font-bold  py-6'>Your wishlist</h1>
            <div className='flex md:space-x-16 lg:gap-8 flex-wrap md:justify-center justify-between'>
                {wishlistItems.length > 0 ? wishlistItems.map((item) => (
                    <WishlistCard key={item._id} item={item} onRemove={handleRemove} />
                )) : <p className='text-center text-2xl  mt-10'>No items in wishlist</p>}
            </div>
        </div>
    );
};


export default Wishlist;

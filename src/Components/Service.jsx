import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ServiceCard from "./ServiceCard";

// Only show banner for these exact subcategories
const banners = {
  "Candlelight Decoration": "/images/candlelight.png",
  "Balloon Bouquet": "/images/bouquetBanner.png",
  "House warming Decoration": "/images/housewarming.png",
  "Surprise Gifts": "/images/giftbanner.png",
  "Proposal Decoration": "/images/proposalbanner.png",
};

const Service = () => {
  const { id } = useParams();

  const [services, setServices] = useState([]);
  const [subCatTitle, setSubCatTitle] = useState("Services");
  const [bannerImg, setBannerImg] = useState(null);
  const [sortOption, setSortOption] = useState("latest");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/services/filter/${id}`);
        const data = await response.json();

        if (response.ok && data.success && Array.isArray(data.data)) {
          setServices(data.data);

          const firstService = data.data[0];
          const subCategoryName = firstService?.subCategoryId?.subCategory;
          setSubCatTitle(subCategoryName || "Services");

          // Only set banner if subcategory name exists in our predefined list
          if (subCategoryName && banners[subCategoryName]) {
            setBannerImg(banners[subCategoryName]);
          } else {
            setBannerImg(null); // No banner shown
          }
        } else {
          setServices([]);
          setSubCatTitle("");
          setBannerImg(null);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setServices([]);
        setSubCatTitle("Error Loading Services");
        setBannerImg(null);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [id]);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const sortedServices = () => {
    const sorted = [...services];
    if (sortOption === "latest") {
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    if (sortOption === "high to low") {
      return sorted.sort((a, b) => (b.offerPrice || 0) - (a.offerPrice || 0));
    }
    if (sortOption === "low to high") {
      return sorted.sort((a, b) => (a.offerPrice || 0) - (b.offerPrice || 0));
    }
    return sorted;
  };

  return (
    <div className="relative md:pt-28 pt-36 md:px-10 px-2">
      {bannerImg && (
        <img
          src={bannerImg}
          alt={`${subCatTitle} Banner`}
          className="w-full object-cover rounded-lg mb-5"
        />
      )}

      <div className="flex justify-between items-center mb-5 md:px-10">
        <div>
          <h1 className="text-2xl font-bold">{subCatTitle} Services</h1>
        </div>

        {services.length > 0 && (
          <select
            name="filter"
            className="border-b p-2 rounded-2xl w-[200px] outline-none"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="latest">Latest</option>
            <option value="high to low">High to Low</option>
            <option value="low to high">Low to High</option>
          </select>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 md:gap-6 gap-4 mt-6">
        {loading ? (
          <div className="col-span-3 text-center text-gray-500">Loading services...</div>
        ) : services.length === 0 ? (
          <div className="col-span-3 text-center text-gray-500">
            No services found for this category.
          </div>
        ) : (
          sortedServices().map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))
        )}
      </div>
    </div>
  );
};

export default Service;



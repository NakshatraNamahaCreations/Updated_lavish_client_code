import React, { useState, useEffect } from "react";
import ServiceCard from "./ServiceCard";
import { getAxios } from "../utils/api";

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("latest");

  useEffect(() => {
    fetchAllServices();
  }, []);

  const fetchAllServices = async () => {
    setLoading(true);
    try {
      const response = await getAxios().get("/services/");
      const { data } = response.data;
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error.message);
      setError("Failed to fetch services. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const sortedServices = () => {
    const sorted = [...services];
    if (sortOption === "latest") {
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    if (sortOption === "high to low") {
      return sorted.sort((a, b) => (b.offerPrice || b.price || 0) - (a.offerPrice || a.price || 0));
    }
    if (sortOption === "low to high") {
      return sorted.sort((a, b) => (a.offerPrice || a.price || 0) - (b.offerPrice || b.price || 0));
    }
    return sorted;
  };

  return (
    <div className="relative md:pt-28 pt-36 md:px-10 px-2">
      <div className="flex justify-between items-center mb-5 md:px-10">
        <div>
          <h1 className="text-2xl font-bold">All Services</h1>
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
        ) : error ? (
          <div className="col-span-3 text-center text-red-500">{error}</div>
        ) : services.length === 0 ? (
          <div className="col-span-3 text-center text-gray-500">
            No services found.
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

export default AllServices; 
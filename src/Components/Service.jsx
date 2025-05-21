// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import ServiceCard from "./ServiceCard";

// const Service = () => {
//   const [filteredServices, setFilteredServices] = useState([]);
//   const [subCatTitle, setSubCatTitle] = useState("");
//   const [services, setServices] = useState([]);
//   const [sortOption, setSortOption] = useState("latest");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { id } = useParams();

//   const fetchServices = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       // Clear previous data
//       setServices([]);
//       setFilteredServices([]);
//       setSubCatTitle("");

//       const response = await fetch(
//         `http://localhost:5000/api/services/filter/${id}`
//       );

//       if (!response.ok) {
//         throw new Error(`Failed to fetch services: ${response.statusText}`);
//       }

//       const data = await response.json();

//       if (data.success) {
//         console.log("data", data);
//         setServices(data.data);
//         setFilteredServices(data.data);
//       } else {
//         setServices([]);
//         setFilteredServices([]);
//       }
//     } catch (error) {
//       console.error("Error fetching services:", error);
//       setServices([]);
//       setFilteredServices([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Sorting function based on the selected option
//   const handleSortChange = (event) => {
//     setSortOption(event.target.value);
//   };

//   console.log("filteredServices", filteredServices);
//   console.log("services", services);
//   console.log("subCatTitle", subCatTitle);

//   const sortedServices = () => {
//     let sorted = [...filteredServices];

//     if (sortOption === "latest") {
//       sorted = sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//     } else if (sortOption === "high to low") {
//       sorted = sorted.sort((a, b) => (b.offerPrice || 0) - (a.offerPrice || 0));
//     } else if (sortOption === "low to high") {
//       sorted = sorted.sort((a, b) => (a.offerPrice || 0) - (b.offerPrice || 0));
//     }
//     return sorted;
//   };

//   // Fetch services when the component mounts or the `id` param changes
//   useEffect(() => {
//     fetchServices();
//   }, [id]);

//   return (
//     <div className="relative pt-28 px-10">
//       <div className="flex justify-between items-center mb-5 px-10">
//         <div>
//           <h1 className="text-2xl font-bold">{subCatTitle} Services</h1>
//           {!loading && services.length === 0 && (
//             <p className="text-gray-500 mt-2">No services available for this category at the moment.</p>
//           )}
//         </div>
//         {services.length > 0 && (
//           <select
//             name="filter"
//             className="border-b p-2 rounded-2xl w-[200px] outline-none"
//             value={sortOption}
//             onChange={handleSortChange}
//           >
//             <option value="latest">Latest</option>
//             <option value="high to low">High to Low</option>
//             <option value="low to high">Low to High</option>
//           </select>
//         )}
//       </div>

//       <div className="grid grid-cols-3 lg:gap-10 gap-3 justify-between lg:mt-10 mt-5">
//         {loading ? (
//           <p>Loading services...</p>
//         ) : services.length === 0 ? (
//           <div className="col-span-3 text-center py-10">
//             <p className="text-gray-500 text-lg">No services found for this category.</p>
//             <p className="text-gray-400 mt-2">Please check back later or explore other categories.</p>
//           </div>
//         ) : (
//           sortedServices().map((service) => (
//             <ServiceCard key={service._id} service={service} />
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Service;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ServiceCard from "./ServiceCard";

const Service = () => {
  const { id } = useParams();

  const [services, setServices] = useState([]);
  const [subCatTitle, setSubCatTitle] = useState("Services");
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

          // Get subcategory name from the first service
          const firstService = data.data[0];
          const subCategoryName = firstService?.subCategoryId?.subCategory;
          setSubCatTitle(subCategoryName || "Services");
        } else {
          setServices([]);
          setSubCatTitle("");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setServices([]);
        setSubCatTitle("Error Loading Services");
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
    <div className="relative pt-28 px-10">
      <div className="flex justify-between items-center mb-5 px-10">
        <div>
          <h1 className="text-2xl font-bold">{subCatTitle} Services</h1>
          {/* {!loading && services.length === 0 && (
            <p className="text-gray-500 mt-2">No services available for this category.</p>
          )} */}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
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

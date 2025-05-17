// import React, { useEffect, useLayoutEffect, useState } from 'react'
// import { Link, useParams } from 'react-router-dom'
// import { services } from "../json/services"
// import ServiceCard from './ServiceCard'

// const Service = () => {

//   const [filteredData, setFilteredData] = useState([])
//   const { category } = useParams();

//   useEffect(() => {
//     setFilteredData(services.filter(item => item.subcatName === category))
//   }, [category])

//   return (
//     <div className='relative md:pt-20 pt-32  mx-auto'>
//         <div className="md:p-5 p-3">
// {filteredData.map((cat, index) => (
//   <div key={index} className="mb-6 md:p-4 ">
//     {/* Subcategory Name */}
//     <h2 className="text-xl font-bold mb-2">{cat.subcatName}</h2>

//     {/* Check if subsubCat exists */}
//     {cat.subsubCat && (
//       <div className="flex gap-4 my-4 ">
//         {cat.subsubCat.map((subsub, idx) => (
//           <div key={idx} className="text-center">
//             <img
//               src={subsub.src}
//               alt={subsub.subsubcatName}
//               className="w-32 h-32 object-cover rounded-full"
//             />
//             <p className="mt-2 font-semibold">{subsub.subsubcatName}</p>
//           </div>
//         ))}
//       </div>
//     )}

//             {/* Services List */}

//             {/* <div className="flex md:space-x-16 lg:gap-x-20 lg:gap-y-10 flex-wrap md:justify-center justify-between lg:mt-10 mt-5"> */}
//             <div className="grid md:grid-cols-3 grid-cols-2 justify-between lg:mt-10 mt-5">
//               {cat.serviceName.map((service, idx) => (

//                 <ServiceCard category={category} key={idx} item={service}  />
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Service


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ServiceCard from "./ServiceCard";

const Service = () => {
  const [filteredServices, setFilteredServices] = useState([]);
  const [subCatTitle, setSubCatTitle] = useState("");
  const [services, setServices] = useState([]);
  const [sortOption, setSortOption] = useState("latest");
  const { id } = useParams(); // Fetching 'id' from URL params

  const fetchServices = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/services/filter/${id}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch services: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success) {
        console.log("data", data)
        setServices(data.data); // Set the services returned from the API
        setSubCatTitle(data.categoryName || "Services"); // Set the category name, or default to "Services"
        setFilteredServices(data.data); // Initially, display all services as per the backend
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  // Sorting function based on the selected option
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const sortedServices = () => {
    let sorted = [...filteredServices];

    if (sortOption === "latest") {
      // Assuming createdAt is in ISO 8601 format (string)
      sorted = sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOption === "high to low") {
      // Ensure price is treated as a number (parse if needed)
      sorted = sorted.sort((a, b) => (b.offerPrice || 0) - (a.offerPrice || 0));
    } else if (sortOption === "low to high") {
      // Ensure price is treated as a number (parse if needed)
      sorted = sorted.sort((a, b) => (a.offerPrice || 0) - (b.offerPrice || 0));
    }
    return sorted;
  };

  // Fetch services when the component mounts or the `id` param changes
  useEffect(() => {
    fetchServices();
  }, [id]); // Adding `id` as a dependency to refetch if the `id` changes

  return (
    <div className="relative pt-28 px-10">
      <div className="flex justify-between items-center mb-5 px-10">
        <h1 className="text-2xl font-bold">{subCatTitle}</h1>
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
      </div>



      <div className="grid  grid-cols-3 lg:gap-10 gap-3 justify-between lg:mt-10 mt-5">
        {services.length === 0 ? (
          <p>No services found for this category.</p>
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

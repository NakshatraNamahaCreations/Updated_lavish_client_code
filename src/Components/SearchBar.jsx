// import React, { useEffect, useState } from "react";
// import { IoSearchSharp, IoCloseSharp } from "react-icons/io5";
// import img1 from "../assets/navImg1.png"
// import img2 from "../assets/navImg2.png"
// import img3 from "../assets/navImg3.png"
// import { Link } from "react-router-dom";
// import ServiceCardstatic from "./ServiceCardstatic";


// const searchsuggestionList = [
//     { id: 1, name: "Naming Ceremony Decoration ", link: "/namingceremonydecor" },
//     { id: 2, name: "Kid's Birthday Decoration ", link: "/kidsBirthdaydecor" },
//     { id: 3, name: "Adult's Birthday Decoration ", link: "/adultBirthdaydecor" },
//     { id: 4, name: "Marry Me Decoration ", link: "/service/1" },
//     { id: 5, name: "Proposal Decoration ", link: "/service/Proposal Decor" },
//     { id: 6, name: "Baby Welcome decoration", link: "/welcomebabydecor" },
//     { id: 7, name: "First night decoration", link: "/service/First Night Decor" },
//     { id: 8, name: "Baby shower decoration", link: "/babyshowerdecor" },
//     { id: 9, name: "Entertainment Party decoration", link: "/entertainmentdecor" },
//     { id: 10, name: "Anniversary decoration", link: "/anniversarydecor" },
//     { id: 11, name: "RingCeremony decoration", link: "/ringceremonydecor" },
//     { id: 12, name: "Bride to be decoration", link: "/bridetobedecor" },
//     { id: 13, name: "Groom to be decoration", link: "/groomtobedecor" },
//     { id: 14, name: "Party decoration", link: "/service/3" },
//     { id: 15, name: "Kid's Simple decoration", link: "/service/Kids Simple decor" },
//     { id: 16, name: "Kids Premimum decoration", link: "/service/Kids Premimum decor" },
//     { id: 17, name: "Baby Boy Birthday decor", link: "/service/Baby boy decor" },
//     { id: 19, name: "Baby Girl Birthday decor", link: "/service/Baby Girl decor" },
//     { id: 20, name: "Adult's Simple Birthday decor", link: "/service/Adults Simple decor" },
//     { id: 21, name: "Adult's Premimum Birthday decor", link: "/service/Adults Premimum decor" },
//     { id: 22, name: "Room decoration", link: "/service/Room decoration" },
//     { id: 23, name: "Romantic decoration", link: "/service/Romantic decoration" },
//     { id: 24, name: "Canopy decoration", link: "/service/Canopy decoration" },
//     { id: 25, name: "Terrace decoration", link: "/service/Terrace Decoration" },
//     { id: 26, name: "Anniversary Simple decoration", link: "/service/Anniversary Simple decoration" },
//     { id: 27, name: "Anniversary Premimum decoration", link: "/service/Anniversary Premimum decoration" },
//     { id: 28, name: "Babyshower Simple decoration", link: "/service/Babyshower Simple decoration" },
//     { id: 29, name: "Babyshower Premimum decoration", link: "/service/Babyshower Premimum decoration" },
//     { id: 30, name: "Welcome Boy decoration", link: "/service/Welcome Boy decoration" },
//     { id: 31, name: "Welcome Girl decoration", link: "/service/Welcome Girl decoration" },
//     { id: 32, name: "Naming ceremony Simple decoration", link: "/service/Naming ceremony Simple decoration" },
//     { id: 33, name: "Naming ceremony Premimum decoration", link: "/service/Naming ceremony Premimum decoration" },
//     { id: 34, name: "Proposal Decoration", link: "/service/Proposal Decoration" },
//     { id: 35, name: "First Night Decoration", link: "/service/First Night Decoration" },
//     { id: 36, name: "Balloon Bouquet Decoration", link: "/service/Balloon Bouquet Decoration" },
//     { id: 37, name: "Surprise gifts Decoration", link: "/service/Surprise gifts Decoration" },
//     { id: 38, name: "Festival Decoration", link: "/service/Festival Decoration" },
//     { id: 39, name: "Better Together Decoration", link: "/service/Better Together Decoration" },
//     { id: 40, name: "House warming Decoration", link: "/service/Housewarming Decoration" },
//     { id: 41, name: "Congratulations Decoration", link: "/service/Congratulations Decoration" },
//     { id: 42, name: "Shop Opening Decoration", link: "/service/Shop Opening Decoration" },
//     { id: 43, name: "Office Decoration", link: "/service/Office Balloon Decoration" },
//     { id: 44, name: "Bouquet Surprise", link: "/service/Bouquet Surprise" },
//     { id: 45, name: "Retirement Decoration", link: "/service/Retirement Decoration" },
//     { id: 46, name: "Mundan Ceremony Decoration", link: "/service/Mundan Ceremony" },
//     { id: 47, name: "Candle light Decoration", link: "/service/Candle light Decoration" },

// ]

// const imgList = [
//     img1,
//     img2,
//     img3,
// ]

// const SearchBar = ({ setSearchbartoggle }) => {
//     const [isOpen, setIsOpen] = useState(true);
//     const [inpVal, setInpVal] = useState("")
//     const [filteredData, setfilteredData] = useState([])

//     const handleClose = () => {
//         setIsOpen(false);
//         setSearchbartoggle(false);
//         setInpVal("")

//     };

//     useEffect(() => {
//         if (inpVal.length > 2) {

//             const filterdata = searchsuggestionList.filter(item =>
//                 item.name.toLowerCase().includes(inpVal.toString().toLowerCase())
//             );
//             const intialdata = filterdata
//                 .sort(() => 0.5 - Math.random())
//                 .slice(0, 6);
//             setfilteredData(intialdata);

//         } else {

//             const randomItems = searchsuggestionList
//                 .sort(() => 0.5 - Math.random())
//                 .slice(0, 5);
//             setfilteredData(randomItems);
//         }
//     }, [inpVal]);


//     return (
//         <div className={`search-bar-container ${isOpen ? "open" : "close"}`}>
//             <div className={`search-bar ${isOpen ? "open" : "close"}`}>
//                 <div className="flex lg:px-20 md:px-8 px-2 items-center justify-between py-4">
//                     <div className="flex gap-2 items-center border border-gray-400 px-3 rounded-lg py-2">
//                         <IoSearchSharp size={25} className="text-gray-600" />
//                         <input
//                             type="text"
//                             autofocus
//                             placeholder="Search by event, birthday, party..."
//                             className="outline-none text-gray-600 py-1 md:w-[500px] w-[260px] "
//                             onChange={(e) => setInpVal(e.target.value)}
//                         />
//                     </div>
//                     <IoCloseSharp size={30} onClick={handleClose} className="cursor-pointer" />
//                 </div>

//                 <div className="lg:px-20 md:px-10 px-4 ">
//                     <p className="text-lg  pb-5"> Top Categories based on your search </p>
//                     <ul className="flex gap-2 flex-wrap ">
//                         {filteredData.length > 0 ? filteredData.map(item => (
//                             <Link to={item.link} onClick={handleClose} key={item.id}>   <li className="p-2 bg-primary text-white rounded-md text-center md:text-lg text-sm cursor-pointer">{item.name}</li></Link>
//                         ))
//                             : <p>Search some thing else  </p>}
//                     </ul>

//                 </div>
//                 <hr className="my-2 border-1 border-gray-400" />
//                 <h1 className="text-2xl font-bold lg:px-20 md:px-8 px-2">Recommended</h1>
//                 <div className="flex lg:gap-8 md:gap-2 gap-8 lg:px-20  px-4 flex-wrap py-7">
//                     {imgList.map((img, i) => (
//                         <ServiceCardstatic key={i} />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SearchBar;



import React, { useEffect, useState } from "react";
import { IoSearchSharp, IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";
import ServiceCard from "./ServiceCard";

const SearchBar = ({ setSearchbartoggle }) => {
    const [isOpen, setIsOpen] = useState(true);
    const [inpVal, setInpVal] = useState("")
    const [filteredData, setfilteredData] = useState([])

    const handleClose = () => {
        setIsOpen(false);
        setSearchbartoggle(false);
        setInpVal("")

    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/services/search/${inpVal}`);
                const data = await response.data;
                setfilteredData(data.data);
                console.log("filteredData", data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [inpVal]);


    return (
        <div className={`search-bar-container ${isOpen ? "open" : "close"}`}>
            <div className={`search-bar ${isOpen ? "open" : "close"}`}>
                <div className="flex lg:px-20 md:px-8 px-2 items-center justify-between py-4">
                    <div className="flex gap-2 items-center border border-gray-400 px-3 rounded-lg py-2">
                        <IoSearchSharp size={25} className="text-gray-600" />
                        <input
                            type="text"
                            autofocus
                            placeholder="Search by event, birthday, party..."
                            className="outline-none text-gray-600 py-1 md:w-[500px] w-[260px] "
                            onChange={(e) => setInpVal(e.target.value)}
                        />
                    </div>
                    <IoCloseSharp size={30} onClick={handleClose} className="cursor-pointer" />
                </div>

                <div className="lg:px-20 md:px-10 px-4 py-5">
                    <p className="text-lg  pb-5"> Top Categories based on your search </p>
                    <ul className="flex gap-2 flex-wrap">
                        {inpVal.length > 2 ? (
                            filteredData.length > 0 ? (
                                filteredData.map(item => (
                                    <Link to={`/service/details/${item._id}`} onClick={handleClose} key={item._id}>
                                        <li className="p-2 bg-primary text-white rounded-md text-center md:text-lg text-sm cursor-pointer">
                                            {item.serviceName}
                                        </li>
                                    </Link>
                                ))
                            ) : (
                                <p>No matching services found. Try something else.</p>
                            )
                        ) : null}
                    </ul>

                </div>
                <div className="grid grid-cols-3 gap-4 px-20">
                    {filteredData.length > 0 && inpVal.length > 2 ? (
                        filteredData.map((item, index) => (
                            <div key={index} onClick={handleClose}>
                                <ServiceCard  service={item}  />
                            </div>
                        ))
                    ) : null}   
                </div>

            </div>
        </div>
    );
};

export default SearchBar;

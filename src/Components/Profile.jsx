import React, { useEffect, useState } from 'react'
import { FaUserGroup, FaUserLarge, FaClockRotateLeft } from "react-icons/fa6";
import { FaHistory, FaShareAlt } from "react-icons/fa";
import { IoTicketSharp, IoWalletSharp } from "react-icons/io5";
import { BiSolidDiscount, BiLogOut } from "react-icons/bi";
import { CiMoneyCheck1 } from "react-icons/ci";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import { IoMdTime } from "react-icons/io";
import img from "../assets/img/img1.jpg"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TfiAlignLeft } from "react-icons/tfi";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { setProfile } from '../features/userdetails/profileSlice';

const PastBookings = () => {
    return (
        <div className='h-[75vh] overflow-y-auto lg:m-10 m-4 mt-5  scrollbar-hide'>
            <div className='lg:w-[60%] '>
                <h1 className='font-bold poppins lg:my-6'>Past Bookings</h1>
                <p className='lg:pb-7 text-[#AA6300] font-medium'>20th Feb 2025</p>
                <div className='border border-gray-300 lg:p-4 p-2 rounded my-4'>
                    <div className='flex lg:gap-4 gap-2 lg:items-center'>
                        <img src={img} className='w-24 h-28 rounded-2xl' />
                        <div className='space-y-1'>
                            <p className=' font-normal poppins'>Baby Shower Decoration</p>
                            <p className='text-sm text-gray-600 font-medium flex items-center gap-2'> <HiOutlineCalendarDateRange /> 11th Jan 2025</p>
                            <p className='text-sm text-gray-600 font-medium flex items-center gap-2'> <IoMdTime /> 08:00 AM - 11:00 AM</p>
                            <p className='text-sm text-gray-600 font-medium flex items-center gap-2'> <CiMoneyCheck1 /> Package Amount : Rs. 1,599</p>
                        </div>
                    </div>
                    <div className=' flex md:items-end md:flex-col flex-row-reverse items-center justify-between gap-4 lg:pt-4 md:pt-0 '>
                        {/* <RiDeleteBin6Line className='cursor-pointer' /> */}
                        <h1 className='font-medium text-lg'>Rs. 1,599</h1>
                    </div>
                </div>
                <div className='border border-gray-300 lg:p-4 p-2 rounded my-4'>
                    <div className='flex lg:gap-4 gap-2 lg:items-center'>
                        <img src={img} className='w-24 h-28 rounded-2xl' />
                        <div className='space-y-1'>
                            <p className=' font-normal poppins'>Baby Shower Decoration</p>
                            <p className='text-sm text-gray-600 font-medium flex items-center gap-2'> <HiOutlineCalendarDateRange /> 11th Jan 2025</p>
                            <p className='text-sm text-gray-600 font-medium flex items-center gap-2'> <IoMdTime /> 08:00 AM - 11:00 AM</p>
                            <p className='text-sm text-gray-600 font-medium flex items-center gap-2'> <CiMoneyCheck1 /> Package Amount : Rs. 1,599</p>
                        </div>
                    </div>
                    <div className=' flex md:items-end md:flex-col flex-row-reverse items-center justify-between gap-4 lg:pt-4 md:pt-0 '>
                        {/* <RiDeleteBin6Line className='cursor-pointer' /> */}
                        <h1 className='font-medium text-lg'>Rs. 1,599</h1>
                    </div>
                </div>
                <div className='border border-gray-300 lg:p-4 p-2 rounded my-4'>
                    <div className='flex lg:gap-4 gap-2 lg:items-center'>
                        <img src={img} className='w-24 h-28 rounded-2xl' />
                        <div className='space-y-1'>
                            <p className=' font-normal poppins'>Baby Shower Decoration</p>
                            <p className='text-sm text-gray-600 font-medium flex items-center gap-2'> <HiOutlineCalendarDateRange /> 11th Jan 2025</p>
                            <p className='text-sm text-gray-600 font-medium flex items-center gap-2'> <IoMdTime /> 08:00 AM - 11:00 AM</p>
                            <p className='text-sm text-gray-600 font-medium flex items-center gap-2'> <CiMoneyCheck1 /> Package Amount : Rs. 1,599</p>
                        </div>
                    </div>
                    <div className=' flex md:items-end md:flex-col flex-row-reverse items-center justify-between gap-4 lg:pt-4 md:pt-0 '>
                        {/* <RiDeleteBin6Line className='cursor-pointer' /> */}
                        <h1 className='font-medium text-lg'>Rs. 1,599</h1>
                    </div>
                </div>

                <div className='border border-gray-300 lg:p-4 p-2 rounded my-4'>
                    <div className='flex lg:gap-4 gap-2 lg:items-center'>
                        <img src={img} className='w-24 h-28 rounded-2xl' />
                        <div className='space-y-1'>
                            <p className=' font-normal poppins'>Baby Shower Decoration</p>
                            <p className='text-sm text-gray-600 font-medium flex items-center gap-2'> <HiOutlineCalendarDateRange /> 11th Jan 2025</p>
                            <p className='text-sm text-gray-600 font-medium flex items-center gap-2'> <IoMdTime /> 08:00 AM - 11:00 AM</p>
                            <p className='text-sm text-gray-600 font-medium flex items-center gap-2'> <CiMoneyCheck1 /> Package Amount : Rs. 1,599</p>
                        </div>
                    </div>
                    <div className=' flex md:items-end md:flex-col flex-row-reverse items-center justify-between gap-4 lg:pt-4 md:pt-0 '>
                        {/* <RiDeleteBin6Line className='cursor-pointer' /> */}
                        <h1 className='font-medium text-lg'>Rs. 1,599</h1>
                    </div>
                </div>

            </div>
        </div>

    )
}
const UpcomingBookings = () => {
    return (
        <div className='h-[75vh] overflow-y-auto lg:m-10 m-4 mt-5  scrollbar-hide'>
            <div className='lg:w-[60%] '>
                <h1 className='font-bold poppins lg:my-6'>Upcoming Bookings</h1>
                <p className='lg:pb-7 text-[#AA6300] font-medium'>20th Mar 2025</p>
                <div className='border border-gray-300 lg:p-4 p-2 rounded my-4'>
                    <div className='flex lg:gap-4 gap-2 lg:items-center'>
                        <img src={img} className='w-24 h-28 rounded-2xl' />
                        <div className='space-y-1'>
                            <p className=' font-normal poppins'>Baby Shower Decoration</p>
                            <p className='text-sm text-gray-600 font-medium flex items-center gap-2'> <HiOutlineCalendarDateRange /> 11th Jan 2025</p>
                            <p className='text-sm text-gray-600 font-medium flex items-center gap-2'> <IoMdTime /> 08:00 AM - 11:00 AM</p>
                            <p className='text-sm text-gray-600 font-medium flex items-center gap-2'> <CiMoneyCheck1 /> Package Amount : Rs. 1,599</p>
                        </div>
                    </div>
                    <div className=' flex md:items-end md:flex-col flex-row-reverse items-center justify-between gap-4 lg:pt-4 md:pt-0 '>
                        {/* <RiDeleteBin6Line className='cursor-pointer' /> */}
                        <h1 className='font-medium text-lg'>Rs. 1,599</h1>
                    </div>
                </div>
                <div className='border border-gray-300 lg:p-4 p-2 rounded my-4'>
                    <div className='flex lg:gap-4 gap-2 lg:items-center'>
                        <img src={img} className='w-24 h-28 rounded-2xl' />
                        <div className='space-y-1'>
                            <p className=' font-normal poppins'>Baby Shower Decoration</p>
                            <p className='text-sm text-gray-600 font-medium flex items-center gap-2'> <HiOutlineCalendarDateRange /> 11th Jan 2025</p>
                            <p className='text-sm text-gray-600 font-medium flex items-center gap-2'> <IoMdTime /> 08:00 AM - 11:00 AM</p>
                            <p className='text-sm text-gray-600 font-medium flex items-center gap-2'> <CiMoneyCheck1 /> Package Amount : Rs. 1,599</p>
                        </div>
                    </div>
                    <div className=' flex md:items-end md:flex-col flex-row-reverse items-center justify-between gap-4 lg:pt-4 md:pt-0 '>
                        {/* <RiDeleteBin6Line className='cursor-pointer' /> */}
                        <h1 className='font-medium text-lg'>Rs. 1,599</h1>
                    </div>
                </div>
                <div className='border border-gray-300 lg:p-4 p-2 rounded my-4'>
                    <div className='flex lg:gap-4 gap-2 lg:items-center'>
                        <img src={img} className='w-24 h-28 rounded-2xl' />
                        <div className='space-y-1'>
                            <p className=' font-normal poppins'>Baby Shower Decoration</p>
                            <p className='text-sm text-gray-600 font-medium flex items-center gap-2'> <HiOutlineCalendarDateRange /> 11th Jan 2025</p>
                            <p className='text-sm text-gray-600 font-medium flex items-center gap-2'> <IoMdTime /> 08:00 AM - 11:00 AM</p>
                            <p className='text-sm text-gray-600 font-medium flex items-center gap-2'> <CiMoneyCheck1 /> Package Amount : Rs. 1,599</p>
                        </div>
                    </div>
                    <div className=' flex md:items-end md:flex-col flex-row-reverse items-center justify-between gap-4 lg:pt-4 md:pt-0 '>
                        {/* <RiDeleteBin6Line className='cursor-pointer' /> */}
                        <h1 className='font-medium text-lg'>Rs. 1,599</h1>
                    </div>
                </div>

                <div className='border border-gray-300 lg:p-4 p-2 rounded my-4'>
                    <div className='flex lg:gap-4 gap-2 lg:items-center'>
                        <img src={img} className='w-24 h-28 rounded-2xl' />
                        <div className='space-y-1'>
                            <p className=' font-normal poppins'>Baby Shower Decoration</p>
                            <p className='text-sm text-gray-600 font-medium flex items-center gap-2'> <HiOutlineCalendarDateRange /> 11th Jan 2025</p>
                            <p className='text-sm text-gray-600 font-medium flex items-center gap-2'> <IoMdTime /> 08:00 AM - 11:00 AM</p>
                            <p className='text-sm text-gray-600 font-medium flex items-center gap-2'> <CiMoneyCheck1 /> Package Amount : Rs. 1,599</p>
                        </div>
                    </div>
                    <div className=' flex md:items-end md:flex-col flex-row-reverse items-center justify-between gap-4 lg:pt-4 md:pt-0 '>
                        {/* <RiDeleteBin6Line className='cursor-pointer' /> */}
                        <h1 className='font-medium text-lg'>Rs. 1,599</h1>
                    </div>
                </div>

            </div>
        </div>

    )
}


const ProfileForm = () => {
    
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile);
    const [error, setError] = useState(null);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(setProfile({ [name]: value }));
    };

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("accessToken");
            const response = await axios.get("http://localhost:5000/api/admin/users/user/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            
            const { firstName, lastName, mobile, alternateMobile, addressLine1, addressLine2, city, state, pincode, landmark } = response.data.user;
            dispatch(setProfile({
                firstName,
                lastName,
                mobile,
                alternateMobile,
                addressLine1,
                addressLine2,
                city,
                state,
                pincode,
                landmark,
            }));
        };
        fetchProfile();
    }, [dispatch]);

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.put("http://localhost:5000/api/admin/users/user/profile", profile, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                alert("Profile updated successfully");
            } else {
                setError(response.data.message || "Error updating profile");
            }
        } catch (error) {
            setError(error.response?.data?.message || "Error updating profile");
        }
    };

    return (
        <div className='h-[75vh] overflow-y-auto lg:m-10 m-4 mt-5  scrollbar-hide'>
            <form onSubmit={handleSubmit}>
                <h1 className='font-bold poppins lg:my-6 my-2'>Profile Details</h1>
              
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className='grid grid-cols-2'>
                    <label>
                        <p>First Name</p>
                        <input
                            type="text"
                            name="firstName"
                            value={profile.firstName}
                            onChange={handleChange}
                            className='border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]'
                            required
                        />
                    </label>
                    <label>
                        <p>Last Name</p>
                        <input
                            type="text"
                            name="lastName"
                            value={profile.lastName}
                            onChange={handleChange}
                            className='border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]'
                            required
                        />
                    </label>
                    <label>
                        <p>Mobile Number</p>
                        <input
                            type="text"
                            name="mobile"
                            value={profile.mobile}
                            onChange={handleChange}
                            className='border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]'
                            required
                        />
                    </label>
                    <label>
                        <p>Alternate Number</p>
                        <input
                            type="text"
                            name="alternateMobile"
                            value={profile.alternateMobile}
                            onChange={handleChange}
                            className='border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]'
                            required
                        />
                    </label>
                </div>

                <h1 className='font-bold poppins my-6'>Address Details</h1>
                <div className='grid grid-cols-2'>
                    <label>
                        <p>Address Line 1</p>
                        <input
                            type="text"
                            name="addressLine1"
                            value={profile.addressLine1}
                            onChange={handleChange}
                            className='border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]'
                            required
                        />
                    </label>
                    <label>
                        <p>Address Line 2</p>
                        <input
                            type="text"
                            name="addressLine2"
                            value={profile.addressLine2}
                            onChange={handleChange}
                            className='border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]'
                            required
                        />
                    </label>
                    <label>
                        <p>City</p>
                        <input
                            type="text"
                            name="city"
                            value={profile.city}
                            onChange={handleChange}
                            className='border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]'
                            required
                        />
                    </label>
                    <label>
                        <p>State</p>
                        <input
                            type="text"
                            name="state"
                            value={profile.state}
                            onChange={handleChange}
                            className='border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]'
                        />
                    </label>
                    <label>
                        <p>Pincode</p>
                        <input
                            type="text"
                            name="pincode"
                            value={profile.pincode}
                            onChange={handleChange}
                            className='border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]'
                            required
                        />
                    </label>
                    <label>
                        <p>Landmark (Optional)</p>
                        <input
                            type="text"
                            name="landmark"
                            value={profile.landmark}
                            onChange={handleChange}
                            className='border border-gray-300 outline-none rounded my-2 p-2 py-1 w-[90%]'
                        />
                    </label>
                </div>
                <input
                    type='submit'
                    value="Save"
                    className='bg-[#AA6300] text-white px-4 py-2 rounded mt-5'
                />
            </form>
        </div>
    );
};

const Wallet = () => {
    return (
        <div className='h-[75vh] overflow-y-auto lg:m-10 m-4 mt-5  scrollbar-hide'>
            <h1 className='font-bold poppins my-6'>Wallet</h1>
            <p className='pb-7 text-[#AA6300] font-medium'>Balance : Rs. 00</p>
        </div>
    )
}


// const Vouchers = () => {
//     return (
//         <div className='h-[75vh] overflow-y-auto lg:m-10 m-4 mt-5  scrollbar-hide'>
//             <h1 className='font-bold poppins my-6'>Vouchers</h1>

//             <div className="flex border border-primary rounded-md h-[150px] my-3">
//                 {/* Left Side - Offer Tag */}
//                 <div className="flex items-center justify-center bg-primary text-white p-4  h-full w-[70px]">
//                     <h1 className="-rotate-90  font-bold">{'10% OFF'}</h1>
//                 </div>
//                 {/* Right Side - Offer Details */}
//                 <div className="flex flex-col justify-center px-4 ">
//                     <h1 className="text-xl font-semibold">NEWUSER</h1>
//                     <p className="text-gray-700 mt-2">Save 10% off on this offer on purchases above Rs. 2,000</p>
//                     <small className="text-gray-500 mt-1">Apply NEWUSER and get up to Rs. 200 off on your order!</small>
//                 </div>
//             </div>


//             <div className="flex border border-primary rounded-md h-[150px] my-3">
//                 {/* Left Side - Offer Tag */}
//                 <div className="flex items-center justify-center bg-primary text-white p-4  h-full w-[70px]">
//                     <h1 className="-rotate-90  font-bold">{'10% OFF'}</h1>
//                 </div>
//                 {/* Right Side - Offer Details */}
//                 <div className="flex flex-col justify-center px-4 ">
//                     <h1 className="text-xl font-semibold">NEWUSER</h1>
//                     <p className="text-gray-700 mt-2">Save 10% off on this offer on purchases above Rs. 2,000</p>
//                     <small className="text-gray-500 mt-1">Apply NEWUSER and get up to Rs. 200 off on your order!</small>
//                 </div>
//             </div>

//         </div>
//     )
// }

// const Referral = () => {
//     return (
//         <div className='h-[75vh] overflow-y-auto lg:m-10 m-4 mt-5  scrollbar-hide'>
//             <div className='w-[70%]'>
//                 <h1 className='font-bold poppins my-6'>Referral</h1>

//                 <div className='my-8'>
//                     <h2 className='text-[#AA6300] text-2xl font-semibold playfair-display'>Give with love, receive happiness!</h2>
//                     <p >Refer a friend and they’ll get awesome vouchers! Plus, earn ₹500 wallet cash when
//                         they complete a booking!</p>
//                 </div>

//                 <p className='font-bold text-xl py-2 '>LXE7489</p>
//                 <button className=' flex gap-2 p-4 py-2 items-center rounded text-white bg-[#AA6300]'> <FaShareAlt /> Share</button>
//             </div>
//         </div>
//     )
// }

const sideBarlinks = [
    { icon: <FaUserLarge />, title: "Profile", link: "/profile", component: <ProfileForm /> },
    { icon: <IoTicketSharp />, title: "Upcoming Bookings", link: "/upcomingbookings", component: <UpcomingBookings /> },
    { icon: <FaHistory />, title: "Past Bookings", link: "/pastbookings", component: <PastBookings /> },
    // { icon: <IoWalletSharp />, title: "Wallet", link: "/wallet", component: <Wallet /> },
    // { icon: <BiSolidDiscount />, title: "Vouchers", link: "/vouchers", component: <Vouchers /> },
    // { icon: <FaUserGroup />, title: "Referral", link: "/referral", component: <Referral /> },
];

const Profile = () => {
    const [currentRoute, setCurrentRoute] = useState("/profile");
    const [showSidebar, setShowSidebar] = useState(false);
    const [isMobile, setIsMobile] = useState(false); // Detect if mobile screen

    const navigate = useNavigate();
    const profile = useSelector((state) => state.profile);

    // Effect to update the screen size on window resize
    useEffect(() => {
        const updateScreenSize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        updateScreenSize();
        window.addEventListener('resize', updateScreenSize);

        return () => {
            window.removeEventListener('resize', updateScreenSize);
        };
    }, []);

    const handleLogout = async () => {
        // console.log(localStorage.getItem("accessToken"));
        try {
            // Get the access token from localStorage or wherever it is stored
            const token = localStorage.getItem("accessToken");
            if (!token) {
                alert("You are not logged in.");
                return;
            }

            // Send logout request to backend
            const response = await axios.post(
                "http://localhost:5000/api/auth/logout",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            // Check if logout was successful
            if (response.status === 200) {
                localStorage.removeItem("accessToken");
                navigate("/login");
            }
        } catch (error) {
            // console.error("Logout failed:", error);
            alert("Logout failed. Please try again.");
        }
    };




    return (
        <div className="flex lg:mt-24 mt-32 lg:px-4 overflow-y-hidden h-[86vh]">
            <div className={`lg:w-[25%] border  bg-white mr-4 border-gray-300 lg:rounded-xl rounded-e-lg p-4 pt-6 lg:shadow-md fixed h-[86vh] ${isMobile ? "hidden" : "block"}`}>
                <div className="text-center">
                    <img
                        src="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-173524.jpg"
                        className="w-20 h-20 mx-auto rounded-full shadow-md"
                        alt="User"
                    />
                    <p className="text-2xl py-3 font-medium">{profile.firstName} {profile.lastName}</p>
                </div>
                <div className="mt-5">
                    <ul className="flex flex-col gap-4 px-5">
                        {sideBarlinks.map((item, index) => (
                            <li
                                key={index}
                                className={`flex gap-4 items-center text-lg cursor-pointer ${currentRoute === item.link ? "text-primary font-semibold" : ""}`}
                                onClick={() => setCurrentRoute(item.link)}
                            >
                                {item.icon}
                                {item.title}
                            </li>
                        ))}
                        <li className="flex gap-4 items-center text-lg cursor-pointer text-red-500 font-medium" onClick={handleLogout}>
                            <BiLogOut />
                            Logout
                        </li>
                    </ul>
                </div>
            </div>
            {/* Sidebar for mobile */}
            {isMobile && showSidebar &&
                <AnimatePresence>
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ duration: 0.3 }}
                        className={`lg:w-[25%] border bg-white mr-4 border-gray-300 lg:rounded-xl rounded-e-lg p-4 pt-6 lg:shadow-md fixed h-[86vh] `}>

                        <button
                            onClick={() => setShowSidebar(false)}
                            className="absolute top-2 right-3 text-black text-lg"
                        >
                            <IoMdClose size={20} />
                        </button>


                        <div className="text-center">
                            <img
                                src="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-173524.jpg"
                                className="w-20 h-20 mx-auto rounded-full shadow-md"
                                alt="User"
                            />
                            <p className="text-2xl py-3 font-medium">John Smith</p>
                        </div>
                        <div className="mt-5">
                            <ul className="flex flex-col gap-4 px-5">
                                {sideBarlinks.map((item, index) => (
                                    <li
                                        key={index}
                                        className={`flex gap-4 items-center text-lg cursor-pointer ${currentRoute === item.link ? "text-primary font-semibold" : ""}`}
                                        onClick={
                                            () => {
                                                setCurrentRoute(item.link)
                                                setShowSidebar(false)
                                            }
                                        }
                                    >
                                        {item.icon}
                                        {item.title}
                                    </li>
                                ))}
                                <li className="flex gap-4 items-center text-lg cursor-pointer text-red-500 font-medium" onClick={handleLogout}>
                                    <BiLogOut />
                                    Logout
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </AnimatePresence>
            }
            {/* Hamburger menu for mobile view */}
            {isMobile && !showSidebar && (
                <div className="lg:hidden fixed top-[134px] left-0 z-20 w-[15%] h-[86vh] bg-white border border-gray-300 lg:rounded-xl rounded-e-xl p-4 shadow-md">
                    <TfiAlignLeft size={25} className='text-blue-800 mx-auto ' onClick={() => setShowSidebar(true)} />
                    <ul className="flex flex-col gap-10 pt-5">
                        {sideBarlinks.map((item, index) => (
                            <li
                                key={index}
                                className={`flex gap-4 items-center cursor-pointer text-2xl ${currentRoute === item.link ? "text-primary font-semibold" : ""}`}
                                onClick={() => setCurrentRoute(item.link)}
                            >
                                {item.icon}
                                {/* {item.title} */}
                            </li>
                        ))}
                        <li className="flex gap-4 items-center text-lg cursor-pointer text-red-500 font-medium" onClick={handleLogout}>
                            <BiLogOut />
                            {/* Logout */}
                        </li>
                    </ul>
                </div>
            )}

            {/* Right Content - Takes Remaining Width & Scrollable */}
            <div className={`w-full border border-gray-300 rounded-xl shadow-md lg:ml-[27%] ml-[16%] m-2 lg:m-0`}>
                {sideBarlinks.find((item) => item.link === currentRoute)?.component}
            </div>

        </div>
    );
};

export default Profile;



// const Profile = () => {
//     const [currentRoute, setCurrentRoute] = useState("/profile");
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [login, setLogin] = useState(false);

//     const navigate = useNavigate();

//     useEffect(() => {
//         const token = localStorage.getItem("accessToken");
//         setLogin(!!token);  // Set login state correctly based on token presence
//     }, []);

//     const handleLogout = async () => {
//         try {
//             await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
//             localStorage.removeItem("accessToken");
//             setLogin(false); // Update login state to false
//             navigate("/"); // Redirect to home or login page
//         } catch (err) {
//             console.error("Logout failed:", err);
//         }
//     };

//     return (
//         <>
//             {login ? (
//                 <div className="flex mt-24 px-4 overflow-y-hidden">
//                     {/* Sidebar - Fixed Width (25%) */}
//                     <div className="w-[25%] border mr-4 border-gray-300 rounded-xl p-4 pt-6 shadow-md fixed">
//                         <div className="text-center">
//                             <img
//                                 src="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-173524.jpg"
//                                 className="w-20 h-20 mx-auto rounded-full shadow-md"
//                                 alt="User"
//                             />
//                             <p className="text-2xl py-3 font-medium">John Smith</p>
//                         </div>
//                         <div className="mt-5">
//                             <ul className="flex flex-col gap-4 px-5">
//                                 {sideBarlinks.map((item, index) => (
//                                     <li
//                                         key={index}
//                                         className={`flex gap-4 items-center text-lg cursor-pointer ${currentRoute === item.link ? "text-primary font-semibold" : ""}`}
//                                         onClick={() => setCurrentRoute(item.link)}
//                                     >
//                                         {item.icon}
//                                         {item.title}
//                                     </li>
//                                 ))}
//                                 <li className="flex gap-4 items-center text-lg cursor-pointer text-red-500 font-medium" onClick={handleLogout}>
//                                     <BiLogOut />
//                                     Logout
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>

//                     {/* Right Content */}
//                     <div className="w-full border border-gray-300 rounded-xl shadow-md ml-[27%]">
//                         {sideBarlinks.find((item) => item.link === currentRoute)?.component}
//                     </div>
//                 </div>
//             ) : (
//                 <div className="mt-24 px-4 flex items-center justify-center">
//                     <div className='flex flex-col items-center justify-center'>
//                         <h1 className='text-2xl font-bold'>Please login to access dashboard</h1>
//                         <img src="https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?uid=R78399817&ga=GA1.1.1852919643.1725948116&semt=ais_hybrid" className='w-64' alt="Login Required" />
//                         <button
//                             className="bg-primary flex place-items-center text-white px-6 py-2 rounded"
//                             onClick={() => setIsModalOpen(true)}
//                         >
//                             Login
//                         </button>
//                         {isModalOpen && <AuthModal setIsModalOpen={setIsModalOpen} />}
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// };

// export default Profile;



// const Profile = () => {
//     const [currentRoute, setCurrentRoute] = useState("/profile");
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     return (
//         <div className="flex mt-24 px-4 overflow-y-hidden">
//             {/* Sidebar - Fixed Width (30%) */}
//             <div className="w-[25%] border mr-4 border-gray-300 rounded-xl p-4 pt-6 shadow-md fixed ">
//                 {/* Login Button to Open Modal */}
//                 <button
//                     className="bg-primary text-white px-6 py-2 rounded"
//                     onClick={() => setIsModalOpen(true)} // Open Modal
//                 >
//                     Login
//                 </button>
//                 <div className="text-center">
//                     <img
//                         src="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-173524.jpg"
//                         className="w-20 h-20 mx-auto rounded-full shadow-md"
//                         alt="User"
//                     />
//                     <p className="text-2xl py-3 font-medium">John Smith</p>
//                     <AuthModal />

//                 </div>
//                 <div className="mt-5">
//                     <ul className="flex flex-col gap-4 px-5">
//                         {sideBarlinks.map((item, index) => (
//                             <li
//                                 key={index}
//                                 className={`flex gap-4 items-center text-lg cursor-pointer ${currentRoute === item.link ? "text-primary font-semibold" : ""
//                                     }`}
//                                 onClick={() => setCurrentRoute(item.link)}
//                             >
//                                 {item.icon}
//                                 {item.title}
//                             </li>
//                         ))}
//                         <li className="flex gap-4 items-center text-lg cursor-pointer text-red-500 font-medium">
//                             <BiLogOut />
//                             Logout
//                         </li>

//                     </ul>
//                 </div>
//             </div>

//             {/* Right Content - Takes 70% width & Scrollable */}
//             <div className="w-full border border-gray-300 rounded-xl shadow-md ml-[27%] ">
//                 {sideBarlinks.find((item) => item.link === currentRoute)?.component}
//             </div>
//             {/* Auth Modal - Only Shows When isModalOpen is True */}
//             {isModalOpen && <AuthModal setIsModalOpen={setIsModalOpen} />}
//         </div>

//     );
// };














// const Profile = () => {
//     const [currentRoute, setCurrentRoute] = useState("/profile");
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const navigate = useNavigate()
//     const handleLogout = async () => {
//         try {
//             await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
//             localStorage.removeItem("token");
//           navigate("/");
//         } catch (err) {
//             console.error("Logout failed:", err);
//         }
//     };

//     return (
//         <div className="flex mt-24 px-4 overflow-y-hidden h-[86vh]">
//             {/* Sidebar - Fixed Width (25%) */}
//             <div className="w-[25%] border mr-4 border-gray-300 rounded-xl p-4 pt-6 shadow-md fixed h-[86vh]">
//                 {/* Login Button to Open Modal */}
//                 {/* <div className='flex justify-between'>
//                     <button
//                         className="bg-primary text-white px-6 py-2 rounded"
//                         onClick={() => setIsModalOpen(true)} // Open modal when button is clicked
//                     >
//                         Login
//                     </button>
//                 </div> */}
//                 <div className="text-center">
//                     <img
//                         src="https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-173524.jpg"
//                         className="w-20 h-20 mx-auto rounded-full shadow-md"
//                         alt="User"
//                     />
//                     <p className="text-2xl py-3 font-medium">John Smith</p>
//                 </div>
//                 <div className="mt-5">
//                     <ul className="flex flex-col gap-4 px-5">
//                         {sideBarlinks.map((item, index) => (
//                             <li
//                                 key={index}
//                                 className={`flex gap-4 items-center text-lg cursor-pointer ${currentRoute === item.link ? "text-primary font-semibold" : ""}`}
//                                 onClick={() => setCurrentRoute(item.link)}
//                             >
//                                 {item.icon}
//                                 {item.title}
//                             </li>
//                         ))}
//                         <li className="flex gap-4 items-center text-lg cursor-pointer text-red-500 font-medium" onClick={handleLogout}>
//                             <BiLogOut />
//                             Logout
//                         </li>
//                     </ul>
//                 </div>
//             </div>

//             {/* Right Content - Takes Remaining Width & Scrollable */}
//             <div className="w-full border border-gray-300 rounded-xl shadow-md ml-[27%]">
//                 {sideBarlinks.find((item) => item.link === currentRoute)?.component}
//             </div>

//             {/* Auth Modal - Only Shows When isModalOpen is True */}
//             {/* {isModalOpen && <AuthModal setIsModalOpen={setIsModalOpen} />} */}
//         </div>
//     );
// };

// export default Profile;


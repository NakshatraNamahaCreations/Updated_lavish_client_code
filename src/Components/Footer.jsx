import React from 'react';
import Logo from "../assets/logo_footer.png";
import { IoMailSharp, IoCallSharp } from "react-icons/io5";
import facebook from "../assets/icons/Facebook.png";
import instagram from "../assets/icons/Instagram.png";
import linkedin from "../assets/icons/Linkedin.png";
import pintrest from "../assets/icons/Pinterest.png";
import x from "../assets/icons/twitter.png";
import youtube from "../assets/icons/Youtube.png";
import { Link } from 'react-router-dom';

const iconsArray = [
    { name: "Facebook", icon: facebook, link: "https://www.facebook.com" },
    { name: "Instagram", icon: instagram, link: "https://www.instagram.com" },
    { name: "Linkedin", icon: linkedin, link: "https://www.linkedin.com" },
    { name: "Pintrest", icon: pintrest, link: "https://www.pinterest.com" },
    { name: "X", icon: x, link: "https://www.x.com" },
    { name: "Youtube", icon: youtube, link: "https://www.youtube.com" },
];

const Footer = () => {

    const handlNavigation = (link) => {
        window.location.href = link;
    }

    return (
        <div className='bg-gray-200 relative font-medium'>
            <div className='absolute -top-24 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[1200px] rounded-xl'>
                <div className='relative'>
                    {/* Image */}
                    <img src={"https://plus.unsplash.com/premium_photo-1681488068521-8912e7d5d5fd?q=80&w=1483&auto=format&fit=crop"}
                        className='h-[200px] w-full object-cover rounded-xl' />
                    {/* Black Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl"></div>

                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center'>
                        <p className="text-lg sm:text-xl py-2 font-semibold">Want creative and beautiful decorations for your events?</p>
                        <p className="text-md">Contact us today!</p>
                        <button className='bg-primary px-4 py-2 mt-2 rounded-md text-sm sm:text-base'>Message</button>
                    </div>
                </div>
            </div>

            <div className='mt-[250px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-36 px-6 sm:px-10'>
                <div>
                    <div className='p-2 bg-red-50 rounded-full w-24 h-24 sm:w-32 sm:h-32 flex justify-center items-center'>
                        <img src={Logo} className='w-20 sm:w-32' />
                    </div>
                    <p className='pt-4 font-bold text-[#FA3C57] playfair-display text-lg sm:text-xl'>Lavish Eventz</p>
                    <p className='max-w-72 montserrat text-sm sm:text-base text-gray-600'>Trust us to bring your dreams to life with our creative expertise and seamless execution. We create memories!</p>
                </div>

                <div>
                    <p className='font-bold text-black montserrat text-lg sm:text-xl'>Quick links</p>
                    <div className='flex gap-6 flex-wrap sm:flex-nowrap text-gray-600'>
                        <ul className='flex flex-col gap-3 py-3 text-sm sm:text-base'>
                            <li onClick={()=>handlNavigation("/")} ><Link to="#">Home</Link></li>
                            <li onClick={()=>handlNavigation("/about")} ><Link to="#">About us</Link></li>
                            <li onClick={()=>handlNavigation("/")} ><Link to="#">Services</Link></li>
                            <li onClick={()=>handlNavigation("/contactus")} ><Link to="#">Contact Us</Link></li>
                        </ul>
                        <div className='flex flex-col gap-2 text-gray-600 py-3 text-sm sm:text-base'>
                            <a href="#">Cart</a>
                            <a href="#">Profile</a>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col justify-between'>
                    <div>
                        <p className='font-bold text-black montserrat pb-3 text-lg sm:text-xl'>Contact with us!</p>
                        <p className='flex gap-2 items-center text-sm sm:text-base'><IoMailSharp /> Lorem@gmail.com</p>
                        <p className='flex gap-2 items-center text-sm sm:text-base'><IoCallSharp /> +91 998979797</p>
                    </div>
                    <div className='mt-4 sm:mt-0'>
                        <p className='text-lg sm:text-xl '>We want to host the event of your life!</p>
                        <p className='pb-2 satisfy text-sm sm:text-base'>Contact us today</p>
                        <input placeholder='Enter your email' className='p-2 sm:p-3 outline-none border-none rounded-lg w-full sm:w-auto' />
                    </div>
                </div>
            </div>

            <hr className='h-1 my-10 bg-white opacity-50' />

            <div className='pb-10 flex justify-center flex-col items-center text-xl sm:text-2xl gap-5'>
                <p className='text-black'>Spread the smile</p>
                <div className='flex gap-4 sm:gap-5 text-black'>
                    {iconsArray.map((item, idx) => (
                        <a key={idx} href={item.link} target="_blank" >
                            <img src={item.icon} alt={item.name} className='w-10 md:w-12' />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Footer;

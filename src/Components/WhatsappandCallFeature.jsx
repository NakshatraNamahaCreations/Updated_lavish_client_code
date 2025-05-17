
// import React from 'react'
// import Logo from "../assets/logo_footer.png";
// import bgImage from '../assets/bg.png';
// import call from "../assets/icons/call.png";
// import whatsapp from "../assets/icons/whatsapp.png";

// const WhatsappCard = () => {
//   return (
//     <div className='rounded w-96 h-[200px]'>
//       <button
//         className="absolute top-2 right-3 text-white text-lg"
//       >
//         ✖
//       </button>
//       <div className='p-4 bg-primary text-white flex  gap-3 items-center'>
//         <img src={Logo} className='w-14' />
//         <div>
//           <p>Lavisheventz</p>
//           <p>your Partner!</p>
//         </div>
//       </div>
//       <div className="h-screen w-full" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center" }}>
//       </div>

//     </div>
//   )
// }

// const WhatsappandCallFeature = () => {
//   return (
//     <div className='relative'>
//       <div className="bg-white rounded-full">
//         <img src={call} alt="Call" className="w-12 h-12 cursor-pointer" />
//       </div>
//       <img
//         src={whatsapp}
//         alt="WhatsApp"
//         className="w-12 h-12 cursor-pointer"

//       />
//       <div className='absolute top-0 lef'>

//       < WhatsappCard />
//       </div>
//     </div>
//   )
// }

// export default WhatsappandCallFeature




//    // onClick={() => window.open("https://wa.me/919108703981", "_blank")}



import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/logo_footer.png";
import bgImage from "../assets/bg.png";
import call from "../assets/icons/call.png";
import whatsapp from "../assets/icons/whatsapp.png";
import { FaWhatsapp } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";


const WhatsappCard = ({ onClose }) => {

  const currentPageUrl = window.location.href;
  const message = `${currentPageUrl}`;
  const encodedMessage = encodeURIComponent(message);
  const WhatsAppLink = `https://wa.me/919611430158?text=${encodedMessage}`;


  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.3 }}
      className="absolute bottom-16 right-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-3 text-black text-lg"
      >
        <IoMdClose size={20} />
      </button>

      {/* Header */}
      <div className="p-4 bg-primary text-white flex gap-3 items-center">
        <img src={Logo} className="w-12 h-12" alt="Logo" />
        <div>
          <p className="font-bold">Lavisheventz</p>
          <p>Your Event Partner!</p>
        </div>
      </div>

      {/* Background Image */}
      <div
        className="h-36 w-full place-items-center p-4"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="p-2 bg-white">
          <p className="text-sm text-gray-500">Lavisheventz</p>
          <p className="pt-2">Hi there! <br />Welcome to Lavishevents, How can we help you today?</p>
        </div>
      </div>

      <div className="flex gap-2 items-center bg-gray-300 p-6">
        <button className="bg-green-500 w-full p-2 flex items-center gap-2 justify-center rounded-3xl text-white" onClick={() => {
          window.open(WhatsAppLink, "_blank")
          onClose()
        }}><FaWhatsapp size={24} /> Start Chat</button>
      </div>
    </motion.div>
  );
};

const WhatsappandCallFeature = () => {
  const [isCardOpen, setIsCardOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 flex flex-col gap-3 z-50">
      {/* Call Button */}
      <div className="bg-white rounded-full p-2 shadow-lg">
        <img src={call} alt="Call" className="w-12 h-12 cursor-pointer" />
      </div>

      {/* WhatsApp Button */}
      <div
        className="bg-white rounded-full p-2 shadow-lg"
        onClick={() => setIsCardOpen(!isCardOpen)}
      >
        <img src={whatsapp} alt="WhatsApp" className="w-12 h-12 cursor-pointer" />
      </div>

      {/* WhatsApp Card with Animation */}
      <AnimatePresence>
        {isCardOpen && <WhatsappCard onClose={() => setIsCardOpen(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default WhatsappandCallFeature;

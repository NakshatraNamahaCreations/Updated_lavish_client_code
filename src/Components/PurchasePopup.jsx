import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import car from "../assets/car.png"
import room from "../assets/car.png"
import anniversary from "../assets/better_together.png"
import kid from "../assets/butterfly_theme.png"
import adult from "../assets/grid7.png"
import ring from "../assets/bridetobe_decorImg1.png"
import candle from "../assets/candleImg1.png"
import axios from "axios";

// Sample purchase data (Replace this with dynamic data)
const purchases = [
  { customer: "Alice", product: "Room Decoration", rating: 5, time: "10 minutes ago", src: room },
  { customer: "Bob", product: "Anniversary Decoration", rating: 4, time: "1 minutes ago", src: anniversary },
  { customer: "Charlie", product: "Kid's Birthday Decoration", rating: 5, time: "20 minutes ago", src: kid },
  { customer: "Joey", product: "Adult's Birthday Decoration", rating: 5, time: "14 minutes ago", src: adult },
  { customer: "Aly", product: "Candlight Decoration", rating: 5, time: "1 minutes ago", src: candle },
  { customer: "Elena", product: "Ring ceremony decoration", rating: 5, time: "16 minutes ago", src: ring },
  { customer: "Emma", product: "Car boot decoration", rating: 5, time: "4 minutes ago", src: car },
];

const PurchasePopup = () => {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders/recent-orders');
        const data = await response.data;
        setRecentOrders(data.orders);
        console.log("recent orders", data.orders);
      } catch (error) {
        console.error("Error fetching recent orders:", error);
      }
    }
    fetchRecentOrders();
  }, []);
  useEffect(() => {
    // Show the first notification immediately
    setIsVisible(true);

    // Auto-change notifications every 5 seconds
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setVisibleIndex((prev) => (prev + 1) % purchases.length);
        setIsVisible(true);
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed md:bottom-5 bottom-12 md:left-5 left-2 flex flex-col space-y-3 z-30">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key={visibleIndex}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-lg rounded-lg p-2 w-72 flex items-start space-x-3 border border-gray-200"
          >
            <div>
              <img src={purchases[visibleIndex].src} className="h-20" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-gray-900">
                {purchases[visibleIndex].customer} purchased
              </h3>
              <p className="text-sm text-gray-700">{purchases[visibleIndex].product}</p>

              <small className="text-gray-500">{purchases[visibleIndex].time}</small>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-black hover:text-gray-600"
            >
              <AiOutlineClose />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PurchasePopup;

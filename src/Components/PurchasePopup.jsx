import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

// Image mapping based on keywords (customize as needed)
import car from "../assets/car.png";
import anniversary from "../assets/better_together.png";
import kid from "../assets/butterfly_theme.png";
import adult from "../assets/grid7.png";
import ring from "../assets/bridetobe_decorImg1.png";
import candle from "../assets/candleImg1.png";

const getImageForService = (serviceName) => {
  const lower = serviceName.toLowerCase();
  if (lower.includes("car")) return car;
  if (lower.includes("anniversary")) return anniversary;
  if (lower.includes("kid") || lower.includes("birthday")) return kid;
  if (lower.includes("adult")) return adult;
  if (lower.includes("ring")) return ring;
  if (lower.includes("candle")) return candle;
  return anniversary; // default fallback
};

const timeSince = (dateStr) => {
  const now = new Date();
  const createdAt = new Date(dateStr);
  const seconds = Math.floor((now - createdAt) / 1000);
  if (seconds < 60) return `${seconds} seconds ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours} hours ago`;
};

const PurchasePopup = () => {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [recentPurchases, setRecentPurchases] = useState([]);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders/recent-orders");
        const { orders } = response.data;

        // Extract customer name, service name, createdAt and assign image
        const formatted = orders.flatMap((order) =>
          order.items.map((item) => ({
            customer: order.customerName,
            product: item.serviceName,
            time: timeSince(order.createdAt),
            src: getImageForService(item.serviceName),
          }))
        );

        setRecentPurchases(formatted);
      } catch (error) {
        console.error("Error fetching recent orders:", error);
      }
    };

    fetchRecentOrders();
  }, []);

  useEffect(() => {
    if (recentPurchases.length === 0) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setVisibleIndex((prev) => (prev + 1) % recentPurchases.length);
        setIsVisible(true);
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, [recentPurchases]);

  if (recentPurchases.length === 0) return null;

  const current = recentPurchases[visibleIndex];

  return (
    <div className="fixed md:bottom-5 bottom-12 md:left-5 left-2 flex flex-col space-y-3 z-30 max-w-sm">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key={visibleIndex}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-lg rounded-lg p-2  flex items-start space-x-3 border border-gray-200"
          >
            <div>
              <img src={current.src} className="h-20 w-20 object-cover rounded" alt="Decor" />
            </div>
            <div className="flex flex-col">
              <h3 className="text- font-semibold text-gray-900">
                {current.customer} purchased
              </h3>
              <p className="text-sm text-gray-700">{current.product}</p>
              <small className="text-gray-500">{current.time}</small>
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

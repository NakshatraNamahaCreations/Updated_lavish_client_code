import React from "react";

const OrderConfirmation = () => {
  const order = {
    id: "ORD123456",
    date: "2025-05-15",
    customerName: "Aman Sharma",
    location: "New Delhi, India",
    items: [
      { name: "Name Buntings", value: "Happy Birthday Aman", price: 150 },
      { name: "Fairy Light", price: 100 },
      { name: "Age Led Light", value: "25", price: 200 },
      { name: "Confetti Balloon", price: 120 }
    ],
    total: 570
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 mt-10">
      <div className="max-w-2xl w-full p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-green-600 mb-2">🎉 Order Placed Successfully!</h2>
        <p className="text-gray-700 mb-4">
          Thank you for booking with us. Here are your order details:
        </p>

        <div className="mb-6 text-sm text-gray-700 space-y-1">
          <div className="flex justify-between">
            <span className="font-medium">Order ID:</span>
            <span>{order.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Order Date:</span>
            <span>{order.date}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Customer Name:</span>
            <span>{order.customerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Location:</span>
            <span>{order.location}</span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-2">Ordered Items:</h3>
        <ul className="divide-y divide-gray-200 mb-4">
          {order.items.map((item, index) => (
            <li key={index} className="py-2 flex justify-between items-start">
              <div>
                <p className="text-gray-800 font-medium">{item.name}</p>
                {item.value && (
                  <p className="text-sm text-gray-500">Custom: {item.value}</p>
                )}
              </div>
              <p className="text-gray-700">₹{item.price}</p>
            </li>
          ))}
        </ul>

        <div className="flex justify-between font-bold text-lg text-gray-800 border-t pt-4">
          <span>Total</span>
          <span>₹{order.total}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;

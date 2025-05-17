import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoCloseSharp } from "react-icons/io5";
import { addAddonItem, updateAddonQuantity, removeAddonItem } from "../features/orderdetails/orderSlice";

const Close = () => <IoCloseSharp />;
const Check = () => <p>✔</p>;

const RecommenedAddon = ({ subCat, addons }) => {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState({});
  
  // Get the add-ons directly from Redux store
  const reduxAddons = useSelector((state) => 
    state.order.currentOrder.items.filter(item => item.categoryType === 'addon')
  );

  // Handle adding, removing or changing quantity of add-ons
  const handleQuantityChange = (addon, change) => {
    // Find if this addon exists in Redux store
    const existingAddon = reduxAddons.find(item => 
      item.serviceName === addon.addonsName
    );

    if (existingAddon) {
      const newQuantity = existingAddon.quantity + change;
      if (newQuantity <= 0) {
        // Remove add-on if quantity becomes 0
        dispatch(removeAddonItem({ serviceName: addon.addonsName }));
      } else {
        // Update quantity
        dispatch(updateAddonQuantity({ 
          serviceName: addon.addonsName, 
          quantity: newQuantity 
        }));
      }
    } else if (change > 0) {
      // Add new add-on
      dispatch(addAddonItem({
        serviceName: addon.addonsName,
        price: addon.price,
        originalPrice: addon.originalPrice || addon.price,
        image: addon.image || '',
        quantity: 1,
        id: addon._id
      }));
    }
  };

  return (
    <div className="md:p-4 p-2 md:w-[600px] w-[320px] border shadow-md bg-white max-h-[400px] overflow-y-auto flex flex-col">
      <h2 className="text-lg font-semibold mb-2">Make It Extra Special</h2>

      {!addons || addons.length === 0 ? (
        <p className="text-center text-gray-500">No Addons Found</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 md:gap-5">
          {addons.map((addon) => {
            // Check if this addon is in Redux store
            const reduxAddon = reduxAddons.find(item => 
              item.serviceName === addon.addonsName
            );
            const isSelected = !!reduxAddon;
            const isExpanded = expanded[addon._id];

            return (
              <div
                key={addon._id}
                className="p-2 border rounded-md bg-gray-100 relative flex flex-col"
              >
                <img
                  src={`http://localhost:5000/images/${addon.image}`}
                  alt={addon.addonsName}
                  className="mx-auto w-44 h-48 object-contain"
                />
                <div className="text-center flex-1">
                  <p className="font-semibold">{addon.addonsName}</p>
                  <div
                    className="md:text-sm text-xs text-gray-600"
                    dangerouslySetInnerHTML={{
                      __html: isExpanded
                        ? addon.addonsDescription
                        : `${addon.addonsDescription?.substring(0, 60)}...`,
                    }}
                  />
                  {addon.addonsDescription?.length > 60 && (
                    <button
                      className="text-blue-500 text-xs underline pb-2"
                      onClick={() =>
                        setExpanded((prev) => ({
                          ...prev,
                          [addon._id]: !prev[addon._id],
                        }))
                      }
                    >
                      {isExpanded ? "Show Less" : "Show More"}
                    </button>
                  )}
                </div>

                <div className="flex justify-between items-center mt-auto">
                  <p className="font-bold md:text-base text-xs">Rs. {addon.price}</p>

                  <div className="flex gap-2 items-center">
                    {!isSelected ? (
                      <button
                        className="bg-primary text-white px-3 py-1 rounded"
                        onClick={() => handleQuantityChange(addon, 1)}
                      >
                        Add
                      </button>
                    ) : (
                      <div className="flex items-center text-primary font-bold">
                        <button
                          className="px-2 py-1 border rounded"
                          onClick={() => handleQuantityChange(addon, -1)}
                        >
                          -
                        </button>
                        <span className="mx-2">{reduxAddon.quantity}</span>
                        <button
                          className="px-2 py-1 border rounded"
                          onClick={() => handleQuantityChange(addon, 1)}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RecommenedAddon;

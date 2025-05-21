// import React, { useState } from 'react';

// const ReasonModal = ({ setShowModal, selectedOrder, newDate, newTime, fetchUpcomingOrders }) => {
//   const [reason, setReason] = useState('');
//   const [venue, setVenue] = useState('');

//   const handleSubmit = async () => {
//     if (!reason || !venue) {
//       alert('Please fill in both reason and venue address.');
//       return;
//     }
  
//     const payload = {
//       rescheduledDate: newDate,
//       rescheduledSlot: newTime,
//       rescheduledAddress: venue,
//       reason,
//     };
  
//     try {
//       await fetch(`http://localhost:5000/api/orders/rescheduleOrder/${selectedOrder._id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//       });
  
//       alert('Booking rescheduled successfully!');
//       setShowModal(false);
//       fetchUpcomingOrders();
//     } catch (error) {
//       console.error('Rescheduling failed:', error);
//       alert('Something went wrong while rescheduling.');
//     }
//   };
  
//   return (
//     <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
//       <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
//         <h2 className="text-xl font-bold mb-4">Reason & Venue</h2>

//         <textarea
//           rows={4}
//           className="w-full border px-3 py-2 rounded mb-4"
//           placeholder="Enter reason for rescheduling..."
//           value={reason}
//           onChange={(e) => setReason(e.target.value)}
//         />

//         <input
//           type="text"
//           className="w-full border px-3 py-2 rounded mb-4"
//           placeholder="Enter new venue address"
//           value={venue}
//           onChange={(e) => setVenue(e.target.value)}
//         />

//         <div className="flex justify-end gap-3">
//           <button
//             className="px-4 py-2 border rounded"
//             onClick={() => setShowModal(false)}
//           >
//             Cancel
//           </button>
//           <button
//             className="px-4 py-2 bg-purple-700 text-white rounded"
//             onClick={handleSubmit}
//           >
//             Submit
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReasonModal;
import React, { useState } from "react";

const ReasonModal = ({
  setShowModal,
  selectedOrder,
  newDate,
  newTime,
  fetchUpcomingOrders,
  isCancelling = false,
}) => {
  const [reason, setReason] = useState("");
  const [venue, setVenue] = useState("");

  const handleSubmit = async () => {
    // Basic validation
    if (!reason.trim()) {
      alert("Please provide a reason.");
      return;
    }

    if (!isCancelling) {
      // For reschedule, at least one of venue, newDate or newTime must be provided
      if (!venue.trim() && !newDate && !newTime) {
        alert("Please provide at least one of new date, time, or venue address.");
        return;
      }
    }

    // Prepare payload with correct key names for backend
    const payload = isCancelling
      ? { reason }
      : {
          rescheduledDate: newDate || null,
          rescheduledTime: newTime || null,
          rescheduledAddress: venue.trim() || null,
          reason,
        };

    const endpoint = isCancelling
      ? `http://localhost:5000/api/orders/cancelOrder/${selectedOrder._id}`
      : `http://localhost:5000/api/orders/rescheduleOrder/${selectedOrder._id}`;

    try {
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "Something went wrong. Please try again.");
        return;
      }

      alert(isCancelling ? "Booking cancelled successfully!" : "Booking rescheduled successfully!");
      setShowModal(false);
      fetchUpcomingOrders();
    } catch (error) {
      console.error("Operation failed:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {isCancelling ? "Cancel Booking" : "Reason & Venue"}
        </h2>

        <textarea
          rows={4}
          className="w-full border px-3 py-2 rounded mb-4"
          placeholder="Enter reason..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        {!isCancelling && (
          <input
            type="text"
            className="w-full border px-3 py-2 rounded mb-4"
            placeholder="Enter new venue address"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
          />
        )}

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 border rounded"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-purple-700 text-white rounded"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReasonModal;

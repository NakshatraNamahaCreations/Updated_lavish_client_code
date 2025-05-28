// // RaiseTicketModal.jsx
// import React, { useState } from 'react';

// const RaiseTicketModal = ({ isOpen, onClose, onAddTicket, orderId }) => {
//   const [formData, setFormData] = useState({ title: '', description: '' });
//   const [images, setImages] = useState([]); // to store uploaded images

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // handle image input change
//   const handleImageChange = (e) => {
//     // Accept multiple images, convert FileList to array
//     const files = Array.from(e.target.files);
//     setImages(files);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form submission

//     const payload = new FormData();
//     payload.append('title', formData.title);
//     payload.append('description', formData.description);
//     payload.append('orderId', orderId);
//     images.forEach(img => payload.append('images', img));

//     try {
//       const response = await fetch('http://localhost:5000/api/tickets/create', {
//         method: 'POST',
//         body: payload,
//       });

//       const data = await response.json();
//       if (data.success) {
//         alert('Ticket raised successfully!');
//         setFormData({ title: '', description: '' });
//         setImages([]);
//         onClose();
//       } else {
//         alert('Failed to raise ticket.');
//       }
//     } catch (error) {
//       console.error('Error raising ticket:', error);
//       alert('Server error occurred.');
//     }
//   };


//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
//         <h2 className="text-xl font-semibold mb-4">Raise a Ticket</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium">Title</label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               required
//               className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium">Description</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               rows="4"
//               className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Upload Images (optional)</label>
//             <input
//               type="file"
//               accept="image/*"
//               multiple
//               onChange={handleImageChange}
//               className="w-full"
//             />
//             {images.length > 0 && (
//               <p className="mt-2 text-sm text-gray-600">{images.length} image(s) selected</p>
//             )}
//           </div>
//           <div className="flex justify-end space-x-2">
//             <button
//               type="button"
//               onClick={() => {
//                 setImages([]);
//                 onClose();
//               }}
//               className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RaiseTicketModal;


import React, { useState } from 'react';

const RaiseTicketModal = ({ isOpen, onClose, orderId }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    mobileNumber: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/tickets/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, orderId }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Ticket raised successfully!');
        setFormData({ title: '', description: '', mobileNumber: '' });
        onClose();
      } else {
        alert('Failed to raise ticket.');
      }
    } catch (error) {
      console.error('Error raising ticket:', error);
      alert('Server error occurred.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Raise a Ticket</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Mobile Number</label>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={(e) => {
                const value = e.target.value;
                // Allow only numbers and max 10 digits
                if (/^\d{0,10}$/.test(value)) {
                  setFormData({ ...formData, mobileNumber: value });
                }
              }}
              required
              maxLength={10}
              pattern="\d{10}"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              placeholder="Enter 10-digit mobile number"
            />

          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => {
                setFormData({ title: '', description: '', mobileNumber: '' });
                onClose();
              }}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RaiseTicketModal;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { IoIosStar } from "react-icons/io";
// import { FaRegEdit, FaStar } from "react-icons/fa";
// import { MdArrowRightAlt } from "react-icons/md";
// import ReviewGallery from './ReviewGallery';
// import { getAuthAxios, getAxios } from '../utils/api';

// // Individual review card
// const ReviewCard = ({ review }) => {
//     return (
//         <div className="flex md:gap-5 gap-3 max-w-lg md:p-4 rounded-lg mt-10">
//             <div>
//                 <img
//                     src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
//                     alt="avatar"
//                     className="w-20 h-20 rounded-full"
//                 />
//             </div>
//             <div>
//                 <p className="font-medium">{review?.customer?.fullName || "Anonymous"}</p>
//                 <p className="text-gray-500">Reviewed in {new Date(review?.createdAt).toLocaleString('default', { month: 'long' })}</p>
//                 <div className="flex text-yellow-400 py-3">
//                     {[...Array(Math.max(1, Math.min(5, review.rating || 0)))].map((_, i) => <FaStar key={i} />)}
//                 </div>
//                 <p>{review.reviewText}</p>
//             </div>
//         </div>
//     );
// };

// const Review = ({ serviceId, customerId }) => {
//     const [showReviewBox, setShowReviewBox] = useState(false);
//     const [reviewText, setReviewText] = useState('');
//     const [images, setImages] = useState([]);
//     const [reviews, setReviews] = useState([]);
//     const [galleryImages, setGalleryImages] = useState([]);
//     const [rating, setRating] = useState(5); 
//     const [totalReviews, setTotalReviews] = useState(0);
//     const [page, setPage] = useState(1);

//     // Fetch reviews whenever serviceId or page changes
//     useEffect(() => {
//         if (serviceId) fetchReviews();
//     }, [serviceId, page]); // Now fetching reviews when page changes

//     const fetchReviews = async () => {
//         try {
//             const res = await getAxios().get(`http://localhost:5000/api/reviews/service/${serviceId}?page=${page}&limit=2`);
//             if (page === 1) {
//                 setReviews(res.data.reviews || []); // Reset reviews when page is 1
//             } else {
//                 setReviews((prevReviews) => [...prevReviews, ...res.data.reviews]); // Append reviews on subsequent pages
//             }
//             setGalleryImages(res.data.images || []);
//             setTotalReviews(res.data.totalReviews || 0);
//         } catch (err) {
//             console.error("Error fetching reviews:", err);
//         }
//     };

//     const loadMoreReviews = () => {
//         setPage((prevPage) => prevPage + 1); // Increase page number and fetch new reviews
//     };

//     const hasMoreReviews = reviews.length < totalReviews;

//     const handleReviewSubmit = async (e) => {
//         if(!customerId) alert("Please login to submit a review");
//         e.preventDefault();
//         if (!reviewText.trim()) return;

//         const formData = new FormData();
//         formData.append("customerId", customerId);
//         formData.append("serviceId", serviceId);
//         formData.append("rating", rating);
//         formData.append("reviewText", reviewText);

//         images.forEach((file) => formData.append("images", file));

//         try {
//             const res = await getAuthAxios().post("/reviews/create", formData, {
//                 headers: { "Content-Type": "multipart/form-data" },
//             });
//             console.log(res.data);
//             setReviewText('');
//             setImages([]);
//             setShowReviewBox(false);
//             fetchReviews(); // Refresh reviews after submitting a new review
//         } catch (error) {
//             console.error("Error submitting review:", error);
//         }
//     };

//     return (
//         <div>
//             <div className="my-10">
//                 <h1 className="font-bold text-3xl text-center">Rating</h1>
//                 <div className="bg-gray-100 w-full md:p-10 py-10 px-4 place-content-center place-items-center flex md:gap-14 gap-4 my-4">
//                     <div>
//                         <h1 className="flex items-center gap-1 justify-center text-4xl font-bold">
//                             4.9 <IoIosStar className="text-green-600" />
//                         </h1>
//                         <p className="md:text-2xl text-xl text-gray-400"> {totalReviews} Ratings</p>
//                     </div>
//                     <div className="h-20 border border-gray-600" />
//                     <div onClick={() => setShowReviewBox(!showReviewBox)}>
//                         <p className="flex items-center gap-3 md:text-2xl text-xl cursor-pointer">
//                             Write a review <FaRegEdit />
//                         </p>
//                     </div>
//                 </div>

//                 {showReviewBox && (
//                     <form className="flex flex-col md:w-1/2 mx-auto gap-5" onSubmit={handleReviewSubmit}>
//                         <label className="text-lg font-medium">
//                             Write your Experience with Lavish Events.
//                         </label>
//                         <textarea
//                             rows="4"
//                             placeholder="Write your review here!"
//                             onChange={(e) => setReviewText(e.target.value)}
//                             value={reviewText}
//                             className="p-3 resize-none border border-gray-300 rounded-md"
//                         ></textarea>

//                         {/* ⭐ Star Rating Selector */}
//                         <div className="flex items-center gap-2">
//                             {[1, 2, 3, 4, 5].map((star) => (
//                                 <FaStar
//                                     key={star}
//                                     onClick={() => setRating(star)}
//                                     className={`cursor-pointer text-2xl ${rating >= star ? "text-yellow-400" : "text-gray-400"
//                                         }`}
//                                 />
//                             ))}
//                             <span className="ml-2 text-gray-600">{rating} / 5</span>
//                         </div>

//                         <input
//                             type="file"
//                             multiple
//                             accept="image/*"
//                             onChange={(e) => setImages([...e.target.files])}
//                             className="p-2 border"
//                         />

//                         <input
//                             type="submit"
//                             value="Submit"
//                             className="bg-green-600 p-4 text-white text-2xl uppercase"
//                             disabled={reviewText.trim() === ""}
//                         />
//                     </form>
//                 )}

//             </div>

//             <div className="px-4 md:px-0 border rounded-lg p-2">
//                 <p className="font-bold poppins md:text-2xl">Reviews</p>
//                 <div className="flex text-yellow-400 py-2">
//                     {[...Array(5)].map((_, i) => <FaStar key={i} />)}
//                 </div>

//                 <ReviewGallery images={galleryImages} />
//                 {reviews.map((r, idx) => <ReviewCard key={idx} review={r} />)}

//                 {hasMoreReviews && (
//                     <button onClick={loadMoreReviews} className="text-primary font-bold flex items-center pt-4">
//                         Read more reviews <MdArrowRightAlt size={25} />
//                     </button>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Review;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoIosStar } from "react-icons/io";
import { FaRegEdit, FaStar } from "react-icons/fa";
import { MdArrowRightAlt } from "react-icons/md";
import ReviewGallery from './ReviewGallery';
import { getAuthAxios, getAxios } from '../utils/api';

const ReviewCard = ({ review }) => (
    <div className="flex md:gap-5 gap-3 max-w-lg md:p-4 rounded-lg mt-10">
        <div>
            <img
                src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
                alt="avatar"
                className="w-20 h-20 rounded-full"
            />
        </div>
        <div>
            <p className="font-medium">{review?.customer?.fullName || "Anonymous"}</p>
            <p className="text-gray-500">Reviewed in {new Date(review?.createdAt).toLocaleString('default', { month: 'long' })}</p>
            <div className="flex text-yellow-400 py-3">
                {[...Array(Math.max(1, Math.min(5, review.rating || 0)))].map((_, i) => <FaStar key={i} />)}
            </div>
            <p>{review.reviewText}</p>
        </div>
    </div>
);

const Review = ({ serviceId, customerId }) => {
    const [showReviewBox, setShowReviewBox] = useState(false);
    const [reviewText, setReviewText] = useState('');
    const [reviews, setReviews] = useState([]);
    const [galleryImages, setGalleryImages] = useState([]);
    const [rating, setRating] = useState(5);
    const [totalReviews, setTotalReviews] = useState(0);
    const [page, setPage] = useState(1);
    const [imageUrls, setImageUrls] = useState(['']);

    useEffect(() => {
        if (serviceId) fetchReviews();
    }, [serviceId, page]);

    const fetchReviews = async () => {
        try {
            const res = await getAxios().get(`/reviews/service/${serviceId}?page=${page}&limit=2`);
            if (page === 1) {
                setReviews(res.data.reviews || []);
            } else {
                setReviews((prev) => [...prev, ...res.data.reviews]);
            }
            setGalleryImages(res.data.images || []);
            setTotalReviews(res.data.totalReviews || 0);
        } catch (err) {
            console.error("Error fetching reviews:", err);
        }
    };

    const loadMoreReviews = () => {
        setPage((prev) => prev + 1);
    };

    const hasMoreReviews = reviews.length < totalReviews;

    const handleImageUrlChange = (index, value) => {
        const updatedUrls = [...imageUrls];
        updatedUrls[index] = value;
        setImageUrls(updatedUrls);
    };

    const addImageUrlField = () => {
        setImageUrls([...imageUrls, '']);
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!customerId) return alert("Please login to submit a review");
        if (!reviewText.trim()) return;

        const formData = new FormData();
        formData.append("customerId", customerId);
        formData.append("serviceId", serviceId);
        formData.append("rating", rating);
        formData.append("reviewText", reviewText);
        formData.append("images", JSON.stringify(imageUrls));

        try {
            const res = await getAuthAxios().post("/reviews/create", formData);
            console.log(res.data);
            setReviewText('');
            setImageUrls(['']);
            setShowReviewBox(false);
            fetchReviews();
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    return (
        <div>
            <div className="my-10">
                <h1 className="font-bold text-3xl text-center">Rating</h1>
                <div className="bg-gray-100 w-full md:p-10 py-10 px-4 flex md:gap-14 gap-4 my-4 justify-center">
                    <div>
                        <h1 className="flex items-center gap-1 justify-center text-4xl font-bold">
                            4.9 <IoIosStar className="text-green-600" />
                        </h1>
                        <p className="md:text-2xl text-xl text-gray-400"> {totalReviews} Ratings</p>
                    </div>
                    <div className="h-20 border border-gray-600" />
                    <div onClick={() => setShowReviewBox(!showReviewBox)}>
                        <p className="flex items-center gap-3 md:text-2xl text-xl cursor-pointer">
                            Write a review <FaRegEdit />
                        </p>
                    </div>
                </div>

                {showReviewBox && (
                    <form className="flex flex-col md:w-1/2 mx-auto gap-5" onSubmit={handleReviewSubmit}>
                        <label className="text-lg font-medium">Write your Experience with Lavish Events.</label>
                        <textarea
                            rows="4"
                            placeholder="Write your review here!"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            className="p-3 resize-none border border-gray-300 rounded-md"
                        ></textarea>

                        <div className="flex items-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className={`cursor-pointer text-2xl ${rating >= star ? "text-yellow-400" : "text-gray-400"}`}
                                />
                            ))}
                            <span className="ml-2 text-gray-600">{rating} / 5</span>
                        </div>

                        {imageUrls.map((url, index) => (
                            <input
                                key={index}
                                type="text"
                                placeholder="Enter image URL"
                                value={url}
                                onChange={(e) => handleImageUrlChange(index, e.target.value)}
                                className="p-2 border mb-2"
                            />
                        ))}

                        <button type="button" onClick={addImageUrlField} className="text-blue-600 underline mb-4">
                            + Add another image
                        </button>

                        <input
                            type="submit"
                            value="Submit"
                            className="bg-green-600 p-4 text-white text-2xl uppercase"
                            disabled={reviewText.trim() === ""}
                        />
                    </form>
                )}
            </div>

            <div className="px-4 md:px-0 border rounded-lg p-2">
                <p className="font-bold md:text-2xl">Reviews</p>
                <div className="flex text-yellow-400 py-2">
                    {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                </div>
                <ReviewGallery images={galleryImages} />
                {reviews.map((r, idx) => <ReviewCard key={idx} review={r} />)}

                {hasMoreReviews && (
                    <button onClick={loadMoreReviews} className="text-primary font-bold flex items-center pt-4">
                        Read more reviews <MdArrowRightAlt size={25} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Review;

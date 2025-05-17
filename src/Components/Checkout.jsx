import React, { useEffect, useState } from 'react'
import support from "../assets/support.png"
import phone from "../assets/phone.png"
import whatsapp from "../assets/whatsapp.png"
import { IoMdTime } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import img from "../assets/img/img1.jpg"
import { CiMoneyCheck1 } from "react-icons/ci";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";
import DateTimeModal from './DateTimeModal';
import { FaCircleCheck } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { TbRosetteDiscount } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { BiRupee } from "react-icons/bi";
import { FaQuestion } from "react-icons/fa";
import { IoChevronForward } from "react-icons/io5";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { FaRegCircle, FaCircle } from "react-icons/fa";
import BookingFAQs from './BookingFAQs';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
    completeOrder,
    resetCurrentOrder,
    setAddress,
    setCouponDiscount,
    setPaymentType
} from '../features/orderdetails/orderSlice'
import DynamicInputField from './DynamicInputField';
import AuthModal from "./AuthModal";
import { persistor } from "../app/store"; // adjust path if needed

const Checkout = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { serviceId } = useParams()
    const orderState = useSelector((state) => state.order);
    const authState = useSelector((state) => state.auth);

    const { currentOrder, selectedTimeSlot, isPincodeValid, deliveryMessage } = orderState;
    const user = authState?.user || null;

    const {
        orderId,
        eventDate,
        eventTime,
        grandTotal,
        subTotal,
        deliveryCharges,
        couponDiscount,
        address,
        pincode,
        balloonsColor,
        items,
        gstAmount,
        paidAmount,
        dueAmount,
        paymentType
    } = currentOrder;

    const [formData, setFormData] = useState({
        venueAddress: address || '',
        source: '',
        occasion: '',
        altMobile: ''
    });

    const [showModal, setShowModal] = useState(false)
    const [showCoupon, setShowCoupon] = useState(false)
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [selectedCoupon, setSelectedCoupon] = useState("")
    const [selectedPayPercentage, setSelectedPayPercentage] = useState('100');
    const [selectedNotification, setSelectedNotification] = useState(false);
    const [openOption, setOpenOption] = useState(false);
    const [selectSource, setSelectSource] = useState("");
    const [serviceDetails, setServiceDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [customizedValues, setCustomizedValues] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [addonDetails, setAddonDetails] = useState({});
    const options = [
        "Google", "Facebook", "Instagram", "Youtube", "Recommended", "Used Before"
    ];

    const city = "Bangalore";
    const price = grandTotal || 0;
    const currentPageUrl = window.location.href;
    const message = `${currentPageUrl}\nCity: ${city},\nPrice: ${price}\nCan I get more details?`;
    const encodedMessage = encodeURIComponent(message);
    const WhatsAppLink = `https://wa.me/919611430158?text=${encodedMessage}`;

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setLoading(true);
                // Fetch service details
                const serviceResponse = await axios.get(`http://localhost:5000/api/services/${serviceId}`);
                const serviceData = serviceResponse.data.data;
                setServiceDetails(serviceData);

                // Fetch all addons
                const allAddonsResponse = await axios.get('http://localhost:5000/api/addons/');
                const allAddons = allAddonsResponse.data.data;
                console.log("All addons from API:", allAddons);

                // Filter addons that are in the cart
                const cartAddons = items.filter(item => item.categoryType === 'addon');
                console.log("Cart addons:", cartAddons);

                // Create a map of addon details using the _id from cart addons
                const addonDetailsMap = {};
                cartAddons.forEach(cartAddon => {
                    // Find the complete addon details by matching the _id
                    const addonDetail = allAddons.find(addon => addon._id === cartAddon._id);
                    console.log("Matching addon by ID:", cartAddon._id, "Found:", addonDetail);

                    if (addonDetail) {
                        addonDetailsMap[addonDetail._id] = {
                            ...addonDetail,
                            serviceName: cartAddon.serviceName,
                            price: cartAddon.price,
                            quantity: cartAddon.quantity
                        };
                        console.log("Added to map:", addonDetailsMap[addonDetail._id]);
                    } else {
                        console.log("No matching addon found for ID:", cartAddon._id);
                    }
                });

                console.log("Final addon details map:", addonDetailsMap);
                setAddonDetails(addonDetailsMap);
            } catch (err) {
                console.error("Error fetching details:", err);
                setError("Failed to fetch details");
            } finally {
                setLoading(false);
            }
        };

        if (serviceId) {
            fetchDetails();
        }
    }, [serviceId, items]);

    console.log("Service", serviceDetails)

    const handleInputChange = (label, value, itemId = null, type = 'text', checked = false) => {
        let finalValue = value;
        if (type === 'checkbox') {
            finalValue = checked;
        }
        if (itemId) {
            setCustomizedValues((prev) => ({
                ...prev,
                [`${itemId}_${label}`]: finalValue,
            }));
        } else {
            setCustomizedValues((prev) => ({
                ...prev,
                [label]: finalValue,
            }));
        }
    };

    const toggleModal = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    };

    useEffect(() => {
        document.body.style.overflow = showModal ? 'hidden' : 'unset';

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showModal]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;

        if (type === "radio") {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
            setSelectSource(value);
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }

        // Update address in redux if venue address changes
        if (name === 'venueAddress') {
            dispatch(setAddress(value));
        }
    };

    // Format date for display
    const formatDate = (date) => {
        if (!date) return '';
        return date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    const handleEditPincode = () => {
        dispatch(resetCurrentOrder());
        navigate(-1);
    }

    const handlePaymentTypeChange = (percentage) => {
        setSelectedPayPercentage(percentage);
        dispatch(setPaymentType(percentage === '50' ? 'half' : 'full'));

        // If switching to half payment, remove any applied coupon
        if (percentage === '50') {
            setSelectedCoupon('');
            dispatch(setCouponDiscount(0));
        }
    };

    const applyCoupon = (couponCode) => {
        if (selectedPayPercentage === "50") {
            alert("Coupons cannot be applied with 50% payment option");
            return;
        }

        if (couponCode) {
            setSelectedCoupon(couponCode);
            dispatch(setCouponDiscount(Math.round(subTotal * 0.1)));
        } else {
            dispatch(setCouponDiscount(0));
            setSelectedCoupon("");
        }
    };

    const handleProceedToPay = async () => {
        try {
            // Check if user is logged in
            const storedUser = localStorage.getItem('user');
            const storedToken = localStorage.getItem('accessToken');
            
            console.log('Stored User Data:', storedUser);
            console.log('Stored Token:', storedToken);
            
            if (!storedUser || !storedToken) {
                setShowLoginModal(true);
                return;
            }

            // Parse stored user data
            const userData = JSON.parse(storedUser);
            console.log('Parsed User Data:', userData);

            // Form validation
            if (!formData.venueAddress.trim()) {
                alert("Please enter venue address");
                return;
            }
            if (!selectSource) {
                alert("Please select how you came to know about us");
                return;
            }
            if (!formData.occasion) {
                alert("Please select an occasion");
                return;
            }
            if (!eventDate) {
                alert("Please select a date");
                return;
            }
            if (!selectedTimeSlot) {
                alert("Please select a time slot");
                return;
            }

            // Calculate payment amounts
            const amountToPay = selectedPayPercentage === "50" ? Math.round(grandTotal / 2) : grandTotal;
            const duePayment = selectedPayPercentage === "50" ? Math.round(grandTotal / 2) : 0;

            // Map customizedValues to array of { label, value }
            const customizedInputsArr = Object.entries(customizedValues).map(([label, value]) => ({ label, value }));

            // Process items to match schema requirements
            const processedItems = items.map(item => {
                // Ensure categoryType is properly capitalized
                const categoryType = item.categoryType === 'service' ? 'Service' :
                    item.categoryType === 'addon' ? 'Addon' :
                        item.categoryType;

                // Get the refId based on item type
                let refId;
                if (item.categoryType === 'service') {
                    refId = serviceDetails?._id;
                    if (!refId) {
                        throw new Error(`Service ID not found for ${item.serviceName}`);
                    }
                } else if (item.categoryType === 'addon') {
                    const addonDetail = addonDetails[item._id];
                    if (!addonDetail) {
                        throw new Error(`Addon details not found for ${item.serviceName}`);
                    }
                    refId = addonDetail._id;
                }

                // Get customized inputs for the item
                let itemCustomizedInputs = [];
                if (item.categoryType === 'service') {
                    itemCustomizedInputs = (serviceDetails?.customizedInputs || []).map(input => ({
                        label: input.label,
                        value: customizedValues[input.label] || '',
                        _id: input._id
                    }));
                } else if (item.categoryType === 'addon') {
                    const addonDetail = addonDetails[item._id];
                    itemCustomizedInputs = (addonDetail?.customizedInputs || []).map(input => ({
                        label: input.label,
                        value: customizedValues[`${addonDetail._id}_${input.label}`] || '',
                        _id: input._id
                    }));
                }

                return {
                    refId: refId,
                    serviceName: item.serviceName,
                    price: Number(item.price) || 0,
                    originalPrice: Number(item.originalPrice || item.price) || 0,
                    quantity: Number(item.quantity || 1),
                    image: item.image || '',
                    categoryType: categoryType,
                    customizedInputs: itemCustomizedInputs,
                    _id: item._id
                };
            });

            // Create order data
            const orderData = {
                orderId: `ORD${Date.now()}`,
                eventDate: formatDate(new Date(eventDate)),
                eventTime: selectedTimeSlot,
                pincode: pincode,
                balloonsColor: balloonsColor || [],
                subTotal: Number(subTotal || 0),
                grandTotal: Number(grandTotal || 0),
                paidAmount: Number(amountToPay || 0),
                dueAmount: Number(duePayment || 0),
                deliveryCharges: Number(deliveryCharges || 0),
                couponDiscount: Number(couponDiscount || 0),
                gstAmount: Number(gstAmount || 0),
                paymentType: selectedPayPercentage === "50" ? "half" : "full",
                address: formData.venueAddress.trim(),
                items: processedItems,
                customerName: userData.name || 'Guest',
                customerId: userData._id,
                occasion: formData.occasion,
                source: selectSource,
                altMobile: formData.altMobile || '',
                orderStatus: 'created'
            };

            console.log('Order Data being sent:', orderData);

            // Create order with authentication token
            const response = await axios.post('http://localhost:5000/api/orders/create', orderData, {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            });

            if (response.data.success) {
                console.log("Order created successfully:", response.data.data);
                alert("Order created successfully");
                // Clear form and state
                setFormData({ venueAddress: '', source: '', occasion: '', altMobile: '' });
                setSelectedCoupon("");
                setSelectedNotification(false);
                dispatch(completeOrder());

                // Redirect to order confirmation page
                navigate(`/order-confirmation`);
            } else {
                alert(response.data.message || "Failed to create order. Please try again.");
            }
        } catch (error) {
            console.error("Error processing order:", error);
            if (error.response) {
                const errorMessage = error.response.data.message || "Failed to create order. Please check all required fields.";
                const missingFields = error.response.data.required;
                if (missingFields) {
                    const missingFieldNames = Object.entries(missingFields)
                        .filter(([_, value]) => value === false)
                        .map(([key]) => key);
                    alert(`${errorMessage}\nMissing fields: ${missingFieldNames.join(', ')}`);
                } else {
                    alert(errorMessage);
                }
            } else {
                alert(error.message || "Error creating order. Please try again.");
            }
        }
    };

    useEffect(() => {
        if (selectedCoupon && selectedPayPercentage === '100') {
            applyCoupon(selectedCoupon);
        }
    }, [selectedCoupon, selectedPayPercentage]);

    // Calculate amount to pay based on payment percentage
    const amountToPay = selectedPayPercentage === "50" ? Math.round(grandTotal / 2) : grandTotal;

    const handleDeleteAll = async () => {
        // Purge redux-persist storage if used
        if (persistor && persistor.purge) {
            await persistor.purge();
        }
        // Optionally, dispatch resets for your slices
        dispatch(resetCurrentOrder());
        // You can also clear localStorage if needed
        localStorage.clear();
        // Navigate to home
        navigate("/");
        // Optionally reload for a clean state
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            {/* Login Modal */}
            {showLoginModal && (
                <AuthModal 
                    setIsModalOpen={setShowLoginModal} 
                    onLoginSuccess={() => {
                        setShowLoginModal(false);
                        // After successful login, proceed with order placement
                        // handleProceedToPay();
                    }}
                />
            )}

            <div className='lg:p-24 p-2 pt-36  mx-auto'>
                <div className='lg:grid grid-cols-5 gap-10 '>
                    <div className='col-span-3' >
                        <h1 className='text-2xl font-bold poppins pb-5'>Checkout</h1>
                        <div className='hidden lg:w-9/12 md:flex items-center justify-between gap-2 border border-gray-300  px-2 py-4 my-4 rounded-2xl'>
                            <div className='flex items-center gap-2'>
                                <img src={support} className='w-10' />
                                <p className=''>Need assistance?</p>
                            </div>
                            <div className='md:flex items-center lg:gap-4 md:gap-2 '>
                                <button className='flex gap-2 items-center border bg-green-500 text-white rounded-full px-4 py-2 ' onClick={() => window.open(WhatsAppLink, "_blank")}> <img src={whatsapp} className='w-6' />Whatsapp</button>
                                <button className='flex gap-2 items-center border border-blue-500 text-blue-500 rounded-full px-6 py-2'> <img src={phone} className='w-6' />Call us</button>
                            </div>
                        </div>
                        <div className=' bg-white border border-gray-300  p-4 my-4 rounded-2xl shadow-xl'>
                            <h2 className='text-xl font-medium '>Customer Details</h2>
                            <form className='mt-2 py-3 '>
                                <label>
                                    Venue Address
                                    <input
                                        placeholder='Add the venue address'
                                        className='w-full border p-2 my-2 text-sm border-gray-300   rounded-md'
                                        value={formData.venueAddress}
                                        onChange={handleChange}
                                        name="venueAddress"
                                    />
                                </label>
                                <div>
                                    <p>Pincode</p>
                                    <div className='flex items-center gap-2 border border-gray-300 p-2 rounded-md'>
                                        <p className='w-full text-sm'>{pincode}</p>
                                        <button className='text-primary' onClick={handleEditPincode} >Edit</button>
                                    </div>

                                </div>
                                <div className="bg-transparent">
                                    <p className="">How did you come to know about Lavishevents?</p>
                                    <div
                                        className="flex items-center justify-between gap-3 border border-gray-300 p-1 px-2 my-3 bg-transparent cursor-pointer"
                                        onClick={() => setOpenOption(!openOption)}
                                    >
                                        <label className="flex items-center space-x-2">
                                            <p className="text-gray-400 text-sm">{selectSource || "Select the option"}</p>
                                        </label>
                                        <button>
                                            {openOption ? <IoChevronUp /> : <IoChevronDown />}
                                        </button>
                                    </div>

                                    {openOption && (
                                        <div className="mt-2 space-y-2">
                                            <div className="grid grid-cols-2 md:w-1/2">
                                                {options.map((option) => (
                                                    <label
                                                        key={option}
                                                        className="flex items-center space-x-2 px-4 py-2 cursor-pointer"
                                                    >
                                                        <input
                                                            type="radio"
                                                            name="source"
                                                            value={option}
                                                            checked={selectSource === option}
                                                            onChange={handleChange}
                                                            className="hidden"
                                                        />
                                                        <span className="text-primary">
                                                            {selectSource === option ? (
                                                                <FaCircle size={14} />
                                                            ) : (
                                                                <FaRegCircle size={14} />
                                                            )}
                                                        </span>
                                                        <span>{option}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <p className='pb-2'>What is the occasion? </p>
                                    <select
                                        name="occasion"
                                        className={`border p-1 mb-3 w-full text-sm`}
                                        value={formData.occasion}
                                        onChange={handleChange}
                                    >
                                        <option value="" className="text-gray-400">Occasion</option>
                                        <option value="birthday" className='text-black'>Birthday</option>
                                        <option value="anniversary" className='text-black'>Anniversary</option>
                                        <option value="babyShower" className='text-black'>Baby Shower</option>
                                        <option value="welcome" className='text-black'>Welcome</option>
                                        <option value="bacheloretteparty" className='text-black'>Bachelorette Party</option>
                                        <option value="weddingnight" className='text-black'>Wedding Night</option>
                                        <option value="others" className='text-black'>Others</option>
                                    </select>
                                </div>

                                <label className=''>
                                    Alternate Contact Number
                                    <input
                                        placeholder='mobile number'
                                        className='w-full border p-2 my-2 text-sm'
                                        name="altMobile"
                                        value={formData.altMobile}
                                        onChange={handleChange}

                                    />
                                </label>

                                {/* Service Customized Inputs */}
                                {serviceDetails?.customizedInputs?.map((item, index) => (
                                    <DynamicInputField
                                        key={index}
                                        item={item}
                                        index={index}
                                        onChange={(label, value, type, checked) => handleInputChange(label, value, null, type, checked)}
                                    />
                                ))}

                                <h3 className="font-medium text-lg my-4 ">Selected Addons</h3>
                                {/* Addon Customized Inputs */}
                                {items
                                    .filter(item => item.categoryType === 'addon')
                                    .map((addon) => {
                                        // Get the addon detail using the _id
                                        const addonDetail = addonDetails[addon._id];

                                        if (!addonDetail || !addonDetail.customizedInputs || addonDetail.customizedInputs.length === 0) {
                                            return null;
                                        }

                                        return (
                                            <div key={addon._id} className="mt-4 border-t pt-4">
                                                <h4 className="font-medium mb-2">{addon.serviceName}</h4>
                                                {addonDetail.customizedInputs.map((input, index) => (
                                                    <DynamicInputField
                                                        key={`${addon._id}_${index}`}
                                                        item={input}
                                                        index={index}
                                                        onChange={(label, value, type, checked) => handleInputChange(label, value, addon._id, type, checked)}
                                                    />
                                                ))}
                                            </div>
                                        );
                                    })}

                            </form>

                        </div>
                    </div >
                    {/* right side */}
                    <div className='col-span-2'>
                        <div className="border border-gray-300 md:p-6 p-3 my-6 rounded-2xl shadow-lg bg-white">
                            <h2 className="text-2xl font-semibold mb-5 text-gray-800">Order Details</h2>

                            <div className="flex flex-col md:flex-row justify-between items-start rounded-2xl gap-6">
                                {/* Left Section - Product Image & Details */}
                                <div className="flex gap-4 w-full">
                                    <img src={img} className="w-32 h-32 rounded-xl object-cover shadow-sm" alt="Product" />
                                    <div className="space-y-2 w-full">
                                        <p className="text-lg md:text-xl font-semibold text-gray-900">{items.find(item => item.categoryType === 'service')?.serviceName}</p>

                                        {/* Date & Time Selection */}
                                        <div className="space-y-1">
                                            <p
                                                className="text-sm text-gray-600 font-medium flex items-center gap-2 cursor-pointer hover:text-blue-600 transition"
                                                onClick={() => setShowModal(true)}
                                            >
                                                <HiOutlineCalendarDateRange className="text-lg" />
                                                {eventDate ? formatDate(new Date(eventDate)) : "Select a date"}
                                            </p>
                                            <p
                                                className="text-sm text-gray-600 font-medium flex items-center gap-2 cursor-pointer hover:text-blue-600 transition"
                                                onClick={() => setShowModal(true)}
                                            >
                                                <IoMdTime className="text-lg" />
                                                {selectedTimeSlot || "Select a time slot"}
                                            </p>
                                            <p className="text-sm text-gray-600 font-medium flex items-center gap-2">
                                                <CiMoneyCheck1 className="text-lg" />
                                                <span className="font-semibold text-gray-900">Package Amount:</span> Rs. {items.find(item => item.categoryType === 'service')?.price}
                                            </p>
                                        </div>

                                        {/* Add-ons Section */}
                                        {items.filter(item => item.categoryType === 'addon').length > 0 && (
                                            <div className="mt-2 border border-gray-200 p-2 rounded-lg bg-gray-50">
                                                <h3 className="text-sm font-semibold text-gray-800">Add-ons:</h3>
                                                {items.filter(item => item.categoryType === 'addon').map((addon, index) => (
                                                    <div key={index} className="flex justify-between items-center text-sm text-gray-700">
                                                        <span>{addon.serviceName}</span>
                                                        <span>{addon.price} x {addon.quantity}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Right Section - Pricing & Actions */}
                                <div className="flex md:items-end md:flex-col flex-row-reverse items-center justify-between gap-6 md:gap-4 pt-4 md:pt-0">
                                    <RiDeleteBin6Line
                                        className="cursor-pointer text-red-500 hover:text-red-600 text-2xl transition"
                                        title="Delete All Data"
                                        onClick={handleDeleteAll}
                                    />
                                    <h1 className="font-semibold text-xl text-gray-900">Rs. {grandTotal}</h1>
                                </div>
                            </div>

                            {/* Note Section */}
                            <div className="p-2 px-3 mt-4 rounded-md border border-gray-300 bg-gray-50">
                                <p className="text-sm text-gray-700">
                                    <span className="font-bold">Note:</span>
                                    <input className='w-full p-2' placeholder='If you have any note type here  ' />
                                </p>
                            </div>
                        </div>

                        <div className='flex justify-between border border-gray-300  md:p-4 p-2 my-4 rounded-2xl shadow-xl cursor-pointer' onClick={toggleModal} >
                            <p className='flex gap-2 items-center'><span className='bg-green-600 p-1 text-white rounded-full'><FaQuestion size={10} /></span>  Read Before Booking</p>
                            <IoChevronForward />
                        </div>
                        <BookingFAQs isOpen={isOpen} toggleModal={toggleModal} />
                        <div className=' border border-gray-300  p-4 my-2 rounded-2xl shadow-xl'>
                            <h2 className='text-xl font-medium '>Product Details</h2>
                            <div className=' rounded-b-lg bg-green-200 shadow-xl '>
                                <div className='border-b-2 border-dashed border-gray-500 text-gray-500  bg-white poppins p-3 space-y-2'>
                                    {/* Base Service */}
                                    <div className='flex justify-between items-center'>
                                        <p className=''>Base Service</p>
                                        <p className='text-right'>Rs. {items.find(item => item.categoryType === 'service')?.price || 0}</p>
                                    </div>

                                    {/* Add-ons Total */}
                                    {items.filter(item => item.categoryType === 'addon').length > 0 && (
                                        <div className='flex justify-between items-center'>
                                            <p className=''>Add-ons Total</p>
                                            <p className='text-right'>Rs. {items.filter(item => item.categoryType === 'addon')
                                                .reduce((total, addon) => total + (addon.price * addon.quantity), 0)}</p>
                                        </div>
                                    )}

                                    {/* Delivery Charges */}
                                    <div className='flex justify-between items-center'>
                                        <p className=''>Delivery Charges</p>
                                        <p className='text-right'>Rs. {deliveryCharges}</p>
                                    </div>

                                    {/* Subtotal before GST */}
                                    <div className='flex justify-between items-center font-medium'>
                                        <p className=''>Subtotal (before GST)</p>
                                        <p className='text-right'>Rs. {subTotal}</p>
                                    </div>

                                    {/* Coupon Discount */}
                                    {selectedCoupon && selectedPayPercentage !== "50" && (
                                        <div className='flex justify-between items-center text-red-500'>
                                            <p>Coupon Discount (10%)</p>
                                            <p>- Rs. {couponDiscount}</p>
                                        </div>
                                    )}

                                    {/* GST */}
                                    <div className='flex justify-between items-center'>
                                        <p className=''>GST (18%)</p>
                                        <p className='text-right'>Rs. {Math.round((subTotal - (selectedPayPercentage === "50" ? 0 : couponDiscount)) * 0.18)}</p>
                                    </div>

                                    {/* Coupon Section */}
                                    {selectedPayPercentage === "100" && (
                                        selectedCoupon !== "" ? (
                                            <div className={`flex gap-4 text-lg ${selectedPayPercentage === "50" ? "text-gray-400" : "text-black"}`}>
                                                <div className='w-full'>
                                                    <div className='w-full flex items-center'>
                                                        <p className="text-sm">Coupon {selectedCoupon}</p>
                                                        <button onClick={() => setSelectedCoupon("")}><MdDelete className='cursor-pointer' size={20} /></button>
                                                    </div>
                                                    {selectedPayPercentage === "50" && (
                                                        <small className='text-red-400'>Coupon not applicable for 50% Payment</small>
                                                    )}
                                                </div>
                                                <p className='text-red-400'>
                                                    {selectedPayPercentage === "50" ? "-0" : `-${couponDiscount}`}
                                                </p>
                                            </div>
                                        ) : (
                                            <div>
                                                <div className='flex items-center gap-4 md:mx-4 md:px-4 px-2 py-2 rounded-md text-black bg-blue-300 cursor-pointer'
                                                    onClick={() => setShowCoupon(!showCoupon)}>
                                                    <div className='w-full flex items-center gap-2'><TbRosetteDiscount /> Coupon</div>
                                                    <button className='underline'>View</button>
                                                </div>
                                            </div>
                                        ))}
                                    {showCoupon &&
                                        <div className='max-h-[300px] overflow-y-scroll my-4 md:w-[90%] mx-auto scrollbar-hide '>
                                            <div className="flex border border-primary rounded-md h-[100px] mt-3 text-sm cursor-pointer" onClick={() => {
                                                setSelectedCoupon("NEWUSER")
                                                setShowCoupon(false)
                                            }}>
                                                <div className="flex items-center justify-center bg-primary text-white p-4   md:w-[70px] w-[100px]">
                                                    <h1 className="-rotate-90  font-bold">{'10% OFF'}</h1>
                                                </div>

                                                <div className="flex flex-col justify-center px-4 ">
                                                    <h1 className=" font-semibold">NEWUSER</h1>
                                                    <p className="text-gray-700 ">Save 10% off on this offer on purchases above Rs. 2,000</p>
                                                    <small className="text-gray-500 ">Apply NEWUSER and get up to Rs. 200 off on your order!</small>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    <div className='flex items-center gap-4 py-2'>
                                        <input type='checkbox' className="w-4 h-4 " checked={selectedNotification} onChange={() => setSelectedNotification(!selectedNotification)} />
                                        <p className='flex md:items-center items-start gap-2'><img src={whatsapp} className='w-5' />Get booking notifications on whatsapp.</p>
                                    </div>
                                </div>

                                {/* Final Payment Display */}
                                <div className='text-lg text-black poppins rounded-b-2xl bg-white p-3 shadow-2xl pt-4'>
                                    <div className='flex justify-between items-center'>
                                        <p className=''>Grand Total</p>
                                        <p className='flex items-center font-semibold text-right text-black'>
                                            <BiRupee size={24} />{grandTotal}
                                        </p>
                                    </div>
                                    {selectedPayPercentage === "50" && (
                                        <>
                                            <div className='flex justify-between items-center'>
                                                <p className=''>Amount to Pay Now</p>
                                                <p className='flex items-center font-semibold text-right text-green-600'>
                                                    <BiRupee size={24} />{Math.round(grandTotal / 2)}
                                                </p>
                                            </div>
                                            <div className='flex justify-between items-center'>
                                                <p className=''>Amount Due Later</p>
                                                <p className='flex items-center font-semibold text-right text-red-600'>
                                                    <BiRupee size={24} />{Math.round(grandTotal / 2)}
                                                </p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className='my-10'>
                            <div className='flex justify-between items-center font-medium'>
                                <p className=''>Payment Options</p>
                                <div className='text-primary flex gap-2'>
                                    <label className='flex gap-1'>
                                        <input
                                            type='radio'
                                            name='percentage'
                                            value='50'
                                            className='text-primary'
                                            checked={selectedPayPercentage === '50'}
                                            onChange={() => handlePaymentTypeChange('50')}
                                        />
                                        <p>50%</p>
                                    </label>
                                    <label className='flex gap-1'>
                                        <input
                                            type='radio'
                                            name='percentage'
                                            value='100'
                                            className='text-primary'
                                            checked={selectedPayPercentage === '100'}
                                            onChange={() => handlePaymentTypeChange('100')}
                                        />
                                        <p>100%</p>
                                    </label>
                                </div>
                            </div>

                            <button
                                onClick={handleProceedToPay}
                                className='bg-primary text-center py-3 mt-5 w-full text-white rounded-xl font-semibold text-xl'
                            >
                                PROCEED TO PAY | Rs. {selectedPayPercentage === "50" ? Math.round(grandTotal / 2) : grandTotal}
                            </button>
                            <p className='text-gray-500 py-3 text-center'>100% Safe & Secure Payment!</p>
                        </div>
                    </div>

                    {showModal && (
                        <DateTimeModal setShowModal={setShowModal} />
                    )}
                </div>

                {/* Debug section to display Redux order data */}
                <div className="mt-8 p-4 border border-gray-300 rounded-lg">
                    <h2 className="text-xl font-bold mb-2">Current Order Data (Redux Store)</h2>
                    <div className="bg-gray-100 p-4 rounded overflow-auto max-h-64">
                        <pre className="text-sm whitespace-pre-wrap">
                            {JSON.stringify(currentOrder, null, 2)}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout



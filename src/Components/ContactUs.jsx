import React, { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { getAuthAxios, getAxios } from "../utils/api";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const [status, setStatus] = useState({ success: null, message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict 'name' to letters only (allowing spaces)
    if (name === "name" ) {
      if (!/^[a-zA-Z\s]*$/.test(value)) return;
    }

    // Restrict 'phone' to digits only, max 10 digits
    if (name === "phone") {
      if (!/^\d*$/.test(value)) return; 
      if (value.length > 10) return; 
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ success: null, message: "" });

    try {
      const res = await getAuthAxios().post("/enquiries/create", formData);
      if (res.data.success) {
        setStatus({
          success: true,
          message: "Inquiry submitted successfully!",
        });
        setFormData({
          name: "",
          phone: "",
          email: "",
          service: "",
          message: "",
        });
      }
      alert("Inquiry submitted successfully!");
    } catch (err) {
      setStatus({
        success: false,
        message:
          err.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="container md:pt-24 pt-32 px-2 mx-auto">
      <div className="lg:grid grid-cols-2 gap-20">
        <div className="lg:mt-28">
          <h1 className="md:text-8xl text-4xl font-bold">Contact</h1>
          <hr className="w-52 h-2 bg-primary my-2" />
          <p className="lg:text-2xl md:text-4xl text-2xl pb-3">
            Looking for top-tier and highly experienced décor professionals in
            Bangalore? Feel free to reach out!
          </p>
        </div>
        <div className="place-items-center p-4 md:p-10 lg:p-0">
          <img
            src="https://lavisheventzz-bangalore.b-cdn.net/contact.avif"
            className="shadow-[15px_20px_2px_black] md:w-[80%] md:h-[500px] object-cover"
            alt="Contact"
          />
        </div>
      </div>

      <div className="lg:grid grid-cols-2 gap-20 mt-20">
        <div className="mt-10">
          <h1 className="md:text-7xl text-6xl font-bold">Contact Info</h1>
          <div className="my-16 space-y-10">
            <div className="flex gap-10 md:px-10">
              <div className="border border-double border-primary p-1 rounded-full">
                <FaPhoneAlt
                  size={60}
                  className="border border-primary text-primary rounded-full p-2"
                />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Phone</h2>
                <p className="text-xl pb-4">9620558000</p>
              </div>
            </div>
            <div className="flex gap-10 md:px-10">
              <div className="border border-double border-primary p-1 rounded-full">
                <IoIosMail
                  size={60}
                  className="border border-primary text-primary rounded-full p-2"
                />
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Email</h2>
                <p className="text-xl py-4">infolavisheventzz@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-7xl font-medium poppins">
            We are here to Help You
          </h1>
          <form className="flex gap-4 flex-col mt-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name*"
              required
              value={formData.name}
              onChange={handleChange}
              className="outline-none p-4 text-xl border-b-2 border-black"
            />
            <input
              type="number"
              name="phone"
              placeholder="Phone*"
              required
              value={formData.phone}
              onChange={handleChange}
              className="outline-none p-4 text-xl border-b-2 border-black"
            />
            <input
              type="email"
              name="email"
              placeholder="Email*"
              required
              value={formData.email}
              onChange={handleChange}
              className="outline-none p-4 text-xl border-b-2 border-black"
            />
            <input
              type="text"
              name="service"
              placeholder="Services you want"
              value={formData.service}
              onChange={handleChange}
              className="outline-none p-4 text-xl border-b-2 border-black"
            />
            <input
              type="text"
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="outline-none p-4 text-xl border-b-2 border-black"
            />
            <input
              type="submit"
              value="Submit"
              className="bg-primary text-white p-3 text-2xl poppins cursor-pointer"
            />

            {status.message && (
              <p
                className={`mt-2 ${
                  status.success ? "text-green-600" : "text-red-500"
                }`}
              >
                {status.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

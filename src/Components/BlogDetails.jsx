// import React, { useEffect, useRef, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { getAuthAxios } from "../utils/api";
// import Breadcrumb from "./Breadcrumb";
// import { Helmet } from "react-helmet-async";

// function kebabToTitle(str) {
//   return str
//     .replace(/-/g, " ")
//     .replace(/\b\w/g, (char) => char.toUpperCase());
// }

// const BlogDetails = () => {
//   const { title } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     service: "",
//     message: "",
//   });
//   const [status, setStatus] = useState({ success: null, message: "" });
//   const footerRef = useRef(null);
//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5000/api/blog/title/${title}`
//         );
//         setBlog(res.data.data);
//         console.log("res", res.data.data.metaTitle);
//       } catch (err) {
//         console.error("Failed to fetch blog:", err.message);
//       }
//     };

//     fetchBlog();
//   }, [title]);

//   const alterTitle = kebabToTitle(blog?.title)



//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) return;
//     if (name === "phone" && (!/^\d*$/.test(value) || value.length > 10)) return;

//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };



//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setStatus({ success: null, message: "" });

//     try {
//       const res = await getAuthAxios().post("/enquiries/create", formData);
//       if (res.data.success) {
//         setStatus({
//           success: true,
//           message: "Inquiry submitted successfully!",
//         });
//         setFormData({
//           name: "",
//           phone: "",
//           email: "",
//           service: "",
//           message: "",
//         });
//         alert("Inquiry submitted successfully!");
//       }
//     } catch (err) {
//       setStatus({
//         success: false,
//         message:
//           err.response?.data?.message ||
//           "Something went wrong. Please try again.",
//       });
//     }
//   };

//   const breadcrumbPaths = [
//     { name: "Home", link: "/" },
//     { name: "Blog", link: "/blogs" },
//     {
//       name: alterTitle,
//       link: `/blogs/${title}`,
//     },
//   ];

//   return (
//     <div className="min-h-screen px-4 lg:py-24 py-36 ">
//       <Helmet>
//         {/* <!-- Open Graph --> */}
//         <meta property="og:type" content="article" />
//         <meta property="og:title" content={blog?.metaTitle} />
//         <meta property="og:description" content={blog?.metaDescription} />
//         <meta property="og:image" content="https://example.com/images/article-banner.jpg" />
//         <meta property="og:url" content={`https://www.lavisheventzz.com/blogs/${title}`} />
//         <meta property="og:site_name" content="Lavish Eventzz" />

//         {/* <!-- Twitter Card --> */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta name="twitter:title" content={blog?.metaTitle} />
//         <meta name="twitter:description" content={blog?.metaDescription} />
//         <meta name="twitter:image" content="https://example.com/images/article-banner.jpg" />
//         <meta name="twitter:site" content="@lavishevents25" />


//         <script type="application/ld+json">
//           {`
//   "@context": "https://schema.org",
//   "@type": "Article",
//   "headline": ${alterTitle},
//   "image": "https://example.com/images/article-banner.jpg",
//   "author": {
//     "@type": "Person",
//     "name": "Balakrishna"
//   },
//   "publisher": {
//     "@type": "Organization",
//     "name": "Lavish Eventzz",
//     "logo": {
//       "@type": "ImageObject",
//       "url": "https://www.lavisheventzz.com/assets/logo-sUNpuNY_.png"
//     }
//   },
//   "datePublished": "2025-07-09",
//   "dateModified": "2025-07-09",
//   "description": ${blog?.metaDescription},
//   "mainEntityOfPage": "https://www.lavisheventzz.com/blogs/${title}"
// `}
//         </script>


//         <script type="application/ld+json">
//           {`
//   "@context": "https://schema.org",
//   "@type": "BreadcrumbList",
//   "itemListElement": [
//     {
//       "@type": "ListItem",
//       "position": 1,
//       "name": "Home",
//       "item": "https://www.lavisheventzz.com/"
//     },
//     {
//       "@type": "ListItem",
//       "position": 2,
//       "name": "Blog",
//       "item": "https://www.lavisheventzz.com/blogs"
//     },
//     {
//       "@type": "ListItem",
//       "position": 3,
//       "name": "Web Development Tips 2025",
//       "item": "https://www.lavisheventzz.com/blogs/top-10-birthday-decoration-themes-2025"
//     }
//   ]
// `}
//         </script>


//         <script type="application/ld+json">
//           {`
//   "@context": "https://schema.org",
//   "@type": "FAQPage",
//   "mainEntity": [
//     {
//       "@type": "Question",
//       "name": "What are some trending birthday decoration themes for adults?",
//       "acceptedAnswer": {
//         "@type": "Answer",
//         "text": "Minimal Luxe, Retro Disco, and Boho Picnic are popular choices for adults looking for classy yet fun birthday celebrations."
//       }
//     },
//     {
//       "@type": "Question",
//       "name": "Which birthday theme is best for kids under 10?",
//       "acceptedAnswer": {
//         "@type": "Answer",
//         "text": "Jungle Safari, Outer Space, and Mermaid themes are top picks among younger children for their playful and colorful elements."
//       }
//     },
//     {
//       "@type": "Question",
//       "name": "How do I plan a birthday theme on a budget?",
//       "acceptedAnswer": {
//         "@type": "Answer",
//         "text": "Stick to one or two statement pieces, use DIY décor like handmade banners or repurposed fairy lights, and focus on color coordination instead of quantity."
//       }
//     },
//     {
//       "@type": "Question",
//       "name": "Can I mix themes together?",
//       "acceptedAnswer": {
//         "@type": "Answer",
//         "text": "Yes, mixing works great when done with balance. For example, combining Boho with Mermaid vibes using earthy seashell tones or adding neon elements to a sports theme."
//       }
//     },
//     {
//       "@type": "Question",
//       "name": "Are balloon arches still in trend?",
//       "acceptedAnswer": {
//         "@type": "Answer",
//         "text": "Absolutely. In fact, balloon arches are evolving—now you’ll see asymmetrical setups, matte textures, and custom colors more than ever before."
//       }
//     },
//     {
//       "@type": "Question",
//       "name": "Where can I find birthday decoration services in India?",
//       "acceptedAnswer": {
//         "@type": "Answer",
//         "text": "Many online platforms like CherishX, FNP, and local event decorators offer theme packages. Always read reviews and check for customization options."
//       }
//     }
//   ]
// `}
//         </script>

//       </Helmet>
//       <Breadcrumb paths={breadcrumbPaths} />

//       <div className="flex flex-col md:flex-row max-w-7xl mx-auto mt-4 gap-8">
//         {/* Blog Content (Page scrolls normally) */}
//         <div className="flex-1 pr-4">
//           {blog ? (
//             <div>
//               <h1 className="text-4xl font-bold text-[#FF4286] mb-4">
//                 {alterTitle}
//               </h1>
//               <img
//                 src={blog.bannerImage}
//                 alt={blog.title}
//                 className="w-full h-auto object-cover rounded-lg shadow mb-6"
//               />
//               <div
//                 className="prose max-w-full text-gray-700"
//                 dangerouslySetInnerHTML={{ __html: blog.description }}
//               ></div>
//             </div>
//           ) : (
//             <p className="text-lg font-medium text-gray-600">Loading blog...</p>
//           )}
//         </div>

//         {/* Sticky Contact Form */}
//         <div className="hidden md:block w-[350px] h-fit">
//           <div className="fixed top-26 bg-white border border-gray-200 rounded-lg shadow-lg p-6">
//             <h2 className="text-xl font-semibold text-[#6a1b9a] mb-4">Contact Us</h2>
//             <form className="space-y-4" onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Name*"
//                 className="w-full border-b border-black focus:outline-none py-2 placeholder-gray-500"
//                 required
//                 value={formData.name}
//                 onChange={handleChange}
//               />
//               <input
//                 type="tel"
//                 name="phone"
//                 placeholder="Phone*"
//                 className="w-full border-b border-black focus:outline-none py-2 placeholder-gray-500"
//                 required
//                 value={formData.phone}
//                 onChange={handleChange}
//               />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email*"
//                 className="w-full border-b border-black focus:outline-none py-2 placeholder-gray-500"
//                 required
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//               <input
//                 type="text"
//                 name="service"
//                 placeholder="Services you want"
//                 className="w-full border-b border-black focus:outline-none py-2 placeholder-gray-500"
//                 value={formData.service}
//                 onChange={handleChange}
//               />
//               <textarea
//                 name="message"
//                 placeholder="Message"
//                 className="w-full border-b border-black focus:outline-none py-2 placeholder-gray-500"
//                 rows={3}
//                 value={formData.message}
//                 onChange={handleChange}
//               ></textarea>

//               <button
//                 type="submit"
//                 className="w-full bg-[#FF4286] hover:bg-[#e91e63] text-white py-2 px-4 rounded"
//               >
//                 Submit
//               </button>

//               {status.message && (
//                 <p
//                   className={`text-sm ${status.success ? "text-green-600" : "text-red-500"
//                     }`}
//                 >
//                   {status.message}
//                 </p>
//               )}
//             </form>
//           </div>
//         </div>
//       </div>
//       <div ref={footerRef} className="footer" />
//     </div>
//   );
// };

// export default BlogDetails;



import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL, getAuthAxios } from "../utils/api";
import Breadcrumb from "./Breadcrumb";
import { Helmet } from "react-helmet-async";

function kebabToTitle(str) {
  if (!str) return ""; // Ensure that we handle undefined or null values
  return str
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

const BlogDetails = () => {
  const { title } = useParams();
  const [blog, setBlog] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState({ success: null, message: "" });
  const footerRef = useRef(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/blog/title/${title}`
        );
        setBlog(res.data.data);
      } catch (err) {
        console.error("Failed to fetch blog:", err.message);
      }
    };

    fetchBlog();
  }, [title]);

  const alterTitle = blog ? kebabToTitle(blog?.title) : "";
  const formattedDate = blog?.createdAt?.split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name" && !/^[a-zA-Z\s]*$/.test(value)) return;
    if (name === "phone" && (!/^\d*$/.test(value) || value.length > 10)) return;

    setFormData((prev) => ({ ...prev, [name]: value }));
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
        alert("Inquiry submitted successfully!");
      }
    } catch (err) {
      setStatus({
        success: false,
        message:
          err.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    }
  };

  const breadcrumbPaths = [
    { name: "Home", link: "/" },
    { name: "Blog", link: "/blogs" },
    {
      name: alterTitle,
      link: `/blogs/${title}`,
    },
  ];

  return (
    <div className="min-h-screen px-4 lg:py-24 py-36 ">
      <Helmet>

        <title>
          {alterTitle}
        </title>
        <meta
          name="description"
          content={blog?.metaDescription}
        />

        <link
          rel="canonical"
          href={`https://www.lavisheventzz.com/blogs/${title}`}
        />
        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={blog?.metaTitle} />
        <meta property="og:description" content={blog?.metaDescription} />
        <meta
          property="og:image"
          content={blog?.bannerImage}
        />
        <meta
          property="og:url"
          content={`https://www.lavisheventzz.com/blogs/${title}`}
        />
        <meta property="og:site_name" content="Lavish Eventzz" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog?.metaTitle} />
        <meta name="twitter:description" content={blog?.metaDescription} />
        <meta
          name="twitter:image"
          content={blog?.bannerImage}
        />
        <meta name="twitter:site" content="@lavishevents25" />

        {/* JSON-LD Schema Markup for Article */}
        <script type="application/ld+json">
          {`
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "${alterTitle}",
  "image": ${blog?.bannerImage},
  "author": {
    "@type": "Person",
    "name": "Balakrishna"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Lavish Eventzz",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.lavisheventzz.com/assets/logo-sUNpuNY_.png"
    }
  },
  "datePublished": ${formattedDate},
  "dateModified": ${formattedDate},
  "description": "${blog?.metaDescription}",
  "mainEntityOfPage": "https://www.lavisheventzz.com/blogs/${title}"
`}
        </script>

        {/* JSON-LD Schema for FAQPage */}
        <script type="application/ld+json">
          {`
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": ${JSON.stringify(
            blog?.faqs.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer,
              },
            }))
          )}
`}
        </script>

        {/* JSON-LD Schema for Breadcrumbs */}
        <script type="application/ld+json">
          {`
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.lavisheventzz.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://www.lavisheventzz.com/blogs"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "${alterTitle}",
      "item": "https://www.lavisheventzz.com/blogs/${title}"
    }
  ]
`}
        </script>
      </Helmet>

      <Breadcrumb paths={breadcrumbPaths} />

      <div className="flex flex-col md:flex-row max-w-7xl mx-auto mt-4 gap-8">
        {/* Blog Content (Page scrolls normally) */}
        <div className="flex-1 pr-4">
          {blog ? (
            <div>
              <h1 className="text-4xl font-bold text-[#FF4286] mb-4">
                {alterTitle}
              </h1>
              <img
                src={blog.bannerImage}
                alt={blog.title}
                className="w-full h-auto object-cover rounded-lg shadow mb-6"
              />
              <div
                className="prose max-w-full text-gray-700"
                dangerouslySetInnerHTML={{ __html: blog.description }}
              ></div>
            </div>
          ) : (
            <p className="text-lg font-medium text-gray-600">Loading blog...</p>
          )}
        </div>

        {/* Sticky Contact Form */}
        <div className="hidden md:block w-[350px] h-fit">
          <div className="fixed top-26 bg-white border border-gray-200 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-[#6a1b9a] mb-4">Contact Us</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name*"
                className="w-full border-b border-black focus:outline-none py-2 placeholder-gray-500"
                required
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone*"
                className="w-full border-b border-black focus:outline-none py-2 placeholder-gray-500"
                required
                value={formData.phone}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email*"
                className="w-full border-b border-black focus:outline-none py-2 placeholder-gray-500"
                required
                value={formData.email}
                onChange={handleChange}
              />
              <input
                type="text"
                name="service"
                placeholder="Services you want"
                className="w-full border-b border-black focus:outline-none py-2 placeholder-gray-500"
                value={formData.service}
                onChange={handleChange}
              />
              <textarea
                name="message"
                placeholder="Message"
                className="w-full border-b border-black focus:outline-none py-2 placeholder-gray-500"
                rows={3}
                value={formData.message}
                onChange={handleChange}
              ></textarea>

              <button
                type="submit"
                className="w-full bg-[#FF4286] hover:bg-[#e91e63] text-white py-2 px-4 rounded"
              >
                Submit
              </button>

              {status.message && (
                <p
                  className={`text-sm ${status.success ? "text-green-600" : "text-red-500"
                    }`}
                >
                  {status.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
      <div ref={footerRef} className="footer" />
    </div>
  );
};

export default BlogDetails;

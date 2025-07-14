import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../utils/api";
import Breadcrumb from "./Breadcrumb";

function kebabToTitle(str) {
  if (!str) return ""; // Ensure that we handle undefined or null values
  return str.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      if (loading) return;
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/blog`);
        setBlogs(res.data.data);
      } catch (err) {
        console.error("Error fetching blogs:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const breadcrumbPaths = [
    { name: "Home", link: "/" },
    {
      name: "Blog",
      link: "/blogs",
    },
  ];

  return (
    <div className="mx-auto px-4 lg:py-24 py-36">
      <Breadcrumb paths={breadcrumbPaths} />
      <div className="max-w-7xl mt-4 mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-[#FF4286] text-center">
          Our Blogs
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => {
            const slug = blog.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-+|-+$/g, "");
            const alterTitle = kebabToTitle(blog?.title);
            return (
              <div
                key={blog._id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer group"
                onClick={() => navigate(`/blogs/${slug}`)}
              >
                <img
                  src={blog.bannerImage}
                  alt={blog.title}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-5">
                  <h3 className="text-2xl font-semibold text-purple-700 group-hover:text-[#FF4286] transition-colors duration-300">
                    {alterTitle}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2">
                    {blog.metaDescription?.slice(0, 100)}...
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <button className="mt-4 inline-block text-[#FF4286] hover:text-purple-700 font-medium transition">
                      Read More →
                    </button>
                    <p>
                      {blog?.createdAt
                        ? new Date(blog.createdAt).toLocaleDateString("en-GB")
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {loading && (
          <div className="text-center mt-4 text-sm text-gray-500">
            Loading...
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;

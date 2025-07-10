import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../utils/api";
import Breadcrumb from "./Breadcrumb";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const LIMIT = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      if (loading) return; // Prevent duplicate fetch
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/blog`, {
          params: { page, limit: LIMIT },
        });

        const newBlogs = res.data.data || [];

        // Deduplicate blogs based on _id
        setBlogs((prev) => {
          const combined = [...prev, ...newBlogs];
          const uniqueMap = new Map();
          combined.forEach((item) => {
            if (item._id) uniqueMap.set(item._id, item);
          });
          return Array.from(uniqueMap.values());
        });

        setHasMore(newBlogs.length === LIMIT);
      } catch (err) {
        console.error("Error fetching blogs:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [page]);

  const breadcrumbPaths = [
    { name: "Home", link: "/" },
    {
      name: "Blog",
      link: "/blogs",
    },
  ];

  return (
    <div className=" mx-auto px-4 lg:py-24 py-36">
      <Breadcrumb paths={breadcrumbPaths} />
      <div className="max-w-7xl mt-4 mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-[#FF4286] text-center">
          Our Blogs
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {blogs.map((blog) => {
            const slug = blog.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-+|-+$/g, "");
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
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-2">
                    {blog.metaDescription?.slice(0, 100)}...
                  </p>
                  <button className="mt-4 inline-block text-[#FF4286] hover:text-purple-700 font-medium transition">
                    Read More →
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {hasMore && (
          <div className="text-center mt-10">
            <button
              disabled={loading}
              className={`px-8 py-3 font-semibold rounded-md transition ${loading
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-[#FF4286] text-white hover:bg-pink-600"
                }`}
              onClick={() => {
                if (!loading) setPage((prev) => prev + 1);
              }}
            >
              {loading ? "Loading..." : "View More"}
            </button>
          </div>
        )}

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

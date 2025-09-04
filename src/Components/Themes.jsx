import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAuthAxios } from "../utils/api";

const ShimmerCard = () => {
  return (
    <div className="animate-pulse bg-white rounded-lg shadow p-2 flex flex-col items-center">
      {/* Circle avatar */}
      <div className="w-40 h-40 bg-gray-200 rounded-full mb-4"></div>

      {/* Title line */}
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>

      {/* Subtitle line */}
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
};

const Themes = () => {
  const [themes, setThemes] = useState([]);
  const [subSubCategory, setSubSubCategory] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { subSubCategoryId } = useParams();
  const navigate = useNavigate();

  const fetchThemes = async () => {
    try {
      const res = await getAuthAxios().get(
        `themes/subsubcategory/${subSubCategoryId}`
      );
      if (res.data.data && res.data.data.length > 0) {
        setThemes(res.data.data);
        console.log("themes", res.data.data);
      }
    } catch (err) {
      setError("Failed to load themes");
    } finally {
      setLoading(false);
    }
  };

  const fetchSubSubCategory = async () => {
    try {
      const res = await getAuthAxios().get(
        `subsubcategories/${subSubCategoryId}`
      );
      if (res.data.data) {
        setSubSubCategory(res.data.data);
      } else {
        setError("Failed to load category details");
      }
    } catch (err) {
      setError("Failed to load category details");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchThemes(), fetchSubSubCategory()]);
    };
    loadData();
  }, [subSubCategoryId]);

  const handleThemeClick = (item) => {
    console.log("item:", item);
    navigate(
      // `/service/${item.subSubCategory.subCategory.subCategory.replace(
      //   /\s+/g,
      //   "-"
      // )}/${item._id}`
      `/service/${item.subSubCategory.subCategory.subCategory
                .split(" ")
                .map((word) => word.charAt(0).toLowerCase() + word.slice(1))
                .join("-")}/${item._id}`
    );
  };

  const getCategoryName = () => {
    if (
      themes.length > 0 &&
      themes[0].subSubCategory &&
      themes[0].subSubCategory.subSubCategory
    ) {
      return themes[0].subSubCategory.subSubCategory;
    }
    if (subSubCategory && subSubCategory.subSubCategory) {
      return subSubCategory.subSubCategory;
    }
    return "Category";
  };

  if (loading) {
    return (
      <div className="mt-32 px-20 ">
        <div className="h-6 bg-gray-200 rounded w-[300px] mb-10  animate-pulse"></div>
        <div className="grid grid-cols-4 gap-3 ">
          {Array.from({ length: 6 }).map((_, i) => (
            <ShimmerCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 md:pt-20 lg:py-24 px-4 sm:px-6 md:px-10 lg:px-20">
      <h1 className="text-2xl sm:text-3xl text-primary font-bold my-5 text-center md:text-left">
        {getCategoryName()} Themes
      </h1>

      {error && themes.length === 0 && (
        <div className="text-red-500 text-center mb-4">{error}</div>
      )}

      {themes.length === 0 && !error && (
        <div className="text-center text-gray-600 mb-4">
          No themes available for this category.
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-16 mt-10">
        {themes.map((theme) => (
          <div
            key={theme._id}
            onClick={() => handleThemeClick(theme)}
            className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={theme.image}
              alt={theme.theme}
              className="w-full h-48 sm:h-52 md:h-60 lg:h-64 object-cover rounded-2xl"
            />
            <p className="text-black pt-3 text-center text-lg sm:text-xl md:text-2xl font-bold">
              {theme.theme}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Themes;

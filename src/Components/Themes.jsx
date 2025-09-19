import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getAuthAxios } from "../utils/api";
import Breadcrumb from "./Breadcrumb";
import ExpandableContent from "./ExpandableContent";
import DynamicFaqs from "./DynamicFaqs";

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
  const [subSubCategoryData, setSubSubCategoryData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { subSubCategoryId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { subSubCategory, redirectUrl, modifiedSubcatTitle } =
    location.state || {};

  useEffect(() => {
    const fetchSubSubCategory = async () => {
      try {
        const res = await getAuthAxios().get(
          `subsubcategories/${subSubCategoryId}`
        );
        if (res.data.data) {
          setSubSubCategoryData(res.data.data);
          console.log("subSubCategory from API", res.data.data);
        } else {
          setError("Failed to load category details");
        }
      } catch (err) {
        setError("Failed to load category details");
      }
    };

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

    fetchSubSubCategory();
    fetchThemes();
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
        .join("-")}/${item._id}`,
      {
        state: {
          metaTitle: item.metaTitle,
          metaDescription: item.metaDescription,
          keywords: item.keywords,
          caption: item.caption,
          faqs: item.faqs,
          subSubCategory: item.subSubCategory.subSubCategory, // ✅ use the name, not the object
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          modifiedSubcatTitle: "Kids Birthday Decor",
          theme: item.theme,

          subCatredirectUrl: `/themes/${subSubCategoryId}`,
          redirectUrl: "/kidsBirthdaydecor/681b1136ddb6b3f4663e78f4",
        },
      }
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

  // ✅ Deduplicate breadcrumb names
  const breadcrumbPaths = [
    { name: "Home", link: "/" },
    {
      name: modifiedSubcatTitle,
      link: `/kidsBirthdaydecor/681b1136ddb6b3f4663e78f4`,
    },

    {
      name: subSubCategory,
      link: redirectUrl,
    },
  ];
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
    <div className="pt-32 md:pt-20 lg:py-24">
      <Breadcrumb paths={breadcrumbPaths} />
      <div className="  px-4 sm:px-6 md:px-10 lg:px-20">
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

        {caption && (
          <div className="mt-5 p-5">
            <ExpandableContent htmlContent={caption} />
          </div>
        )}

        {faqs?.length > 0 && (
          <div className="max-w-3xl p-4 mx-auto">
            <p className="text-center font-bold poppins text-2xl">FAQs</p>
            <p className="text-center font-bold poppins text-sm pb-5">
              Need help? Contact us for any queries related to us
            </p>
            <DynamicFaqs faqs={faqs} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Themes;

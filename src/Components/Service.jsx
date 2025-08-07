import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ServiceCard from "./ServiceCard";
import { getAxios } from "../utils/api";
import { Helmet } from "react-helmet-async";

// Only show banner for these exact subcategories
const banners = {
  "Candlelight Decoration":
    "https://lavisheventzz-bangalore.b-cdn.net/banner/candlelight.png",
  "Balloon Bouquet":
    "https://lavisheventzz-bangalore.b-cdn.net/banner/bouquetBanner.png",
  "House Warming Decoration":
    "https://lavisheventzz-bangalore.b-cdn.net/banner/housewarming.png",
  "Surprise Gifts":
    "https://lavisheventzz-bangalore.b-cdn.net/banner/giftbanner.png",
  "Proposal Decoration":
    "https://lavisheventzz-bangalore.b-cdn.net/banner/proposalbanner.png",
  "Mundan Ceremony":
    "https://lavisheventzz-bangalore.b-cdn.net/banner/mundan.jpg",
  "Haldi Decor": "https://lavisheventzz-bangalore.b-cdn.net/banner/haldi.jpg",
  "Mehendi Decor":
    "https://lavisheventzz-bangalore.b-cdn.net/banner/mendhi.jpg",
  "Rice Ceremony Decor":
    "https://lavisheventzz-bangalore.b-cdn.net/banner/riceceremony.jpg",
  "Retirement Decoration":
    "https://lavisheventzz-bangalore.b-cdn.net/banner/retirment.jpg",
};

const Service = () => {
  const { subcatgory, id } = useParams();
  const [services, setServices] = useState([]);
  const [subCatTitle, setSubCatTitle] = useState("Services");
  const [bannerImg, setBannerImg] = useState(null);
  const [sortOption, setSortOption] = useState("latest");
  const [subCategoryMeta, setSubCategoryMeta] = useState(null);

  const [loading, setLoading] = useState(true);

  const modifiedSubcatTitle = subcatgory.replace(/-/g, " ");

  console.log("subcatgory", modifiedSubcatTitle);
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const response = await getAxios().get(`/services/filter/${id}`);
        const data = response.data;

        if (data.success && Array.isArray(data.data)) {
          setServices(data.data);

          console.log("Services", data.data);
          const firstService = data.data[0];
          const subCategoryName = firstService?.subCategoryId?.subCategory;
          // setSubCatTitle(subCategoryName || "Services");

          // Only set banner if subcategory name exists in our predefined list
          if (subCategoryName && banners[subCategoryName]) {
            setBannerImg(banners[subCategoryName]);
          } else {
            setBannerImg(null); // No banner shown
          }
        } else {
          setServices([]);
          // setSubCatTitle("");
          setBannerImg(null);
        }
      } catch (error) {
        console.error("Error fetching services:", error.message);
        setServices([]);
        setBannerImg(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchSubCategoryDetails = async () => {
      try {
        const slug = modifiedSubcatTitle; // e.g. "Marry Me Decor" → "Marry-Me-Decor"
        const res = await getAxios().get(`/subcategories/by-name/${slug}`);
        console.log("SubcatTitle", res.data.data);
        if (res.data.success) {
          setSubCategoryMeta(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch subcategory SEO/meta:", err.message);
      }
    };

    fetchServices();
    fetchSubCategoryDetails();
  }, [id, subcatgory]);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const sortedServices = () => {
    const sorted = [...services];
    if (sortOption === "latest") {
      return sorted.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    if (sortOption === "high to low") {
      return sorted.sort((a, b) => (b.offerPrice || 0) - (a.offerPrice || 0));
    }
    if (sortOption === "low to high") {
      return sorted.sort((a, b) => (a.offerPrice || 0) - (b.offerPrice || 0));
    }
    return sorted;
  };

  return (
    <>
      {subCategoryMeta && (
        <Helmet>
          {/* Basic Meta Tags */}
          <title>{subCategoryMeta.metaTitle || modifiedSubcatTitle}</title>
          <meta
            name="description"
            content={
              subCategoryMeta.metaDescription ||
              `Explore our ${modifiedSubcatTitle} services in Bangalore.`
            }
          />
          <meta
            name="keywords"
            content={
              subCategoryMeta.keywords ||
              `${modifiedSubcatTitle}, decoration, events`
            }
          />

          {/* Canonical URL */}
          {/* <link
            rel="canonical"
            href={`https://www.lavisheventzz.in/service/${subcatgory}/${id}`}
          /> */}
          <link
            rel="canonical"
            href={window.location.href}
          />

          {/* Structured Schema with FAQ & Metadata */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: subCategoryMeta.metaTitle || modifiedSubcatTitle,
              description:
                subCategoryMeta.metaDescription ||
                `Services related to ${modifiedSubcatTitle}`,
              keywords: subCategoryMeta.keywords || "",
              dateCreated: new Date(subCategoryMeta.createdAt).toISOString(),
              provider: {
                "@type": "Organization",
                name: "Lavish Eventzz",
                url: "https://www.lavisheventzz.in",
              },
              mainEntity: {
                "@type": "FAQPage",
                mainEntity:
                  subCategoryMeta.faqs?.map((faq) => ({
                    "@type": "Question",
                    name: faq.question,
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: faq.answer,
                    },
                  })) || [],
              },
            })}
          </script>
        </Helmet>
      )}

      <div className="relative md:pt-28 pt-36 md:px-10 px-2">
        {bannerImg && (
          <img
            src={bannerImg}
            alt={`${modifiedSubcatTitle} Banner`}
            className="w-full object-cover rounded-lg mb-5"
          />
        )}

        <div className="flex justify-between items-center mb-5 md:px-10">
          <div>
            {/* <h1 className="text-2xl font-bold">{subCatTitle} </h1> */}
            <h1 className="text-2xl font-bold">{modifiedSubcatTitle} </h1>
          </div>

          {services.length > 0 && (
            <select
              name="filter"
              className="border-b p-2 rounded-2xl w-[200px] outline-none"
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value="latest">Latest</option>
              <option value="high to low">High to Low</option>
              <option value="low to high">Low to High</option>
            </select>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 md:gap-6 gap-4 mt-6">
          {loading ? (
            <div className="col-span-3 text-center text-gray-500">
              Loading services...
            </div>
          ) : services.length === 0 ? (
            <div className="col-span-3 text-center text-gray-500">
              No services found for this category.
            </div>
          ) : (
            sortedServices().map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Service;

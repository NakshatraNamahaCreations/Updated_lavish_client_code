import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import sash from "../assets/services/sash.png";
import cakes from "../assets/services/cakes.png";
import chairs from "../assets/services/chairs.png";
import envites from "../assets/services/envites.png";
import photography from "../assets/services/photography.png";
import welcomeboard from "../assets/services/welcomeboard.png";
import flwrbouqt from "../assets/services/flwrbouqt.png";
import activity from "../assets/services/activity.png";
import Breadcrumb from "./Breadcrumb"; 
import FAQ from "./FAQ";
import Testimonials from "./Testimonials";
import CardCarousel from "./CardCarousel";

import { getAxios } from "../utils/api";
import { navigateToSubcategory } from "../utils/navigationsUtils";
import { Helmet } from "react-helmet-async";

const addOns = [
  { src: sash, title: "Sash" },
  { src: welcomeboard, title: "Welcome Board" },
  { src: flwrbouqt, title: "Flower Bouquet" },
  { src: photography, title: "Photography" },
  { src: cakes, title: "Cakes" },
  { src: activity, title: "Activity" },
  { src: chairs, title: "Chairs" },
  { src: envites, title: "Envites" },
];

const NamingCeremony = () => {
  const [premiumData, setPremiumData] = useState([]);
  const [simpleData, setSimpleData] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [serviceDetails, setServiceDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { subcat_id } = useParams();
  const navigate = useNavigate();

  const storedUser = localStorage.getItem("user");
  const userData = JSON.parse(storedUser);
  const customerId = userData?.id;

  const fetchSubSubcategories = async () => {
    if (!subcat_id) return;
    try {
      const res = await getAxios().get(
        `subsubcategories/subcategory/${subcat_id}`
      );
      setSubSubCategories(res.data.data);
    } catch (err) {
      console.error("Error fetching sub-subcategories", err);
      setError("Failed to load subcategories");
    }
  };

  const fetchServices = async () => {
    try {
      const res = await getAxios().get(`/services/filter/${subcat_id}`);
      const data = res.data;

      if (!data.success) throw new Error("Failed to fetch services");

      const simple = data.data.filter(
        (d) =>
          d.subSubCategoryId?.subSubCategory?.toLowerCase() ===
          "simple decoration"
      );
      const premium = data.data.filter(
        (d) =>
          d.subSubCategoryId?.subSubCategory?.toLowerCase() ===
          "premium decoration"
      );

      setSimpleData(simple);
      setPremiumData(premium);
    } catch (err) {
      console.error("Error fetching services", err);
      setSimpleData([]);
      setPremiumData([]);
    }
  };

  const fetchRecentPurchase = async () => {
    try {
      const res = await getAxios().get(`/orders/recent-orders/${customerId}`);
      const purchases = res.data.services || [];
      setServiceDetails(purchases.map((item) => item.serviceDetails));
    } catch (err) {
      console.error("Error fetching recent purchases", err);
    }
  };

  const handleNavigation = (text, baseRoute) => {
    navigateToSubcategory({
      text,
      baseRoute,
      navigate,
      setLoading,
      setError,
    });
  };

  useEffect(() => {
    fetchSubSubcategories();
    fetchServices();
  }, [subcat_id]);

  useEffect(() => {
    if (customerId) fetchRecentPurchase();
  }, [customerId]);

  const message = "Hello, I want to know more about Naming Ceremony Cakes.";
  const encodedMessage = encodeURIComponent(message);
  const WhatsAppLink = `https://wa.me/919620558000?text=${encodedMessage}`;
  const breadcrumbPaths = [
    { name: "Home", link: "/" },
    { name: "Naming Ceremony Decoration", link: "/namingceremonydecor/681b124bddb6b3f4663e7951" },
  ];

  return (
    <div className="lg:py-24 md:pt-20 pt-32 p-3 mx-auto">


      <Helmet>
        {/* Meta Tags */}
        <title>Naming Ceremony Decoration in Bangalore | Baby Name Setup</title>
        <meta
          name="description"
          content="Make your child’s special day memorable with naming ceremony decoration in Bangalore. Lavish Eventzz offers themes, balloon decor, and custom name backdrops."
        />
        <link
          rel="canonical"
          href="https://www.lavisheventzz.com/namingceremonydecor/681b124bddb6b3f4663e7951"
        />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Naming Ceremony Decoration in Bangalore | Baby Name Setup" />
        <meta property="og:description" content="Make your child’s special day memorable with naming ceremony decoration in Bangalore. Lavish Eventzz offers themes, balloon decor, and custom name backdrops." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.lavisheventzz.com/namingceremonydecor/681b124bddb6b3f4663e7951" />
        <meta property="og:image" content="https://lavisheventzz-bangalore.b-cdn.net/banner/namingcermonyBanner.png" />
        <meta property="og:site_name" content="Lavish Eventzz" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Naming Ceremony Decoration in Bangalore | Baby Name Setup" />
        <meta name="twitter:description" content="Make your child’s special day memorable with naming ceremony decoration in Bangalore. Lavish Eventzz offers themes, balloon decor, and custom name backdrops." />
        <meta name="twitter:url" content="https://www.lavisheventzz.com/namingceremonydecor/681b124bddb6b3f4663e7951" />
        <meta name="twitter:image" content="https://lavisheventzz-bangalore.b-cdn.net/banner/namingcermonyBanner.png" />
        <meta name="twitter:site" content="@LavishEvents25" />

        {/* Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Lavish Eventzz",
            "url": "https://www.lavisheventzz.com",
            "logo": "https://www.lavisheventzz.com/assets/logo-sUNpuNY_.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-9620558000",
              "contactType": "Customer Service",
              "areaServed": "IN",
              "availableLanguage": "English"
            },
            "sameAs": [
              "https://www.facebook.com/people/Lavish-Eventzz/61577120475321/",
              "https://x.com/LavishEvents25",
              "https://www.youtube.com/@LavishEventzz-2025",
              "https://www.linkedin.com/in/lavish-eventzz-917b43366/",
              "https://www.instagram.com/lavisheventzz.com_/",
              "https://www.instagram.com/lavisheventzz"
            ]
          })}
        </script>

        {/* Breadcrumbs Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.lavisheventzz.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Naming Ceremony",
                "item": "https://www.lavisheventzz.com/namingceremonydecor/681b124bddb6b3f4663e7951"
              }
            ]
          })}
        </script>

        {/* Product Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Naming Ceremony",
            "url": "https://www.lavisheventzz.com/namingceremonydecor/681b124bddb6b3f4663e7951",
            "description": "Make your child’s special day memorable with naming ceremony decoration in Bangalore. Lavish Eventzz offers themes, balloon decor, and custom name backdrops."
          })}
        </script>
      </Helmet>
      <Breadcrumb paths={breadcrumbPaths} />

      <img
        src="https://lavisheventzz-bangalore.b-cdn.net/banner/namingcermonyBanner.png"
        className="mx-auto w-[1600px]"
        alt="Naming Ceremony Banner"
      />

      <div className="grid grid-cols-2 gap-x-8 md:gap-y-14 gap-y-5 md:place-items-center lg:mt-20 mt-10">
        {subSubCategories.map((item) => (
          <div className="relative" key={item._id}>
            <Link to={`/service/${item._id}`}>
              <img
                src={`${item.image}`}
                alt={item.subSubCategory}
                className="rounded-3xl w-[500px]"
              />
            </Link>
            <p className="text-primary pt-4 md:text-3xl text-xl text-center font-medium carter">
              {item.subSubCategory}
            </p>
          </div>
        ))}
      </div>

      <Link to={WhatsAppLink} target="_blank" rel="noopener noreferrer">
        <div className="md:my-10 my-5 text-center">
          <img
            src="https://lavisheventzz-bangalore.b-cdn.net/NamingCeremony/namingceremonycake.png"
            className="rounded-3xl md:w-[500px] h-auto w-44 mx-auto"
            alt="Naming Ceremony Cake"
          />
          <p className="text-primary md:pt-4 md:text-3xl text-center font-medium carter">
            Naming ceremony cake
          </p>
        </div>
      </Link>

      <div className="px-10">
        {/* Simple Decoration */}
        <div className="mt-5">
          <div className="flex justify-between items-center">
            <p className="lg:text-2xl text-primary font-bold playfair-display">
              Simple Decoration Service
            </p>
            {(() => {
              const simpleSub = subSubCategories.find((item) =>
                item.subSubCategory.toLowerCase().includes("simple")
              );
              return simpleSub ? (
                <Link
                  to={`/service/${simpleSub._id}`}
                  className="text-purple-600 underline text-sm font-semibold hover:text-blue-800"
                >
                  View All
                </Link>
              ) : null;
            })()}
          </div>
          {simpleData.length ? (
            <CardCarousel centercardData={simpleData} />
          ) : (
            <p className="text-gray-500 text-center mt-4">
              Simple Decoration Service Not Found
            </p>
          )}
        </div>

        {/* Premium Decoration */}
        <div className="mt-10">
          <div className="flex justify-between">
            <p className="lg:text-2xl text-primary font-bold playfair-display">
              Premium Decoration Service
            </p>

            {(() => {
              const primumSub = subSubCategories.find((item) =>
                item.subSubCategory.toLowerCase().includes("premium")
              );
              return primumSub ? (
                <Link
                  to={`/service/${primumSub._id}`}
                  className="text-purple-600 underline text-sm font-semibold hover:text-blue-800"
                >
                  View All
                </Link>
              ) : null;
            })()}
          </div>
          {premiumData.length ? (
            <CardCarousel centercardData={premiumData} />
          ) : (
            <p className="text-gray-500 text-center mt-4">
              Premium Decoration Service Not Found
            </p>
          )}
        </div>
      </div>

      {/* Add-ons */}
      <div className="relative text-center md:my-10 my-4">
        <img
          src="https://lavisheventzz-bangalore.b-cdn.net/banner/addonsbanner.png"
          className="w-[2000px] mx-auto max-h-[650px]"
          alt="Addons Banner"
        />
        <h1 className="absolute top-4 md:text-4xl text-sm font-bold text-[#1C256C] playfair-display lg:w-[50%]">
          Make It Unforgettable with Our Exclusive Add-Ons!
        </h1>
        <div className="absolute top-14 md:top-36 grid grid-cols-4 lg:gap-10 gap-2 place-items-center">
          {addOns.map((item, idx) => (
            <img
              key={idx}
              src={item.src}
              alt={item.title}
              className="cursor-pointer object-cover lg:px-10 md:px-4 px-1"
            />
          ))}
        </div>
      </div>

      {/* Gallery */}
      <div className="relative mx-auto text-center md:mt-10">
        <p className="py-8 font-bold poppins md:text-2xl">
          #NamingCeremonyDecorationBestMovements
        </p>
        <div className="flex justify-center items-center gap-1">
          <div className="lg:space-y-2 space-y-1">
            <img
              src="https://lavisheventzz-bangalore.b-cdn.net/NamingCeremony/namingcer1.png"
              className="lg:h-40 md:h-28 h-10"
            />
            <img
              src="https://lavisheventzz-bangalore.b-cdn.net/NamingCeremony/namingcer2.png"
              className="lg:h-64"
            />
            {/* <div className="relative bg-gray-600 overflow-hidden rounded md:h-20 md:w-36 lg:w-auto lg:h-auto h-8 w-16">
              <img
                src="https://lavisheventzz-bangalore.b-cdn.net/KidsBirthday/bdayGallery3.png"
                className="rounded"
              />
              <video
                className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
                src="https://lavisheventzz-bangalore.b-cdn.net/groomtobe/video.mp4"
                autoPlay
                loop
                muted
              />
            </div> */}
            <img
              src="https://lavisheventzz-bangalore.b-cdn.net/image.jpg"
              className=" lg:h-40 md:h-28 h-10 rounded-xl"
            />
          </div>
          <img src="https://lavisheventzz-bangalore.b-cdn.net/NamingCeremony/namingcer4.png" />
          <div className="lg:space-y-2 space-y-1">
            <img src="https://lavisheventzz-bangalore.b-cdn.net/NamingCeremony/namingcer5.png" />
            <img src="https://lavisheventzz-bangalore.b-cdn.net/NamingCeremony/namingcer6.png" />
          </div>
          <img src="https://lavisheventzz-bangalore.b-cdn.net/NamingCeremony/namingcer7.png" />
        </div>
        <p className="lg:absolute bottom-10 right-2 [text-shadow:_-4px_4px_3px_#7D7C7C] playfair-display md:text-7xl text-4xl font-bold text-[#FFD1D1]">
          Wonderful Moments
        </p>
      </div>

      {/* Redirect to photography */}
      <div
        className="md:pt-20 py-5"
        onClick={() => handleNavigation("photography", "/photography")}
      >
        <img
          src="https://lavisheventzz-bangalore.b-cdn.net/banner/photoshootnaming.png"
          className="mx-auto w-[2000px]"
          alt="Photography Banner"
        />
      </div>

      {/* Recently Purchased */}
      {customerId && (
        <div className="md:pt-10 pt-7">
          <p className="font-bold poppins md:text-2xl">Recently Purchased</p>
          <CardCarousel centercardData={serviceDetails} />
        </div>
      )}

      {/* Why Celebrate */}
      <div>
        <p className="font-bold poppins md:py-6 pb-4 md:text-2xl">
          Why Celebrate With Lavisheventzz
        </p>
        <img
          src="https://lavisheventzz-bangalore.b-cdn.net/banner/trustedBanner.png"
          className="mx-auto w-[1600px]"
          alt="Why Celebrate"
        />
      </div>

      {/* FAQs & Cancellation Policy */}
      <div className="my-4">
        <p className="text-center font-bold poppins text-2xl">FAQs</p>

        <div className="lg:w-[70%] md:w-[80%] mx-auto my-6">
          <p className="font-bold poppins py-8">
            Pick a query related to your issue
          </p>
          <FAQ />
        </div>
      </div>

      {/* Testimonials */}
      <div>
        <p className="font-bold poppins md:text-2xl">Recent Customer Reviews</p>
        <Testimonials />
      </div>

      {/* Final CTA */}
      <div className="md:px-10 px-4">
        <p className="font-bold poppins py-8 text-2xl">
          Hire the Best Balloon Decorators for Your Child’s Naming Ceremony
          Celebration.
        </p>
        <p className="font-bold">
          Make your little one's naming ceremony extra special with elegant and
          heartwarming balloon décor! Our expert decorators create stunning
          balloon arches, charming centerpieces, and personalized arrangements
          to match your chosen theme and venue. Whether it’s an intimate home
          gathering or a grand celebration, we ensure every detail adds a touch
          of joy and elegance to this precious occasion.
        </p>
      </div>
    </div>
  );
};

export default NamingCeremony;

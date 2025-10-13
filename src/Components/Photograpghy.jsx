import React, { useEffect, useLayoutEffect, useState } from "react";
import FAQ from "./FAQ";
import Testimonials from "./Testimonials";
import { Link } from "react-router-dom";
import { getAxios } from "../utils/api";
import CardCarousel from "./CardCarousel";
import { Helmet } from "react-helmet-async";
import Breadcrumb from "./Breadcrumb";
import ExpandableContent from "./ExpandableContent";

const imagelist = [
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/Photography/maternityshoot.png",
    title: "Maternity  Shoot",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/Photography/babyshowershoot.png",
    title: "Baby shower Shoot",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/Photography/kidsbdayshoot.png",
    title: "Kid's Birtdhay Shoot",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/Photography/adultbdayshoot.png",
    title: "Adult's Birthday Shoot",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/Photography/engagementshoot.png",
    title: "Engagement Shoot",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/Photography/housewarmingshoot.png",
    title: "Housewarming Shoot",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/Photography/namingceremonyshoot.png",
    title: "Naming ceremony Shoot",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/Photography/upanayanamshoot.png",
    title: "Upanayanam Shoot",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/Photography/coupleshoot.png",
    title: "Couple Shoot",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/Photography/baptismshoot.png",
    title: "Baptism Shoot",
  },
  {
    src: "https://lavisheventzz-bangalore.b-cdn.net/Photography/bornbabyshoot.png",
    title: "Bornbaby Shoot",
  },
];

const Photograpghy = () => {
  const [recentPurchase, setRecentPurchase] = useState([]);
  const [serviceDetails, setServiceDetails] = useState([]);
  const [subCategory, setSubCategory] = useState(null);
  const storedUser = localStorage.getItem("user");
  const userData = JSON.parse(storedUser);
  const customerId = userData?.id;

  useEffect(() => {
    const fetchSubCategory = async () => {
      try {
        const res = await getAxios().get(
          `/subcategories/by-name/${encodeURIComponent(
            "Photography Decoration"
          )}`
        );
        setSubCategory(res.data.data); // ✅ note .data.data
      } catch (err) {
        console.error("API error:", err);
      }
    };

    fetchSubCategory();
  }, []);

  console.log("Photography Decoration", subCategory);
  const fetchRecentPurchase = async () => {
    try {
      const response = await getAxios().get(
        `/orders/recent-orders/${customerId}`
      );
      const data = await response.data;
      setRecentPurchase(data.services);
    } catch (error) {
      console.error("Error fetching recent purchase:", error);
    }
  };

  const handleWhatsappRedirect = (value) => {
    const message = `Hello, I want to know more about ${value}.`;
    const encodedMessage = encodeURIComponent(message);
    const WhatsAppLink = `https://wa.me/919620558000?text=${encodedMessage}`;
    window.open(WhatsAppLink, "_blank");
    console.log(WhatsAppLink);
  };

  useEffect(() => {
    const serviceDetails = recentPurchase?.map((item) => item.serviceDetails);
    setServiceDetails(serviceDetails);
  }, [recentPurchase]);

  useEffect(() => {
    fetchRecentPurchase();
  }, [customerId]);

  const breadcrumbPaths = [
    { name: "Home", link: "/" },
    {
      name: "Photography Decoration",
      link: "/photography/681b1255ddb6b3f4663e7956",
    },
  ];

  return (
    <>
      <Helmet>
        {/* Meta Title & Description */}
        <title>Photography Decoration in Bangalore | Creative Backdrops</title>
        <meta
          name="description"
          content="Get picture-perfect setups with photography decoration in Bangalore by Lavish Eventzz. Custom photo zones, floral walls, props, and stylish shoot backdrops."
        />
        <link
          rel="canonical"
          href="https://www.lavisheventzz.com/photography/681b1255ddb6b3f4663e7956"
        />
        <meta
          name="keywords"
          content="Photoshoot Backdrop Decor, Event Photography Setup, Floral Photo Zone Bangalore, Creative Shoot Props Decoration, Themed Photography Corners"
        />

        {/* OG Tags */}
        <meta
          property="og:title"
          content="Photography Decoration in Bangalore | Creative Backdrops"
        />
        <meta
          property="og:description"
          content="Get picture-perfect setups with photography decoration in Bangalore by Lavish Eventzz. Custom photo zones, floral walls, props, and stylish shoot backdrops."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.lavisheventzz.com/photography/681b1255ddb6b3f4663e7956"
        />
        <meta
          property="og:image"
          content="https://lavisheventzz-bangalore.b-cdn.net/banner/photograpghyBanner.png"
        />
        <meta property="og:site_name" content="Lavish Eventzz" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Photography Decoration in Bangalore | Creative Backdrops"
        />
        <meta
          name="twitter:description"
          content="Get picture-perfect setups with photography decoration in Bangalore by Lavish Eventzz. Custom photo zones, floral walls, props, and stylish shoot backdrops."
        />
        <meta
          name="twitter:url"
          content="https://www.lavisheventzz.com/photography/681b1255ddb6b3f4663e7956"
        />
        <meta
          name="twitter:image"
          content="https://lavisheventzz-bangalore.b-cdn.net/banner/photograpghyBanner.png"
        />
        <meta name="twitter:site" content="@LavishEvents25" />

        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.lavisheventzz.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Photography Decoration",
                item: "https://www.lavisheventzz.com/photography/681b1255ddb6b3f4663e7956",
              },
            ],
          })}
        </script>

       

        {/* Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Lavish Eventzz",
            url: "https://www.lavisheventzz.com",
            logo: "https://www.lavisheventzz.com/assets/logo-sUNpuNY_.png",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+91-9620558000",
              contactType: "Customer Service",
              areaServed: "IN",
              availableLanguage: "English",
            },
            sameAs: [
              "https://www.facebook.com/people/Lavish-Eventzz/61577120475321/",
              "https://x.com/LavishEvents25",
              "https://www.youtube.com/@LavishEventzz-2025",
              "https://www.linkedin.com/in/lavish-eventzz-917b43366/",
              "https://www.instagram.com/lavisheventzz.com_/",
              "https://www.instagram.com/lavisheventzz",
            ],
          })}
        </script>
      </Helmet>

      <div className="lg:py-24 md:pt-20 pt-32  p-3  mx-auto">
        <Breadcrumb paths={breadcrumbPaths} />
        <div>
          <img
            src="https://lavisheventzz-bangalore.b-cdn.net/banner/photograpghyBanner.png"
            className="mx-auto w-[1600px]"
          />
        </div>

        <h1 className="mt-10 font-bold text-center text-primary playfair-display lg:text-5xl text-2xl">
          Photography Service in Bangalore
        </h1>
        {/* <PhotograpghySlider imagelist={imagelist} /> */}

        <div className="grid grid-cols-2 gap-x-2 md:gap-y-14 gap-y-5 md:place-items-center lg:mt-20 mt-10">
          {imagelist.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center ${
                imagelist.length % 2 !== 0 && index === imagelist.length - 1
                  ? "col-span-2"
                  : ""
              }`}
              onClick={() => handleWhatsappRedirect(item.title)}
            >
              <img
                loading="lazy"
                decoding="async"
                src={item.src}
                alt={item.title}
                className="rounded-3xl md:w-[500px] md:h-auto w-48 h-40"
              />
              <h4 className="text-purple-800  md:text-3xl  text-center font-medium carter">
                {item.title}
              </h4>
            </div>
          ))}
        </div>

        {/* gallery */}
        <div className="relative mx-auto text-center lg:mt-10">
          <h2 className="md:py-8 py-4 font-bold poppins md:text-2xl">
            #PhotograpghyBestMovements
          </h2>
          <div className="flex justify-center items-center gap-1">
            <div className="place-items-end lg:space-y-2  space-y-1">
              <img
                loading="lazy"
                decoding="async"
                src="https://lavisheventzz-bangalore.b-cdn.net/Photography/photography1.png"
                className=" lg:h-40 md:h-28 h-10"
              />
              <img
                loading="lazy"
                decoding="async"
                src="https://lavisheventzz-bangalore.b-cdn.net/Photography/photography2.png"
                className=" lg:h-64  "
              />

              <img
                loading="lazy"
                decoding="async"
                src="https://lavisheventzz-bangalore.b-cdn.net/image.jpg"
                className=" lg:h-40 md:h-28 h-10 rounded-xl"
              />
            </div>
            <div>
              <img
                loading="lazy"
                decoding="async"
                src="https://lavisheventzz-bangalore.b-cdn.net/Photography/photography4.png"
              />
            </div>
            <div className="lg:space-y-2 space-y-1">
              <img
                loading="lazy"
                decoding="async"
                src="https://lavisheventzz-bangalore.b-cdn.net/Photography/photography5.png"
              />
              <img
                loading="lazy"
                decoding="async"
                src="https://lavisheventzz-bangalore.b-cdn.net/Photography/photography6.png"
              />
            </div>
            <div>
              <img
                loading="lazy"
                decoding="async"
                src="https://lavisheventzz-bangalore.b-cdn.net/Photography/photography7.png"
              />
            </div>
          </div>
          <p className="lg:absolute bottom-10 right-2 [text-shadow:_-4px_4px_3px_#7D7C7C] playfair-display md:text-7xl text-4xl font-bold text-[#FFD1D1]">
            Wonderful Moments
          </p>
        </div>
        <Link to="/photograpghy">
          <div className="md:pt-20 py-5">
            <img
              loading="lazy"
              decoding="async"
              src="https://lavisheventzz-bangalore.b-cdn.net/banner/photoshootPhotograpghy.png"
              className="mx-auto w-[2000px]"
            />
          </div>
        </Link>
        <div className="">
          <h6 className="font-bold poppins md:py-6 pb-4 md:text-2xl">
            Why Celebrate With Lavisheventzz
          </h6>
          <img
            loading="lazy"
            decoding="async"
            src="https://lavisheventzz-bangalore.b-cdn.net/banner/trustedBanner.png"
            className="mx-auto w-[1600px]"
          />
        </div>
        {customerId && (
          <div className="md:pt-10 pt-7">
            <h6 className="font-bold poppins md:text-2xl">Recently Purchased</h6>
            <CardCarousel centercardData={serviceDetails} />
          </div>
        )}
        <div className="my-4">
          <p className="text-center font-bold poppins text-2xl">FAQs</p>
          <p className="text-center font-bold poppins text-sm">
            Need help? Contact us for any queries related to us
          </p>
          <div className="lg:w-[70%]  md:w-[80%] mx-auto my-6">
            <p className="font-bold poppins py-8 ">
              Pick a query related to your issue
            </p>
            <FAQ />
            {/* <FAQServices/> */}
          </div>
        </div>
        <div>
          <h2 className="font-bold poppins md:text-2xl">
            Recent Customer Reviews
          </h2>
          <Testimonials />
          {/* <ReviewSlider /> */}
        </div>
        <div className="md:px-10 px-4">
          <p className="font-bold poppins py-8 text-2xl">
            Hire the Best Balloon Decorators for Your best PhotoShoot
          </p>
          <p className="font-bold">
            Make your photography Shoot truly magical with breathtaking balloon
            décor! Whether it’s a pre-wedding Shoot, maternity session,
            birthday, or any special occasion, our expert decorators create
            mesmerizing balloon setups that add charm and elegance to every
            frame. From dreamy balloon arches and elegant backdrops to creative
            themed arrangements, we customize every detail to enhance your
            photoShoot’s aesthetic. Let us set the perfect scene while you focus
            on capturing unforgettable memories. Book your balloon décor for
            photography Shoots today and elevate your pictures with a touch of
            magic!
          </p>
        </div>

        {subCategory?.caption && (
          <div className="mt-5 p-5 md:px-10 px-4">
            <ExpandableContent htmlContent={subCategory.caption} />
          </div>
        )}

        {subCategory?.faqs?.length > 0 && (
          <div className="max-w-3xl p-4 mx-auto">
            <h4 className="text-center font-bold poppins text-2xl">FAQs</h4>
            <p className="text-center font-bold poppins text-sm pb-5">
              Need help? Contact us for any queries related to us
            </p>
            <DynamicFaqs faqs={subCategory?.faqs} />
          </div>
        )}
      </div>
    </>
  );
};

export default Photograpghy;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-datepicker/dist/react-datepicker.css";

import Layout from "./Components/Layout";
import HomePage from "./Components/HomePage";
import ScrollToTop from "./Components/ScrollToTop";
import PaymentFailure from "./Components/PaymentFailure";


// Lazy load all other route components
const About = lazy(() => import("./Components/About"));
const Service = lazy(() => import("./Components/Service"));
const Wishlist = lazy(() => import("./Components/Wishlist"));
const ContactUs = lazy(() => import("./Components/ContactUs"));
const ServiceDetails = lazy(() => import("./Components/ServiceDetails"));
const Checkout = lazy(() => import("./Components/Checkout"));
const Kidsbirthday = lazy(() => import("./Components/Kidsbirthday"));
const AdultBirthday = lazy(() => import("./Components/AdultBirthday"));
const Anniversary = lazy(() => import("./Components/Anniversary"));
const WelcomeBaby = lazy(() => import("./Components/WelcomeBaby"));
const BabyShower = lazy(() => import("./Components/BabyShower"));
const NamingCeremony = lazy(() => import("./Components/NamingCeremony"));
const BridetoBe = lazy(() => import("./Components/BridetoBe"));
const RingCermony = lazy(() => import("./Components/RingCeremony"));
const GroomtoBe = lazy(() => import("./Components/GroomtoBe"));
const Entertainment = lazy(() => import("./Components/Entertainment"));
const Photograpghy = lazy(() => import("./Components/Photograpghy"));
const Profile = lazy(() => import("./Components/Profile"));
const Login = lazy(() => import("./Components/Login"));
const Signup = lazy(() => import("./Components/Signup"));
const ProtectedRoute = lazy(() => import("./Components/ProtectedRoute"));
const Themes = lazy(() => import("./Components/Themes"));
const Thankyou = lazy(() => import("./Components/Thankyou"));
const AllServices = lazy(() => import("./Components/AllServices"));
const OrderDetails = lazy(() => import("./Components/OrderDetails"));
const PrivacyPolicy = lazy(() => import("./Components/PrivacyPolicy"));
const TermsConditions = lazy(() => import("./Components/TermsConditions"));
const Invoice = lazy(() => import("./Components/Invoice"));
const ReturnRefund = lazy(() => import("./Components/ReturnRefund"));
const ShippingDelivery = lazy(() => import("./Components/ShippingDelivery"));

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<div className="w-full h-screen flex items-center justify-center"><img src="/images/loader.gif" alt="Loading..." className="w-16 h-16" /></div>}>
        <Routes>
          {/* Wrap all routes inside Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/service/:id" element={<Service />} />
            <Route path="/service/details/:serviceId" element={<ServiceDetails />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/profile" element={<ProtectedRoute> <Profile /></ProtectedRoute>} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/checkout/:serviceId" element={<Checkout />} />
            <Route path="/payment/success" element={<Thankyou />} />
            <Route path="/kidsBirthdaydecor/:subcat_id" element={<Kidsbirthday />} />
            <Route path="/adultBirthdaydecor/:subcat_id" element={<AdultBirthday />} />
            <Route path="/anniversarydecor/:subcat_id" element={<Anniversary />} />
            <Route path="/welcomebabydecor/:subcat_id" element={<WelcomeBaby />} />
            <Route path="/babyshowerdecor/:subcat_id" element={<BabyShower />} />
            <Route path="/namingceremonydecor/:subcat_id" element={<NamingCeremony />} />
            <Route path="/bridetobedecor/:subcat_id" element={<BridetoBe />} />
            <Route path="/groomtobedecor/:subcat_id" element={<GroomtoBe />} />
            <Route path="/ringceremonydecor/:subcat_id" element={<RingCermony />} />
            <Route path="/entertainmentdecor/:subcat_id" element={<Entertainment />} />
            <Route path="/photography/:subcat_id" element={<Photograpghy />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/themes/:subSubCategoryId" element={<Themes />} />
            <Route path="/all-services" element={<AllServices />} />
            <Route path="/orderDetails/:id" element={<OrderDetails />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/return-refund" element={<ReturnRefund />} />
            <Route path="/shipping-delivery" element={<ShippingDelivery />} />
            <Route path="/terms-conditions" element={<TermsConditions />} />
            <Route path="/invoice/:id" element={<Invoice />} />
            <Route path="*" element={<HomePage />} />
            <Route path="/payment/failure" element={<PaymentFailure />} />
      

          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

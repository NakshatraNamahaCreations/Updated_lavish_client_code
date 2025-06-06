import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-datepicker/dist/react-datepicker.css";

import Layout from "./Components/Layout";
import HomePage from "./Components/HomePage";
import About from "./Components/About";
import Service from "./Components/Service";
import Wishlist from "./Components/Wishlist";
import ContactUs from "./Components/ContactUs";
import ServiceDetails from "./Components/ServiceDetails";
import Checkout from "./Components/Checkout";
import Kidsbirthday from "./Components/Kidsbirthday";
import AdultBirthday from "./Components/AdultBirthday";
import Anniversary from "./Components/Anniversary";
import WelcomeBaby from "./Components/WelcomeBaby";
import BabyShower from "./Components/BabyShower";
import NamingCeremony from "./Components/NamingCeremony";
import BridetoBe from "./Components/BridetoBe";
import RingCermony from "./Components/RingCeremony";
import GroomtoBe from "./Components/GroomtoBe";
import Entertainment from "./Components/Entertainment";
import Photograpghy from "./Components/Photograpghy";
import Profile from "./Components/Profile";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import ProtectedRoute from "./Components/ProtectedRoute";
import Themes from './Components/Themes';
import Thankyou from "./Components/Thankyou";
import ScrollToTop from "./Components/ScrollToTop";
import AllServices from "./Components/AllServices";
import OrderDetails from "./Components/OrderDetails";
import PrivacyPolicy from "./Components/PrivacyPolicy";
import TermsConditions from "./Components/TermsConditions";
import Invoice from "./Components/Invoice";
import ReturnRefund from "./Components/ReturnRefund";
import ShippingDelivery from "./Components/ShippingDelivery";


function App() {
  return (
    <Router>
      <ScrollToTop />
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
          <Route path="/thank-you" element={<Thankyou />} />
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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

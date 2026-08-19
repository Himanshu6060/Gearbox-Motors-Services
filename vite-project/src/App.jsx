import { Routes, Route } from "react-router-dom";
import "./index.css";

import Navbar from "./Component/Navbar.jsx";
import Footer from "./Component/Footer.jsx";
import RouteLoader from "./Component/RouteLoader.jsx";
import ScrollToTop from "./Component/ScrollToTop.jsx";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Service from "./pages/Service.jsx";
import Product from "./pages/Product.jsx";
import Contact from "./Pages/Contact.jsx";

import ProductCategory from "./Products/ProductCategory.jsx";
import AboutDetails from "./Component/AboutDetails.jsx";

import { InquiryProvider } from "./Context/InquiryContext.jsx";
import SalesNetwork from "./Component/SalesNetwork.jsx";

function App() {
  return (
    <InquiryProvider>
       {/* Scroll page to top whenever route changes */}
      <ScrollToTop />
      
      {/* Navbar */}
      <Navbar />

      {/* Route Loader */}
      <RouteLoader />

      {/* Page Content */}
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/service" element={<Service />} />
        <Route path="/salesnetwork" element={<SalesNetwork />} />

        <Route path="/product" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/product/:slug"
          element={<ProductCategory />}
        />

        <Route
          path="/about/details"
          element={<AboutDetails />}
        />



      </Routes>

      {/* Footer */}
      <Footer />

    </InquiryProvider>
  );
}

export default App;
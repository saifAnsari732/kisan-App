import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";

// ✅ IMPORTANT (DO NOT LAZY)
import Navbar from "./Compnents/Navbar";
import Footer from "./Compnents/Footer";
import MobileNavbar from "./Compnents/Btmnavbar";
import HeroCarousel from "./Pages/Homepage";

// 🔥 LAZY LOAD ALL PAGES
const About = lazy(() => import("./Pages/About"));
const Shop = lazy(() => import("./Pages/Shop"));
const Contact = lazy(() => import("./Pages/Contact"));
const Career = lazy(() => import("./Pages/Career"));

const CategoryPage = lazy(() => import("./Pages/CategoryPage"));
const ProductDetails = lazy(() => import("./Pages/ProductDetails"));

const Vegitbl = lazy(() => import("./Pages/VagitableOil"));
const Coldpress = lazy(() => import("./Pages/Coldpresed"));

const Reviews = lazy(() => import("./Pages/Reviews"));
const PreviewPage = lazy(() => import("./Pages/PreviewPage"));

const PrivacyPolicy = lazy(() => import("./Pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("./Pages/TermsConditions"));

// 🔥 PRODUCT PAGES
const IndianChoice = lazy(() => import("./Pages/indchoice"));
const Kachighani = lazy(() => import("./Pages/Kachighani"));
const KachighaniMustard = lazy(() => import("./Pages/KachighaniMustard"));

const Rsoyabean = lazy(() => import("./Pages/RefiendOil/Rsoyabean"));
const Rpalmolein = lazy(() => import("./Pages/RefiendOil/Rpalmolein"));
const Rsunflower = lazy(() => import("./Pages/RefiendOil/Rsunflow"));
const Rcoconut = lazy(() => import("./Pages/RefiendOil/Rcoconut"));

const Alsi = lazy(() => import("./Pages/AlsiOil"));
const Pooja = lazy(() => import("./Pages/PoojaOil"));
const Ground = lazy(() => import("./Pages/GroundnutOil"));

// 🔥 OPTIONAL COMPONENTS (LAZY)
const WhatsapForm = lazy(() => import("./Compnents/WhatsappForm"));
const Distribution = lazy(() => import("./Compnents/DistributionForm"));
const Distagreement = lazy(() => import("./Compnents/AgreementViewer"));
const Catalog = lazy(() => import("./Compnents/Catalog"));
const Testmonial = lazy(() => import("./Compnents/Testimonials"));

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        {/* ✅ TOP NAV (ALWAYS LOAD FAST) */}
        <Navbar />

        {/* 🔥 LAZY ROUTES */}
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen text-green-700 text-lg font-semibold">
              Loading...
            </div>
          }
        >
          <Routes>
            {/* HOME */}
            <Route path="/" element={<HeroCarousel />} />

            {/* BASIC PAGES */}
            <Route path="/about" element={<About />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/career" element={<Career />} />

            {/* CATEGORY */}
            <Route path="/category/:id" element={<CategoryPage />} />

            {/* PRODUCT DETAIL */}
            <Route path="/product/:id" element={<ProductDetails />} />

            {/* PRODUCT ROUTES */}
            <Route path="/choice" element={<IndianChoice />} />
            <Route path="/kachighani" element={<Kachighani />} />
            <Route path="/kachighanimustard" element={<KachighaniMustard />} />

            <Route path="/soyabean" element={<Rsoyabean />} />
            <Route path="/palmleion" element={<Rpalmolein />} />
            <Route path="/sunflower" element={<Rsunflower />} />
            <Route path="/coconut" element={<Rcoconut />} />

            <Route path="/vegitable" element={<Vegitbl />} />
            <Route path="/coldpress" element={<Coldpress />} />

            <Route path="/alsi" element={<Alsi />} />
            <Route path="/pooja" element={<Pooja />} />
            <Route path="/ground" element={<Ground />} />

            {/* EXTRA */}
            <Route path="/form" element={<WhatsapForm />} />
            <Route path="/distributionform" element={<Distribution />} />
            <Route path="/distagreement" element={<Distagreement />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/testmonial" element={<Testmonial />} />

            <Route path="/review" element={<Reviews />} />
            <Route path="/jobdata" element={<PreviewPage />} />

            {/* LEGAL */}
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsConditions />} />
          </Routes>

          {/* ✅ TOAST */}
          <ToastContainer position="top-right" autoClose={3000} theme="light" />
        </Suspense>

        {/* ✅ FOOTER */}
        <Footer />
        <MobileNavbar />
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;

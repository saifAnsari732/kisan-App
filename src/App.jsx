import './App.css'
import Navbar from './Compnents/Navbar'
import Footer from './Compnents/Footer'
import MobileNavbar from './Compnents/Btmnavbar'
import WhatsapForm from './Compnents/WhatsappForm'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Reviews from './Pages/Reviews'
import PreviewPage from './Pages/PreviewPage'
import ProductDetails from './Pages/ProductDetails'
import HeroCarousel from './Pages/Homepage'
// 🔥 Lazy Load Pages
// const HeroCarousel = lazy(() => import('./Pages/Homepage'));
const About = lazy(() => import('./Pages/About'));
const Shop = lazy(() => import('./Pages/Shop'));
const Contact = lazy(() => import('./Pages/Contact'));
const Career = lazy(() => import('./Pages/Career'));

const IndianChoice = lazy(() => import('./Pages/indchoice'));
const Kachighani = lazy(() => import('./Pages/Kachighani'));
const KachighaniMustard = lazy(() => import('./Pages/KachighaniMustard'));

const Rsoyabean = lazy(() => import('./Pages/RefiendOil/Rsoyabean'));
const Rpalmolein = lazy(() => import('./Pages/RefiendOil/Rpalmolein'));
const Rsunflower = lazy(() => import('./Pages/RefiendOil/Rsunflow'));
const Rcoconut = lazy(() => import('./Pages/RefiendOil/Rcoconut'));

const Alsi = lazy(() => import('./Pages/AlsiOil'));
const Pooja = lazy(() => import('./Pages/PoojaOil'));
const Ground = lazy(() => import('./Pages/GroundnutOil'));
const Distribution=lazy(()=>import('./Compnents/DistributionForm'))
const Distagreement=lazy(()=>import('./Compnents/AgreementViewer'))
const Catalog=lazy(()=>import('./Compnents/Catalog'))
const Testmonial=lazy(()=>import('./Compnents/Testimonials'))
import CategoryPage from "./pages/CategoryPage";
import Vegitbl from './Pages/VagitableOil'
import Coldpress from './Pages/Coldpresed'
function App() {
  return (
    <BrowserRouter>

      <Navbar />

      {/* 🔥 Suspense Loader */}
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen text-green-700 text-lg font-semibold">
            Loading...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<HeroCarousel />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/career" element={<Career />} />
         <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/form" element={<WhatsapForm />} />

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
          <Route path="/distributionform" element={<Distribution />} />
          <Route path="/distagreement" element={<Distagreement />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/testmonial" element={<Testmonial />} />
          <Route path="/review" element={<Reviews />} />
         
         <Route path="/product/:id" element={<ProductDetails />} />
  
        
        
          <Route path="/jobdata" element={<PreviewPage />} />
        </Routes>
      </Suspense>

      <Footer />
      <MobileNavbar />

    </BrowserRouter>
  )
}

export default App
import './App.css'
import Navbar from './Compnents/Navbar'
import HeroCarousel from './Pages/Homepage'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./Pages/About";
import Shop from "./Pages/Shop";
import Contact from "./Pages/Contact";
import Career from "./Pages/Career";
import MobileNavbar from './Compnents/Btmnavbar';
import WhatsapForm from './Compnents/WhatsappForm';
import Footer from './Compnents/Footer';
import IndianChoice from './Pages/indchoice';
import Kachighani from './Pages/Kachighani';
function App() {
  return (
    <BrowserRouter> 
      <Navbar/>
      <Routes>
        <Route path="/" element={<HeroCarousel />} />
      <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/career" element={<Career />} />
        <Route path="/form" element={<WhatsapForm />} />
        <Route path="/choice" element={<IndianChoice />} />
        <Route path="/kachighani" element={<Kachighani />} />


      </Routes>
      <Footer/>
      <MobileNavbar/>
    </BrowserRouter>
  )
}

export default App
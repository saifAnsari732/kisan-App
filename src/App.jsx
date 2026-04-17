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
import KachighaniMustard from './Pages/KachighaniMustard';
import Rsoyabean from './Pages/RefiendOil/Rsoyabean';
import Rpalmolein from './Pages/RefiendOil/Rpalmolein';
import Rsunflower from './Pages/RefiendOil/Rsunflow';
import Rcoconut from './Pages/RefiendOil/Rcoconut';
import Alsi from './Pages/AlsiOil';
import Pooja from './Pages/PoojaOil';
import Ground from './Pages/GroundnutOil';
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
        <Route path="/kachighanimustard" element={<KachighaniMustard />} />
        <Route path="/soyabean" element={<Rsoyabean/>} />
        <Route path="/palmleion" element={<Rpalmolein />} />
        <Route path="/sunflower" element={<Rsunflower />} />
        <Route path="/coconut" element={<Rcoconut />} />
        <Route path="/alsi" element={<Alsi />} />
        <Route path="/pooja" element={<Pooja />} />
        <Route path="/ground" element={<Ground />} />


      </Routes>
      <Footer/>
      <MobileNavbar/>
    </BrowserRouter>
  )
}

export default App
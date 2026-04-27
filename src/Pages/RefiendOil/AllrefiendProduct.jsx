import React, { useState } from "react";
import CallButton from "../../Compnents/Callbtn";
import WhatsAppButton from "../../Compnents/Whatsappbtn";
import FetureProduct from "../FetureProduct";

const AllrefiendProduct = () => {
   const [selected, setSelected] = useState("All");
  
  const categories = [
    { title: "RICE BRAN", img: "/ricebran.webp" },
    { title: "SOYABEAN OIL", img: "/coconut.webp" },
    { title: "PALMOLIEN OILS", img: "/pamcard.webp" },
    { title: "SUNFLOWER PRESSED", img: "/suncard.webp" },
  ];

  return (
    <>
    <FetureProduct  selectedCategory={selected}/>
    </>
  );
};

export default AllrefiendProduct;
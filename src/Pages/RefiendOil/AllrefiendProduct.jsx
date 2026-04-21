import React, { useState } from "react";
import CallButton from "../../Compnents/Callbtn";
import WhatsAppButton from "../../Compnents/Whatsappbtn";
import FetureProduct from "../FetureProduct";

const AllrefiendProduct = () => {
   const [selected, setSelected] = useState("All");
  
  const categories = [
    { title: "RICE BRAN", img: "/ricebran.png" },
    { title: "SOYABEAN OIL", img: "/coconut.png" },
    { title: "PALMOLIEN OILS", img: "/pamcard.png" },
    { title: "SUNFLOWER PRESSED", img: "/suncard.png" },
  ];

  return (
    <>
    <FetureProduct  selectedCategory={selected}/>
    </>
  );
};

export default AllrefiendProduct;
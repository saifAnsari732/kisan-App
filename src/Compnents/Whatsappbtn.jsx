import { FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function WhatsAppButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/form");
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center justify-center gap-2 px-4 py-2 
      bg-green-700 text-white rounded-lg text-sm font-medium 
      hover:bg-green-600 hover:shadow-md transition duration-300 
      active:scale-95"
    >
      <FaWhatsapp size={18} />
      <span>WhatsApp</span>
    </button>
  );
}

export default WhatsAppButton;
import { PhoneForwarded } from "lucide-react";

function CallButton() {
  const phoneNumber = "9905234866";

  const handleCallClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <button
      onClick={handleCallClick}
      className="flex items-center justify-center gap-2 px-4 py-2 
      border border-gray-300 rounded-lg text-sm font-medium 
      hover:bg-gray-100 hover:shadow-md transition duration-300 
      active:scale-95"
    >
      <PhoneForwarded size={18} className="text-black" />
      <span>Call Now</span>
    </button>
  );
}

export default CallButton;
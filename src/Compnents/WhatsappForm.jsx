import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import logo from "../../public/35.png";

export default function WhatsapForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [location, setLocation] = useState("");

    const phoneNumber = "919905234866";

    const message = `Hello, I'm interested in your products!
NAME: ${name}
EMAIL: ${email}
LOCATION: ${location}`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    const handleSubmit = (e) => {
        e.preventDefault();
        window.open(whatsappUrl, "_blank");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 px-4">

            {/* Card */}
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-3 md:p-8 relative overflow-hidden">

                {/* Decorative Blur */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-green-300 rounded-full blur-3xl opacity-30"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-300 rounded-full blur-3xl opacity-30"></div>

                {/* Logo */}
                <div className="flex flex-col items-center ">
                    <img src={logo} alt="logo" className="h-34  rounded-full bg-red-400" />
                    <h2 className="text-2xl font-bold text-gray-800">
                        Get Details on WhatsApp
                    </h2>
                    <p className="text-sm text-gray-500">
                        Fill details & connect instantly
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3">

                    {/* Name */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Phone No
                        </label>
                        <input
                            type="number"
                            placeholder="Enter your Number"
                            className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Address
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your Address"
                            className="w-full mt-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-[1.02] transition"
                    >
                        <FaWhatsapp size={20} />
                        Send on WhatsApp
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-xs text-gray-400 mt-4">
                    We will connect with you instantly
                </p>
            </div>
        </div>
    );
}
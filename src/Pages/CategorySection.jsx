import { useNavigate } from "react-router-dom";

export default function CategorySection() {
  const navigate = useNavigate();

  const categories = [
    { id: "refined", title: "REFINED OILS", color: "bg-lime-600", img: "/37.png" },
    { id: "mustard", title: "MUSTARD OILS", color: "bg-red-800", img: "/35.png" },
    { id: "vegetable", title: "VEGETABLE OIL", color: "bg-yellow-600", img: "/38.png" },
    { id: "cold", title: "COLD PRESSED", color: "bg-red-500", img: "/39.png" },
  ];

  return (
    <div className="w-full py-4  bg-gray-100">

      {/* ================= MOBILE ================= */}
      <div className="md:hidden px-4 space-y-10">
        {categories.map((item, i) => {
          const isLeft = i % 2 === 0;

          return (
            <div
              key={i}
              onClick={() => navigate(`/category/${item.id}`)}
              className={`flex ${isLeft ? "justify-start" : "justify-end"} py-2 cursor-pointer`}
            >
              <div
                className={`
                  relative w-[88%] h-28 rounded-2xl ${item.color}
                  shadow-lg px-4 flex items-center
                `}
              >
                {/* TITLE */}
                <h2
                  className={`
                    text-white font-bold text-md tracking-widest z-20
                    ${isLeft ? "pr-28" : "pl-30"}
                  `}
                >
                  {item.title}
                </h2>

                {/* IMAGE */}
                <img
                  src={item.img}
                  alt={item.title}
                  className={`
                    absolute z-10
                    ${isLeft ? "-right-14" : "-left-13"}
                    h-48 object-contain
                    drop-shadow-2xl
                  `}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto relative h-[420px]">

          {categories.map((item, i) => {
            const positions = [
              "left-[0%]",
              "left-[26%]",
              "left-[52%]",
              "left-[78%]",
            ];

            return (
              <div
                key={i}
                onClick={() => navigate(`/category/${item.id}`)}
                className={`absolute top-0 ${positions[i]} w-[22%] cursor-pointer`}
              >
                {/* CARD */}
                <div className={`relative h-72 rounded-3xl ${item.color} shadow-xl`}>
                  <h2 className="absolute inset-0 flex items-center justify-start text-white font-[800] py-2 mt-4 tracking-widest rotate-90 text-lg">
                    {item.title}
                  </h2>
                </div>

                {/* IMAGE */}
                <img
                  src={item.img}
                  alt={item.title}
                  className="
                    absolute left-1/2 -translate-x-1/2
                    -bottom-28
                    h-48 object-contain
                    drop-shadow-2xl
                    transition duration-500 hover:scale-110
                  "
                />
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}
import { useNavigate } from "react-router-dom";

export default function CategorySection() {
  const navigate = useNavigate();

  const categories = [
    { id: "refined", title: "REFINED OILS", color: "bg-lime-600", img: "/37.webp" },
    { id: "mustard", title: "MUSTARD OILS", color: "bg-red-800", img: "/35.webp" },
    { id: "vegetable", title: "VEGETABLE OIL", color: "bg-yellow-600", img: "/38.webp" },
    { id: "cold", title: "COLD PRESSED", color: "bg-red-500", img: "/39.webp" },
  ];

  return (
    <section className="w-full py-6 bg-gray-100" aria-label="Product Categories">

      {/* ================= MOBILE ================= */}
      <div className="md:hidden px-4 space-y-8">
        {categories.map((item, i) => {
          const isLeft = i % 2 === 0;

          return (
            <div
              key={item.id}
              onClick={() => navigate(`/category/${item.id}`)}
              className={`flex ${isLeft ? "justify-start" : "justify-end"} cursor-pointer`}
            >
              <div
                className={`
                  relative w-[90%] h-28 rounded-2xl ${item.color}
                  shadow-md flex items-center px-5
                  hover:shadow-xl transition
                `}
              >
                {/* TITLE */}
               <h2
  className={`
    text-white font-bold text-sm tracking-wide z-20
    ${isLeft ? "pr-34 text-left" : "pl-34 text-right"}
  `}
>
  {item.title}
</h2>

                {/* IMAGE */}
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className={`
                    absolute z-10 h-45 object-contain drop-shadow-xl
                    ${isLeft ? "-right-14" : "-left-13"}
                  `}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-6 px-4">

          {categories.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/category/${item.id}`)}
              className="cursor-pointer group"
            >
              {/* CARD */}
              <div className={`relative h-79 rounded-3xl ${item.color} shadow-lg flex items-start  justify-center`}>
                
                {/* TITLE */}
                <h2 className="text-white font-extrabold tracking-widest rotate-90 text-lg opacity-80 mt-25 group-hover:opacity-100 transition">
                  {item.title}
                </h2>
              </div>

              {/* IMAGE */}
              <img
                src={item.img}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="
                  mx-auto -mt-22 h-65 object-contain
                  drop-shadow-2xl
                  transition-transform duration-300
                  group-hover:scale-105
                "
              />
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
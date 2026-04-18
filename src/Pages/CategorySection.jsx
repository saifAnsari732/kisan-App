export default function CategorySection() {
  const categories = [
    { title: "MUSTARD OILS", color: "bg-red-800", img: "/34.png" },
    { title: "REFINED OILS", color: "bg-yellow-600", img: "/36.png" },
    { title: "VEGETABLE OILS", color: "bg-red-400", img: "/35.png" },
    { title: "COLD PRESSED", color: "bg-lime-500", img: "/37.png" },
  ];

  return (
    <div className="w-full py-10  bg-gray-100">

      {/* ✅ MOBILE VIEW */}
 <div className="md:hidden px-4 space-y-8">
  {categories.map((item, i) => {
    const isLeft = i % 2 === 0;

    return (
      <div
        key={i}
        className={`flex ${
          isLeft ? "justify-start" : "justify-end"
        } py-2`}
      >
        {/* Card */}
        <div
          className={`
            relative w-[80%] h-28 rounded-2xl ${item.color}
            shadow-lg px-4 flex items-center overflow-visible
          `}
        >
          {/* Title (always on top) */}
          <h2
            className={`
              text-white font-bold text-sm tracking-widest z-20
              ${isLeft ? "pr-20" : "pl-20"}
            `}
          >
            {item.title}
          </h2>

          {/* Image */}
          <img
            src={item.img}
            alt={item.title}
            className={`
              absolute  z-10
              ${isLeft ? "-right-18" : "-left-18"}
              h-46 object-contain 
              drop-shadow-2xl
            `}
          />
        </div>
      </div>
    );
  })}
</div>
      {/* ✅ DESKTOP VIEW (UNCHANGED) */}
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
                className={`absolute top-0 ${positions[i]} w-[22%]`}
              >
                {/* Card */}
                <div className={`relative h-79 rounded-3xl ${item.color} shadow-xl`}>
                  <h2 className="absolute inset-0 flex items-center justify-center text-white font-[900] tracking-widest rotate-90 text-2xl top-[-40px]">
                    {item.title}
                  </h2>
                </div>

                {/* Image */}
                <img
                  src={item.img}
                  alt={item.title}
                  className="
                    absolute left-1/2 -translate-x-1/2
                    -bottom-35
                    h-54 object-contain
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
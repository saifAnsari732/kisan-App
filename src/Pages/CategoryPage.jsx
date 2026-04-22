import { useParams,Link } from "react-router-dom";
import categories from "../data/categories";

export default function Categorypage() {
  const { id } = useParams();
  const category = categories.find((c) => c.id === id);

 console.log("first",category)

  if (!category) {
    return <h1 className="text-center mt-20">Category Not Found</h1>;
  }

  return (
<div className="bg-gray-100">
  <div className="bg-gradient-to-r from-yellow-100 to-yellow-200">
    <div className="max-w-6xl mx-auto py-10 px-4 text-center">

      <h2 className="text-2xl font-bold mb-12">OUR {category.title} Varaities</h2>

      {/* ✅ FLEX GRID (AUTO CENTER) */}
      <div className="flex flex-wrap justify-center gap-8">

        {category.products.map((item, i) => (
          <Link to={item.path} key={i}>
            <div className="w-[220px] bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition hover:scale-105 cursor-pointer">

              <img
                src={item.img}
                className="h-44 mx-auto object-contain mb-4"
              />

              <h3 className="font-semibold text-gray-700 text-sm">
                {item.name}
              </h3>

            </div>
          </Link>
        ))}

      </div>
    </div>
  </div>
</div>
  );
}

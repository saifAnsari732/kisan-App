import React, { useEffect, useState } from "react";

export default function PreviewPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("applyData")) || [];
    setData(saved);
  }, []);

  if (data.length === 0) {
    return <p className="text-center mt-10">No Data Found</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        All Applications
      </h2>

      <div className="grid md:grid-cols-2 gap-5">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-5 border hover:shadow-xl transition"
          >
            <h3 className="text-lg font-semibold mb-2 text-blue-600">
              {item.name}
            </h3>

            <div className="text-sm space-y-1">
              <p><span className="font-semibold">Email:</span> {item.email}</p>
              <p><span className="font-semibold">Phone:</span> {item.phone}</p>
              <p><span className="font-semibold">Position:</span> {item.position}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
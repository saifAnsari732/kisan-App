import React from "react";

export default function AgreementViewer() {
  return (
    <div className="max-w-6xl mx-auto p-4">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-center mb-4">
        Distributor Agreement
      </h1>

      {/* PDF VIEWER */}
      <div className="border rounded shadow overflow-hidden">
        <iframe
          src="/Distributor-Agreement-New.pdf"   // 👈 your PDF
          title="Distributor Agreement"
          className="w-full h-[800px]"
        />
      </div>

    </div>
  );
}
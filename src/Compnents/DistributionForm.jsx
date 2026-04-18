import React, { useState } from "react";

// Reusable Input
const Input = ({ label }) => (
  <div className="flex flex-col mb-3 w-full">
    <label className="text-xs font-semibold mb-1">{label}</label>
    <input className="border p-2 rounded text-sm w-full bg-white" />
  </div>
);

// Checkbox
const Checkbox = ({ label }) => (
  <label className="flex items-center gap-2 text-sm">
    <input type="checkbox" />
    {label}
  </label>
);

export default function DistributionForm() {
  const [mode, setMode] = useState("online");
  const [step, setStep] = useState(1);

  const next = () => setStep((s) => Math.min(s + 1, 4));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className="max-w-6xl mx-auto p-4">

      {/* 🔥 TOP BUTTONS */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setMode("online")}
          className={`px-6 py-2 text-white ${
            mode === "online" ? "bg-red-600" : "bg-red-400"
          }`}
        >
          APPLY ONLINE
        </button>

        <button
          onClick={() => setMode("offline")}
          className={`px-6 py-2 text-white ${
            mode === "offline" ? "bg-blue-800" : "bg-blue-500"
          }`}
        >
          APPLY OFFLINE
        </button>
      </div>

      {/* CONTAINER */}
      <div className="relative border rounded shadow overflow-hidden">

        {/* WATERMARK */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url('/kisanchoicewatermark.png')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "contain",
            opacity: 0.1,
          }}
        />

        <div className="relative z-10 bg-white/80 p-5">

          <h1 className="text-3xl font-bold text-center mb-4">
            Distribution Form
          </h1>

          {/* OFFLINE PDF */}
          {mode === "offline" && (
            <iframe
              src="/KIP-Registration-Form.pdf"
              className="w-full h-[700px]"
              title="PDF"
            />
          )}

          {/* ONLINE FORM */}
          {mode === "online" && (
            <>
              {/* STEPS */}
              <div className="flex justify-center gap-6 mb-6">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${
                        step === s ? "bg-blue-600" : "bg-gray-400"
                      }`}
                    >
                      {s}
                    </div>
                    <span className="text-xs mt-1">STEP {s}</span>
                  </div>
                ))}
              </div>

              {/* STEP 1 */}
              {step === 1 && (
                <>
                  <h2 className="font-bold mb-3">Basic Information</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Member Registration Number" />
                    <Input label="Phone No." />
                    <Input label="Email Address" />
                    <Input label="Company Name" />
                    <Input label="Owner Name" />
                    <Input label="Aadhar Number" />
                    <Input label="PAN Number" />
                  </div>
                  <Input label="Full Address" />
                </>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <>
                  <h2 className="font-bold mb-3">Bank Details</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <Input label="Account Number" />
                    <Input label="IFSC Code" />
                    <Input label="Bank Name" />
                    <Input label="Branch" />
                  </div>
                </>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <>
                  <h2 className="font-bold mb-3">Product Interest</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <Checkbox label="Mustard Oil" />
                    <Checkbox label="Rice Bran Oil" />
                    <Checkbox label="Coconut Oil" />
                    <Checkbox label="Groundnut Oil" />
                  </div>
                </>
              )}

              {/* 🔥 STEP 4 (AGREEMENT FORM UI) */}
              {step === 4 && (
                <>
                  <h2 className="font-bold mb-4">Shop / Agreement Details</h2>

                  {/* Shop Section */}
                  <div className="grid grid-cols-2 gap-4">

                    <div className="border p-4 flex items-center justify-center h-40 bg-gray-100">
                      Shop Photo (Upload)
                    </div>

                    <div className="space-y-3">
                      <Input label="Godown Size (sq ft)" />
                      <Input label="Area Allocated for Distribution" />
                      <Input label="Shop Location" />
                    </div>

                  </div>

                  {/* Documents */}
                  <div className="mt-5">
                    <h3 className="font-semibold mb-2">
                      Documents Required
                    </h3>

                    <div className="grid grid-cols-3 gap-3">
                      <Checkbox label="GST Certificate" />
                      <Checkbox label="Aadhar Card" />
                      <Checkbox label="PAN Card" />
                      <Checkbox label="Food License" />
                      <Checkbox label="MSME Certificate" />
                      <Checkbox label="Electricity Bill / Rent Agreement" />
                    </div>
                  </div>

                  {/* Declaration */}
                  <div className="mt-5 text-sm">
                    <p>
                      Declaration: I hereby declare that the information provided
                      is true and correct to the best of my knowledge.
                    </p>
                  </div>

                  {/* Signatures */}
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <Input label="Company Representative Name" />
                    <Input label="Representative Contact Number" />
                    <Input label="Signature" />
                    <Input label="Date" />
                  </div>
                </>
              )}

              {/* BUTTONS */}
              <div className="flex justify-between mt-6">
                {step > 1 && (
                  <button
                    onClick={back}
                    className="px-4 py-2 bg-gray-400 text-white rounded"
                  >
                    Back
                  </button>
                )}

                {step < 4 ? (
                  <button
                    onClick={next}
                    className="ml-auto px-4 py-2 bg-blue-600 text-white rounded"
                  >
                    Next
                  </button>
                ) : (
                  <button className="ml-auto px-4 py-2 bg-green-600 text-white rounded">
                    Submit
                  </button>
                )}
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
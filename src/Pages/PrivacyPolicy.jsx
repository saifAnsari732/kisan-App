import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="bg-gray-200 py-4 text-center">
        <h1 className="text-4xl font-bold text-green-900">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          Home / <span className="font-semibold">Privacy Policy</span>
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-4 py-10 text-gray-700 text-sm leading-relaxed space-y-6">

        <p>
          We are happy to appoint you as Authorized dealer for the Area condition under following terms and conditions:
        </p>

        <ol className="space-y-4 list-decimal pl-5">

          <li>
            You have to submit a refundable security deposit of INR against the dealership offered to you for which you will be paid an annual interest of 9.75% annually...
          </li>

          <li>
            Once the Security is deposited you will get a DSA (Dealer Sales Associate) which dealer has to appoint himself...
          </li>

          <li>
            All Necessary Promotional material will be provided by company time to time.
          </li>

          <li>
            You will be informed about the company promotions by the field staff on regular interval.
          </li>

          <li>
            If the dealer has not submitted the Security amount company will hold no liability of DSA.
          </li>

          <li>
            Dealer will be given field support and they will work as bridge between company and dealer.
          </li>

          <li>
            No cash payment is accepted, all transaction must be online.
          </li>

          <li>
            If stock remains unmoved for 3 months, company will not take responsibility.
          </li>

          <li>
            All relevant claims like Damage and expiry will be settled quarterly.
          </li>

        </ol>

      </div>
    </div>
  );
}
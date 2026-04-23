import React from "react";

export default function TermsConditions() {
  return (
    <div className="bg-gray-100 min-h-screen">

      {/* HEADER */}
      <div className="bg-gray-200 py-4 text-center">
        <h1 className="text-4xl font-bold text-green-900">
          Terms & Conditions
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          Home / <span className="font-semibold">Terms & Conditions</span>
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-4 py-10 text-gray-700 text-sm leading-relaxed space-y-6">

        <p>
          Terms of Use – Kisan Choice (a brand by Kisan India Plus)
        </p>

        <div className="space-y-5">

          <div>
            <h3 className="font-semibold">1. Acceptance of Terms</h3>
            <p>
              By accessing or using this Site, you accept these Terms of Use without limitation.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">2. Data Protection and Privacy</h3>
            <p>
              We are committed to safeguarding your personal data.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">3. Website Content</h3>
            <p>
              Content is for general information purposes only and may change anytime.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">4. Intellectual Property</h3>
            <p>
              All site content belongs to Kisan India Plus.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">5. Permitted Use and Restrictions</h3>
            <ul className="list-disc pl-5">
              <li>No misuse of website</li>
              <li>No unauthorized copying</li>
              <li>No illegal activities</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">6. User-Provided Content</h3>
            <p>
              Any information submitted will be treated as non-confidential.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">7. Disclaimer</h3>
            <p>
              We do not guarantee uninterrupted access or error-free service.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">8. Indemnity</h3>
            <p>
              Users agree to indemnify company against losses.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">9. External Links</h3>
            <p>
              We are not responsible for third-party websites.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">10. Governing Law</h3>
            <p>
              Governed by laws of India, jurisdiction Lucknow.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">11. Modifications</h3>
            <p>
              Terms may change anytime without notice.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
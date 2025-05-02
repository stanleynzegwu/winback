"use client";
import { useState } from "react";
import { Navbar } from "../components";

export default function Donate() {
  const [copied, setCopied] = useState(false);

  const accountName = "Winback foundation";
  const accountNumber = "1234567890";
  const bankName = "Charity Bank";

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="bg-white rounded-2xl shadow-md max-w-md w-full p-8 text-center">
          <h1 className="text-2xl font-semibold mb-4 text-gray-800">Support Our Cause</h1>
          <p className="text-gray-600 mb-6">
            Your donation helps us continue our mission to uplift communities and provide critical
            support where it's needed most.
          </p>

          <div className="mb-4 text-left">
            <p>
              <span className="font-semibold">Account Name:</span> {accountName}
            </p>
            <p>
              <span className="font-semibold">Bank Name:</span> {bankName}
            </p>
            <p>
              <span className="font-semibold">Account Number:</span> {accountNumber}
            </p>
          </div>

          <button
            onClick={handleCopy}
            className="bg-buttonColor hover:bg-buttonColor-dark text-white font-medium py-2 px-4 rounded-xl transition-all duration-200 ease-in-out"
          >
            {copied ? "Copied!" : "Copy Account Number"}
          </button>
        </div>
      </div>
    </>
  );
}

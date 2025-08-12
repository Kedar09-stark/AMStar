import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import OtpVerificationModal from "./OtpVerificationModal";
const plansData = {
  monthly: [
    {
      id: "m1",
      title: "1 Month",
      price: 9.99,
      benefits: [
        "Unlimited access to Pro movies",
        "Early access to new releases",
        "Ad-free experience",
      ],
    },
    {
      id: "m6",
      title: "6 Months",
      price: 49.99,
      benefits: [
        "Unlimited access to Pro movies",
        "Early access to new releases",
        "Ad-free experience",
        "Exclusive bonus content",
      ],
      popular: true,
    },
  ],
  yearly: [
    {
      id: "y1",
      title: "1 Year",
      price: 89.99,
      benefits: [
        "Unlimited access to Pro movies",
        "Early access to new releases",
        "Ad-free experience",
        "Exclusive bonus content",
        "Special yearly gift",
      ],
      popular: true,
    },
  ],
};

function ProSubscriptionPage() {
  const navigate = useNavigate();
  const { setUserProStatus } = useAuth();
  const [billingCycle, setBillingCycle] = useState("monthly");

  // Payment modal states
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [method, setMethod] = useState("card");

  // Payment form fields
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [error, setError] = useState("");

  // OTP modal control
  const [showOtpModal, setShowOtpModal] = useState(false);

  // Toast notification
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);

  // When user clicks subscribe
  const handleSubscribe = (plan) => {
    setSelectedPlan(plan);
    setShowPayment(true);
    setMethod("card");
    setCardNumber("");
    setExpiry("");
    setCvv("");
    setCardName("");
    setPaypalEmail("");
    setMobileNumber("");
    setError("");
    setShowOtpModal(false);
  };

  const resetFields = () => {
    setCardNumber("");
    setExpiry("");
    setCvv("");
    setCardName("");
    setPaypalEmail("");
    setMobileNumber("");
    setError("");
  };

  const validateCard = () => {
    if (
      cardNumber.replace(/\s/g, "").length !== 16 ||
      !expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/) ||
      cvv.length !== 3 ||
      cardName.trim().length === 0
    ) {
      setError("Please enter valid card details.");
      return false;
    }
    return true;
  };

  const validatePaypal = () => {
    if (!paypalEmail.includes("@") || paypalEmail.trim() === "") {
      setError("Please enter a valid PayPal email.");
      return false;
    }
    return true;
  };

  const validateMobile = () => {
    if (mobileNumber.trim().length < 10) {
      setError("Please enter a valid mobile number.");
      return false;
    }
    return true;
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setError("");

    let valid = false;
    if (method === "card") valid = validateCard();
    else if (method === "paypal") valid = validatePaypal();
    else if (method === "bkash" || method === "nagad") valid = validateMobile();

    if (!valid) return;

    // If method is bKash or Nagad, trigger OTP modal instead of direct success
    if (method === "bkash" || method === "nagad") {
      setShowOtpModal(true);
      return;
    }

    // For card or paypal, proceed directly
    setTimeout(() => {
      setShowPayment(false);
      setUserProStatus(true);
      setToastMsg(`Payment successful for ${selectedPlan.title} plan!`);
      setShowToast(true);
    }, 800);
  };

  const handleOtpVerified = () => {
    setShowOtpModal(false);
    setShowPayment(false);
    setUserProStatus(true);
    setToastMsg(`Payment successful for ${selectedPlan.title} plan!`);
    setShowToast(true);
  };

  // Toast auto-hide after 3 seconds and navigate to theater page
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
        navigate("/theater");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center justify-center px-4 py-8 sm:p-6 relative">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-yellow-400 mb-10 mt-12 sm:mt-20 text-center drop-shadow-lg">
        Choose Your Pro Plan
      </h1>

      {/* Billing Cycle Toggle */}
      <div className="mb-8 flex justify-center space-x-4 sm:space-x-6 bg-gray-800 rounded-full p-2 shadow-lg max-w-md w-full">
        {["monthly", "yearly"].map((cycle) => (
          <button
            key={cycle}
            onClick={() => setBillingCycle(cycle)}
            className={`rounded-full px-4 sm:px-6 py-2 font-semibold transition text-sm sm:text-base ${
              billingCycle === cycle
                ? "bg-yellow-400 text-gray-900 shadow-lg"
                : "text-yellow-400 hover:bg-yellow-600 hover:text-white"
            }`}
            aria-pressed={billingCycle === cycle}
          >
            {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
          </button>
        ))}
      </div>

      {/* Plans Grid */}
      <div className="grid gap-8 max-w-5xl w-full sm:grid-cols-2 lg:grid-cols-3">
        {plansData[billingCycle].map(({ id, title, price, benefits, popular }, index) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 * index }}
            className={`relative flex flex-col bg-gradient-to-tr from-gray-900 to-gray-800 rounded-xl p-6 sm:p-8 shadow-2xl border-2 border-transparent hover:border-yellow-400 cursor-pointer select-none`}
            onClick={() => handleSubscribe({ id, title, price })}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubscribe({ id, title, price });
            }}
            aria-label={`Subscribe to ${title} plan for $${price}`}
          >
            {popular && (
              <span className="absolute -top-3 right-3 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg z-10">
                Most Popular
              </span>
            )}

            <div className="mb-4 sm:mb-6">
              <svg
                aria-hidden="true"
                className="w-12 h-12 sm:w-16 sm:h-16 mb-3 mx-auto text-yellow-400 opacity-70"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="32" cy="32" r="30" strokeLinecap="round" strokeLinejoin="round" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 32l10 10 18-18" />
              </svg>
              <h2 className="text-center text-2xl sm:text-3xl font-extrabold text-yellow-300">{title}</h2>
              <p className="text-center text-yellow-400 text-4xl sm:text-5xl font-bold my-3 sm:my-4">${price}</p>
              <p className="text-center text-gray-300 italic text-xs sm:text-sm">Billed {billingCycle}</p>
            </div>

            <ul className="mb-6 sm:mb-8 space-y-2 text-gray-300 text-sm sm:text-base">
              {benefits.map((benefit, i) => (
                <li key={i} className="flex items-center" title={benefit}>
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <button
              className="mt-auto bg-yellow-400 text-gray-900 font-bold py-3 rounded-lg hover:bg-yellow-500 transition shadow-md focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:ring-opacity-75 text-sm sm:text-base"
              onClick={(e) => {
                e.stopPropagation();
                handleSubscribe({ id, title, price });
              }}
            >
              Subscribe Now
            </button>
          </motion.div>
        ))}
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50"
          onClick={() => setShowPayment(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="payment-title"
        >
          <div
            className="bg-gray-900 rounded-lg p-8 w-full max-w-md shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              id="payment-title"
              className="text-yellow-400 text-2xl font-extrabold mb-6 text-center"
            >
              Complete Payment - {selectedPlan?.title} Plan (${selectedPlan?.price})
            </h2>

            {/* Payment Method Tabs */}
            <div className="flex space-x-4 mb-6 justify-center">
              {[
                { id: "card", label: "MasterCard / Visa" },
                { id: "paypal", label: "PayPal" },
                { id: "bkash", label: "bKash" },
                { id: "nagad", label: "Nagad" },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => {
                    setMethod(id);
                    resetFields();
                  }}
                  className={`px-3 py-1 rounded-full font-semibold text-sm transition ${
                    method === id
                      ? "bg-yellow-400 text-gray-900 shadow-lg"
                      : "bg-gray-800 text-yellow-400 hover:bg-yellow-700"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              {method === "card" && (
                <>
                  <label className="block text-yellow-400 font-semibold">
                    Cardholder Name
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Robiul Hasan s"
                      className="w-full mt-1 p-2 rounded bg-gray-800 text-yellow-300 focus:outline-yellow-400"
                      required
                    />
                  </label>

                  <label className="block text-yellow-400 font-semibold">
                    Card Number
                    <input
                      type="text"
                      maxLength="19"
                      value={cardNumber}
                      onChange={(e) => {
                        let val = e.target.value.replace(/\D/g, "").slice(0, 16);
                        val = val.replace(/(.{4})/g, "$1 ").trim();
                        setCardNumber(val);
                      }}
                      placeholder="1234 5678 9012 3456"
                      className="w-full mt-1 p-2 rounded bg-gray-800 text-yellow-300 focus:outline-yellow-400"
                      required
                    />
                  </label>

                  <div className="flex space-x-4">
                    <label className="block flex-1 text-yellow-400 font-semibold">
                      Expiry (MM/YY)
                      <input
                        type="text"
                        maxLength="5"
                        value={expiry}
                        onChange={(e) => {
                          let val = e.target.value;
                          if (val.length === 2 && !val.includes("/")) val = val + "/";
                          if (/^[0-9/]*$/.test(val)) setExpiry(val);
                        }}
                        placeholder="MM/YY"
                        className="w-full mt-1 p-2 rounded bg-gray-800 text-yellow-300 focus:outline-yellow-400"
                        required
                      />
                    </label>

                    <label className="block flex-1 text-yellow-400 font-semibold">
                      CVV
                      <input
                        type="password"
                        maxLength="3"
                        value={cvv}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\D/g, "").slice(0, 3);
                          setCvv(val);
                        }}
                        placeholder="123"
                        className="w-full mt-1 p-2 rounded bg-gray-800 text-yellow-300 focus:outline-yellow-400"
                        required
                      />
                    </label>
                  </div>
                </>
              )}

              {(method === "paypal" || method === "bkash" || method === "nagad") && (
                <label className="block text-yellow-400 font-semibold">
                  {method === "paypal" ? "PayPal Email" : "Mobile Number"}
                  <input
                    type={method === "paypal" ? "email" : "tel"}
                    value={method === "paypal" ? paypalEmail : mobileNumber}
                    onChange={(e) =>
                      method === "paypal"
                        ? setPaypalEmail(e.target.value)
                        : setMobileNumber(e.target.value)
                    }
                    placeholder={method === "paypal" ? "you@example.com" : "01XXXXXXXXX"}
                    className="w-full mt-1 p-2 rounded bg-gray-800 text-yellow-300 focus:outline-yellow-400"
                    required
                  />
                </label>
              )}

              {error && <p className="text-red-500">{error}</p>}

              <div className="flex justify-between items-center mt-6">
                <button
                  type="button"
                  onClick={() => setShowPayment(false)}
                  className="px-4 py-2 rounded bg-gray-700 text-yellow-400 hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded bg-yellow-400 text-gray-900 font-bold hover:bg-yellow-500 transition"
                >
                  Pay Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* OTP Modal */}
      {showOtpModal && (
        <OtpVerificationModal
          mobileNumber={mobileNumber}
          onCancel={() => setShowOtpModal(false)}
          onVerified={handleOtpVerified}
        />
      )}

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 px-6 py-3 rounded-lg shadow-lg font-semibold text-center z-50 select-none"
            role="alert"
            aria-live="assertive"
          >
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProSubscriptionPage;
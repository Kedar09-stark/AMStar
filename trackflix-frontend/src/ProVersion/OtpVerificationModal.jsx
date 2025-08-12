// OtpVerificationModal.jsx
import React, { useState, useEffect } from "react";

export default function OtpVerificationModal({
  mobileNumber,
  onCancel,
  onVerified,
}) {
  const [otpCode, setOtpCode] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  // Mock sending OTP on mount or when mobileNumber changes
  useEffect(() => {
    sendOtp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileNumber]);

  const sendOtp = () => {
    setSending(true);
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(randomOtp);

    // Simulate API delay
    setTimeout(() => {
      setOtpSent(true);
      setSending(false);
      alert(`Mock OTP sent to ${mobileNumber}: ${randomOtp}`);
    }, 1000);
  };

  const verifyOtp = () => {
    if (otpCode === generatedOtp) {
      onVerified();
    } else {
      setError("Invalid OTP, please try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="otp-title"
      onClick={onCancel}
    >
      <div
        className="bg-gray-900 rounded-lg p-8 w-full max-w-md shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="otp-title"
          className="text-yellow-400 text-2xl font-extrabold mb-6 text-center"
        >
          Verify Mobile Number
        </h2>

        <p className="text-gray-300 mb-4 text-center">
          Enter the 6-digit OTP sent to <strong>{mobileNumber}</strong>
        </p>

        <input
          type="text"
          value={otpCode}
          onChange={(e) => {
            // Allow only digits and max length 6
            const val = e.target.value.replace(/\D/g, "").slice(0, 6);
            setOtpCode(val);
            setError("");
          }}
          placeholder="Enter OTP"
          className="w-full p-3 rounded bg-gray-800 text-yellow-300 focus:outline-yellow-400 text-center text-xl tracking-widest mb-4"
          autoFocus
        />

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="flex justify-between items-center">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-700 text-yellow-400 hover:bg-gray-600 transition"
          >
            Cancel
          </button>

          <button
            onClick={verifyOtp}
            disabled={otpCode.length !== 6}
            className={`px-6 py-2 rounded font-bold text-gray-900 ${
              otpCode.length === 6
                ? "bg-yellow-400 hover:bg-yellow-500"
                : "bg-yellow-300 cursor-not-allowed"
            } transition`}
          >
            Verify
          </button>
        </div>

        {!sending && otpSent && (
          <p className="text-green-400 text-center mt-4 text-sm">
            OTP sent successfully!
          </p>
        )}

        {sending && (
          <p className="text-yellow-300 text-center mt-4 text-sm">Sending OTP...</p>
        )}
      </div>
    </div>
  );
}

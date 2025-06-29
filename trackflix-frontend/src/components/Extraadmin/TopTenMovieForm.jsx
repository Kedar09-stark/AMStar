import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import Particles from "react-tsparticles";

const TopTenMovieForm = ({ form, onChange, onSubmit, onCancel, isEditing, isSubmitting }) => {
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const firstErrorRef = useRef(null);

  const validate = (values) => {
    const errs = {};
    if (!values.id || values.id <= 0) errs.id = "ID must be a positive number.";
    if (!values.title || values.title.trim().length < 2) errs.title = "Title is too short.";
    if (!values.img || !/^https?:\/\/.+/.test(values.img.trim()))
      errs.img = "Invalid image URL.";
    if (!values.rank || values.rank <= 0) errs.rank = "Rank must be positive.";
    if (values.rating < 0 || values.rating > 10) errs.rating = "Rating must be 0-10.";
    if (!values.year || values.year < 1900 || values.year > new Date().getFullYear())
      errs.year = "Invalid year.";
    if (!values.trailer || !/^https?:\/\/.+/.test(values.trailer.trim()))
      errs.trailer = "Invalid trailer URL.";
    return errs;
  };

  useEffect(() => {
    setErrors(validate(form));
  }, [form]);

  // Scroll and focus on first error, but NO shaking animation
  useEffect(() => {
    if (Object.keys(errors).length > 0 && firstErrorRef.current) {
      firstErrorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      firstErrorRef.current.focus();
    }
  }, [errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    onSubmit(e);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const fields = [
    { name: "id", type: "number", placeholder: "ID" },
    { name: "title", type: "text", placeholder: "Title" },
    { name: "img", type: "text", placeholder: "Image URL", span: 2 },
    { name: "rank", type: "number", placeholder: "Rank" },
    { name: "rating", type: "number", step: 0.1, placeholder: "Rating" },
    { name: "year", type: "number", placeholder: "Year" },
    { name: "trailer", type: "text", placeholder: "Trailer URL", span: 2 },
  ];

  return (
    <>
      {success && <Confetti numberOfPieces={100} recycle={false} />}
      <Particles
        className="absolute inset-0 -z-10 rounded-xl"
        options={{
          particles: {
            number: { value: 30 },
            color: { value: "#F59E0B" },
            links: {
              enable: true,
              distance: 120,
              color: "#FBBF24",
              opacity: 0.3,
              width: 1,
            },
            move: { enable: true, speed: 1 },
            size: { value: 3 },
            opacity: { value: 0.4 },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              resize: true,
            },
          },
        }}
      />

      <motion.form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="max-w-3xl mx-auto p-8 bg-white/60 backdrop-blur-md border border-yellow-300/50 rounded-2xl shadow-xl relative grid grid-cols-2 gap-6"
      >
        <h2 className="col-span-2 text-3xl font-bold text-yellow-600">
          {isEditing ? "Edit Top 10 Movie" : "Add Top 10 Movie"}
        </h2>

        {fields.map((field, idx) => {
          const error = errors[field.name];
          const isFirstError = idx === 0 && error;
          return (
            <div
              key={field.name}
              className={`relative ${field.span === 2 ? "col-span-2" : ""}`}
            >
              <input
                type={field.type}
                step={field.step}
                name={field.name}
                value={form[field.name] || ""}
                onChange={onChange}
                placeholder=" "
                disabled={field.name === "id" && isEditing}
                ref={isFirstError ? firstErrorRef : null}
                className={`peer w-full border-b-4 px-4 pt-6 pb-2 bg-transparent text-gray-900 focus:outline-none transition-all duration-300 ${
                  error
                    ? "border-red-500 focus:border-red-600"
                    : "border-gray-300 focus:border-yellow-500"
                }`}
              />
              <label
                htmlFor={field.name}
                className={`absolute left-4 top-2 text-sm text-gray-500 font-semibold transition-all duration-300 pointer-events-none
                  peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                  peer-focus:top-2 peer-focus:text-yellow-600 peer-focus:text-sm ${
                    error ? "text-red-500 peer-focus:text-red-600" : ""
                  }`}
              >
                {field.placeholder}
              </label>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-red-600 mt-1 font-semibold"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        <motion.button
          type="submit"
          disabled={isSubmitting || Object.keys(errors).length > 0}
          whileHover={{ scale: 1.05, boxShadow: "0 0 12px #FBBF24" }}
          whileTap={{ scale: 0.95 }}
          className="col-span-2 w-full mt-6 rounded-full bg-yellow-500 text-white font-bold text-lg py-3 shadow-md"
        >
          {isSubmitting
            ? isEditing
              ? "Updating..."
              : "Saving..."
            : isEditing
            ? "Update"
            : "Add Movie"}
        </motion.button>

        {isEditing && (
          <motion.button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="col-span-2 w-full mt-2 rounded-full bg-gray-400 text-white font-bold py-3 shadow-md"
          >
            Cancel
          </motion.button>
        )}
      </motion.form>
    </>
  );
};

export default TopTenMovieForm;

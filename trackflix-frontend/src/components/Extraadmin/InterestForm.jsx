import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Confetti from "react-confetti";
import Particles from "react-tsparticles";

const InterestForm = ({
  form,
  onChange,
  onSubmit,
  onCancel,
  isEditing,
  isSubmitting,
}) => {
  const [errors, setErrors] = useState({});
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [imageValid, setImageValid] = useState(false);
  const [success, setSuccess] = useState(false);
  const firstErrorRef = useRef(null);
  const controls = useAnimation();

  const validate = (values) => {
    const errs = {};
    if (!values.id || values.id <= 0) errs.id = "ID must be a positive number.";
    if (!values.title || values.title.trim().length < 2)
      errs.title = "Title must be at least 2 characters.";
    const img = values.img?.trim();
    const isValidUrl = /^https?:\/\/.+/i.test(img) || /^data:image\/.+;base64,/.test(img);
    if (!img) errs.img = "Image URL is required.";
    else if (!isValidUrl) errs.img = "Enter a valid image URL or base64 data.";
    if (values.rating == null || values.rating < 0 || values.rating > 10)
      errs.rating = "Rating must be between 0 and 10.";
    const genres = Array.isArray(values.genres) ? values.genres.join(", ") : values.genres || "";
    if (!genres.trim()) errs.genres = "Please enter at least one genre.";
    const trailer = values.trailerLink?.trim();
    if (trailer && !/^https?:\/\/.+/i.test(trailer))
      errs.trailerLink = "Enter a valid trailer URL.";
    return errs;
  };

  useEffect(() => {
    const validationErrors = validate(form);
    setErrors(validationErrors);
    const validImg =
      form.img &&
      (/^https?:\/\/.+/i.test(form.img.trim()) ||
        /^data:image\/.+;base64,/.test(form.img.trim()));
    setImageValid(!!validImg);
    setShowImagePreview(!!validImg);
  }, [form]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      controls.start({ x: [-10, 10, -10, 10, 0], transition: { duration: 0.4 } });
      if (firstErrorRef.current) {
        firstErrorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        firstErrorRef.current.focus();
      }
      return;
    }

    onSubmit(e);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  const isSubmitDisabled = isSubmitting || Object.keys(errors).length > 0;

  return (
    <div className="relative px-4">
      {success && <Confetti numberOfPieces={150} recycle={false} />}
      <Particles
        options={{
          fpsLimit: 60,
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" }, resize: true },
          },
          particles: {
            color: { value: "#D97706" },
            links: { enable: true, distance: 150, color: "#D97706", opacity: 0.3, width: 1 },
            move: { enable: true, speed: 1 },
            number: { value: 40 },
            opacity: { value: 0.4 },
            shape: { type: "circle" },
            size: { value: 3 },
          },
        }}
        className="absolute inset-0 -z-10 rounded-3xl"
      />

      <motion.form
        onSubmit={handleSubmit}
        animate={controls}
        className="max-w-3xl mx-auto p-8 mt-8 bg-gradient-to-r from-white/70 to-yellow-50/70 rounded-3xl shadow-2xl border border-yellow-300/40 relative"
        noValidate
      >
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent">
          {isEditing ? "Edit" : "Add"} Interest
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: "id", type: "number", label: "ID", disabled: isEditing },
            { name: "title", type: "text", label: "Title" },
            { name: "img", type: "url", label: "Image URL" },
            { name: "rating", type: "number", label: "Rating (0-10)" },
            {
              name: "genres",
              type: "text",
              label: "Genres (comma separated)",
              value: Array.isArray(form.genres) ? form.genres.join(", ") : form.genres || "",
              onChange: (e) =>
                onChange({
                  target: {
                    name: "genres",
                    value: e.target.value
                      .split(",")
                      .map((g) => g.trim())
                      .filter((g) => g.length > 0),
                  },
                }),
            },
            { name: "trailerLink", type: "url", label: "Trailer Link (optional)" },
          ].map(({ name, type, label, disabled, value, onChange: customOnChange }, idx) => (
            <div key={name} className="relative">
              <input
                id={name}
                type={type}
                name={name}
                value={value !== undefined ? value : form[name] || ""}
                onChange={customOnChange || onChange}
                disabled={disabled || isSubmitting}
                placeholder=" "
                aria-label={label}
                ref={errors[name] && idx === 0 ? firstErrorRef : null}
                className={`peer w-full border-b-4 bg-transparent px-4 pt-6 pb-2 text-gray-900 
                  focus:outline-none focus:border-yellow-500 transition-all
                  placeholder-transparent
                  ${
                    errors[name]
                      ? "border-red-500 focus:border-red-600"
                      : form[name]
                      ? "border-green-400 focus:border-green-500"
                      : "border-gray-300"
                  }`}
              />
              <label
                htmlFor={name}
                className={`absolute left-4 top-2 text-gray-500 text-sm
                  transition-all peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm
                  ${
                    errors[name]
                      ? "text-red-500 peer-focus:text-red-600"
                      : "peer-focus:text-yellow-600"
                  }`}
              >
                {label}
              </label>

              <AnimatePresence>
                {errors[name] && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-1 text-red-600 font-semibold"
                  >
                    {errors[name]}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {showImagePreview && imageValid && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mt-6 overflow-hidden max-h-60 border-4 border-yellow-400 shadow-lg rounded-xl"
            style={{ aspectRatio: "16 / 9" }}
          >
            <img
              src={form.img}
              alt="Preview"
              className="w-full h-full object-contain bg-white transition-opacity duration-700 ease-in-out opacity-0"
              onLoad={(e) => {
                setImageValid(true);
                e.currentTarget.style.opacity = 1;
              }}
              onError={() => setImageValid(false)}
            />
          </motion.div>
        )}

        <div className="mt-8 flex justify-end gap-4">
          
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 text-white font-bold py-3 px-6 rounded-full shadow-lg transition"
          >
            {isEditing
              ? isSubmitting
                ? "Updating..."
                : "Update Interest"
              : isSubmitting
              ? "Adding..."
              : "Add Interest"}
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default InterestForm;

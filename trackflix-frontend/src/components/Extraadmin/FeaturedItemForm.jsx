import React, { useState, useEffect, useRef } from "react";
import Confetti from "react-confetti";
import Particles from "react-tsparticles";

const FeaturedItemForm = ({
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

  const validate = (values) => {
    const errs = {};

    if (!values.id || values.id <= 0) errs.id = "ID must be a positive number.";

    if (!values.title || values.title.trim().length < 2)
      errs.title = "Title must be at least 2 characters.";

    const img = values.img || "";
    const trimmedImg = img.trim();
    const isValidUrl =
      /^https?:\/\/.+/i.test(trimmedImg) || /^data:image\/.+;base64,/.test(trimmedImg);

    if (!trimmedImg) {
      errs.img = "Image URL is required.";
    } else if (!isValidUrl) {
      errs.img = "Please enter a valid image URL or base64 image data.";
    }

    if (values.rating == null || values.rating < 0 || values.rating > 10)
      errs.rating = "Rating must be between 0 and 10.";

    let genresValue = "";
    if (Array.isArray(values.genres)) {
      genresValue = values.genres.join(", ");
    } else if (typeof values.genres === "string") {
      genresValue = values.genres;
    }
    if (!genresValue.trim()) {
      errs.genres = "Please enter at least one genre.";
    }

    const trailer = values.trailerLink || "";
    const trimmedTrailer = trailer.trim();
    if (trimmedTrailer && !/^https?:\/\/.+/i.test(trimmedTrailer)) {
      errs.trailerLink = "Please enter a valid trailer URL.";
    }

    return errs;
  };

  useEffect(() => {
    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (
      form.img &&
      (/^https?:\/\/.+/i.test(form.img.trim()) ||
        /^data:image\/.+;base64,/.test(form.img.trim()))
    ) {
      setImageValid(true);
      setShowImagePreview(true);
    } else {
      setImageValid(false);
      setShowImagePreview(false);
    }
  }, [form]);

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
    setTimeout(() => setSuccess(false), 4000);
  };

  const isSubmitDisabled = isSubmitting || Object.keys(errors).length > 0;

  return (
    <>
      {success && <Confetti numberOfPieces={150} recycle={false} />}

      <Particles
        options={{
          fpsLimit: 60,
          interactivity: {
            detectsOn: "canvas",
            events: {
              onHover: { enable: true, mode: "repulse" },
              resize: true,
            },
          },
          particles: {
            color: { value: "#2563EB" },
            links: { enable: true, distance: 150, color: "#2563EB", opacity: 0.3, width: 1 },
            move: { enable: true, speed: 1, direction: "none", outMode: "bounce" },
            number: { value: 40 },
            opacity: { value: 0.4 },
            shape: { type: "circle" },
            size: { value: 3 },
          },
        }}
        className="absolute inset-0 -z-10 rounded-3xl"
      />

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-white/70 to-blue-50/70 rounded-3xl shadow-2xl border border-blue-300/40 relative flex flex-col gap-8"
        noValidate
        autoComplete="off"
      >
        <h2 className="text-4xl font-extrabold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 select-none">
          {isEditing ? "Edit" : "Add"} Featured Item
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
                    value: e.target.value.split(",").map((g) => g.trim()),
                  },
                }),
            },
            { name: "trailerLink", type: "url", label: "Trailer Link (optional)" },
          ].map(({ name, type, label, disabled, value, onChange: customOnChange }, idx) => (
            <div key={name} className="relative">
              <input
                type={type}
                name={name}
                value={value !== undefined ? value : form[name] || ""}
                onChange={customOnChange || onChange}
                disabled={disabled || isSubmitting}
                placeholder=" "
                aria-label={label}
                aria-invalid={errors[name] ? "true" : "false"}
                aria-describedby={`${name}-error`}
                ref={errors[name] && idx === 0 ? firstErrorRef : null}
                min={name === "rating" ? 0 : undefined}
                max={name === "rating" ? 10 : undefined}
                step={name === "rating" ? "0.1" : undefined}
                className={`peer block w-full appearance-none border-b-4 border-gray-300 bg-transparent px-4 pt-6 pb-2 text-gray-900
                  focus:border-blue-500 focus:outline-none focus:ring-0
                  transition duration-300
                  ${errors[name] ? "border-red-500 focus:border-red-600" : ""}`}
              />
              <label
                htmlFor={name}
                className={`absolute left-4 top-2 text-gray-500 text-sm font-semibold
                  transition-all duration-300
                  pointer-events-none
                  peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
                  peer-focus:top-2 peer-focus:text-blue-600 peer-focus:text-sm
                  ${errors[name] ? "text-red-500 peer-focus:text-red-600" : ""}`}
              >
                {label}
              </label>

              {errors[name] && (
                <p
                  id={`${name}-error`}
                  role="alert"
                  className="mt-1 text-red-600 font-semibold select-none"
                >
                  {errors[name]}
                </p>
              )}
            </div>
          ))}
        </div>

        {showImagePreview && imageValid && (
          <div
            className="rounded-xl overflow-hidden w-full max-h-60 mx-auto border-4 border-blue-400 shadow-lg cursor-pointer hover:scale-105 transition-transform"
            style={{ aspectRatio: "16 / 9", maxWidth: "100%" }}
          >
            <img
              src={form.img}
              alt="Preview"
              className="w-full h-full object-contain bg-white"
              draggable={false}
              onError={() => setImageValid(false)}
              onLoad={() => setImageValid(true)}
              style={{ display: "block" }}
            />
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-6">
  

  <button
    type="submit"
    disabled={isSubmitDisabled}
    className={`rounded-full bg-gradient-to-r from-blue-600 to-indigo-700
      text-white font-bold py-2.5 px-5 sm:py-4 sm:px-8 shadow-lg
      focus:outline-none focus:ring-2 focus:ring-blue-500
      disabled:opacity-60 disabled:cursor-not-allowed
      flex justify-center items-center text-sm sm:text-lg w-full sm:w-auto`}
  >
    {isSubmitting
      ? isEditing
        ? "Updating..."
        : "Adding..."
      : isEditing
      ? "Update Featured Item"
      : "Add Featured Item"}
  </button>
</div>

      </form>
    </>
  );
};

export default FeaturedItemForm;

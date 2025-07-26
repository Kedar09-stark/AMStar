import React, { useState, useEffect, useRef } from "react";

const FanFavouriteForm = ({
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

    const genresValue = typeof values.genres === "string" ? values.genres : "";
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
  };

  const isSubmitDisabled = isSubmitting || Object.keys(errors).length > 0;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-8 bg-white rounded-3xl shadow border border-blue-300/40 flex flex-col gap-8"
      autoComplete="off"
      noValidate
    >
      <h2 className="text-3xl font-extrabold text-blue-700 select-none">
        {isEditing ? "Edit Fan Favourite" : "Add Fan Favourite"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { name: "id", type: "number", label: "ID", disabled: isEditing },
          { name: "title", type: "text", label: "Title" },
          { name: "img", type: "url", label: "Image URL" },
          { name: "rating", type: "number", label: "Rating (0-10)" },
          { name: "genres", type: "text", label: "Genres (comma separated)" },
          { name: "trailerLink", type: "url", label: "Trailer Link (optional)" },
        ].map(({ name, type, label, disabled }, idx) => (
          <div key={name} className="relative">
            <input
              id={name}
              type={type}
              name={name}
              value={form[name] || ""}
              onChange={onChange}
              disabled={disabled || isSubmitting}
              placeholder=" "
              aria-label={label}
              aria-invalid={errors[name] ? "true" : "false"}
              aria-describedby={`${name}-error`}
              ref={errors[name] && !firstErrorRef.current ? firstErrorRef : null}
              min={name === "rating" ? 0 : undefined}
              max={name === "rating" ? 10 : undefined}
              step={name === "rating" ? "0.1" : undefined}
              className={`peer block w-full appearance-none border-b-2 border-gray-300 bg-transparent px-4 pt-6 pb-2 text-gray-900
                focus:border-blue-500 focus:outline-none focus:ring-0 transition duration-300 ${
                  errors[name] ? "border-red-500 focus:border-red-600" : ""
                }`}
            />
            <label
              htmlFor={name}
              className={`absolute left-4 top-2 text-gray-500 text-sm font-semibold
                transition-all duration-300 pointer-events-none
                peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
                peer-focus:top-2 peer-focus:text-blue-600 peer-focus:text-sm ${
                  errors[name] ? "text-red-500 peer-focus:text-red-600" : ""
                }`}
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
          onClick={() => window.open(form.img, "_blank")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") window.open(form.img, "_blank");
          }}
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

      <button
        type="submit"
        disabled={isSubmitDisabled}
        className={`rounded-full bg-blue-600 text-white font-extrabold py-4 shadow-lg
          focus:outline-none focus:ring-4 focus:ring-blue-400
          disabled:opacity-60 disabled:cursor-not-allowed
          w-full text-xl`}
      >
        {isEditing ? (isSubmitting ? "Updating..." : "Update Fan Favourite") : (isSubmitting ? "Adding..." : "Add Fan Favourite")}
      </button>

      {isEditing && (
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="w-full rounded-full bg-gray-500 text-white font-bold py-3 shadow-md
            focus:outline-none focus:ring-4 focus:ring-gray-400
            disabled:opacity-50 disabled:cursor-not-allowed mt-2"
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default FanFavouriteForm;

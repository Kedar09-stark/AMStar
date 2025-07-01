import React, { useState, useEffect, useRef } from "react";

const FullMoviesForm = ({
  form,
  onChange,
  onSubmit,
  onCancel,
  isEditing,
  isSubmitting,
}) => {
  const [errors, setErrors] = useState({});
  const [imageValid, setImageValid] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const firstErrorRef = useRef(null);

  const validate = (values) => {
    const errs = {};

    if (!values.id || values.id <= 0) errs.id = "ID must be a positive number.";

    if (!values.title || values.title.trim().length < 2)
      errs.title = "Title must be at least 2 characters.";

    if (values.rating == null || values.rating < 0 || values.rating > 10)
      errs.rating = "Rating must be between 0 and 10.";

    let genresVal = "";
    if (Array.isArray(values.genres)) genresVal = values.genres.join(", ");
    else if (typeof values.genres === "string") genresVal = values.genres;
    if (!genresVal.trim()) errs.genres = "Please enter at least one genre.";

    if (!values.releaseDate) errs.releaseDate = "Release Date is required.";

    if (values.trailer && values.trailer.trim()) {
      if (!/^https?:\/\/.+/i.test(values.trailer.trim()))
        errs.trailer = "Please enter a valid Trailer URL.";
    }

    if (!values.image || !values.image.trim()) {
      errs.image = "Image URL is required.";
    } else {
      const imgUrl = values.image.trim();
      if (
        !/^https?:\/\/.+/i.test(imgUrl) &&
        !/^data:image\/.+;base64,/.test(imgUrl)
      )
        errs.image = "Please enter a valid Image URL or base64 image.";
    }

    return errs;
  };

  useEffect(() => {
    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (
      form.image &&
      (/^https?:\/\/.+/i.test(form.image.trim()) ||
        /^data:image\/.+;base64,/.test(form.image.trim()))
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
      className="max-w-4xl mx-auto p-8 bg-white rounded-3xl shadow-lg border border-blue-300/40 flex flex-col gap-10"
      autoComplete="off"
      noValidate
      aria-live="polite"
    >
      <h2 className="text-4xl font-extrabold text-blue-700 select-none">
        {isEditing ? "Edit" : "Add"} Full Movie
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { name: "id", type: "number", label: "ID", disabled: isEditing },
          { name: "title", type: "text", label: "Title" },
          { name: "rating", type: "number", label: "Rating (0-10)", step: "0.1", min: 0, max: 10 },
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
          { name: "releaseDate", type: "date", label: "Release Date" },
          { name: "trailer", type: "url", label: "Trailer URL (optional)" },
          { name: "image", type: "url", label: "Image URL" },
        ].map(
          (
            { name, type, label, disabled, value, onChange: customOnChange, step, min, max },
            idx
          ) => (
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
                aria-invalid={errors[name] ? "true" : "false"}
                aria-describedby={`${name}-error`}
                ref={errors[name] && !firstErrorRef.current ? firstErrorRef : null}
                step={step}
                min={min}
                max={max}
                className={`peer block w-full appearance-none border-b-2 border-gray-300 bg-transparent px-4 pt-6 pb-2 text-gray-900
                  focus:border-blue-500 focus:outline-none focus:ring-0 transition duration-300
                  ${
                    errors[name]
                      ? "border-red-500 focus:border-red-600"
                      : "hover:border-blue-400"
                  }`}
              />
              <label
                htmlFor={name}
                className={`absolute left-4 top-2 text-gray-500 text-sm font-semibold
                  transition-all duration-300 pointer-events-none
                  peer-placeholder-shown:top-6 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
                  peer-focus:top-2 peer-focus:text-blue-600 peer-focus:text-sm
                  ${
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
          )
        )}
      </div>

      {showImagePreview && imageValid && (
        <div
          className="rounded-xl overflow-hidden w-full max-h-60 mx-auto border-4 border-blue-400 shadow-lg cursor-pointer hover:scale-105 transition-transform relative"
          style={{ aspectRatio: "16 / 9", maxWidth: "100%" }}
          onClick={() => window.open(form.image, "_blank")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") window.open(form.image, "_blank");
          }}
        >
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 z-10">
              <svg
                className="animate-spin h-8 w-8 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
            </div>
          )}
          <img
            src={form.image}
            alt={`Preview of ${form.title || "movie image"}`}
            className="w-full h-full object-contain bg-white"
            draggable={false}
            onError={() => setImageValid(false)}
            onLoad={() => setImageLoading(false)}
            onLoadStart={() => setImageLoading(true)}
            style={{ display: imageLoading ? "none" : "block" }}
          />
        </div>
      )}

      <div className="flex justify-end gap-6">
        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="rounded-full bg-gray-500 text-white font-bold py-3 px-8 shadow-md
              focus:outline-none focus:ring-4 focus:ring-gray-400
              disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          disabled={isSubmitDisabled}
          className="rounded-full bg-blue-600 text-white font-extrabold py-4 px-10 shadow-lg
            focus:outline-none focus:ring-4 focus:ring-blue-500
            disabled:opacity-60 disabled:cursor-not-allowed
            flex justify-center items-center text-lg transition-colors duration-300"
        >
          {isSubmitting
            ? isEditing
              ? "Updating..."
              : "Adding..."
            : isEditing
            ? "Update Movie"
            : "Add Movie"}
        </button>
      </div>
    </form>
  );
};

export default FullMoviesForm;

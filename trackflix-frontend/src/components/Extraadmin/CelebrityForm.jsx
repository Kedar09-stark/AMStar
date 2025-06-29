import React, { useState, useEffect, useRef } from "react";

const CelebrityForm = ({
  form,
  onChange,
  onSubmit,
  onCancel,
  isEditing,
  isSubmitting,
}) => {
  const [errors, setErrors] = useState({});
  const firstErrorRef = useRef(null);

  const validate = (values) => {
    const errs = {};

    if (!values.id || Number(values.id) <= 0) {
      errs.id = "ID must be a positive number.";
    }

    if (!values.name || values.name.trim().length < 2) {
      errs.name = "Name must be at least 2 characters.";
    }

    const img = values.img || "";
    const trimmedImg = img.trim();

    const isValidUrl =
      /^https?:\/\/.+/i.test(trimmedImg) || /^data:image\/.+;base64,/.test(trimmedImg);

    if (!trimmedImg) {
      errs.img = "Image URL is required.";
    } else if (!isValidUrl) {
      errs.img = "Please enter a valid image URL or base64 image data.";
    }

    return errs;
  };

  useEffect(() => {
    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0 && firstErrorRef.current) {
      firstErrorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      firstErrorRef.current.focus();
    }
  }, [form]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(e);
    }
  };

  const isSubmitDisabled = isSubmitting || Object.keys(errors).length > 0;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-8 bg-gradient-to-br from-indigo-50 via-white to-green-50 rounded-xl shadow-lg"
      noValidate
    >
      <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center select-none">
        {isEditing ? "Edit Celebrity" : "Add New Celebrity"}
      </h2>

      {/* ID */}
      <div className="mb-6">
        <label
          htmlFor="id"
          className="block mb-2 font-semibold text-indigo-700 dark:text-indigo-900"
        >
          ID
        </label>
        <input
          id="id"
          name="id"
          type="number"
          value={form.id || ""}
          onChange={onChange}
          disabled={isEditing || isSubmitting}
          className={`w-full rounded-md border-2 px-4 py-2 text-gray-900
            transition-colors duration-300
            focus:outline-none focus:ring-4
            ${
              errors.id
                ? "border-red-500 focus:ring-red-300"
                : "border-indigo-300 focus:ring-indigo-400"
            }`}
          ref={errors.id ? firstErrorRef : null}
          placeholder="Enter a positive number"
        />
        {errors.id && <p className="text-red-600 mt-1 text-sm font-semibold">{errors.id}</p>}
      </div>

      {/* Name */}
      <div className="mb-6">
        <label
          htmlFor="name"
          className="block mb-2 font-semibold text-indigo-700 dark:text-indigo-900"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name || ""}
          onChange={onChange}
          disabled={isSubmitting}
          className={`w-full rounded-md border-2 px-4 py-2 text-gray-900
            transition-colors duration-300
            focus:outline-none focus:ring-4
            ${
              errors.name
                ? "border-red-500 focus:ring-red-300"
                : "border-indigo-300 focus:ring-indigo-400"
            }`}
          ref={errors.name ? firstErrorRef : null}
          placeholder="Enter celebrity name"
        />
        {errors.name && <p className="text-red-600 mt-1 text-sm font-semibold">{errors.name}</p>}
      </div>

      {/* Image URL */}
      <div className="mb-6">
        <label
          htmlFor="img"
          className="block mb-2 font-semibold text-indigo-700 dark:text-indigo-900"
        >
          Image URL
        </label>
        <input
          id="img"
          name="img"
          type="url"
          value={form.img || ""}
          onChange={onChange}
          disabled={isSubmitting}
          className={`w-full rounded-md border-2 px-4 py-2 text-gray-900
            transition-colors duration-300
            focus:outline-none focus:ring-4
            ${
              errors.img
                ? "border-red-500 focus:ring-red-300"
                : "border-indigo-300 focus:ring-indigo-400"
            }`}
          ref={errors.img ? firstErrorRef : null}
          placeholder="Enter image URL (http:// or base64)"
        />
        {errors.img && <p className="text-red-600 mt-1 text-sm font-semibold">{errors.img}</p>}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 justify-center">
        <button
          type="submit"
          disabled={isSubmitDisabled}
          className={`flex-1 py-3 rounded-lg font-bold text-white
            ${
              isSubmitDisabled
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }
            transition-colors duration-300`}
        >
          {isEditing ? (isSubmitting ? "Updating..." : "Update") : isSubmitting ? "Adding..." : "Add"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1 py-3 rounded-lg font-bold bg-gray-400 hover:bg-gray-500 text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default CelebrityForm;

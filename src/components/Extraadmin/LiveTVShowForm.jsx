import React, { useState, useEffect, useRef } from "react";

const LiveTVShowForm = ({ form, onChange, onSubmit, onCancel, isEditing, isSubmitting }) => {
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const firstErrorRef = useRef(null);

  const validate = (values) => {
    const errs = {};
    if (!values.id || values.id <= 0) errs.id = "ID must be a positive number.";
    if (!values.title || values.title.trim().length < 2)
      errs.title = "Title must be at least 2 characters.";
    if (!values.rating || values.rating < 0 || values.rating > 10)
      errs.rating = "Rating must be between 0 and 10.";
    if (!values.trailer || !/^https?:\/\/.+/.test(values.trailer.trim()))
      errs.trailer = "Invalid trailer URL.";
    if (!values.image || !/^https?:\/\/.+/.test(values.image.trim()))
      errs.image = "Invalid image URL.";
    return errs;
  };

  useEffect(() => {
    const validationErrors = validate(form);
    setErrors(validationErrors);
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

  const fields = [
    { name: "id", type: "number" },
    { name: "title", type: "text" },
    { name: "rating", type: "number" },
    { name: "genres", type: "text" },
    { name: "releaseDate", type: "date" },
    { name: "trailer", type: "text" },
    { name: "image", type: "text" },
  ];

  return (
    <div className="max-w-3xl mx-auto p-10 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-3xl shadow-2xl border border-purple-700 relative">
      {success && (
        <p className="mb-6 text-green-400 font-bold text-center tracking-wide drop-shadow-md">
          ✔️ Success! The show was saved.
        </p>
      )}

      <form onSubmit={handleSubmit} noValidate autoComplete="off" className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 col-span-full text-center mb-10 drop-shadow-lg">
          {isEditing ? "Edit Live TV Show" : "Add Live TV Show"}
        </h2>

        {fields.map((field, idx) => {
          const label = field.name.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
          const error = errors[field.name];

          const handleChange = field.name === "genres"
            ? (e) => {
                const genresArray = e.target.value.split(",").map((g) => g.trim());
                onChange({ target: { name: "genres", value: genresArray } });
              }
            : onChange;

          const value =
            field.name === "genres"
              ? (Array.isArray(form.genres) ? form.genres.join(", ") : form.genres || "")
              : form[field.name] || "";

          return (
            <div key={field.name} className="relative">
              <input
                type={field.type}
                name={field.name}
                value={value}
                onChange={handleChange}
                placeholder=" "
                disabled={field.name === "id" && isEditing}
                ref={error && idx === 0 ? firstErrorRef : null}
                className={`peer w-full rounded-xl border-2 px-5 pt-6 pb-3 bg-gradient-to-tr from-indigo-800 via-purple-800 to-pink-800 text-white
                  placeholder-transparent
                  focus:outline-none focus:ring-4 focus:ring-pink-400 focus:ring-opacity-70
                  transition-all duration-300
                  ${
                    error
                      ? "border-pink-500 focus:border-pink-600"
                      : "border-transparent focus:border-transparent"
                  }
                `}
              />
              <label
                htmlFor={field.name}
                className={`absolute left-6 top-3 text-sm font-semibold tracking-wide text-pink-300
                  pointer-events-none
                  peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-pink-400
                  peer-focus:top-3 peer-focus:text-sm peer-focus:text-pink-200
                  transition-all duration-300
                  ${error ? "text-pink-400 peer-focus:text-pink-300" : ""}
                `}
              >
                {label}
              </label>
              {error && (
                <p className="mt-1 text-pink-400 font-semibold drop-shadow-md">{error}</p>
              )}
            </div>
          );
        })}

        <button
          type="submit"
          disabled={isSubmitting || Object.keys(errors).length > 0}
          className="col-span-full w-full mt-8 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700
            hover:from-pink-600 hover:via-purple-700 hover:to-indigo-800
            text-white font-extrabold text-2xl py-4 shadow-lg shadow-pink-700/50
            transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed
          "
        >
          {isSubmitting
            ? isEditing
              ? "Updating..."
              : "Saving..."
            : isEditing
            ? "Update Show"
            : "Add Show"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="col-span-full w-full mt-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 shadow-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default LiveTVShowForm;

import React, { useState, useEffect, useRef } from "react";

const LiveTVDetailsForm = ({
  form,
  onChange,
  onSubmit,
  onCancel,
  isEditing,
  isSubmitting,
}) => {
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const firstErrorRef = useRef(null);

  const validate = (values) => {
    const errs = {};
    if (!values.id || values.id <= 0) errs.id = "ID must be a positive number.";
    if (!values.title || values.title.trim().length < 2)
      errs.title = "Title must be at least 2 characters.";
    if (!values.trailer || !/^https?:\/\/.+/i.test(values.trailer.trim()))
      errs.trailer = "Enter a valid trailer URL.";
    if (!values.image || !/^https?:\/\/.+/i.test(values.image.trim()))
      errs.image = "Enter a valid image URL.";
    if (!values.rating || values.rating < 0 || values.rating > 10)
      errs.rating = "Rating must be between 0 and 10.";
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
    { name: "overview", type: "textarea" },
    { name: "releaseDate", type: "date" },
    { name: "status", type: "text" },
    { name: "rating", type: "number" },
    { name: "genres", type: "text" },
    { name: "episodeRuntime", type: "text" },
    { name: "seasons", type: "number" },
    { name: "episodes", type: "number" },
    { name: "language", type: "text" },
    { name: "country", type: "text" },
    { name: "networks", type: "text" },
    { name: "creators", type: "text" },
    { name: "cast", type: "text" },
    { name: "trailer", type: "text" },
    { name: "image", type: "text" },
    { name: "awards", type: "text" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-3xl shadow-lg border border-yellow-300/40 relative">
      {success && (
        <div className="mb-4 text-green-600 font-semibold text-center">
          Successfully saved!
        </div>
      )}
      <form onSubmit={handleSubmit} autoComplete="off" noValidate className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <h2 className="text-3xl font-extrabold col-span-full text-yellow-600 select-none">
          {isEditing ? "Edit Live TV Detail" : "Add Live TV Detail"}
        </h2>

        {fields.map((field, idx) => {
          const label = field.name
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (s) => s.toUpperCase());
          const error = errors[field.name];
          const isTextArea = field.type === "textarea";
          return (
            <div key={field.name} className="relative col-span-1">
              {isTextArea ? (
                <textarea
                  name={field.name}
                  value={form[field.name] || ""}
                  onChange={onChange}
                  placeholder={label}
                  disabled={isSubmitting}
                  ref={error && idx === 0 ? firstErrorRef : null}
                  className={`w-full min-h-[96px] rounded border-2 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition ${
                    error
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-yellow-400"
                  }`}
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name] || ""}
                  onChange={onChange}
                  placeholder={label}
                  disabled={field.name === "id" && isEditing}
                  ref={error && idx === 0 ? firstErrorRef : null}
                  className={`w-full rounded border-2 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition ${
                    error
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-yellow-400"
                  }`}
                />
              )}

              {error && (
                <p className="text-red-600 mt-1 font-semibold">{error}</p>
              )}
            </div>
          );
        })}

        <button
          type="submit"
          disabled={isSubmitting || Object.keys(errors).length > 0}
          className="col-span-full w-full mt-6 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold text-xl py-4 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting
            ? isEditing
              ? "Updating..."
              : "Saving..."
            : isEditing
            ? "Update Live TV Detail"
            : "Add Live TV Detail"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="col-span-full w-full mt-2 rounded-full bg-gray-400 text-white font-bold py-3 shadow-md hover:bg-gray-500 transition"
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default LiveTVDetailsForm;

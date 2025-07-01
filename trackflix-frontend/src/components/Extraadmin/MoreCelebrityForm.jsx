import React, { useState, useEffect, useRef } from "react";

const MoreCelebrityForm = ({
  form,
  onChange,
  onSubmit,
  onCancel,
  isEditing,
  isSubmitting,
}) => {
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [imageValid, setImageValid] = useState(false);
  const firstErrorRef = useRef(null);

  const validate = (values) => {
    const errs = {};
    if (!values.id || values.id <= 0) errs.id = "ID must be a positive number.";
    if (!values.name || values.name.trim().length < 2)
      errs.name = "Name must be at least 2 characters.";
    if (!values.img || !/^https?:\/\/.+/.test(values.img.trim()))
      errs.img = "Enter a valid image URL.";
    return errs;
  };

  useEffect(() => {
    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (form.img && /^https?:\/\/.+/.test(form.img.trim())) {
      setImageValid(true);
    } else {
      setImageValid(false);
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
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <>
      {success && (
        <div className="text-green-600 text-center mb-4 font-semibold">
          Success!
        </div>
      )}

      <div className="max-w-md mx-auto mb-8 bg-white border border-yellow-300 p-6 rounded-xl shadow-md relative">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <h2 className="text-2xl font-bold text-yellow-600">
            {isEditing ? "Edit Celebrity" : "Add New Celebrity"}
          </h2>

          {["id", "name", "img"].map((field, idx) => {
            const label =
              field === "id" ? "ID" : field === "name" ? "Name" : "Image URL";
            const type = field === "id" ? "number" : "text";
            const error = errors[field];
            return (
              <div key={field} className="relative">
                <input
                  type={type}
                  name={field}
                  value={form[field] || ""}
                  onChange={onChange}
                  placeholder=" "
                  disabled={field === "id" && isEditing}
                  ref={idx === 0 && error ? firstErrorRef : null}
                  className={`peer w-full border-b-4 px-4 pt-6 pb-2 bg-transparent text-gray-900 focus:outline-none transition-all duration-300 ${
                    error
                      ? "border-red-500 focus:border-red-600"
                      : "border-gray-300 focus:border-yellow-500"
                  }`}
                />
                <label
                  htmlFor={field}
                  className={`absolute left-4 top-2 text-sm text-gray-500 font-semibold transition-all duration-300 pointer-events-none
                    peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                    peer-focus:top-2 peer-focus:text-yellow-600 peer-focus:text-sm ${
                      error ? "text-red-500 peer-focus:text-red-600" : ""
                    }`}
                >
                  {label}
                </label>

                {error && (
                  <p className="text-red-600 mt-1 font-semibold">{error}</p>
                )}
              </div>
            );
          })}

          {imageValid && (
            <div
              className="rounded-xl overflow-hidden w-full max-h-48 border-2 border-yellow-400"
              style={{ aspectRatio: "16 / 9" }}
            >
              <img
                src={form.img}
                alt="Preview"
                className="w-full h-full object-contain bg-white"
                draggable={false}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || Object.keys(errors).length > 0}
            className="w-full mt-2 rounded-full bg-yellow-500 text-white font-bold py-3 shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? isEditing
                ? "Updating..."
                : "Saving..."
              : isEditing
              ? "Update"
              : "Add"}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="w-full mt-2 rounded-full bg-gray-400 text-white font-bold py-2 shadow-md"
            >
              Cancel
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default MoreCelebrityForm;

import React, { useState, useEffect, useRef } from "react";

const FullMovieDetailForm = ({
  form,
  onChange,
  onSubmit,
  onCancel,
  isEditing,
  isSubmitting,
}) => {
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [imageValid, setImageValid] = useState(false);
  const firstErrorRef = useRef(null);

  const validate = (values) => {
    const errs = {};
    if (!values.id || values.id <= 0) errs.id = "ID must be a positive number.";
    if (!values.title || values.title.trim().length < 2)
      errs.title = "Title must be at least 2 characters.";

    const img = values.image || "";
    const trimmedImg = img.trim();
    const isValidUrl =
      /^https?:\/\/.+/i.test(trimmedImg) || /^data:image\/.+;base64,/.test(trimmedImg);
    if (!trimmedImg) {
      errs.image = "Image URL is required.";
    } else if (!isValidUrl) {
      errs.image = "Please enter a valid image URL or base64 image data.";
    }

    if (values.rating != null && (values.rating < 0 || values.rating > 10))
      errs.rating = "Rating must be between 0 and 10.";

    const commaSeparatedFields = [
      "genres",
      "productionCompanies",
      "director",
      "writers",
      "cast",
      "similarMovies",
    ];
    commaSeparatedFields.forEach((field) => {
      const val = values[field];
      let str = "";
      if (Array.isArray(val)) str = val.join(", ");
      else if (typeof val === "string") str = val;
      if (!str.trim()) errs[field] = `Please enter at least one ${field}.`;
    });

    if (values.trailer) {
      const trailer = values.trailer.trim();
      if (trailer && !/^https?:\/\/.+/i.test(trailer))
        errs.trailer = "Please enter a valid trailer URL.";
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
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  const isSubmitDisabled = isSubmitting || Object.keys(errors).length > 0;

  const handleCommaSeparatedChange = (e, fieldName) => {
    onChange({
      target: {
        name: fieldName,
        value: e.target.value.split(",").map((v) => v.trim()),
      },
    });
  };

  const fields = [
    { name: "id", type: "number", label: "ID", disabled: isEditing, required: true },
    { name: "title", type: "text", label: "Title", required: true },
    { name: "overview", type: "text", label: "Overview", required: false },
    { name: "releaseDate", type: "date", label: "Release Date", required: false },
    { name: "rating", type: "number", label: "Rating (0-10)", step: "0.1", required: false },
    {
      name: "genres",
      type: "text",
      label: "Genres (comma-separated)",
      required: true,
      isCommaSeparated: true,
    },
    { name: "runtime", type: "number", label: "Runtime (min)", required: false },
    { name: "language", type: "text", label: "Language", required: false },
    { name: "country", type: "text", label: "Country", required: false },
    { name: "budget", type: "number", label: "Budget", required: false },
    { name: "boxOffice", type: "number", label: "Box Office", required: false },
    {
      name: "productionCompanies",
      type: "text",
      label: "Production Companies (comma-separated)",
      required: true,
      isCommaSeparated: true,
    },
    { name: "ageRating", type: "text", label: "Age Rating", required: false },
    {
      name: "director",
      type: "text",
      label: "Director(s) (comma-separated)",
      required: true,
      isCommaSeparated: true,
    },
    {
      name: "writers",
      type: "text",
      label: "Writers (comma-separated)",
      required: true,
      isCommaSeparated: true,
    },
    {
      name: "cast",
      type: "text",
      label: "Cast (comma-separated)",
      required: true,
      isCommaSeparated: true,
    },
    { name: "trailer", type: "url", label: "Trailer URL", required: false },
    {
      name: "image",
      type: "url",
      label: "Image URL",
      required: true,
    },
    {
      name: "similarMovies",
      type: "text",
      label: "Similar Movie IDs (comma-separated)",
      required: true,
      isCommaSeparated: true,
    },
  ];

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "2rem auto",
        padding: "1rem",
        borderRadius: "12px",
        backgroundColor: "#f9fafb",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          color: "#15803d",
          fontSize: "2rem",
          fontWeight: "900",
          letterSpacing: "1.5px",
        }}
      >
        {isEditing ? "Edit" : "Add"} Full Movie Detail
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: window.innerWidth < 640 ? "1fr" : "1fr 1fr",
            gap: "1rem 1rem",
          }}
        >
          {fields.map(({ name, type, label, disabled, required, isCommaSeparated, step }) => {
            const fieldValue = form[name];
            const displayValue = isCommaSeparated
              ? Array.isArray(fieldValue)
                ? fieldValue.join(", ")
                : fieldValue || ""
              : fieldValue || "";

            return (
              <div key={name} style={{ display: "flex", flexDirection: "column" }}>
                <label
                  htmlFor={name}
                  style={{
                    fontWeight: "600",
                    marginBottom: "0.3rem",
                    color: errors[name] ? "#dc2626" : "#065f46",
                  }}
                >
                  {label}
                  {required && <span style={{ color: "#dc2626" }}> *</span>}
                </label>
                <input
                  id={name}
                  type={type}
                  name={name}
                  value={displayValue}
                  disabled={disabled || isSubmitting}
                  onChange={
                    isCommaSeparated
                      ? (e) => handleCommaSeparatedChange(e, name)
                      : onChange
                  }
                  min={type === "number" ? 0 : undefined}
                  step={step}
                  style={{
                    padding: "0.5rem 0.75rem",
                    borderRadius: "6px",
                    border: errors[name]
                      ? "2px solid #dc2626"
                      : "1.5px solid #d1d5db",
                    outline: "none",
                    fontSize: "1rem",
                    color: "#111827",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                  aria-invalid={errors[name] ? "true" : "false"}
                  aria-describedby={`${name}-error`}
                  ref={errors[name] && !firstErrorRef.current ? firstErrorRef : null}
                />
                {errors[name] && (
                  <span
                    id={`${name}-error`}
                    role="alert"
                    style={{ color: "#dc2626", marginTop: "0.25rem", fontWeight: "600" }}
                  >
                    {errors[name]}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {showImagePreview && imageValid && (
          <div
            style={{
              marginTop: "2rem",
              textAlign: "center",
            }}
          >
            <img
              src={form.image}
              alt="Movie Preview"
              style={{
                width: "100%",
                maxHeight: "320px",
                borderRadius: "12px",
                border: "2px solid #22c55e",
                objectFit: "contain",
              }}
              onError={() => setImageValid(false)}
              onLoad={() => setImageValid(true)}
              draggable={false}
            />
          </div>
        )}

        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            flexDirection: window.innerWidth < 640 ? "column" : "row",
            justifyContent: isEditing ? "space-between" : "flex-end",
            gap: "1rem",
          }}
        >
          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              style={{
                padding: "0.6rem 1.25rem",
                backgroundColor: "#6b7280",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                fontWeight: "600",
              }}
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            disabled={isSubmitDisabled}
            style={{
              padding: "0.75rem 2rem",
              backgroundColor: isSubmitDisabled ? "#a7f3d0" : "#22c55e",
              color: isSubmitDisabled ? "#166534" : "white",
              border: "none",
              borderRadius: "6px",
              cursor: isSubmitDisabled ? "not-allowed" : "pointer",
              fontWeight: "700",
              fontSize: "1.1rem",
            }}
          >
            {isSubmitting
              ? isEditing
                ? "Updating..."
                : "Adding..."
              : isEditing
              ? "Update Movie Detail"
              : "Add Movie Detail"}
          </button>
        </div>

        {success && (
          <p
            style={{
              marginTop: "1rem",
              color: "#15803d",
              fontWeight: "700",
              textAlign: "center",
            }}
          >
            Successfully {isEditing ? "updated" : "added"} movie detail!
          </p>
        )}
      </form>
    </div>
  );
};

export default FullMovieDetailForm;

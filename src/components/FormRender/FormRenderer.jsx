import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { loadForm } from "../utils/storage";

function FormRenderer() {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedForm = loadForm(formId);
    if (savedForm) {
      setForm(savedForm);
      const initialFormData = {};
      savedForm.fields.forEach((field) => {
        initialFormData[field.id] = field.type === "checkbox" ? false : "";
      });
      setFormData(initialFormData);
    }
  }, [formId]);

  const handleChange = (fieldId, value) => {
    setFormData({ ...formData, [fieldId]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    form.fields.forEach((field) => {
      if (field.required && !formData[field.id]) {
        newErrors[field.id] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      // Here you would typically send the form data to a server
      alert("Form submitted successfully!");
    }
  };

  if (!form) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{form.name}</h1>
      <form onSubmit={handleSubmit}>
        {form.fields.map((field) => (
          <div key={field.id} className="mb-4">
            <label className="block mb-2">{field.label}</label>
            {field.type === "text" && (
              <input
                type="text"
                value={formData[field.id]}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className="p-2 border rounded w-full"
              />
            )}
            {field.type === "textarea" && (
              <textarea
                value={formData[field.id]}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className="p-2 border rounded w-full"
              />
            )}
            {field.type === "dropdown" && (
              <select
                value={formData[field.id]}
                onChange={(e) => handleChange(field.id, e.target.value)}
                className="p-2 border rounded w-full"
              >
                <option value="">Select an option</option>
                {field.options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
            {field.type === "checkbox" && (
              <input
                type="checkbox"
                checked={formData[field.id]}
                onChange={(e) => handleChange(field.id, e.target.checked)}
              />
            )}
            {field.type === "radio" && (
              <div>
                {field.options.map((option, index) => (
                  <label key={index} className="mr-4">
                    <input
                      type="radio"
                      value={option}
                      checked={formData[field.id] === option}
                      onChange={(e) => handleChange(field.id, e.target.value)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
            {errors[field.id] && (
              <p className="text-red-500">{errors[field.id]}</p>
            )}
          </div>
        ))}
        <button type="submit" className="p-2 bg-green-500 text-white rounded">
          Submit
        </button>
      </form>
    </div>
  );
}

export default FormRenderer;

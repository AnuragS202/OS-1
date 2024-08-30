import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { loadForm } from '../utils/storage';
import Navbar from "../Header/Navbar"

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
      savedForm.fields.forEach(field => {
        initialFormData[field.id] = field.type === 'checkbox' ? false : '';
      });
      setFormData(initialFormData);
    }
  }, [formId]);

  const handleChange = (fieldId, value) => {
    setFormData({ ...formData, [fieldId]: value }); 
    if (errors[fieldId]) {
      setErrors({ ...errors, [fieldId]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    form.fields.forEach(field => {
      if (field.required && !formData[field.id]) {
        newErrors[field.id] = 'This field is required';
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert('Form submitted successfully!');
    }
  };

  if (!form) return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-center text-gray-600">Loading...</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{form.name}</h2>
          <form onSubmit={handleSubmit}>
            {form.fields.map(field => (
              <div key={field.id} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </label>
                {field.type === 'text' && (
                  <input
                    type="text"
                    value={formData[field.id]}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className={`w-full px-3 py-2 border ${errors[field.id] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                  />
                )}
                {field.type === 'textarea' && (
                  <textarea
                    value={formData[field.id]}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className={`w-full px-3 py-2 border ${errors[field.id] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                  />
                )}
                {field.type === 'dropdown' && (
                  <select
                    value={formData[field.id]}
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    className={`w-full px-3 py-2 border ${errors[field.id] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500`}
                  >
                    <option value="">Select an option</option>
                    {field.options.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                )}
                {field.type === 'checkbox' && (
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData[field.id]}
                      onChange={(e) => handleChange(field.id, e.target.checked)}
                      className="mr-2 rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    <span className="text-sm text-gray-700">{field.label}</span>
                  </label>
                )}
                {field.type === 'radio' && (
                  <div>
                    {field.options.map((option, index) => (
                      <label key={index} className="flex items-center mr-4 mb-2">
                        <input
                          type="radio"
                          value={option}
                          checked={formData[field.id] === option}
                          onChange={(e) => handleChange(field.id, e.target.value)}
                          className="mr-2 rounded-full border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                )}
                {errors[field.id] && <p className="text-red-500 text-sm mt-1">{errors[field.id]}</p>}
              </div>
            ))}
            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormRenderer;
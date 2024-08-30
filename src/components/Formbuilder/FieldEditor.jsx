import React from 'react';

function FieldEditor({ field, updateField, removeField }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    updateField(field.id, { [name]: type === 'checkbox' ? checked : value });
  };

  const addOption = () => {
    const newOptions = [...field.options, `Option ${field.options.length + 1}`];
    updateField(field.id, { options: newOptions });
  };

  const updateOption = (index, value) => {
    const newOptions = [...field.options];
    newOptions[index] = value;
    updateField(field.id, { options: newOptions });
  };

  const removeOption = (index) => {
    const newOptions = field.options.filter((_, i) => i !== index);
    updateField(field.id, { options: newOptions });
  };

  return (
    <div className="mb-4 p-4 border rounded">
      <input
        type="text"
        name="label"
        value={field.label}
        onChange={handleChange}
        className="mb-2 p-2 border rounded"
      />
      <select
        name="type"
        value={field.type}
        onChange={handleChange}
        className="mb-2 p-2 border rounded"
      >
        <option value="text">Text</option>
        <option value="textarea">Text Area</option>
        <option value="dropdown">Dropdown</option>
        <option value="checkbox">Checkbox</option>
        <option value="radio">Radio Button</option>
      </select>
      <label className="ml-2">
        <input
          type="checkbox"
          name="required"
          checked={field.required}
          onChange={handleChange}
        />
        Required
      </label>
      {(field.type === 'dropdown' || field.type === 'radio') && (
        <div>
          <h4>Options:</h4>
          {field.options.map((option, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                className="mr-2 p-2 border rounded"
              />
              <button onClick={() => removeOption(index)} className="p-2 bg-red-500 text-white rounded">Remove</button>
            </div>
          ))}
          <button onClick={addOption} className="p-2 bg-green-500 text-white rounded">Add Option</button>
        </div>
      )}
      <button onClick={() => removeField(field.id)} className="mt-2 p-2 bg-red-500 text-white rounded">Remove Field</button>
    </div>
  );
}

export default FieldEditor;

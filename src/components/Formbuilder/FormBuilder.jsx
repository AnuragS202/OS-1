import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import FieldEditor from "./FieldEditor";
import { saveForm, loadForm } from "../utils/storage";

function FormBuilder() {
  const [fields, setFields] = useState([]);
  const [formName, setFormName] = useState("");

  useEffect(() => {
    const savedForm = loadForm();
    if (savedForm) {
      setFields(savedForm.fields);
      setFormName(savedForm.name);
    }
  }, []);

  const addField = (type) => {
    const newField = {
      id: uuidv4(),
      type,
      label: `New ${type} field`,
      required: false,
      options: type === "dropdown" || type === "radio" ? ["Option 1"] : [],
    };
    setFields([...fields, newField]);
  };

  const updateField = (id, updates) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, ...updates } : field,
      ),
    );
  };

  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const handleSave = () => {
    saveForm({ name: formName, fields });
    alert("Form saved successfully!");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Form Builder</h1>
      <input
        type="text"
        value={formName}
        onChange={(e) => setFormName(e.target.value)}
        placeholder="Form Name"
        className="mb-4 p-2 border rounded"
      />
      <div className="mb-4">
        <button
          onClick={() => addField("text")}
          className="mr-2 p-2 bg-blue-500 text-white rounded"
        >
          Add Text Field
        </button>
        <button
          onClick={() => addField("textarea")}
          className="mr-2 p-2 bg-blue-500 text-white rounded"
        >
          Add Text Area
        </button>
        <button
          onClick={() => addField("dropdown")}
          className="mr-2 p-2 bg-blue-500 text-white rounded"
        >
          Add Dropdown
        </button>
        <button
          onClick={() => addField("checkbox")}
          className="mr-2 p-2 bg-blue-500 text-white rounded"
        >
          Add Checkbox
        </button>
        <button
          onClick={() => addField("radio")}
          className="mr-2 p-2 bg-blue-500 text-white rounded"
        >
          Add Radio Button
        </button>
      </div>
      {fields.map((field) => (
        <FieldEditor
          key={field.id}
          field={field}
          updateField={updateField}
          removeField={removeField}
        />
      ))}
      <button
        onClick={handleSave}
        className="mt-4 p-2 bg-green-500 text-white rounded"
      >
        Save Form
      </button>
    </div>
  );
}

export default FormBuilder;

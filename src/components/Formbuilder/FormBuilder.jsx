import  { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import FieldEditor from './FieldEditor';
import { saveForm, loadForm } from '../utils/storage';
import Navbar from  "../Header/Navbar"

function FormBuilder() {
  const [fields, setFields] = useState([]);
  const [formName, setFormName] = useState('');

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
      options: type === 'dropdown' || type === 'radio' ? ['Option 1'] : [],
    };
    setFields([...fields, newField]);
  };

  const updateField = (id, updates) => {
    setFields(fields.map(field => field.id === id ? { ...field, ...updates } : field));
  };

  const removeField = (id) => {
    setFields(fields.filter(field => field.id !== id));
  };

  const handleSave = () => {
    saveForm({ name: formName, fields });
    alert('Form saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100">
   <Navbar/>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Form Builder</h1>
          <input
            type="text"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            placeholder="Form Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-6"
          />

          <div className="mb-6 flex flex-wrap gap-2">
            <button onClick={() => addField('text')} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">Add Text Field</button>
            <button onClick={() => addField('textarea')} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">Add Text Area</button>
            <button onClick={() => addField('dropdown')} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">Add Dropdown</button>
            <button onClick={() => addField('checkbox')} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">Add Checkbox</button>
            <button onClick={() => addField('radio')} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">Add Radio Button</button>
          </div>

          {fields.map(field => (
            <FieldEditor
              key={field.id}
              field={field}
              updateField={updateField}
              removeField={removeField}
            />
          ))}

          <button onClick={handleSave} className="mt-6 w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors">
            Save Form
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormBuilder;
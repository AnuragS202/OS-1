import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormBuilder from "./components/FormBuilder/FormBuilder";
import FormRenderer from "./components/FormRender/FormRenderer";


function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<FormBuilder />} />
          <Route path="/preview/:formId" element={<FormRenderer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

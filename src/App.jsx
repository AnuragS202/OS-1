// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormBuilder from "./components/Formbuilder/FormBuilder"
import FormRenderer from "./components/FormRender/FormRenderer"
import Header from './components/Header/Header';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Header />
        <Routes>
          <Route path="/" element={<FormBuilder />} />
          <Route path="/preview/:formId" element={<FormRenderer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
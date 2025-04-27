import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import StartPage from "./StartPage"; // ✅ Добавляем импорт StartPage
import ContactPage from "./pages/ContactPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} /> {/* ✅ Используем StartPage */}
        <Route path="/contacts" element={<ContactPage />} />
      </Routes>
    </Router>
  );
};

export default App;
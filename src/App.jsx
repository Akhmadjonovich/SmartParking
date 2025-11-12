// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SmartParking from "./pages/SmartParking";
import MapWithSearch from "./components/MapWithSearch";
// Agar boshqa sahifalar bo‘lsa, ularni ham import qilishingiz mumkin
// import Home from "./pages/Home";
// import About from "./pages/About";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SmartParking />} />
        <Route path="/map" element={<MapWithSearch />} />
        {/* Agar kelajakda boshqa sahifalar qo‘shilsa: */}
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  );
};

export default App;

// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SmartParking from "./pages/SmartParking";
import MapWithSearch from "./components/MapWithSearch";
import Login from "./pages/Login";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  if (!user) return <Login onLogin={handleLogin} />;

  return (
    <Router>
      <div>
        
        <Routes>
          <Route path="/" element={<SmartParking />} />
          <Route path="/map" element={<MapWithSearch />} />
          {/* Agar boshqa sahifaga login bo‘lmagan foydalanuvchi kirsa avtomatik "/" ga yo‘naltirish */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

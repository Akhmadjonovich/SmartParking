// src/components/ControlPanel.jsx
import { useState } from "react";

const ControlPanel = ({ onAdd, onReserve, onRemove }) => {
  const [plate, setPlate] = useState("");

  const handleAction = (action) => {
    if (!plate.trim()) return alert("Avtomobil raqamini kiriting!");
    action(plate.trim());
    setPlate("");
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3">
      {/* Input */}
      <input
        type="text"
        value={plate}
        onChange={(e) => setPlate(e.target.value.toUpperCase())}
        placeholder="01A123BC"
        maxLength={8}
        className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-gray-700 text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <button
          onClick={() => handleAction(onAdd)}
          className="bg-blue-500 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-600 transition w-full sm:w-auto"
        >
          Kiritish
        </button>

        <button
          onClick={() => handleAction(onReserve)}
          className="bg-yellow-300 text-white font-medium px-4 py-2 rounded-md hover:bg-yellow-400 transition w-full sm:w-auto"
        >
          Oldindan band qilish
        </button>

        <button
          onClick={() => handleAction(onRemove)}
          className="bg-red-500 text-white font-medium px-4 py-2 rounded-md hover:bg-red-600 transition w-full sm:w-auto"
        >
          Chiqish
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;

// src/pages/SmartParking.jsx
import { useState, useEffect } from "react";
import ParkingLot from "../components/ParkingLot";
import ControlPanel from "../components/ControlPanel";
import LogPanel from "../components/LogPanel";
import MapWithSearch from "../components/MapWithSearch";
import { Link } from "react-router-dom";

const SmartParking = () => {
  const totalSpots = 10;
  const ratePerHour = 1000;

  const [parkingSpots, setParkingSpots] = useState([]);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const initialSpots = Array.from({ length: totalSpots }, (_, i) => ({
      id: i,
      status: "free",
      car: null,
      time: null,
      reserveTimer: null,
    }));
    setParkingSpots(initialSpots);
  }, []);

  const isValidPlate = (plate) =>
    /^[0-9]{2}[A-Z]{1}[0-9]{3}[A-Z]{2}$/.test(plate);

  const addLog = (msg) => setLogs((prev) => [...prev, msg]);

  const renderUpdate = (newSpots) => setParkingSpots([...newSpots]);

  // 🚗 Mashinani joylashtirish
  const handleAddCar = (plate) => {
    if (!isValidPlate(plate)) return alert("Raqam noto‘g‘ri formatda! Masalan: 01A123BC");

    const newSpots = [...parkingSpots];
    const reserved = newSpots.find((s) => s.status === "reserved" && s.car?.plate === plate);

    if (reserved) {
      clearTimeout(reserved.reserveTimer);
      reserved.status = "occupied";
      reserved.time = new Date();
      addLog(`🚘 ${plate} bron joyga keldi (Joy ${reserved.id + 1})`);
      return renderUpdate(newSpots);
    }

    const free = newSpots.find((s) => s.status === "free");
    if (!free) return alert("Bo‘sh joy yo‘q!");

    free.status = "occupied";
    free.car = { plate };
    free.time = new Date();

    addLog(`🚗 ${plate} joy ${free.id + 1} ga kirdi (${free.time.toLocaleTimeString()})`);
    renderUpdate(newSpots);
  };

  // 🟡 Joyni oldindan band qilish
  const handleReserve = (plate) => {
    if (!isValidPlate(plate)) return alert("Raqam noto‘g‘ri formatda! Masalan: 01A123BC");

    const newSpots = [...parkingSpots];
    const free = newSpots.find((s) => s.status === "free");
    if (!free) return alert("Bo‘sh joy yo‘q!");

    free.status = "reserved";
    free.car = { plate };
    addLog(`🟡 ${plate} joy ${free.id + 1} ni oldindan band qildi.`);

    free.reserveTimer = setTimeout(() => {
      if (free.status === "reserved") {
        free.status = "free";
        free.car = null;
        addLog(`⏱️ ${plate} vaqtida kelmadi, joy ${free.id + 1} bo‘shatildi.`);
        renderUpdate(newSpots);
      }
    }, 60 * 1000); // 1 daqiqa test uchun

    renderUpdate(newSpots);
  };

  // 💸 Mashinani chiqarish
  const handleRemove = (plate) => {
    if (!isValidPlate(plate)) return alert("Raqam noto‘g‘ri formatda! Masalan: 01A123BC");

    const newSpots = [...parkingSpots];
    const spot = newSpots.find((s) => s.car?.plate === plate && s.status === "occupied");
    if (!spot) return alert("Bu raqamli mashina topilmadi yoki hali bron holatida.");

    const now = new Date();
    const diffHours = (now - spot.time) / 3600000;
    const roundedHours = Math.ceil(diffHours);
    const cost = roundedHours * ratePerHour;

    addLog(`💸 ${plate} chiqdi. Turgan vaqt: ${roundedHours} soat. To‘lov: ${cost} so‘m`);

    spot.status = "free";
    spot.car = null;
    spot.time = null;

    renderUpdate(newSpots);
  };

  return (
    <div className="min-h-screen  bg-gray-100 text-center p-6" >
      <h1 className="text-3xl font-bold text-gray-800 mb-4">🚗 Smart Parking tizimi</h1>

      <ControlPanel
        onAdd={handleAddCar}
        onReserve={handleReserve}
        onRemove={handleRemove}
      />

      <ParkingLot spots={parkingSpots} />

      <LogPanel logs={logs} />
      
      <Link to="/map">
      <div className="fixed bottom-6 right-6 shadow-lg bg-blue-500 py-3 px-5 rounded-xl overflow-hidden">
        <p>Map</p>
      </div>
      </Link>
    </div>
  );
};

export default SmartParking;

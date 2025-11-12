// src/components/ParkingSpot.jsx
const ParkingSpot = ({ spot }) => {
    const color =
      spot.status === "free"
        ? "bg-green-500"
        : spot.status === "reserved"
        ? "bg-yellow-500"
        : "bg-red-500";
  
    return (
      <div
        className={`h-20 flex items-center justify-center text-white font-bold rounded-xl shadow-md transition-transform hover:scale-105 ${color}`}
      >
        {spot.status === "free" ? `Joy ${spot.id + 1}` : spot.car?.plate}
      </div>
    );
  };
  
  export default ParkingSpot;
  
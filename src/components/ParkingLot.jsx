// src/components/ParkingLot.jsx
import ParkingSpot from "./ParkingSpot";

const ParkingLot = ({ spots }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 justify-center mt-6">
      {spots.map((spot) => (
        <ParkingSpot key={spot.id} spot={spot} />
      ))}
    </div>
  );
};

export default ParkingLot;

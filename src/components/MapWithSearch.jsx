import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import { Link } from "react-router-dom";
import { FaBackward } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

// Marker ikonkasi muammo bo'lsa uchun
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// GeoSearchControl-ni React-da qo'shish uchun component
const SearchControl = ({ provider }) => {
  const map = useMap();

  useEffect(() => {
    const searchControl = new GeoSearchControl({
      provider: provider,
      style: "bar",
      showMarker: true,
      showPopup: true,
      marker: {
        icon: new L.Icon.Default(),
        draggable: false,
      },
      popupFormat: ({ result }) => `Siz qidirgan joy: ${result.label}`,
      maxMarkers: 1,
      retainZoomLevel: false,
    });

    map.addControl(searchControl);

    return () => map.removeControl(searchControl);
  }, [map, provider]);

  return null;
};

const MapWithSearch = () => {
  const [position, setPosition] = useState([40.3750, 71.7830]); // Farg‘ona markazi
  const provider = new OpenStreetMapProvider();

  return (
    <div>
       <Link to="/"> <button className="fixed top-3 text-4xl right-3 z-10000"><IoIosClose/></button></Link>
    <MapContainer
      center={position}
      zoom={12}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={position}>
        <Popup>
          Boshlang‘ich nuqta: Farg‘ona markazi
        </Popup>
      </Marker>
      <SearchControl  provider={provider} />
    </MapContainer>
    </div>
  );
};

export default MapWithSearch;

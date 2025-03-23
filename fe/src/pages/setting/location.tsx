import { useState, useEffect } from "react";
import { MapPin, Globe } from "lucide-react";

const LocationSettings = () => {
  const [currentLocation, setCurrentLocation] = useState("Fetching...");
  const [newLocation, setNewLocation] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
          .then((res) => res.json())
          .then((data) => setCurrentLocation(data.display_name))
          .catch(() => setCurrentLocation("Location unavailable"));
      },
      () => setCurrentLocation("Location permission denied")
    );
  }, []);

  const handleLocationChange = () => {
    if (newLocation.trim()) {
      setCurrentLocation(newLocation);
      setNewLocation("");
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-white flex items-center gap-2">
        <Globe size={28} /> Location Settings
      </h1>
      
      <div className="bg-neutral-800 p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-lg font-semibold mb-2">Current Location</h2>
        <p className="bg-neutral-700 p-3 rounded-lg flex items-center gap-2">
          <MapPin size={18} className="text-blue-400" /> {currentLocation}
        </p>
        
        <h2 className="text-lg font-semibold mt-6 mb-2">Change Location</h2>
        <input
          type="text"
          className="w-full p-3 rounded-lg bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter new location"
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
        />
        <button
          className="mt-4 w-full bg-blue-600 p-3 rounded-lg hover:bg-blue-500 transition"
          onClick={handleLocationChange}
        >
          Save Location
        </button>
      </div>
    </div>
  );
};

export default LocationSettings;

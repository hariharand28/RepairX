import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = { width: '100%', height: '300px', borderRadius: '8px' };
const defaultCenter = { lat: 13.0827, lng: 80.2707 }; // Default: Chennai

export default function MapPicker({ onLocationSelect }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const [markerPos, setMarkerPos] = useState(null);

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarkerPos({ lat, lng });
    onLocationSelect({ lat, lng }); // Send back to parent component
  };

  if (loadError) return <div className="text-red-500">Error loading maps</div>;
  if (!isLoaded) return <div className="text-gray-400">Loading Map...</div>;

  return (
    <div className="mt-4">
      <p className="text-sm text-gray-400 mb-2">Click on the map to set service location:</p>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={11}
        center={defaultCenter}
        onClick={handleMapClick}
      >
        {markerPos && <Marker position={markerPos} />}
      </GoogleMap>
    </div>
  );
}
import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Crosshair, Map as MapIcon, X, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet Default Marker Icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// --- Top-Level Hook Components ---
function MapResizer() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 400);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}

function MapPicker({ onLocationSelect, setMapCenter, apiKey }) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setMapCenter([lat, lng]);
      try {
        const res = await fetch(`https://us1.locationiq.com/v1/reverse.php?key=${apiKey}&lat=${lat}&lon=${lng}&format=json`);
        const data = await res.json();
        const local = data.address.neighbourhood || data.address.suburb || data.address.residential || data.address.village;
        const city = data.address.city || data.address.town || data.address.state_district;
        let finalName = "Selected Location";
        if (local && city && local !== city) finalName = `${local}, ${city}`;
        else if (local || city) finalName = local || city;
        
        onLocationSelect(finalName);
      } catch (error) {
        onLocationSelect("Pinned Location");
      }
    },
  });
  return null;
}

// --- Main Component ---
export default function SearchBar() {
const API_KEY = "pk.066bee98376a53b74cfa0bd023e40629";

  const [location, setLocation] = useState('Detecting...');
  const [mapCenter, setMapCenter] = useState([12.8342, 79.7036]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [serviceQuery, setServiceQuery] = useState('');
  const [showMapModal, setShowMapModal] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchAddressFromCoords = async (latitude, longitude) => {
    try {
      const res = await fetch(`https://us1.locationiq.com/v1/reverse.php?key=${API_KEY}&lat=${latitude}&lon=${longitude}&format=json`);
      const data = await res.json();
      const local = data.address.neighbourhood || data.address.suburb || data.address.residential || data.address.village;
      const city = data.address.city || data.address.town || data.address.state_district;
      let finalName = "Current Location";
      if (local && city && local !== city) finalName = `${local}, ${city}`;
      else if (local || city) finalName = local || city;
      setLocation(finalName);
    } catch (e) {
      setLocation("Location Found");
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter([position.coords.latitude, position.coords.longitude]);
          fetchAddressFromCoords(position.coords.latitude, position.coords.longitude);
        },
        () => setLocation('Select Location')
      );
    } else {
      setLocation('Select Location');
    }
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (searchQuery.length < 3) return setResults([]);
      setIsLoading(true);
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&countrycodes=in&q=${searchQuery}&limit=5`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    const timer = setTimeout(fetchCities, 400); 
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleCurrentLocationClick = () => {
    setLocation('Detecting...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter([position.coords.latitude, position.coords.longitude]);
          fetchAddressFromCoords(position.coords.latitude, position.coords.longitude);
          setShowDropdown(false);
        },
        () => setLocation('Select Location')
      );
    }
  };

  const handleSearch = (e) => {
    e.preventDefault(); 
    navigate('/services'); 
  };

const handleServiceSearch = () => {
  if (serviceQuery.trim()) {
    // Navigates to services and passes the search term in the URL 
    navigate(`/services?q=${encodeURIComponent(serviceQuery)}`);
  } else {
    navigate('/services');
  }
};

  return (
    <>
    
      <div className="relative flex items-center w-full max-w-3xl bg-white rounded-full shadow-xl p-2 z-50">
        <div className="relative" ref={dropdownRef}>
          <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-2 px-5 py-2 border-r border-gray-200 hover:bg-gray-50 rounded-l-full w-64 min-h-[56px] transition-colors">
            <MapPin size={20} className="text-blue-600 flex-shrink-0" />
            <span className="text-xs font-bold text-gray-800 text-left leading-tight line-clamp-2">{location}</span>
          </button>

          {showDropdown && (
            <div className="absolute top-full left-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 overflow-hidden">
              <div className="relative">
                <input type="text" placeholder="Type any city in India..." className="w-full p-3 pl-10 text-sm bg-gray-50 rounded-xl outline-none mb-3 border border-gray-200 focus:border-blue-500 transition-colors" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} autoFocus />
                <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                {isLoading && <Loader2 className="absolute right-3 top-3 animate-spin text-blue-600" size={18} />}
              </div>

              <button onClick={handleCurrentLocationClick} className="w-full flex items-center gap-3 p-3 text-sm text-blue-600 font-bold hover:bg-blue-50 rounded-xl transition-colors mb-1">
                <Crosshair size={18} /> Get Current Location
              </button>

              <button onClick={() => { setShowMapModal(true); setShowDropdown(false); }} className="w-full flex items-center gap-3 p-3 text-sm text-gray-700 font-bold hover:bg-gray-50 rounded-xl transition-colors">
                <MapIcon size={18} className="text-gray-400" /> Choose on Map
              </button>

              <div className="h-px bg-gray-100 my-2" />

              <div className="max-h-60 overflow-y-auto">
                {results.length > 0 ? (
                  results.map((res, idx) => (
                    <button key={idx} onClick={() => { setLocation(res.display_name.split(',')[0]); setMapCenter([res.lat, res.lon]); setShowDropdown(false); setSearchQuery(''); }} className="w-full text-left p-3 text-xs font-medium text-gray-600 hover:bg-blue-50 rounded-xl border-b border-gray-50 last:border-0 transition-colors">
                      <p className="font-bold text-gray-800 text-sm">{res.display_name.split(',')[0]}</p>
                      <p className="text-[10px] text-gray-400 truncate">{res.display_name}</p>
                    </button>
                  ))
                ) : (
                  searchQuery.length >= 3 && !isLoading && <p className="p-3 text-xs text-gray-400 text-center">No results found</p>
                )}
              </div>
            </div>
          )}
        </div>

        <input type="text" placeholder="What service do you need?" className="flex-1 px-6 text-sm font-medium outline-none bg-transparent" value={serviceQuery} onChange={(e) => setServiceQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleServiceSearch()} />

        <button onClick={handleServiceSearch} className="bg-blue-600 text-white p-4 rounded-full hover:bg-blue-700 shadow-md transition-colors flex-shrink-0">
          <Search size={20} />
        </button>
      </div>
      

     {showMapModal && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#111827]/80 backdrop-blur-sm p-4">
    <div className="bg-white rounded-3xl p-6 w-full max-w-4xl shadow-2xl relative">
      <button 
        onClick={() => setShowMapModal(false)} 
        className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-[101]"
      >
        <X size={20} className="text-gray-600" />
      </button>
      <h3 className="text-2xl font-black text-[#111827] mb-6">Select Location</h3>

      {/* Guaranteed 450px Height Wrapper */}
      <div style={{ height: '450px', minHeight: '450px', width: '100%' }} className="rounded-2xl overflow-hidden border border-gray-200 relative z-10 bg-gray-100">
        
        {/* DIRECT INTERACTIVE MAP - NO CLICKS REQUIRED */}
        <MapContainer 
          center={mapCenter} 
          zoom={15} 
          style={{ height: '100%', width: '100%', zIndex: 20 }}
        >
          <MapResizer /> 
          
         <TileLayer 
  url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" 
  attribution='&copy; Google Maps'
/>


          <Marker position={mapCenter} />
          
          <MapPicker 
            onLocationSelect={(name) => { 
              setLocation(name); 
              setTimeout(() => setShowMapModal(false), 600); 
            }} 
            setMapCenter={setMapCenter} 
            apiKey={API_KEY} 
          />
        </MapContainer>

      </div>
    </div>
  </div>
)}
    </>
    
    
  );
}
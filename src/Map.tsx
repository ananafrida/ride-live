import React, { useState, useCallback } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

const defaultCenter = {
  lat: 41.544651, 
  lng: -72.651711,
};

// Define the Google Map component
const Map: React.FC = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  });

  const [center, setCenter] = useState(defaultCenter);

  const [markerPosition, setMarkerPosition] = useState(defaultCenter);

  // Function to handle map click and move the marker
  const onMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      setMarkerPosition({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      });
    }
  }, []);

  if (loadError) return <div>Error loading Google Maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={12}
      center={center}
      onClick={onMapClick} 
    >
      <Marker position={markerPosition} />
    </GoogleMap>
  );
};

export default Map;

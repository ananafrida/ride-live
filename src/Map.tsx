import React from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useQuery } from 'convex/react';
import { api } from '../convex/_generated/api'; 

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

const defaultCenter = {
  lat: 41.544651,
  lng: -72.651711,
};

const Map: React.FC = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
  });

  // Fetch locations using Convex query
  const locations = useQuery(api.locations.getLocations) || [];

  const center = locations.length > 0 
  ? { lat: locations[0].latitude, lng: locations[0].longitude }
  : defaultCenter;

  if (loadError) return <div>Error loading Google Maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      zoom={12}
      center={center}
    >
      {/* Render multiple markers using data from Convex */}
      {locations.length === 0 ? (
        <div>No locations found.</div>
      ) : (
        locations.map((location) => {
          console.log("Rendering marker at: ", location);
          return (
            <Marker
              key={location._id}
              position={{ lat: location.latitude, lng: location.longitude }}
            />
          );
        })
      )}
    </GoogleMap>
  );
};

export default Map;

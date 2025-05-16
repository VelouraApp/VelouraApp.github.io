
import React, { useEffect, useRef } from 'react';

// Add type definitions for the Google Maps API
declare global {
  interface Window {
    googleMapsCallback: () => void;
    google: any;
  }
}

// Add proper type definitions for Google Maps
interface GoogleMapProps {
  address: string;
  apiKey?: string;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ address, apiKey }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Define the callback function that will run once the API is loaded
    window.googleMapsCallback = () => {
      if (mapRef.current && window.google) {
        const geocoder = new window.google.maps.Geocoder();

        // Create the map instance
        mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
          zoom: 16,
          center: { lat: 46.7667, lng: 23.5833 }, // Default to Cluj-Napoca
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
          zoomControl: true,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        });

        // Geocode the address
        geocoder.geocode({ 'address': address }, (results: any, status: any) => {
          if (status === 'OK' && results[0] && mapInstanceRef.current) {
            mapInstanceRef.current.setCenter(results[0].geometry.location);
            
            // Add a marker
            new window.google.maps.Marker({
              map: mapInstanceRef.current,
              position: results[0].geometry.location,
              animation: window.google.maps.Animation.DROP,
              title: 'Veloura'
            });
          } else {
            console.error('Geocode was not successful for the following reason:', status);
          }
        });
      }
    };

    // Load the Google Maps script if it's not already loaded
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey || 'AIzaSyBDaeWicvigtP9xPv919E-RNoxfvC-Hqik'}&callback=googleMapsCallback`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
        delete window.googleMapsCallback;
      };
    } else {
      window.googleMapsCallback();
    }

  }, [address, apiKey]);

  return (
    <div 
      ref={mapRef} 
      className="w-full h-[400px] rounded-lg shadow-md"
      aria-label="Google Maps showing Veloura location"
    />
  );
};

export default GoogleMap;

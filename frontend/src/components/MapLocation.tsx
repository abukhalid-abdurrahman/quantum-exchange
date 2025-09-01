"use client";

import { GOOGLE_MAPS_API_KEY } from "@/lib/constants";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

interface MapLocationProps {
  geolocation: { lat: number; lng: number };
}

export default function MapLocation({ geolocation }: MapLocationProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback((map: any) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={geolocation}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      // options={{ styles: darkStyle }}
    >
      <Marker position={geolocation} />
    </GoogleMap>
  ) : null;
}

import { useEffect, useRef, useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  useMap,
  useMapsLibrary,
} from "@vis.gl/react-google-maps";

interface MapLocation {
  lat: number;
  lng: number;
  label?: string;
}

interface GoogleMapViewProps {
  pickup?: MapLocation | null;
  destination?: MapLocation | null;
  showRoute?: boolean;
  driverLocation?: MapLocation | null;
  driverIcon?: string;
  height?: string;
  interactive?: boolean;
  children?: React.ReactNode;
}

// Draws the route polyline between pickup and destination
const DirectionsRenderer = ({
  pickup,
  destination,
}: {
  pickup: MapLocation;
  destination: MapLocation;
}) => {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer | null>(null);

  useEffect(() => {
    if (!routesLibrary || !map) return;

    const renderer = new routesLibrary.DirectionsRenderer({
      map,
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: "#276EF1",
        strokeWeight: 4,
        strokeOpacity: 0.8,
      },
    });
    setDirectionsRenderer(renderer);

    return () => {
      renderer.setMap(null);
    };
  }, [routesLibrary, map]);

  useEffect(() => {
    if (!directionsRenderer || !routesLibrary) return;

    const directionsService = new routesLibrary.DirectionsService();
    directionsService
      .route({
        origin: { lat: pickup.lat, lng: pickup.lng },
        destination: { lat: destination.lat, lng: destination.lng },
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
      })
      .catch((e) => console.warn("Directions request failed:", e));
  }, [directionsRenderer, pickup, destination, routesLibrary]);

  return null;
};

// Fits the map bounds to show all markers
const MapBoundsHandler = ({
  pickup,
  destination,
}: {
  pickup?: MapLocation | null;
  destination?: MapLocation | null;
}) => {
  const map = useMap();
  const lastPointsRef = useRef<string>("");

  useEffect(() => {
    if (!map) return;

    const points = [pickup, destination].filter(
      (p): p is MapLocation => p != null
    );

    if (points.length === 0) return;

    // Create a string key of points to prevent re-triggering on same coordinates
    const currentPointsKey = JSON.stringify(points.map(p => ({ lat: p.lat.toFixed(6), lng: p.lng.toFixed(6) })));
    if (currentPointsKey === lastPointsRef.current) return;
    lastPointsRef.current = currentPointsKey;

    if (points.length === 1) {
      map.setCenter({ lat: points[0].lat, lng: points[0].lng });
      map.setZoom(15);
      return;
    }

    // Small delay to ensure container transition has started/finished before fitting
    const timeout = setTimeout(() => {
      const bounds = new google.maps.LatLngBounds();
      points.forEach((p) => bounds.extend({ lat: p.lat, lng: p.lng }));
      map.fitBounds(bounds, { top: 80, bottom: 80, left: 40, right: 40 });
    }, 100);

    return () => clearTimeout(timeout);
  }, [map, pickup, destination]);

  return null;
};

const GoogleMapView = ({
  pickup,
  destination,
  showRoute = false,
  driverLocation,
  driverIcon = "🚗",
  height = "100%",
  interactive = true,
  children,
}: GoogleMapViewProps) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  // Default center: Connaught Place, New Delhi
  const defaultCenter = { lat: 28.6315, lng: 77.2167 };
  const center = pickup
    ? { lat: pickup.lat, lng: pickup.lng }
    : defaultCenter;

  return (
    <APIProvider apiKey={apiKey}>
      <div style={{ height, width: "100%", position: "relative" }}>
        <Map
          defaultCenter={center}
          defaultZoom={13}
          mapId="DEMO_MAP_ID"
          gestureHandling={interactive ? "greedy" : "none"}
          disableDefaultUI={!interactive}
          zoomControl={interactive}
          clickableIcons={false}
          style={{ width: "100%", height: "100%" }}
        >
          <MapBoundsHandler
            pickup={pickup}
            destination={destination}
            driverLocation={driverLocation}
          />

          {/* Pickup Marker */}
          {pickup && (
            <AdvancedMarker position={{ lat: pickup.lat, lng: pickup.lng }}>
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: "#000",
                  border: "3px solid #fff",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                }}
              />
            </AdvancedMarker>
          )}

          {/* Destination Marker */}
          {destination && (
            <AdvancedMarker
              position={{ lat: destination.lat, lng: destination.lng }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 2,
                  background: "#000",
                  border: "3px solid #fff",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                  transform: "rotate(45deg)",
                }}
              />
            </AdvancedMarker>
          )}

          {/* Driver / Vehicle Marker */}
          {driverLocation && (
            <AdvancedMarker
              position={{ lat: driverLocation.lat, lng: driverLocation.lng }}
            >
              <div
                style={{
                  fontSize: 28,
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                }}
              >
                {driverIcon}
              </div>
            </AdvancedMarker>
          )}

          {/* Route Line */}
          {showRoute && pickup && destination && (
            <DirectionsRenderer pickup={pickup} destination={destination} />
          )}
        </Map>

        {/* Overlay children (ETA badges, cards, etc.) */}
        {children}
      </div>
    </APIProvider>
  );
};

export default GoogleMapView;

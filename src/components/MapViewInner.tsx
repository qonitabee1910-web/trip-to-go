import { useEffect } from 'react';
import type L from 'leaflet';
import { MapContainer, Marker, Popup, Polyline, TileLayer, useMap } from 'react-leaflet';

interface LocationPoint {
  lat: number;
  lng: number;
  label?: string;
}

interface MapViewInnerProps {
  center: [number, number];
  zoom: number;
  pickup?: LocationPoint | null;
  destination?: LocationPoint | null;
  onMapClick?: (lat: number, lng: number) => void;
  className?: string;
  showRoute?: boolean;
  pickupIcon: L.Icon;
  destIcon: L.Icon;
}

function MapUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
}

function ClickHandler({ onClick }: { onClick?: (lat: number, lng: number) => void }) {
  const map = useMap();

  useEffect(() => {
    if (!onClick) return;

    const handler = (event: L.LeafletMouseEvent) => onClick(event.latlng.lat, event.latlng.lng);
    map.on('click', handler);

    return () => {
      map.off('click', handler);
    };
  }, [map, onClick]);

  return null;
}

export default function MapViewInner({ center, zoom, pickup, destination, onMapClick, className = '', showRoute = false, pickupIcon, destIcon }: MapViewInnerProps) {
  const routeLine: [number, number][] = pickup && destination
    ? [[pickup.lat, pickup.lng], [destination.lat, destination.lng]]
    : [];

  return (
    <MapContainer center={center} zoom={zoom} className={`rounded-lg ${className}`} style={{ height: '100%', minHeight: 300 }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapUpdater center={center} zoom={zoom} />
      <ClickHandler onClick={onMapClick} />
      {pickup && (
        <Marker position={[pickup.lat, pickup.lng]} icon={pickupIcon}>
          <Popup>{pickup.label || 'Titik Jemput'}</Popup>
        </Marker>
      )}
      {destination && (
        <Marker position={[destination.lat, destination.lng]} icon={destIcon}>
          <Popup>{destination.label || 'Tujuan'}</Popup>
        </Marker>
      )}
      {showRoute && routeLine.length === 2 && (
        <Polyline positions={routeLine} color="hsl(var(--primary))" weight={4} dashArray="10, 6" />
      )}
    </MapContainer>
  );
}

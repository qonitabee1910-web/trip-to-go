import { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import type { ComponentType, ReactNode } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const pickupIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
});

const destIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
});

interface MapViewProps {
  center?: [number, number];
  zoom?: number;
  pickup?: { lat: number; lng: number; label?: string } | null;
  destination?: { lat: number; lng: number; label?: string } | null;
  onMapClick?: (lat: number, lng: number) => void;
  className?: string;
  showRoute?: boolean;
}

interface ReactLeafletModule {
  MapContainer: ComponentType<any>;
  Marker: ComponentType<any>;
  Popup: ComponentType<any>;
  Polyline: ComponentType<any>;
  TileLayer: ComponentType<any>;
  useMap: () => L.Map;
}

const LazyMapInner = lazy(() => import('./MapViewInner'));

export default function MapView({ center = [-6.2088, 106.8456], zoom = 13, pickup, destination, onMapClick, className = '', showRoute = false }: MapViewProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fallback = useMemo(
    () => (
      <div className={`rounded-lg bg-muted/50 border ${className}`} style={{ height: '100%', minHeight: 300 }} />
    ),
    [className],
  );

  if (!isClient) {
    return fallback;
  }

  return (
    <Suspense fallback={fallback}>
      <LazyMapInner
        center={center}
        zoom={zoom}
        pickup={pickup}
        destination={destination}
        onMapClick={onMapClick}
        className={className}
        showRoute={showRoute}
        pickupIcon={pickupIcon}
        destIcon={destIcon}
      />
    </Suspense>
  );
}

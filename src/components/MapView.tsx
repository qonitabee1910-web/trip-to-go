import { useEffect, useRef } from 'react';
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
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const destIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
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

export default function MapView({ center = [-6.2088, 106.8456], zoom = 13, pickup, destination, onMapClick, className = '', showRoute = false }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const routeLayerRef = useRef<L.Polyline | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      zoomControl: true,
      attributionControl: true,
    }).setView(center, zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    requestAnimationFrame(() => {
      map.invalidateSize();
    });

    return () => {
      routeLayerRef.current?.remove();
      markersLayerRef.current?.clearLayers();
      map.remove();
      mapRef.current = null;
      markersLayerRef.current = null;
      routeLayerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.setView(center, zoom);
    requestAnimationFrame(() => {
      mapRef.current?.invalidateSize();
    });
  }, [center, zoom]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const handleClick = (event: L.LeafletMouseEvent) => {
      onMapClick?.(event.latlng.lat, event.latlng.lng);
    };

    map.on('click', handleClick);
    return () => {
      map.off('click', handleClick);
    };
  }, [onMapClick]);

  useEffect(() => {
    const layerGroup = markersLayerRef.current;
    if (!layerGroup) return;

    layerGroup.clearLayers();
    routeLayerRef.current?.remove();
    routeLayerRef.current = null;

    if (pickup) {
      L.marker([pickup.lat, pickup.lng], { icon: pickupIcon })
        .bindPopup(popup.label || 'Titik Jemput')
        .addTo(layerGroup);
    }

    if (destination) {
      L.marker([destination.lat, destination.lng], { icon: destIcon })
        .bindPopup(destination.label || 'Tujuan')
        .addTo(layerGroup);
    }

    if (showRoute && pickup && destination) {
      routeLayerRef.current = L.polyline(
        [
          [pickup.lat, pickup.lng],
          [destination.lat, destination.lng],
        ],
        {
          color: 'hsl(var(--primary))',
          weight: 4,
          dashArray: '10, 6',
        },
      ).addTo(mapRef.current!);
    }
  }, [pickup, destination, showRoute]);

  return <div ref={containerRef} className={`rounded-lg ${className}`} style={{ height: '100%', minHeight: 300 }} />;
}

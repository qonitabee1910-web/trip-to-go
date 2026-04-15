import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { ArrowLeft, MapPin, Navigation, Clock, Check, X, Play, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import MapView from '@/components/MapView';
import { mockRideOrders, mockShuttleBookings } from '@/data/mockData';
import type { RideOrder, ShuttleBooking } from '@/data/mockData';

export default function DriverApp() {
  const nav = useNavigate();
  const [rideOrders, setRideOrders] = useState<RideOrder[]>(mockRideOrders);
  const [shuttleOrders] = useState<ShuttleBooking[]>(mockShuttleBookings);
  const [selectedOrder, setSelectedOrder] = useState<RideOrder | null>(null);

  const updateStatus = (id: string, status: RideOrder['status']) => {
    setRideOrders(prev => prev.map(o => o.id === id ? { ...o, status, driverName: 'Ahmad Fadli' } : o));
    if (selectedOrder?.id === id) setSelectedOrder(prev => prev ? { ...prev, status, driverName: 'Ahmad Fadli' } : null);
  };

  const statusColors: Record<string, string> = {
    searching: 'bg-warning/10 text-warning', accepted: 'bg-primary/10 text-primary',
    pickup: 'bg-primary/10 text-primary', in_progress: 'bg-success/10 text-success',
    completed: 'bg-muted text-muted-foreground', confirmed: 'bg-success/10 text-success',
    pending: 'bg-warning/10 text-warning',
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b p-4 flex items-center gap-3">
        <button onClick={() => nav('/')} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="font-bold">Driver Panel</h1>
          <p className="text-xs text-muted-foreground">Ahmad Fadli</p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 grid lg:grid-cols-2 gap-4">
        {/* Orders list */}
        <div className="space-y-4">
          <h2 className="font-semibold">Pesanan Ride</h2>
          {rideOrders.map(o => (
            <Card key={o.id} className={`cursor-pointer transition-all ${selectedOrder?.id === o.id ? 'ring-2 ring-primary' : 'hover:shadow-md'}`} onClick={() => setSelectedOrder(o)}>
              <CardContent className="p-3">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-mono text-xs text-muted-foreground">{o.id}</span>
                  <Badge variant="secondary" className={statusColors[o.status]}>{o.status}</Badge>
                </div>
                <div className="text-sm font-medium mb-1">{o.passengerName}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="w-3 h-3 text-success" />{o.pickupAddress}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground"><Navigation className="w-3 h-3 text-destructive" />{o.destAddress}</div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-muted-foreground">{o.distance} km • {o.duration} min</span>
                  <span className="text-sm font-bold text-primary">Rp{o.price.toLocaleString('id')}</span>
                </div>
                {o.status === 'searching' && (
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" className="flex-1" onClick={e => { e.stopPropagation(); updateStatus(o.id, 'accepted'); }}>
                      <Check className="w-3 h-3 mr-1" /> Terima
                    </Button>
                    <Button size="sm" variant="outline" onClick={e => { e.stopPropagation(); updateStatus(o.id, 'cancelled'); }}>
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                )}
                {o.status === 'accepted' && (
                  <Button size="sm" className="w-full mt-3" onClick={e => { e.stopPropagation(); updateStatus(o.id, 'in_progress'); }}>
                    <Play className="w-3 h-3 mr-1" /> Mulai Perjalanan
                  </Button>
                )}
                {o.status === 'in_progress' && (
                  <Button size="sm" variant="outline" className="w-full mt-3 text-success border-success" onClick={e => { e.stopPropagation(); updateStatus(o.id, 'completed'); }}>
                    <CheckCircle className="w-3 h-3 mr-1" /> Selesai
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}

          <h2 className="font-semibold mt-6">Pesanan Shuttle</h2>
          {shuttleOrders.map(b => (
            <Card key={b.id}>
              <CardContent className="p-3">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-mono text-xs text-muted-foreground">{b.id}</span>
                  <Badge variant="secondary" className={statusColors[b.status]}>{b.status}</Badge>
                </div>
                <div className="text-sm font-medium">{b.passengerName}</div>
                <div className="text-xs text-muted-foreground">{b.rayon.name} • {b.pickupPoint.name}</div>
                <div className="text-xs text-muted-foreground">{b.date} {b.time} • Kursi {b.selectedSeat}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Map */}
        <div className="h-[500px] lg:h-auto lg:min-h-[600px] rounded-xl overflow-hidden border">
          {selectedOrder ? (
            <MapView
              pickup={{ lat: selectedOrder.pickupLat, lng: selectedOrder.pickupLng, label: selectedOrder.pickupAddress }}
              destination={{ lat: selectedOrder.destLat, lng: selectedOrder.destLng, label: selectedOrder.destAddress }}
              showRoute
              center={[selectedOrder.pickupLat, selectedOrder.pickupLng]}
              zoom={12}
            />
          ) : (
            <MapView center={[-6.2088, 106.8456]} zoom={11} />
          )}
        </div>
      </div>
    </div>
  );
}

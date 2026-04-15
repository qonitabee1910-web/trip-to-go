import { ArrowLeft, MapPin, Navigation, Bus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BottomNav from '@/components/BottomNav';
import { mockRideOrders, mockShuttleBookings } from '@/data/mockData';

const statusColors: Record<string, string> = {
  searching: 'bg-warning/10 text-warning',
  accepted: 'bg-primary/10 text-primary',
  completed: 'bg-success/10 text-success',
  confirmed: 'bg-success/10 text-success',
  pending: 'bg-warning/10 text-warning',
  cancelled: 'bg-destructive/10 text-destructive',
};

export default function CustomerHistory() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto p-4">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => nav('/customer')} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h2 className="font-bold text-lg">Riwayat Pesanan</h2>
        </div>

        <h3 className="font-semibold text-sm text-muted-foreground mb-2">Ride On-Demand</h3>
        <div className="space-y-2 mb-6">
          {mockRideOrders.map(o => (
            <Card key={o.id}>
              <CardContent className="p-3">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-mono text-muted-foreground">{o.id}</span>
                  <Badge variant="secondary" className={statusColors[o.status]}>{o.status}</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm"><MapPin className="w-3 h-3 text-success" />{o.pickupAddress}</div>
                <div className="flex items-center gap-2 text-sm"><Navigation className="w-3 h-3 text-destructive" />{o.destAddress}</div>
                <div className="flex justify-between mt-2 text-sm"><span>{o.distance} km • {o.duration} min</span><span className="font-bold text-primary">Rp{o.price.toLocaleString('id')}</span></div>
              </CardContent>
            </Card>
          ))}
        </div>

        <h3 className="font-semibold text-sm text-muted-foreground mb-2">Shuttle</h3>
        <div className="space-y-2">
          {mockShuttleBookings.map(b => (
            <Card key={b.id}>
              <CardContent className="p-3">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-mono text-muted-foreground">{b.id}</span>
                  <Badge variant="secondary" className={statusColors[b.status]}>{b.status}</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm"><Bus className="w-3 h-3 text-primary" />{b.rayon.name}</div>
                <div className="text-sm text-muted-foreground">{b.service.name} • {b.vehicle.name} • Kursi {b.selectedSeat}</div>
                <div className="flex justify-between mt-2 text-sm"><span>{b.date} {b.time}</span><span className="font-bold text-primary">Rp{b.price.toLocaleString('id')}</span></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

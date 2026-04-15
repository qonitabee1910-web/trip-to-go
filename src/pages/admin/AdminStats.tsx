import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockRideOrders, mockShuttleBookings } from '@/data/mockData';

export default function AdminStats() {
  const totalRide = mockRideOrders.reduce((s, o) => s + o.price, 0);
  const totalShuttle = mockShuttleBookings.reduce((s, b) => s + b.price, 0);
  const stats = [
    { label: 'Total Pesanan Ride', value: mockRideOrders.length, color: 'text-primary' },
    { label: 'Total Pesanan Shuttle', value: mockShuttleBookings.length, color: 'text-success' },
    { label: 'Pendapatan Ride', value: `Rp${totalRide.toLocaleString('id')}`, color: 'text-primary' },
    { label: 'Pendapatan Shuttle', value: `Rp${totalShuttle.toLocaleString('id')}`, color: 'text-success' },
  ];
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Statistik</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <Card key={s.label}>
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground font-medium">{s.label}</CardTitle></CardHeader>
            <CardContent><div className={`text-2xl font-bold ${s.color}`}>{s.value}</div></CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

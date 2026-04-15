import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { mockRideOrders, mockShuttleBookings } from '@/data/mockData';

const statusColors: Record<string, string> = {
  searching: 'bg-warning/10 text-warning',
  accepted: 'bg-primary/10 text-primary',
  completed: 'bg-success/10 text-success',
  confirmed: 'bg-success/10 text-success',
  pending: 'bg-warning/10 text-warning',
  cancelled: 'bg-destructive/10 text-destructive',
};

export default function AdminOrders() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Pesanan</h1>

      <Card>
        <CardHeader><CardTitle>Ride On-Demand</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Penumpang</TableHead>
                <TableHead>Dari</TableHead>
                <TableHead>Ke</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRideOrders.map(o => (
                <TableRow key={o.id}>
                  <TableCell className="font-mono text-xs">{o.id}</TableCell>
                  <TableCell>{o.passengerName}</TableCell>
                  <TableCell className="text-sm">{o.pickupAddress}</TableCell>
                  <TableCell className="text-sm">{o.destAddress}</TableCell>
                  <TableCell className="font-semibold">Rp{o.price.toLocaleString('id')}</TableCell>
                  <TableCell><Badge variant="secondary" className={statusColors[o.status]}>{o.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Shuttle</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Penumpang</TableHead>
                <TableHead>Rute</TableHead>
                <TableHead>Layanan</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockShuttleBookings.map(b => (
                <TableRow key={b.id}>
                  <TableCell className="font-mono text-xs">{b.id}</TableCell>
                  <TableCell>{b.passengerName}</TableCell>
                  <TableCell>{b.rayon.name}</TableCell>
                  <TableCell>{b.service.name}</TableCell>
                  <TableCell className="font-semibold">Rp{b.price.toLocaleString('id')}</TableCell>
                  <TableCell><Badge variant="secondary" className={statusColors[b.status]}>{b.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

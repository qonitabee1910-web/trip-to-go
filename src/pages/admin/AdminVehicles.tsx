import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { vehicleTypes } from '@/data/mockData';

export default function AdminVehicles() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Kelola Kendaraan</h1>
      <Card>
        <CardHeader><CardTitle>Daftar Kendaraan</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipe</TableHead>
                <TableHead>Kapasitas</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicleTypes.map(v => (
                <TableRow key={v.id}>
                  <TableCell className="font-medium">{v.image} {v.name}</TableCell>
                  <TableCell>{v.capacity} kursi</TableCell>
                  <TableCell><Badge variant="secondary" className="bg-success/10 text-success">Aktif</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

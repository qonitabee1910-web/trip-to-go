import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { rayons } from '@/data/mockData';

export default function AdminRayons() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Rayon & Rute</h1>
      <Card>
        <CardHeader><CardTitle>Daftar Rayon</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama Rute</TableHead>
                <TableHead>Dari</TableHead>
                <TableHead>Ke</TableHead>
                <TableHead>Titik Jemput</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rayons.map(r => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.name}</TableCell>
                  <TableCell>{r.from}</TableCell>
                  <TableCell>{r.to}</TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {r.pickupPoints.map(pp => (
                        <Badge key={pp.id} variant="secondary" className="text-xs">{pp.name}</Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

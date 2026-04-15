import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { rayons, serviceLevels, baseShuttlePrice } from '@/data/mockData';

export default function AdminPricing() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Kelola Harga</h1>
      <Card>
        <CardHeader><CardTitle>Harga per Rute & Layanan</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rute</TableHead>
                {serviceLevels.map(s => <TableHead key={s.id}>{s.icon} {s.name}</TableHead>)}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rayons.map(r => (
                <TableRow key={r.id}>
                  <TableCell className="font-medium">{r.name}</TableCell>
                  {serviceLevels.map(s => (
                    <TableCell key={s.id}>Rp{Math.round((baseShuttlePrice[r.id] || 150000) * s.priceMultiplier).toLocaleString('id')}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

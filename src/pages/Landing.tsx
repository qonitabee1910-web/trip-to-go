import { useNavigate } from 'react-router-dom';
import { Car, Shield, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const roles = [
  { path: '/customer', icon: Car, title: 'Customer', desc: 'Pesan ride atau shuttle', color: 'bg-primary/10 text-primary' },
  { path: '/admin', icon: Shield, title: 'Admin', desc: 'Kelola rute & armada', color: 'bg-warning/10 text-warning' },
  { path: '/driver', icon: Truck, title: 'Driver', desc: 'Terima & antar pesanan', color: 'bg-success/10 text-success' },
];

export default function Landing() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-background to-secondary/30">
      <div className="text-center mb-10 animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground text-2xl font-bold mb-4">
          R
        </div>
        <h1 className="text-3xl font-bold tracking-tight">RideApp</h1>
        <p className="text-muted-foreground mt-2">Ride On-Demand & Shuttle Booking</p>
      </div>
      <div className="grid gap-4 w-full max-w-sm">
        {roles.map(r => (
          <Card key={r.path} className="cursor-pointer hover:shadow-md transition-shadow border-border/50" onClick={() => nav(r.path)}>
            <CardContent className="flex items-center gap-4 p-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${r.color}`}>
                <r.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="font-semibold">{r.title}</div>
                <div className="text-sm text-muted-foreground">{r.desc}</div>
              </div>
              <Button variant="ghost" size="sm">Masuk →</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

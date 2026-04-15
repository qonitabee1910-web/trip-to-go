import { User, Mail, Phone, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import BottomNav from '@/components/BottomNav';

export default function CustomerProfile() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto p-4">
        <h2 className="font-bold text-lg mb-4">Profil</h2>
        <div className="flex flex-col items-center mb-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-3">
            <User className="w-10 h-10 text-primary" />
          </div>
          <h3 className="font-bold text-lg">Budi Santoso</h3>
          <p className="text-sm text-muted-foreground">Customer</p>
        </div>
        <Card className="mb-4">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-muted-foreground" /><span className="text-sm">budi@email.com</span></div>
            <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-muted-foreground" /><span className="text-sm">081234567890</span></div>
          </CardContent>
        </Card>
        <Button variant="outline" className="w-full" onClick={() => nav('/')}>
          <LogOut className="w-4 h-4 mr-2" /> Keluar
        </Button>
      </div>
      <BottomNav />
    </div>
  );
}

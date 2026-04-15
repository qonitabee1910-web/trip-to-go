import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Navigation, Search, Clock, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import MapView from '@/components/MapView';
import BottomNav from '@/components/BottomNav';
import { rideBaseFare, ridePerKm, ridePerMinute } from '@/data/mockData';

type Step = 'home' | 'pickup' | 'destination' | 'estimate' | 'confirmed' | 'tracking';

export default function CustomerHome() {
  const nav = useNavigate();
  const [step, setStep] = useState<Step>('home');
  const [pickup, setPickup] = useState<{ lat: number; lng: number; label: string } | null>(null);
  const [dest, setDest] = useState<{ lat: number; lng: number; label: string } | null>(null);
  const [pickupText, setPickupText] = useState('');
  const [destText, setDestText] = useState('');
  const [status, setStatus] = useState('');

  const handleMapClick = (lat: number, lng: number) => {
    const label = `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
    if (step === 'pickup') {
      setPickup({ lat, lng, label });
      setPickupText(label);
    } else if (step === 'destination') {
      setDest({ lat, lng, label });
      setDestText(label);
    }
  };

  const distance = pickup && dest
    ? Math.sqrt(Math.pow((pickup.lat - dest.lat) * 111, 2) + Math.pow((pickup.lng - dest.lng) * 111 * Math.cos(pickup.lat * Math.PI / 180), 2))
    : 0;
  const duration = Math.round(distance * 3.5);
  const price = Math.round(rideBaseFare + distance * ridePerKm + duration * ridePerMinute);

  const handleOrder = () => {
    setStep('confirmed');
    setStatus('Mencari driver...');
    setTimeout(() => setStatus('Driver ditemukan! Ahmad Fadli sedang menuju Anda'), 2000);
    setTimeout(() => { setStatus('Driver tiba. Perjalanan dimulai!'); setStep('tracking'); }, 4000);
  };

  return (
    <div className="h-screen flex flex-col relative">
      {/* Map */}
      <div className="flex-1 relative">
        <MapView
          pickup={pickup}
          destination={dest}
          onMapClick={handleMapClick}
          showRoute={step === 'estimate' || step === 'confirmed' || step === 'tracking'}
          className="h-full rounded-none"
        />
        {/* Back to landing */}
        <button onClick={() => nav('/')} className="absolute top-4 left-4 z-[1000] bg-card/90 backdrop-blur rounded-full w-10 h-10 flex items-center justify-center shadow-md border text-foreground">
          ←
        </button>
      </div>

      {/* Bottom panel */}
      <div className="bg-card border-t rounded-t-2xl p-4 pb-20 space-y-3 shadow-lg relative z-10">
        {step === 'home' && (
          <>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setStep('pickup')}>
              <Search className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1 bg-secondary/50 rounded-lg px-3 py-2.5 text-sm text-muted-foreground">
                Mau kemana hari ini?
              </div>
            </div>
            <Card className="cursor-pointer hover:shadow-sm" onClick={() => nav('/customer/shuttle')}>
              <CardContent className="flex items-center gap-3 p-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-lg">🚌</div>
                <div className="flex-1">
                  <div className="font-medium text-sm">Shuttle Antar Kota</div>
                  <div className="text-xs text-muted-foreground">Jakarta, Bandung, Semarang</div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </CardContent>
            </Card>
          </>
        )}

        {step === 'pickup' && (
          <div className="space-y-3">
            <div className="font-semibold flex items-center gap-2">
              <MapPin className="w-4 h-4 text-success" /> Pilih Titik Jemput
            </div>
            <p className="text-sm text-muted-foreground">Ketuk peta atau ketik alamat</p>
            <Input placeholder="Alamat jemput..." value={pickupText} onChange={e => setPickupText(e.target.value)} />
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep('home')}>Batal</Button>
              <Button className="flex-1" disabled={!pickup} onClick={() => setStep('destination')}>Lanjut</Button>
            </div>
          </div>
        )}

        {step === 'destination' && (
          <div className="space-y-3">
            <div className="font-semibold flex items-center gap-2">
              <Navigation className="w-4 h-4 text-destructive" /> Pilih Tujuan
            </div>
            <p className="text-sm text-muted-foreground">Ketuk peta atau ketik alamat</p>
            <Input placeholder="Alamat tujuan..." value={destText} onChange={e => setDestText(e.target.value)} />
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep('pickup')}>Kembali</Button>
              <Button className="flex-1" disabled={!dest} onClick={() => setStep('estimate')}>Cari Rute</Button>
            </div>
          </div>
        )}

        {step === 'estimate' && (
          <div className="space-y-3">
            <div className="font-semibold">Estimasi Perjalanan</div>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-secondary/50 rounded-lg">
                <div className="text-lg font-bold text-primary">{distance.toFixed(1)}</div>
                <div className="text-xs text-muted-foreground">km</div>
              </div>
              <div className="text-center p-3 bg-secondary/50 rounded-lg">
                <div className="text-lg font-bold text-primary flex items-center justify-center gap-1"><Clock className="w-4 h-4" />{duration}</div>
                <div className="text-xs text-muted-foreground">menit</div>
              </div>
              <div className="text-center p-3 bg-secondary/50 rounded-lg">
                <div className="text-lg font-bold text-primary">Rp{price.toLocaleString('id')}</div>
                <div className="text-xs text-muted-foreground">harga</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep('destination')}>Ubah</Button>
              <Button className="flex-1" onClick={handleOrder}>Pesan Sekarang</Button>
            </div>
          </div>
        )}

        {(step === 'confirmed' || step === 'tracking') && (
          <div className="space-y-3">
            <div className="font-semibold">Status Perjalanan</div>
            <div className="p-3 bg-primary/10 rounded-lg text-sm text-primary font-medium animate-fade-in">{status}</div>
            {step === 'tracking' && (
              <Button variant="outline" className="w-full" onClick={() => { setStep('home'); setPickup(null); setDest(null); setPickupText(''); setDestText(''); setStatus(''); }}>
                Selesai
              </Button>
            )}
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
}

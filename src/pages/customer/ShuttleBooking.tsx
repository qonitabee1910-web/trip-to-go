import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, Bus, Armchair, Check, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import SeatPicker from '@/components/SeatPicker';
import BottomNav from '@/components/BottomNav';
import { rayons, serviceLevels, vehicleTypes, baseShuttlePrice } from '@/data/mockData';
import type { Rayon, PickupPoint, ServiceLevel, VehicleType } from '@/data/mockData';
import jsPDF from 'jspdf';

type Step = 'rayon' | 'pickup' | 'service' | 'vehicle' | 'seat' | 'confirm' | 'ticket';

export default function ShuttleBooking() {
  const nav = useNavigate();
  const [step, setStep] = useState<Step>('rayon');
  const [rayon, setRayon] = useState<Rayon | null>(null);
  const [pickupPoint, setPickupPoint] = useState<PickupPoint | null>(null);
  const [service, setService] = useState<ServiceLevel | null>(null);
  const [vehicle, setVehicle] = useState<VehicleType | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('2026-04-20');
  const [time, setTime] = useState('08:00');

  const price = rayon && service
    ? Math.round((baseShuttlePrice[rayon.id] || 150000) * service.priceMultiplier)
    : 0;

  const bookingId = `SH${Date.now().toString(36).toUpperCase()}`;

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text('TIKET SHUTTLE', 105, 25, { align: 'center' });
    doc.setFontSize(10);
    doc.text('RideApp - Shuttle Booking', 105, 32, { align: 'center' });
    doc.line(20, 38, 190, 38);
    doc.setFontSize(12);
    const info = [
      ['Booking ID', bookingId],
      ['Rute', rayon?.name || ''],
      ['Titik Jemput', pickupPoint?.name || ''],
      ['Layanan', service?.name || ''],
      ['Kendaraan', vehicle?.name || ''],
      ['Kursi', selectedSeat || ''],
      ['Penumpang', name],
      ['Telepon', phone],
      ['Tanggal', date],
      ['Waktu', time],
      ['Harga', `Rp ${price.toLocaleString('id')}`],
    ];
    let y = 48;
    info.forEach(([label, val]) => {
      doc.setFont('helvetica', 'bold');
      doc.text(label, 25, y);
      doc.setFont('helvetica', 'normal');
      doc.text(`: ${val}`, 75, y);
      y += 8;
    });
    doc.line(20, y + 2, 190, y + 2);
    doc.setFontSize(9);
    doc.text('Tunjukkan tiket ini kepada driver saat boarding. Terima kasih!', 105, y + 12, { align: 'center' });
    doc.save(`ticket-${bookingId}.pdf`);
  };

  const StepHeader = ({ title, onBack }: { title: string; onBack: () => void }) => (
    <div className="flex items-center gap-3 mb-4">
      <button onClick={onBack} className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80">
        <ArrowLeft className="w-4 h-4" />
      </button>
      <h2 className="font-bold text-lg">{title}</h2>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-lg mx-auto p-4">
        {step === 'rayon' && (
          <>
            <StepHeader title="Pilih Rayon" onBack={() => nav('/customer')} />
            <div className="space-y-3">
              {rayons.map(r => (
                <Card key={r.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => { setRayon(r); setStep('pickup'); }}>
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Bus className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold">{r.name}</div>
                      <div className="text-sm text-muted-foreground">{r.pickupPoints.length} titik jemput</div>
                    </div>
                    <div className="text-sm font-semibold text-primary">Rp{(baseShuttlePrice[r.id] || 150000).toLocaleString('id')}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {step === 'pickup' && rayon && (
          <>
            <StepHeader title="Titik Jemput" onBack={() => setStep('rayon')} />
            <p className="text-sm text-muted-foreground mb-3">Rute: {rayon.name}</p>
            <div className="space-y-2">
              {rayon.pickupPoints.map(pp => (
                <Card key={pp.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => { setPickupPoint(pp); setStep('service'); }}>
                  <CardContent className="flex items-center gap-3 p-4">
                    <MapPin className="w-5 h-5 text-success" />
                    <span className="font-medium">{pp.name}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {step === 'service' && (
          <>
            <StepHeader title="Pilih Layanan" onBack={() => setStep('pickup')} />
            <div className="space-y-3">
              {serviceLevels.map(s => (
                <Card key={s.id} className={`cursor-pointer transition-all ${service?.id === s.id ? 'ring-2 ring-primary shadow-md' : 'hover:shadow-md'}`} onClick={() => { setService(s); setStep('vehicle'); }}>
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className="text-2xl">{s.icon}</div>
                    <div className="flex-1">
                      <div className="font-semibold">{s.name}</div>
                      <div className="text-sm text-muted-foreground">{s.description}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-primary">x{s.priceMultiplier}</div>
                      {rayon && <div className="text-xs text-muted-foreground">Rp{Math.round((baseShuttlePrice[rayon.id] || 150000) * s.priceMultiplier).toLocaleString('id')}</div>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {step === 'vehicle' && (
          <>
            <StepHeader title="Pilih Kendaraan" onBack={() => setStep('service')} />
            <div className="space-y-3">
              {vehicleTypes.map(v => (
                <Card key={v.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => { setVehicle(v); setSelectedSeat(null); setStep('seat'); }}>
                  <CardContent className="flex items-center gap-3 p-4">
                    <div className="text-3xl">{v.image}</div>
                    <div className="flex-1">
                      <div className="font-semibold">{v.name}</div>
                      <div className="text-sm text-muted-foreground">{v.capacity} kursi</div>
                    </div>
                    <Armchair className="w-5 h-5 text-muted-foreground" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {step === 'seat' && vehicle && (
          <>
            <StepHeader title="Pilih Kursi" onBack={() => setStep('vehicle')} />
            <p className="text-sm text-muted-foreground mb-4">{vehicle.name} — {vehicle.capacity} kursi</p>
            <SeatPicker layout={vehicle.seatLayout} selectedSeat={selectedSeat} onSelectSeat={setSelectedSeat} />
            <Button className="w-full mt-4" disabled={!selectedSeat} onClick={() => setStep('confirm')}>
              Lanjut ke Konfirmasi
            </Button>
          </>
        )}

        {step === 'confirm' && (
          <>
            <StepHeader title="Konfirmasi Booking" onBack={() => setStep('seat')} />
            <Card className="mb-4">
              <CardContent className="p-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Rute</span><span className="font-medium">{rayon?.name}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Jemput</span><span className="font-medium">{pickupPoint?.name}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Layanan</span><span className="font-medium">{service?.name}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Kendaraan</span><span className="font-medium">{vehicle?.name}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Kursi</span><span className="font-semibold text-primary">{selectedSeat}</span></div>
                <hr className="my-2" />
                <div className="flex justify-between text-lg font-bold"><span>Total</span><span className="text-primary">Rp{price.toLocaleString('id')}</span></div>
              </CardContent>
            </Card>
            <div className="space-y-3">
              <Input placeholder="Nama penumpang" value={name} onChange={e => setName(e.target.value)} />
              <Input placeholder="Nomor telepon" value={phone} onChange={e => setPhone(e.target.value)} />
              <div className="grid grid-cols-2 gap-3">
                <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
                <Input type="time" value={time} onChange={e => setTime(e.target.value)} />
              </div>
              <Button className="w-full" disabled={!name || !phone} onClick={() => setStep('ticket')}>
                <Check className="w-4 h-4 mr-1" /> Konfirmasi & Pesan
              </Button>
            </div>
          </>
        )}

        {step === 'ticket' && (
          <>
            <div className="text-center mt-8 mb-6">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-3">
                <Check className="w-8 h-8 text-success" />
              </div>
              <h2 className="text-xl font-bold">Booking Berhasil!</h2>
              <p className="text-sm text-muted-foreground mt-1">ID: {bookingId}</p>
            </div>
            <Card className="mb-4">
              <CardContent className="p-4 space-y-1.5 text-sm">
                <div className="font-bold text-center text-lg mb-2">{rayon?.name}</div>
                <div className="flex justify-between"><span className="text-muted-foreground">Jemput</span><span>{pickupPoint?.name}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Layanan</span><span>{service?.icon} {service?.name}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Kendaraan</span><span>{vehicle?.image} {vehicle?.name}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Kursi</span><span className="font-bold text-primary">{selectedSeat}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Penumpang</span><span>{name}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Tanggal</span><span>{date} {time}</span></div>
                <hr />
                <div className="flex justify-between text-lg font-bold"><span>Total</span><span className="text-primary">Rp{price.toLocaleString('id')}</span></div>
              </CardContent>
            </Card>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => window.print()}>🖨️ Print</Button>
              <Button className="flex-1" onClick={generatePDF}><Download className="w-4 h-4 mr-1" /> Download PDF</Button>
            </div>
            <Button variant="ghost" className="w-full mt-3" onClick={() => { setStep('rayon'); setRayon(null); setPickupPoint(null); setService(null); setVehicle(null); setSelectedSeat(null); setName(''); setPhone(''); }}>
              Booking Lagi
            </Button>
          </>
        )}
      </div>
      <BottomNav />
    </div>
  );
}

export interface Rayon {
  id: string;
  name: string;
  from: string;
  to: string;
  pickupPoints: PickupPoint[];
}

export interface PickupPoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

export interface ServiceLevel {
  id: string;
  name: string;
  description: string;
  priceMultiplier: number;
  icon: string;
}

export interface VehicleType {
  id: string;
  name: string;
  capacity: number;
  seatLayout: SeatLayout;
  image: string;
}

export interface SeatLayout {
  rows: number;
  cols: number;
  seats: SeatInfo[];
}

export interface SeatInfo {
  id: string;
  row: number;
  col: number;
  type: 'seat' | 'driver' | 'empty' | 'door';
  label: string;
  available: boolean;
}

export interface ShuttleBooking {
  id: string;
  rayon: Rayon;
  pickupPoint: PickupPoint;
  service: ServiceLevel;
  vehicle: VehicleType;
  selectedSeat: string;
  passengerName: string;
  passengerPhone: string;
  date: string;
  time: string;
  price: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
}

export interface RideOrder {
  id: string;
  pickupLat: number;
  pickupLng: number;
  pickupAddress: string;
  destLat: number;
  destLng: number;
  destAddress: string;
  distance: number;
  duration: number;
  price: number;
  status: 'searching' | 'accepted' | 'pickup' | 'in_progress' | 'completed' | 'cancelled';
  passengerName: string;
  driverName?: string;
}

export const rayons: Rayon[] = [
  {
    id: 'r1', name: 'Jakarta - Bandung', from: 'Jakarta', to: 'Bandung',
    pickupPoints: [
      { id: 'pp1', name: 'Terminal Lebak Bulus', lat: -6.2894, lng: 106.7742 },
      { id: 'pp2', name: 'Cibubur Junction', lat: -6.3692, lng: 106.8875 },
      { id: 'pp3', name: 'Bekasi Cyber Park', lat: -6.2486, lng: 106.9926 },
    ]
  },
  {
    id: 'r2', name: 'Jakarta - Semarang', from: 'Jakarta', to: 'Semarang',
    pickupPoints: [
      { id: 'pp4', name: 'Terminal Pulo Gadung', lat: -6.1886, lng: 106.8885 },
      { id: 'pp5', name: 'Cawang UKI', lat: -6.2477, lng: 106.8587 },
    ]
  },
  {
    id: 'r3', name: 'Bandung - Surabaya', from: 'Bandung', to: 'Surabaya',
    pickupPoints: [
      { id: 'pp6', name: 'Terminal Cicaheum', lat: -6.9017, lng: 107.6487 },
      { id: 'pp7', name: 'Pasteur Rest Area', lat: -6.8842, lng: 107.5889 },
    ]
  },
];

export const serviceLevels: ServiceLevel[] = [
  { id: 's1', name: 'Reguler', description: 'Layanan standar dengan harga terjangkau', priceMultiplier: 1, icon: '🚐' },
  { id: 's2', name: 'Executive', description: 'Kursi lebih lebar, AC ekstra, snack', priceMultiplier: 1.5, icon: '🚌' },
  { id: 's3', name: 'VIP', description: 'Kursi premium, WiFi, charger, makanan ringan', priceMultiplier: 2.2, icon: '✨' },
];

export const vehicleTypes: VehicleType[] = [
  {
    id: 'v1', name: 'HiAce', capacity: 15, image: '🚐',
    seatLayout: {
      rows: 5, cols: 4,
      seats: [
        { id: 'D', row: 0, col: 0, type: 'driver', label: 'Driver', available: false },
        { id: 'E', row: 0, col: 1, type: 'empty', label: '', available: false },
        { id: 'DR', row: 0, col: 3, type: 'door', label: 'Pintu', available: false },
        { id: 'A1', row: 1, col: 0, type: 'seat', label: 'A1', available: true },
        { id: 'A2', row: 1, col: 1, type: 'seat', label: 'A2', available: true },
        { id: 'A3', row: 1, col: 2, type: 'seat', label: 'A3', available: false },
        { id: 'A4', row: 1, col: 3, type: 'seat', label: 'A4', available: true },
        { id: 'B1', row: 2, col: 0, type: 'seat', label: 'B1', available: true },
        { id: 'B2', row: 2, col: 1, type: 'seat', label: 'B2', available: true },
        { id: 'B3', row: 2, col: 2, type: 'seat', label: 'B3', available: true },
        { id: 'B4', row: 2, col: 3, type: 'seat', label: 'B4', available: false },
        { id: 'C1', row: 3, col: 0, type: 'seat', label: 'C1', available: true },
        { id: 'C2', row: 3, col: 1, type: 'seat', label: 'C2', available: true },
        { id: 'C3', row: 3, col: 2, type: 'seat', label: 'C3', available: true },
        { id: 'C4', row: 3, col: 3, type: 'seat', label: 'C4', available: true },
        { id: 'D1', row: 4, col: 0, type: 'seat', label: 'D1', available: true },
        { id: 'D2', row: 4, col: 1, type: 'seat', label: 'D2', available: false },
        { id: 'D3', row: 4, col: 2, type: 'seat', label: 'D3', available: true },
        { id: 'D4', row: 4, col: 3, type: 'seat', label: 'D4', available: true },
      ]
    }
  },
  {
    id: 'v2', name: 'SUV', capacity: 6, image: '🚙',
    seatLayout: {
      rows: 3, cols: 3,
      seats: [
        { id: 'D', row: 0, col: 0, type: 'driver', label: 'Driver', available: false },
        { id: 'F1', row: 0, col: 2, type: 'seat', label: 'F1', available: true },
        { id: 'A1', row: 1, col: 0, type: 'seat', label: 'A1', available: true },
        { id: 'A2', row: 1, col: 1, type: 'seat', label: 'A2', available: false },
        { id: 'A3', row: 1, col: 2, type: 'seat', label: 'A3', available: true },
        { id: 'B1', row: 2, col: 0, type: 'seat', label: 'B1', available: true },
        { id: 'B2', row: 2, col: 1, type: 'seat', label: 'B2', available: true },
        { id: 'B3', row: 2, col: 2, type: 'seat', label: 'B3', available: true },
      ]
    }
  },
  {
    id: 'v3', name: 'MiniCar', capacity: 4, image: '🚗',
    seatLayout: {
      rows: 2, cols: 3,
      seats: [
        { id: 'D', row: 0, col: 0, type: 'driver', label: 'Driver', available: false },
        { id: 'F1', row: 0, col: 2, type: 'seat', label: 'F1', available: true },
        { id: 'A1', row: 1, col: 0, type: 'seat', label: 'A1', available: true },
        { id: 'A2', row: 1, col: 1, type: 'seat', label: 'A2', available: true },
        { id: 'A3', row: 1, col: 2, type: 'seat', label: 'A3', available: false },
      ]
    }
  },
];

export const mockRideOrders: RideOrder[] = [
  {
    id: 'RD001', pickupLat: -6.2088, pickupLng: 106.8456, pickupAddress: 'Monas, Jakarta',
    destLat: -6.1751, destLng: 106.8650, destAddress: 'Ancol, Jakarta Utara',
    distance: 8.5, duration: 25, price: 35000, status: 'searching',
    passengerName: 'Budi Santoso',
  },
  {
    id: 'RD002', pickupLat: -6.2297, pickupLng: 106.6894, pickupAddress: 'Bintaro, Tangerang Selatan',
    destLat: -6.2615, destLng: 106.8106, destAddress: 'Blok M, Jakarta Selatan',
    distance: 15.2, duration: 40, price: 55000, status: 'accepted',
    passengerName: 'Siti Rahayu', driverName: 'Ahmad Fadli',
  },
];

export const mockShuttleBookings: ShuttleBooking[] = [
  {
    id: 'SH001', rayon: rayons[0], pickupPoint: rayons[0].pickupPoints[0],
    service: serviceLevels[1], vehicle: vehicleTypes[0], selectedSeat: 'A1',
    passengerName: 'Dewi Lestari', passengerPhone: '081234567890',
    date: '2026-04-20', time: '08:00', price: 225000, status: 'confirmed',
  },
  {
    id: 'SH002', rayon: rayons[1], pickupPoint: rayons[1].pickupPoints[0],
    service: serviceLevels[2], vehicle: vehicleTypes[1], selectedSeat: 'F1',
    passengerName: 'Riko Pratama', passengerPhone: '089876543210',
    date: '2026-04-21', time: '10:00', price: 440000, status: 'pending',
  },
];

export const baseShuttlePrice: Record<string, number> = {
  'r1': 150000,
  'r2': 200000,
  'r3': 350000,
};

export const rideBaseFare = 7000;
export const ridePerKm = 3500;
export const ridePerMinute = 500;

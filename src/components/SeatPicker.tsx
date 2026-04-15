import { cn } from '@/lib/utils';
import type { SeatLayout } from '@/data/mockData';

interface SeatPickerProps {
  layout: SeatLayout;
  selectedSeat: string | null;
  onSelectSeat: (seatId: string) => void;
}

export default function SeatPicker({ layout, selectedSeat, onSelectSeat }: SeatPickerProps) {
  const grid: (typeof layout.seats[0] | null)[][] = [];
  for (let r = 0; r <= layout.rows; r++) {
    grid[r] = [];
    for (let c = 0; c < layout.cols; c++) {
      grid[r][c] = layout.seats.find(s => s.row === r && s.col === c) || null;
    }
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-xs text-muted-foreground mb-2 font-medium">Depan Kendaraan ↑</div>
      <div className="inline-flex flex-col gap-1.5 p-4 bg-muted/50 rounded-xl border">
        {grid.map((row, ri) => (
          <div key={ri} className="flex gap-1.5">
            {row.map((seat, ci) => {
              if (!seat) return <div key={ci} className="w-10 h-10" />;
              if (seat.type === 'empty' || seat.type === 'door') {
                return (
                  <div key={ci} className="w-10 h-10 flex items-center justify-center text-[10px] text-muted-foreground">
                    {seat.type === 'door' ? '🚪' : ''}
                  </div>
                );
              }
              if (seat.type === 'driver') {
                return (
                  <div key={ci} className="w-10 h-10 rounded-md bg-foreground/10 flex items-center justify-center text-[10px] text-muted-foreground font-medium">
                    🏎️
                  </div>
                );
              }
              const isSelected = selectedSeat === seat.id;
              const isAvailable = seat.available;
              return (
                <button
                  key={ci}
                  disabled={!isAvailable}
                  onClick={() => onSelectSeat(seat.id)}
                  className={cn(
                    'w-10 h-10 rounded-md text-xs font-semibold transition-all border',
                    isSelected && 'bg-primary text-primary-foreground border-primary shadow-md scale-105',
                    !isSelected && isAvailable && 'bg-card border-border hover:border-primary hover:bg-primary/10 cursor-pointer',
                    !isAvailable && 'bg-muted text-muted-foreground cursor-not-allowed opacity-50 line-through',
                  )}
                >
                  {seat.label}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-primary" /> Dipilih</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-card border" /> Tersedia</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-sm bg-muted opacity-50" /> Terisi</span>
      </div>
    </div>
  );
}

import { NavLink } from 'react-router-dom';
import { Home, Clock, User, Bus } from 'lucide-react';
import { cn } from '@/lib/utils';

const items = [
  { to: '/customer', icon: Home, label: 'Home' },
  { to: '/customer/shuttle', icon: Bus, label: 'Shuttle' },
  { to: '/customer/history', icon: Clock, label: 'Riwayat' },
  { to: '/customer/profile', icon: User, label: 'Profil' },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t safe-area-bottom">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        {items.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/customer'}
            className={({ isActive }) => cn(
              'flex flex-col items-center gap-0.5 text-[11px] font-medium transition-colors px-3 py-1',
              isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

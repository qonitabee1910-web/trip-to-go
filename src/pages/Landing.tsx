import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

const roleRedirectMap = {
  user: '/customer',
  admin: '/admin',
  driver: '/driver',
} as const;

export default function Landing() {
  const nav = useNavigate();
  const { user, role, loading } = useAuth();

  useEffect(() => {
    if (!loading && user && role) {
      nav(roleRedirectMap[role], { replace: true });
    }
  }, [loading, user, role, nav]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-background to-secondary/30">
      <div className="text-center mb-10 animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground text-2xl font-bold mb-4">
          R
        </div>
        <h1 className="text-3xl font-bold tracking-tight">RideApp</h1>
        <p className="text-muted-foreground mt-2">Ride On-Demand & Shuttle Booking</p>
      </div>
      <Button size="lg" onClick={() => nav('/auth')}>
        Masuk / Daftar
      </Button>
    </div>
  );
}

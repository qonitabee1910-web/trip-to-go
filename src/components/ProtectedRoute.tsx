import { Navigate } from 'react-router-dom';
import { useAuth, type AppRole } from '@/hooks/useAuth';

interface Props {
  children: React.ReactNode;
  requiredRole: AppRole;
}

const roleRedirectMap: Record<AppRole, string> = {
  user: '/customer',
  admin: '/admin',
  driver: '/driver',
};

export default function ProtectedRoute({ children, requiredRole }: Props) {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (role && role !== requiredRole) {
    return <Navigate to={roleRedirectMap[role]} replace />;
  }

  return <>{children}</>;
}

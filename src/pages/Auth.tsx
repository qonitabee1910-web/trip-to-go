import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const roleRedirectMap = {
  user: '/customer',
  admin: '/admin',
  driver: '/driver',
} as const;

export default function Auth() {
  const nav = useNavigate();
  const { user, role, loading, signIn, signUp } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user && role) {
      nav(roleRedirectMap[role], { replace: true });
    }
  }, [loading, user, role, nav]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) {
      toast({ title: 'Gagal masuk', description: error.message, variant: 'destructive' });
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await signUp(email, password, fullName);
    setSubmitting(false);
    if (error) {
      toast({ title: 'Gagal daftar', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Berhasil!', description: 'Cek email untuk verifikasi akun.' });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-background to-secondary/30">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary text-primary-foreground text-xl font-bold mb-3">
          R
        </div>
        <h1 className="text-2xl font-bold tracking-tight">RideApp</h1>
      </div>

      <Card className="w-full max-w-sm">
        <Tabs defaultValue="login">
          <CardHeader className="pb-2">
            <TabsList className="w-full">
              <TabsTrigger value="login" className="flex-1">Masuk</TabsTrigger>
              <TabsTrigger value="register" className="flex-1">Daftar</TabsTrigger>
            </TabsList>
          </CardHeader>

          <TabsContent value="login">
            <form onSubmit={handleSignIn}>
              <CardContent className="space-y-4">
                <CardDescription className="text-center">Masuk ke akun Anda</CardDescription>
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input id="login-email" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="email@contoh.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input id="login-password" type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••" />
                </div>
                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? 'Memproses...' : 'Masuk'}
                </Button>
              </CardContent>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={handleSignUp}>
              <CardContent className="space-y-4">
                <CardDescription className="text-center">Buat akun baru</CardDescription>
                <div className="space-y-2">
                  <Label htmlFor="reg-name">Nama Lengkap</Label>
                  <Input id="reg-name" value={fullName} onChange={e => setFullName(e.target.value)} required placeholder="Budi Santoso" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input id="reg-email" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="email@contoh.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password">Password</Label>
                  <Input id="reg-password" type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} placeholder="Minimal 6 karakter" />
                </div>
                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? 'Memproses...' : 'Daftar'}
                </Button>
              </CardContent>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}



# Auth RBAC (Driver, User, Admin)

## Ringkasan
Menambahkan sistem autentikasi dengan Role-Based Access Control (RBAC) menggunakan **Lovable Cloud** (Supabase). Tiga role: `user` (customer), `admin`, dan `driver`. Setiap role hanya bisa mengakses portal masing-masing.

---

## 1. Database Setup (Migrations)

### Migration 1: Role enum & user_roles table
```sql
CREATE TYPE public.app_role AS ENUM ('admin', 'driver', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
```

### Migration 2: Security definer function
```sql
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;
```

### Migration 3: RLS policies & auto-assign default role
- Users can read their own roles
- Trigger on `auth.users` insert to auto-assign `'user'` role
- RLS policy: authenticated users can SELECT their own roles

### Migration 4: Profiles table (optional basic info)
```sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```
With RLS: users read/update own profile. Auto-create on signup via trigger.

---

## 2. Frontend — New Files

### `src/pages/Auth.tsx`
- Login & Register form (email + password)
- Tab switch antara Login / Daftar
- Setelah login, redirect berdasarkan role:
  - `admin` → `/admin`
  - `driver` → `/driver`
  - `user` → `/customer`

### `src/hooks/useAuth.ts`
- Hook untuk session state (`user`, `role`, `loading`)
- Listen `onAuthStateChange`
- Fetch role dari `user_roles` table
- Expose `signIn`, `signUp`, `signOut`

### `src/components/ProtectedRoute.tsx`
- Wrapper component yang cek auth + role
- Redirect ke `/auth` jika belum login
- Redirect ke halaman sesuai role jika akses portal lain

---

## 3. Frontend — Modified Files

### `src/App.tsx`
- Wrap routes dengan `ProtectedRoute`:
  - `/customer/*` → requires role `user`
  - `/admin/*` → requires role `admin`
  - `/driver` → requires role `driver`
- Add `/auth` route

### `src/pages/Landing.tsx`
- Ubah dari pilih role manual → redirect ke `/auth` jika belum login, atau redirect ke portal sesuai role jika sudah login

### Customer/Admin/Driver headers
- Update tombol "Keluar" untuk call `signOut` dari Supabase

---

## 4. Flow

```text
User buka app → Landing
  ├── Belum login → Redirect ke /auth (Login/Register)
  │   └── Register → auto-assign role 'user'
  │   └── Login → fetch role → redirect ke portal
  ├── Sudah login (role: user) → /customer
  ├── Sudah login (role: admin) → /admin
  └── Sudah login (role: driver) → /driver
```

Admin bisa assign role `driver` atau `admin` ke user lain via admin panel (future enhancement).

---

## 5. Kebutuhan
- **Lovable Cloud** harus diaktifkan untuk Supabase auth & database
- Semua UI tetap Bahasa Indonesia
- Mock data tetap berfungsi untuk demo


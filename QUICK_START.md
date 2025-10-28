# ⚡ Quick Start Guide

## 📋 เริ่มต้นใช้งาน

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd summarize-project-vue
```

### 2. Setup Backend

```bash
cd backend
bun install
bun run db:generate
bun run db:push
bun run db:seed  # Optional
bun run dev
```

### 3. Setup Frontend (Terminal ใหม่)

```bash
cd frontend-nuxt
bun install
bun run dev
```

### 4. เปิด Browser

- Frontend: http://localhost:27802
- Backend API: http://localhost:27801

## 🌐 Deploy ขึ้น Production (ฟรีถาวร)

### 1. Database (Supabase)

1. ไปที่ [supabase.com](https://supabase.com) → สร้าง project
2. คัดลอก `DATABASE_URL`

### 2. Backend (Render)

1. ไปที่ [render.com](https://render.com)
2. New → Web Service → เลือก repository
3. Root Directory: `backend`
4. Build: `bun install && bun run db:generate`
5. Start: `bun run start`
6. Environment: `DATABASE_URL`, `PORT=27801`, `HOST=0.0.0.0`

### 3. Frontend (Vercel)

1. ไปที่ [vercel.com](https://vercel.com)
2. Import project → Set root: `frontend-nuxt`
3. Environment: `NUXT_PUBLIC_API_URL=https://your-backend.onrender.com`

**ดูรายละเอียดเต็ม**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

**ฟรีถาวร ไม่มีหมดอายุ!** 🎉

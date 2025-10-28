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

## 🌐 Deploy ขึ้น Production

### Backend (Railway)

1. ไปที่ [railway.app](https://railway.app)
2. สร้าง project ใหม่ → deploy จาก GitHub
3. เพิ่ม PostgreSQL database
4. Set environment variables:
   - `DATABASE_URL` (จาก PostgreSQL)
   - `PORT=27801`
   - `HOST=0.0.0.0`

### Frontend (Vercel)

1. ไปที่ [vercel.com](https://vercel.com)
2. Import project จาก GitHub
3. Set root directory: `frontend-nuxt`
4. Set environment variable:
   - `NUXT_PUBLIC_API_URL=https://your-backend.up.railway.app`

**ดูรายละเอียดเพิ่มเติม**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

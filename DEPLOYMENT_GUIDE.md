# 📖 คู่มือ Deploy Project บน Railway และ Vercel

## 🎯 สรุป

- **Backend**: Railway.app (ฟรี $5/เดือน)
- **Frontend**: Vercel (ฟรี)
- **Database**: PostgreSQL บน Railway

---

## 🚀 ขั้นตอนที่ 1: Deploy Backend บน Railway

### 1.1 เริ่มต้น

1. ไปที่ [Railway.app](https://railway.app) และสมัครสมาชิก
2. เลือก "New Project" → "Deploy from GitHub repo"
3. เลือก repository ของคุณ และเลือก folder `backend`

### 1.2 สร้าง PostgreSQL Database

1. ใน Project ของคุณ เลือก "+ New" → "Database" → "Add PostgreSQL"
2. Railway จะสร้าง PostgreSQL database ให้อัตโนมัติ
3. คลิกที่ database แล้วไปที่ tab "Variables"
4. คัดลอก `DATABASE_URL` (จะมี format อย่าง `postgresql://user:pass@host:port/db`)

### 1.3 ตั้งค่า Environment Variables

1. ไปที่ service ของ backend
2. เลือก tab "Variables"
3. เพิ่ม environment variables:
   ```
   PORT=27801
   HOST=0.0.0.0
   DATABASE_URL=<คัดลอกจาก PostgreSQL database>
   ```

### 1.4 Deploy

1. Railway จะเริ่ม build และ deploy อัตโนมัติ
2. รอจนเสร็จ (ประมาณ 2-3 นาที)
3. คลิก "Settings" → "Generate Domain" เพื่อสร้าง public URL
4. **บันทึก URL นี้ไว้!** (เช่น: `https://your-backend.up.railway.app`)

### 1.5 ตรวจสอบการทำงาน

เปิด browser ไปที่ `https://your-backend.up.railway.app/health`
ควรเห็น:

```json
{ "status": "ok", "timestamp": "..." }
```

---

## 🌐 ขั้นตอนที่ 2: Deploy Frontend บน Vercel

### 2.1 เริ่มต้น

1. ไปที่ [Vercel](https://vercel.com) และสมัครสมาชิก
2. เลือก "Add New..." → "Project" → "Import Git Repository"
3. เลือก repository ของคุณ

### 2.2 ตั้งค่า Project

- **Framework Preset**: Nuxt.js
- **Root Directory**: `frontend-nuxt`
- **Build Command**: `npm run build` (default)
- **Output Directory**: `.output/public` (default)

### 2.3 ตั้งค่า Environment Variables

ก่อนคลิก "Deploy" ให้เพิ่ม environment variable:

- **Key**: `NUXT_PUBLIC_API_URL`
- **Value**: `https://your-backend.up.railway.app` (URL จาก Railway)

### 2.4 Deploy

1. คลิก "Deploy"
2. รอจนเสร็จ (ประมาณ 1-2 นาที)
3. Vercel จะให้ URL (เช่น: `https://your-app.vercel.app`)

### 2.5 ตรวจสอบการทำงาน

1. เปิด browser ไปที่ URL ของ Vercel
2. เปิด Developer Tools (F12) → Console
3. ตรวจสอบว่า API calls ไปที่ backend URL ถูกต้อง

---

## 🔧 ขั้นตอนที่ 3: Setup Database (Seed Data - Optional)

หากต้องการ seed data เข้าไปใน database:

### วิธีการที่ 1: ผ่าน Prisma Studio (ท้องถิ่น)

1. เปลี่ยน `DATABASE_URL` ใน `.env` เป็น PostgreSQL URL จาก Railway
2. รันคำสั่ง:
   ```bash
   cd backend
   bun run db:push
   bun run db:seed
   ```

### วิธีการที่ 2: ผ่าน Railway Database

1. ไปที่ Railway → PostgreSQL database
2. คลิก "Query" → "Data"
3. ใช้ Railway's built-in SQL editor

---

## 📝 สรุป Environment Variables

### Backend (Railway)

```
PORT=27801
HOST=0.0.0.0
DATABASE_URL=postgresql://user:pass@host:port/db
```

### Frontend (Vercel)

```
NUXT_PUBLIC_API_URL=https://your-backend.up.railway.app
```

---

## 🐛 Troubleshooting

### Backend ไม่ทำงาน

- ตรวจสอบ logs ใน Railway → "Deployments"
- ตรวจสอบว่า `DATABASE_URL` ถูกต้อง
- ตรวจสอบว่า Prisma generate ทำงาน: `bun run db:generate`

### Frontend ไม่เชื่อมต่อ Backend

- ตรวจสอบ `NUXT_PUBLIC_API_URL` ใน Vercel
- เปิด Network tab ใน browser เพื่อดู API calls
- ตรวจสอบ CORS settings ใน backend

### Database Issues

- ตรวจสอบว่า `DATABASE_URL` format ถูกต้อง
- ลองรัน migration: `bun run db:push`
- ตรวจสอบ connection string ใน Railway database

---

## 📚 ไฟล์ที่สำคัญ

### Backend

- `backend/prisma/schema.prisma` - Database schema (PostgreSQL)
- `backend/railway.json` - Railway configuration
- `backend/nixpacks.toml` - Build configuration
- `backend/config.env` - Local development config

### Frontend

- `frontend-nuxt/nuxt.config.ts` - Nuxt configuration
- `frontend-nuxt/vercel.json` - Vercel configuration
- `frontend-nuxt/config.env` - Local development config

---

## ✅ Checklist ก่อน Deploy

- [ ] แก้ไข `prisma/schema.prisma` เป็น PostgreSQL
- [ ] สร้าง PostgreSQL database บน Railway
- [ ] ตั้งค่า `DATABASE_URL` ใน Railway
- [ ] Deploy backend สำเร็จ
- [ ] ตรวจสอบ `/health` endpoint ทำงาน
- [ ] ตั้งค่า `NUXT_PUBLIC_API_URL` ใน Vercel
- [ ] Deploy frontend สำเร็จ
- [ ] ตรวจสอบ frontend เชื่อมต่อ backend ได้

---

## 🎉 เสร็จแล้ว!

ตอนนี้คุณมี application ที่ deploy บน:

- Backend: `https://your-backend.up.railway.app`
- Frontend: `https://your-app.vercel.app`

ทุกครั้งที่ push code ใหม่ไปที่ GitHub, Railway และ Vercel จะ auto-deploy ให้อัตโนมัติ! 🚀

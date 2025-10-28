# 📖 คู่มือ Deploy Project ฟรีถาวร (ไม่มีหมดอายุ)

## 🎯 ตัวเลือกที่แนะนำ

### ✅ อันดับ 1: Supabase + Render (แนะนำ!)

- **Backend**: Render.com (ฟรีถาวร)
- **Frontend**: Vercel (ฟรีถาวร)
- **Database**: Supabase PostgreSQL (ฟรี 500MB)

**ข้อดี**:

- ✅ ฟรีถาวร ไม่มีหมดอายุ
- ✅ Supabase มี Dashboard, API auto-generate, Real-time
- ✅ PostgreSQL 500MB ฟรี
- ✅ Auto-deploy จาก GitHub

### ✅ อันดับ 2: Render ทั้งหมด (ง่ายที่สุด)

- **Backend**: Render.com (ฟรีถาวร)
- **Frontend**: Render Intelligence
- **Database**: Render PostgreSQL (ฟรี 90 วัน, ต่ออายุได้)

**ข้อดี**:

- ✅ ฟรีถาวร
- ✅ ใช้ Render ทั้งหมด (ง่าย)
- ✅ PostgreSQL ฟรี 1GB

---

## 🚀 Option 1: Deploy บน Supabase + Render

### ขั้นตอนที่ 1: สร้าง Database บน Supabase

#### 1.1 สมัครและสร้าง Project

1. ไปที่ [Supabase.com](https://supabase.com)
2. Sign up/Sign in
3. เลือก "New Project"
4. ตั้งชื่อ project: `summarize-project`
5. ตั้ง database password (บันทึกไว้)
6. เลือก Region: `Southeast Asia (Singapore)`
7. คลิก "Create new project"

#### 1.2 เตรียม Database

1. รอประมาณ 1-2 นาทีให้ project สร้างเสร็จ
2. ไปที่ "Project Settings" → "Database"
3. ดู "Connection string" → แถบ "URI"
4. คัดลอก URL (มี format: `postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres`)
5. **บันทึกไว้!**

#### 1.3 (Optional) Seed Database

ถ้าต้องการ seed data:

```bash
# เปลี่ยน DATABASE_URL ใน .env ชั่วคราว
cd backend
# ตั้งค่าใน config.env ชั่วคราว
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres"

# รัน migrations และ seed
bun run db:push
bun run db:seed
```

### ขั้นตอนที่ 2: Deploy Backend บน Render

#### 2.1 สร้าง Web Service

1. ไปที่ [Render.com](https://render.com)
2. Sign up/Sign in (ใช้ GitHub)
3. เลือก "New" → "Web Service"
4. เลือก repository ของคุณ
5. ตั้งค่า:
   - **Name**: `summarize-project-backend`
   - **Environment**: `Node`
   - **Region**: `Singapore`
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Build Command**: `bun install && bun run db:generate`
   - **Start Command**: `bun run start`

#### 2.2 ตั้งค่า Environment Variables

ใน Render Dashboard:

- คลิกที่ service → ไปที่ "Environment"
- เพิ่ม variables:
  ```
  PORT=27801
  HOST=0.0.0.0
  NODE_ENV=production
  DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres
  ```

#### 2.3 Deploy

1. Render จะเริ่ม build และ deploy อัตโนมัติ
2. รอประมาณ 3-5 นาที
3. คลิกที่ service → ดู "Public URL" (เช่น: `https://summarize-project-backend.onrender.com`)
4. **บันทึก URL นี้ไว้!**

#### 2.4 ตรวจสอบ

เปิด: `https://your-backend.onrender.com/health`
ควรเห็น:

```json
{ "status": "ok", "timestamp": "..." }
```

### ขั้นตอนที่ 3: Deploy Frontend บน Vercel

#### 3.1 สร้าง Project

1. ไปที่ [Vercel.com](https://vercel.com)
2. Sign up/Sign in
3. เลือก "Add New Project"
4. Import จาก GitHub repository
5. ตั้งค่า:
   - **Framework Preset**: Nuxt.js
   - **Root Directory**: `frontend-nuxt`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.output/public`

#### 3.2 ตั้งค่า Environment Variable

ก่อนคลิก "Deploy":

- **Variable**: `NUXT_PUBLIC_API_URL`
- **Value**: `https://your-backend.onrender.com` (URL จาก Render)

#### 3.3 Deploy

1. คลิก "Deploy"
2. รอประมาณ 1-2 นาที
3. Vercel จะให้ URL (เช่น: `https://your-app.vercel.app`)

---

## 🚀 Option 2: Deploy ทั้งหมดบน Render (ง่ายที่สุด)

### ขั้นตอนที่ 1: สร้าง PostgreSQL Database บน Render

1. ไปที่ [Render.com](https://render.com)
2. เลือก "New" → "PostgreSQL"
3. ตั้งค่า:
   - **Name**: `summarize-project-db`
   - **Database**: `summarize_project`
   - **User**: `summarize_user`
   - **Region**: `Singapore`
   - **Plan**: Free
4. คลิก "Create Database"
5. รอสักครู่
6. ไปที่ Database → "Connections" → คัดลอก "Internal Database URL"
7. **บันทึกไว้!**

### ขั้นตอนที่ 2: Deploy Backend

1. ไปที่ "New" → "Web Service"
2. เลือก repository
3. ตั้งค่าเหมือน Option 1 ข้อ 2.1
4. Environment Variables:
   ```
   PORT=27801
   HOST=0.0.0.0
   NODE_ENV=production
   DATABASE_URL=<Internal Database URL จาก Render>
   ```
5. Deploy

### ขั้นตอนที่ 3: Deploy Frontend

1. ไปที่ "New" → "Static Site"
2. เลือก repository
3. ตั้งค่า:
   - **Name**: `summarize-project-frontend`
   - **Root Directory**: `frontend-nuxt`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `frontend-nuxt/.output/public`
4. Environment Variable:
   ```
   NUXT_PUBLIC_API_URL=https://your-backend.onrender.com
   ```
5. Deploy

---

## 📝 สรุป Environment Variables

### Backend (Render)

```
PORT=27801
HOST=0.0.0.0
NODE_ENV=production
DATABASE_URL=postgresql://postgres:pass@host:port/db
```

### Frontend (Vercel)

```
NUXT_PUBLIC_API_URL=https://your-backend.onrender.com
```

---

## 🔑 Supabase Dashboard Features

Supabase มีฟีเจอร์ดีๆ:

- 📊 **Table Editor**: จัดการข้อมูลในตาราง
- 🔍 **SQL Editor**: รัน SQL queries
- 📡 **API Docs**: auto-generate API documentation
- 🔐 **Authentication**: user management (optional)
- 📈 **Metrics**: ดูสถิติการใช้งาน

เข้าใช้งาน:

1. ไปที่ [Supabase Dashboard](https://app.supabase.com)
2. เลือก project ของคุณ
3. ใช้ "Table Editor" เพื่อดู/แก้ไขข้อมูล

---

## 🐛 Troubleshooting

### Backend ไม่ connect Database

- ตรวจสอบ `DATABASE_URL` ใน Render
- ลองใช้ Connection Pooler URL จาก Supabase (port 6543 แทน 5432)
- ตรวจสอบ password ถูกต้อง

### Render Free Plan - Sleeping Service

- **ฟรี plan**: service จะ sleep หลังไม่ใช้งาน 15 นาที
- แก้ไข: upgrade to paid หรือใช้ Supabase (ไม่มี sleep)
- ทางเลือก: ใช้ Render PostgreSQL + Cron job เพื่อปัด service

### Frontend เชื่อมต่อไม่ได้

- ตรวจสอบ `NUXT_PUBLIC_API_URL` ใน Vercel
- ตรวจสอบ CORS ใน backend
- ดู console ใน browser (F12)

### Database ไม่มีข้อมูล

```bash
# Connect to Supabase Database
cd backend
# อัพเดต config.env ชั่วคราว
bun run db:push
bun run db:seed
```

---

## ✅ Checklist

### Supabase + Render

- [ ] สร้าง Supabase project
- [ ] คัดล่าย DATABASE_URL
- [ ] Deploy backend บน Render
- [ ] ตั้งค่า DATABASE_URL ใน Render
- [ ] ตรวจสอบ backend ทำงาน
- [ ] Deploy frontend บน Vercel
- [ ] ตั้งค่า NUXT_PUBLIC_API_URL
- [ ] ตรวจสอบ frontend ทำงาน

---

## 🎉 เสร็จแล้ว!

**URLs ของคุณ:**

- Backend: `https://your-backend.onrender.com`
- Frontend: `https://your-app.vercel.app`
- Database: [Supabase Dashboard](https://app.supabase.com)

**ฟรีถาวร ไม่มีหมดอายุ!** 🚀

---

## 📚 ตัวเลือกอื่น (ถ้าต้องการ)

### Fly.io

- **URL**: [fly.io](https://fly.io)
- **ฟรี**: 3 shared-cpu VMs
- **Database**: PostgreSQL (ฟรี 3GB)
- **ใช้**: dockerfile

### DigitalOcean App Platform

- **URL**: [digitalocean.com](https://digitalocean.com)
- **ฟรี**: $200 credit (2 เดือน)
- **Database**: Managed PostgreSQL

### Railway (เดิม)

- **URL**: [railway.app](https://railway.app)
- **ฟรี**: $5/เดือน (30 วัน)
- **แนะนำ**: ไม่ใช้ เพราะหมดอายุเร็ว

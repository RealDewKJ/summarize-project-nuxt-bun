# 📊 Meeting Summary Project

ระบบจัดการข้อมูลสรุปการประชุมประจำสัปดาห์ทีมพัฒนา

## 🏗️ Tech Stack

### Backend

- **Runtime**: Bun
- **Framework**: Elysia
- **ORM**: Prisma
- **Database**: PostgreSQL (Production) / SQLite (Development)

### Frontend

- **Framework**: Nuxt 3
- **State Management**: Pinia
- **Styling**: Custom CSS

## 📂 โครงสร้างโปรเจค

```
summarize-project-vue/
├── backend/              # Backend API
│   ├── src/
│   │   ├── index.ts      # Main server file
│   │   └── seed.ts       # Database seeder
│   ├── prisma/
│   │   ├── schema.prisma # Database schema
│   │   └── dev.db        # SQLite database (local only)
│   └── package.json
├── frontend-nuxt/        # Frontend Application
│   ├── pages/
│   ├── components/
│   ├── stores/
│   └── nuxt.config.ts
└── DEPLOYMENT_GUIDE.md   # 📖 ดูคู่มือ deploy
```

## 🚀 การใช้งาน Locally

### 1. Setup Backend

```bash
cd backend

# ติดตั้ง dependencies
bun install

# Generate Prisma client
bun run db:generate

# Push database schema
bun run db:push

# (Optional) Seed data
bun run db:seed

# เริ่ม development server
bun run dev
```

Backend จะรันที่ `http://localhost:27801`

### 2. Setup Frontend

```bash
cd frontend-nuxt

# ติดตั้ง dependencies
bun install

# เริ่ม development server
bun run dev
```

Frontend จะรันที่ `http://localhost:27802`

## 🌐 Deploy ขึ้น Production

ดูคู่มือทั้งหมดใน **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**

### สรุป:

- **Backend**: Deploy บน [Railway.app](https://railway.app)
- **Frontend**: Deploy บน [Vercel](https://vercel.com)
- **Database**: PostgreSQL บน Railway

## 📡 API Endpoints

### Backend API

- `GET /health` - Health check
- `GET /api/meeting` - ดึงข้อมูล meeting
- `POST /api/meeting` - บันทึกข้อมูล meeting

## 🔧 Environment Variables

### Backend

```
PORT=27801
HOST=0.0.0.0
DATABASE_URL=file:./dev.db  # Local
DATABASE_URL=postgresql://... # Production
```

### Frontend

```
NUXT_PUBLIC_API_URL=http://localhost:27801  # Local
NUXT_PUBLIC_API_URL=https://your-backend.up.railway.app  # Production
```

## 📝 Features

- ✅ จัดการข้อมูลการประชุม
- ✅ แสดงสถิติโปรเจค (In Progress, Completed, Issues)
- ✅ แสดงรายละเอียดโปรเจค
- ✅ แสดงรายการ Issues และ Code Reviews
- ✅ บันทึกข้อมูลลง Database
- ✅ Import/Export CSV
- ✅ Responsive Design

## 🛠️ Scripts

### Backend

```bash
bun run dev          # Start development server
bun run start        # Start production server
bun run db:generate  # Generate Prisma client
bun run db:push      # Push schema to database
bun run db:studio    # Open Prisma Studio
bun run db:seed      # Seed database
```

### Frontend

```bash
bun run dev          # Start development server
bun run build        # Build for production
bun run generate     # Generate static site
bun run preview      # Preview production build
```

## 📄 License

MIT

## 👥 Contributors

- Development Team

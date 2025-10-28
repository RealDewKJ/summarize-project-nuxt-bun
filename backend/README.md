# Backend API - Meeting Summary Project

Backend API สำหรับจัดการข้อมูลสรุปการประชุม ใช้ Bun + TypeScript + Prisma + SQLite

## 🚀 การติดตั้ง

### 1. ติดตั้ง Bun (ถ้ายังไม่มี)

```bash
# Windows (PowerShell)
powershell -c "irm bun.sh/install.ps1|iex"

# หรือติดตั้งผ่าน npm
npm install -g bun
```

### 2. ติดตั้ง Dependencies

```bash
cd backend
bun install
```

### 3. สร้างฐานข้อมูล

```bash
# Generate Prisma Client
bun run db:generate

# Push schema to database
bun run db:push

# Seed ข้อมูลจาก data.json (optional)
bun run db:seed
```

## 🏃‍♂️ การรันโปรเจค

### Development Mode (auto-reload)

```bash
bun run dev
```

### Production Mode

```bash
bun run start
```

Server จะรันที่ `http://localhost:3001`

## 📚 API Endpoints

### GET /api/meeting

ดึงข้อมูลการประชุมล่าสุด

**Response:**

```json
{
  "meetingInfo": {
    "title": "สรุปการประชุมประจำสัปดาห์ทีมพัฒนา ปี 2568",
    "date": "สัปดาห์ที่ 30 วันที่ 05/08/2568"
  },
  "projectStats": {
    "total": 44,
    "inProgress": 30,
    "completed": 14,
    "issues": 12
  },
  "projects": {
    "inProgress": [...],
    "completed": [...],
    "issues": [...]
  },
  "projectDetails": [...],
  "issuesDetails": [...],
  "codeReview": [...],
  "codeReviewer": "อารยา ฉายางาม (เอิร์น)"
}
```

### POST /api/meeting

บันทึก/อัพเดทข้อมูลการประชุม

**Request Body:** ส่งข้อมูลในรูปแบบเดียวกับ GET response

**Response:**

```json
{
  "success": true,
  "message": "Meeting data saved successfully"
}
```

### GET /health

ตรวจสอบสถานะ server

**Response:**

```json
{
  "status": "ok",
  "timestamp": "2025-09-30T..."
}
```

## 🗄️ Database

### Prisma Studio (Database GUI)

```bash
bun run db:studio
```

เปิดที่ `http://localhost:5555`

### Database Schema

- **MeetingData** - ข้อมูลหลักของการประชุม
- **Project** - รายชื่อโปรเจคและสถานะ
- **ProjectDetail** - รายละเอียดแต่ละโปรเจค
- **IssueDetail** - รายละเอียดปัญหา
- **CodeReview** - รายการ code review

## 🛠️ Commands

```bash
bun run dev          # รัน development server
bun run start        # รัน production server
bun run db:generate  # Generate Prisma Client
bun run db:push      # Sync schema กับ database
bun run db:studio    # เปิด Prisma Studio
bun run db:seed      # Seed ข้อมูลจาก data.json
```

## 📝 หมายเหตุ

- ฐานข้อมูล SQLite จะถูกสร้างที่ `backend/prisma/dev.db`
- ระบบจะเก็บเฉพาะข้อมูลล่าสุด (เขียนทับแบบเดิม)
- รองรับ CORS สำหรับการเชื่อมต่อจาก frontend

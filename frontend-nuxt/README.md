# Summarize Project - Nuxt Frontend

Frontend สำหรับระบบจัดการข้อมูลสรุปการประชุมประจำสัปดาห์ ใช้ Nuxt 3 + TypeScript + Pinia

## 🚀 การติดตั้งและรัน

### ข้อกำหนดเบื้องต้น

1. **Node.js** (เวอร์ชัน 18+)
2. **Backend API** กำลังรันอยู่ที่ `http://localhost:3001`

### การติดตั้ง

```bash
# ติดตั้ง dependencies
npm install

# สร้างไฟล์ environment
cp .env.example .env
```

### การรัน

```bash
# Development mode
npm run dev

# Production build
npm run build
npm run preview

# Generate static site
npm run generate
```

## 🌐 การเข้าถึง

- **Development:** http://localhost:3000
- **Preview:** http://localhost:3000 (หลัง build)

## 📁 โครงสร้างโปรเจค

```
frontend-nuxt/
├── components/          # Vue Components
│   ├── MeetingHeader.vue
│   ├── ProjectStatus.vue
│   ├── IssuesList.vue
│   ├── CodeReviewList.vue
│   ├── EditModal.vue
│   └── CSVReader.vue
├── stores/              # Pinia Stores
│   └── meetingStore.ts
├── pages/               # Nuxt Pages
│   └── index.vue
├── assets/              # Static Assets
│   └── css/
│       └── main.css
├── public/              # Public Assets
└── nuxt.config.ts       # Nuxt Configuration
```

## 🔧 Features

### ✅ ฟีเจอร์หลัก

- 📊 แสดงสรุปข้อมูลการประชุม
- ✏️ แก้ไขข้อมูลผ่าน Modal
- 📊 Import ไฟล์ CSV
- 📄 พิมพ์ออกเป็น PDF
- 🔄 เชื่อมต่อกับ Backend API
- 📱 Responsive Design

### 🔌 Backend Integration

- เชื่อมต่อกับ API ที่ `http://localhost:3001`
- Fallback เป็น `public/data.json` ถ้า API ไม่ทำงาน
- รองรับ CORS

## 🛠️ Configuration

### Environment Variables

สร้างไฟล์ `.env`:

```env
NUXT_PUBLIC_API_URL=http://localhost:3001
```

### Nuxt Config

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@pinia/nuxt", "@nuxt/ui"],
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || "http://localhost:3001",
    },
  },
});
```

## 📚 API Endpoints

Frontend เชื่อมต่อกับ Backend API:

- `GET /api/meeting` - ดึงข้อมูลการประชุม
- `POST /api/meeting` - บันทึกข้อมูลการประชุม

## 🎨 Components

### MeetingHeader

แสดงหัวข้อและวันที่การประชุม

### ProjectStatus

แสดงสถานะโครงการและสถิติ

### IssuesList

แสดงรายการปัญหาที่พบ

### CodeReviewList

แสดงรายการงานตรวจสอบ Code

### EditModal

Modal สำหรับแก้ไขข้อมูล

### CSVReader

Component สำหรับอ่านและ import ไฟล์ CSV

## 🗄️ State Management

ใช้ Pinia Store (`stores/meetingStore.ts`):

```typescript
const store = useMeetingStore();
const { meetingData, loadData, saveData } = store;
```

## 🔄 Data Flow

```
1. Load Data:
   API → Store → Components

2. Save Data:
   Components → Store → API

3. Fallback:
   API (fail) → data.json → Default Data
```

## 📱 Responsive Design

- Desktop: แสดงแบบเต็ม
- Tablet: ปรับ layout
- Mobile: ปรับปุ่มและ spacing

## 🖨️ Print Support

รองรับการพิมพ์เป็น PDF:

- ซ่อนปุ่มควบคุม
- ปรับขนาดตัวอักษร
- ปรับ layout สำหรับ A4

## 🔧 Development

### Scripts

```bash
npm run dev          # Development server
npm run build        # Build production
npm run preview      # Preview production
npm run generate     # Generate static
npm run backend:dev  # รัน backend dev server
```

### Backend Integration

```bash
# รัน Backend
npm run backend:dev

# เปิด Prisma Studio
npm run backend:studio

# Setup Database
npm run backend:setup
```

## 🐛 Troubleshooting

### ❌ API Connection Error

```bash
# ตรวจสอบ Backend
curl http://localhost:3001/health

# ตรวจสอบ CORS
# Backend มี CORS ตั้งค่าอยู่แล้ว
```

### ❌ Component Not Found

```bash
# ตรวจสอบ import path
import ComponentName from '~/components/ComponentName.vue'
```

### ❌ Store Error

```bash
# ตรวจสอบ Pinia setup
# ต้องมี @pinia/nuxt ใน nuxt.config.ts
```

## 📖 เอกสารเพิ่มเติม

- [Nuxt 3 Documentation](https://nuxt.com/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vue 3 Documentation](https://vuejs.org/)

## 🎯 Next Steps

1. ✅ ทดสอบการเชื่อมต่อ API
2. ✅ ทดสอบการแก้ไขข้อมูล
3. ✅ ทดสอบ Import CSV
4. ✅ ทดสอบการพิมพ์ PDF
5. ✅ ทดสอบ Responsive Design

---

**💡 Tip:** ใช้ Nuxt DevTools เพื่อ debug และ development

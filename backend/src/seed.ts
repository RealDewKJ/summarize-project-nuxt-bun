import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Use default data
  console.log('📁 Using default seed data...')
  
  const data = {
    meetingInfo: {
      title: 'สรุปการประชุมประจำสัปดาห์ทีมพัฒนา ปี 2568',
      date: 'สัปดาห์ที่ 30 วันที่ 05/08/2568',
    },
    projectStats: {
      total: 44,
      inProgress: 30,
      completed: 14,
      issues: 12,
    },
    projects: {
      inProgress: [
        'App AtlasMonitor',
        'Healthflow API',
        'MyAtlas',
        'BMS HOSxP+ Mobile (ER)',
        'BMS HOSxP+ (บริจาคอวัยวะ)',
        'Diagnosis AI (HOSxP)',
        'BMS Notification Services (Flutter .exe)',
        'Rx Intervention',
        'EHP ทะเบียนรายชื่อผู้ป่วย แก้ไขหน้าจอการเก็บภาพคนไข้',
        'Medication Reconcilliation',
        'laboratory ระบบรายงานผล lab',
        'EHP ระบบแพ็คเกตเสริมความงาม',
        'Distict MOPH PC-1 Dashboard Flutter Web (PHR Viewer)',
        'HOSxP ระบบเยี่ยมบ้าน',
        'Rx Intervention Dashboard',
        'BGS NOTIFY',
        'ตู้เปิดจ่ายเวชภัณฑ์ยา Web',
        'Dental 🦷',
        'เชื่อมต่อระบบทันตกรรม EHP กับ Tomorrow Smile',
        'Stretcher Center (ศูนย์เปล)',
        'NCDs Registry Dashboard',
        'แพทย์แผนจีน',
        'HOSxP พัฒนาตัว tool ตรวจสอบส่งออก phase 2',
        'ER Registry Dashboard',
        'Tools รพ.กระทุ่มแบน',
        'ระบบครุภัณฑ์',
        'Odin Med Check สายพานยา',
        'Excellence Care',
        'HOSxPLabLinkOnline',
        'BMS Lab Online (API, AGENT)',
        'ฟังก์ชันตรวจสอบการลงค่า Vital Signs',
        'AtlasHomeCare (เมนูงานชุมชน → สั่ง LAB)',
        'ไม้กั้นหมู่บ้าน WEB',
        'Dashboard กลางสำหรับโรงพยาบาล (Monitor ข้อมูลตามประกาศของ สปสช.)',
        'EHP-Consent',
        'MOPH Death Registry Dashboard',
        'Vital Sign GW',
        'NHIP PCU',
        'BMS-Consent',
        'BMS Smart Card Plugin Flutter',
        'Tools migration Crma',
        'ทดลองงาน',
        'ระบบ Refer และ MOPH Refer ใน EHP',
      ],
      completed: [
        'ระบบจัดการหมู่บ้านจัดสรร',
        'BMS Life เบิก OT จองห้องพัก ประเมินโครงการของทีม IM รายงานประจำสัปดาห์ รายงานการมาทำงาน',
        'Tools รพ.สต my pcu',
      ],
      issues: [
        'App AtlasMonitor',
        'Healthflow API',
        'MyAtlas',
        'BMS HOSxP+ Mobile (ER)',
        'BMS HOSxP+ (บริจาคอวัยวะ)',
        'laboratory ระบบรายงานผล lab',
        'HOSxP ระบบเยี่ยมบ้าน',
        'Tools รพ.กระทุ่มแบน',
        'AtlasHomeCare (เมนูงานชุมชน → สั่ง LAB)',
        'Dashboard กลางสำหรับโรงพยาบาล (Monitor ข้อมูลตามประกาศของ สปสช.)',
        'ทดลองงาน',
        'ระบบ Refer และ MOPH Refer ใน EHP',
      ],
    },
    projectDetails: [],
    issuesDetails: [
      {
        project: 'App AtlasMonitor',
        description: 'งานชุมชน เมนูคัดกรองกลุ่มเสี่ยง วาง UI ใหม่เรียบร้อยแล้ว กำลังทำส่วนบันทึกข้อมูล',
        priority: 'high',
      },
      {
        project: 'Healthflow API',
        description: 'รอ requirement API เพิ่มเติม (หอบหิด)',
        priority: 'medium',
      },
      {
        project: 'MyAtlas',
        description: 'เพิ่มแบบประเมินหอบหืด และไฟล์เสียงอ่านคำถามแล้ว รอปรับแก้ไขตาม requirement ใหม่',
        priority: 'medium',
      },
      {
        project: 'BMS HOSxP+ Mobile (ER)',
        description: 'สั่ง Doctor Order (Med, Lab, Xray, หัตถการ, Set OR)',
        priority: 'high',
      },
      {
        project: 'BMS HOSxP+ (บริจาคอวัยวะ)',
        description: 'เปลี่ยน UI ใหม่',
        priority: 'medium',
      },
      {
        project: 'laboratory ระบบรายงานผล lab',
        description: 'เมื่อกดเลือก lab แล้วกดเพิ่มในกราฟ เส้นกราฟแสดงแต่ชือ series ไม่เปลี่ยนตามชื่อ lab ให้',
        priority: 'high',
      },
      {
        project: 'HOSxP ระบบเยี่ยมบ้าน',
        description: 'ส่งเยี่ยมบ้าน จากหน้าจอ IPD, ลด ToKen AI ลงมาอีก โดยการใช้ภาษา English แทน ภาษาไทย',
        priority: 'high',
      },
      {
        project: 'Tools รพ.กระทุ่มแบน',
        description: 'แปลงรูป tiff เป็น jpg - ลองทำฟังก์ชันพื้นฐานขึ้นมาดึงและแปลงบน code dephi ไม่สำเร็จ',
        priority: 'medium',
      },
      {
        project: 'AtlasHomeCare (เมนูงานชุมชน → สั่ง LAB)',
        description: 'ได้รับ requirement ให้แก้ไขเพิ่มเติม 1. เมนูตั้งค่า AuthenCode 2. ช่องค้นหา CID, HN, ชื่อ 3. LAB ยกเลิกใบสั่ง 4. ตรวจสอบข้อมูลฟิลด์บันทึกเปิด visit',
        priority: 'high',
      },
      {
        project: 'Dashboard กลางสำหรับโรงพยาบาล (Monitor ข้อมูลตามประกาศของ สปสช.)',
        description: 'flutter ไม่สามารถนำเข้าไฟล์ Excel .xls ไม่ได้เนื่องจากเป็นเวอร์ชันเก่า รองรับแค่ .xlsx',
        priority: 'medium',
      },
      {
        project: 'ทดลองงาน',
        description: 'VS Code ไม่สามารถรัน flutter ผ่าน Emulator ได้',
        priority: 'low',
      },
      {
        project: 'ระบบ Refer และ MOPH Refer ใน EHP',
        description: 'เพิ่มหน้าจอ Refer In แล้วกำลังทดสอบว่าสามารถเพิ่มข้อมูลได้ถูกต้องหรือไม่',
        priority: 'medium',
      },
    ],
    codeReview: [
      {
        project: 'NHIP - ขอเพิ่มเมนูกิจกรรมในชุมชน Community Activity',
        description: 'ตรวจสอบ Source Code และเพิ่มฟังก์ชันใหม่',
        priority: 'medium',
      },
      {
        project: 'NHIP - ขอเพิ่มฟังก์ชันตรวจสอบการลงค่า Vital Signs (One Stop Service)',
        description: 'ตรวจสอบ Source Code และพัฒนาฟังก์ชันใหม่',
        priority: 'medium',
      },
    ],
    codeReviewer: 'อารยา ฉายางาม (เอิร์น)',
  }

  console.log('📖 Using default seed data')

  // Clear existing data
  await prisma.codeReview.deleteMany()
  await prisma.issueDetail.deleteMany()
  await prisma.projectDetail.deleteMany()
  await prisma.project.deleteMany()
  await prisma.meetingData.deleteMany()

  console.log('🗑️  Cleared existing data')

  // Create meeting data with all related records
  const meetingData = await prisma.meetingData.create({
    data: {
      title: data.meetingInfo.title,
      date: data.meetingInfo.date,
      total: data.projectStats.total,
      inProgress: data.projectStats.inProgress,
      completed: data.projectStats.completed,
      issues: data.projectStats.issues,
      codeReviewer: data.codeReviewer,
      projects: {
        create: [
          ...(data.projects.inProgress || []).map((name: string) => ({
            name,
            status: 'inProgress',
          })),
          ...(data.projects.completed || []).map((name: string) => ({
            name,
            status: 'completed',
          })),
          ...(data.projects.issues || []).map((name: string) => ({
            name,
            status: 'issues',
          })),
        ],
      },
      projectDetails: {
        create: (data.projectDetails || []).map((detail: any) => ({
          orderNum: parseInt(detail.ลำดับ) || 0,
          systemName: detail.ระบบงาน,
          responsible: detail.ผู้รับผิดชอบ,
          pm: detail.PM,
          problems: JSON.stringify(detail.ปัญหาที่พบ || []),
          solutions: JSON.stringify(detail.วิธีแก้ปัญหา || []),
          notes: JSON.stringify(detail.หมายเหตุ || []),
        })),
      },
      issuesDetails: {
        create: (data.issuesDetails || []).map((issue: any) => ({
          project: issue.project,
          description: issue.description,
          priority: issue.priority,
        })),
      },
      codeReviews: {
        create: (data.codeReview || []).map((review: any) => ({
          project: review.project,
          description: review.description,
          priority: review.priority,
        })),
      },
    },
  })

  console.log(`✅ Seed completed! Created meeting data with ID: ${meetingData.id}`)
  console.log(`   - ${data.projects.inProgress.length} projects in progress`)
  console.log(`   - ${data.projects.completed.length} completed projects`)
  console.log(`   - ${data.projectDetails.length} project details`)
  console.log(`   - ${data.issuesDetails.length} issues`)
  console.log(`   - ${data.codeReview.length} code reviews`)
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
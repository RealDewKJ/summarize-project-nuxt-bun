import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface ProjectDetail {
  ลำดับ: number
  ระบบงาน: string
  ผู้รับผิดชอบ: string
  PM: string
  ปัญหาที่พบ: string[]
  วิธีแก้ปัญหา: string[]
  หมายเหตุ: string[]
}

export interface IssueDetail {
  project: string
  description: string
  priority: 'low' | 'medium' | 'high'
}

export interface CodeReview {
  project: string
  description: string
  priority: 'low' | 'medium' | 'high'
}

export interface MeetingData {
  meetingInfo: {
    title: string
    date: string
  }
  projectStats: {
    total: number
    inProgress: number
    completed: number
    issues: number
  }
  projects: {
    inProgress: string[]
    completed: string[]
    issues: string[]
  }
  projectDetails: ProjectDetail[]
  issuesDetails: IssueDetail[]
  codeReview: CodeReview[]
  codeReviewer: string
}

export const useMeetingStore = defineStore('meeting', () => {
  // State
  const meetingData = ref<MeetingData>({
    meetingInfo: {
      title: "สรุปการประชุมประจำสัปดาห์ทีมพัฒนา ปี 2568",
      date: "สัปดาห์ที่ 30 วันที่ 05/08/2568"
    },
    projectStats: {
      total: 44,
      inProgress: 30,
      completed: 14,
      issues: 12
    },
    projects: {
      inProgress: [
        "App AtlasMonitor",
        "Healthflow API",
        "MyAtlas",
        "BMS HOSxP+ Mobile (ER)",
        "BMS HOSxP+ (บริจาคอวัยวะ)",
        "Diagnosis AI (HOSxP)",
        "BMS Notification Services (Flutter .exe)",
        "Rx Intervention",
        "EHP ทะเบียนรายชื่อผู้ป่วย แก้ไขหน้าจอการเก็บภาพคนไข้",
        "Medication Reconcilliation",
        "laboratory ระบบรายงานผล lab",
        "EHP ระบบแพ็คเกตเสริมความงาม",
        "Distict MOPH PC-1 Dashboard Flutter Web (PHR Viewer)",
        "HOSxP ระบบเยี่ยมบ้าน",
        "Rx Intervention Dashboard",
        "BGS NOTIFY",
        "ตู้เปิดจ่ายเวชภัณฑ์ยา Web",
        "Dental 🦷",
        "เชื่อมต่อระบบทันตกรรม EHP กับ Tomorrow Smile",
        "Stretcher Center (ศูนย์เปล)",
        "NCDs Registry Dashboard",
        "แพทย์แผนจีน",
        "HOSxP พัฒนาตัว tool ตรวจสอบส่งออก phase 2",
        "ER Registry Dashboard",
        "Tools รพ.กระทุ่มแบน",
        "ระบบครุภัณฑ์",
        "Odin Med Check สายพานยา",
        "Excellence Care",
        "HOSxPLabLinkOnline",
        "BMS Lab Online (API, AGENT)",
        "ฟังก์ชันตรวจสอบการลงค่า Vital Signs",
        "AtlasHomeCare (เมนูงานชุมชน → สั่ง LAB)",
        "ไม้กั้นหมู่บ้าน WEB",
        "Dashboard กลางสำหรับโรงพยาบาล (Monitor ข้อมูลตามประกาศของ สปสช.)",
        "EHP-Consent",
        "MOPH Death Registry Dashboard",
        "Vital Sign GW",
        "NHIP PCU",
        "BMS-Consent",
        "BMS Smart Card Plugin Flutter",
        "Tools migration Crma",
        "ทดลองงาน",
        "ระบบ Refer และ MOPH Refer ใน EHP"
      ],
      completed: [
        "ระบบจัดการหมู่บ้านจัดสรร",
        "BMS Life เบิก OT จองห้องพัก ประเมินโครงการของทีม IM รายงานประจำสัปดาห์ รายงานการมาทำงาน",
        "Tools รพ.สต my pcu"
      ],
      issues: [
        "App AtlasMonitor",
        "Healthflow API",
        "MyAtlas",
        "BMS HOSxP+ Mobile (ER)",
        "BMS HOSxP+ (บริจาคอวัยวะ)",
        "laboratory ระบบรายงานผล lab",
        "HOSxP ระบบเยี่ยมบ้าน",
        "Tools รพ.กระทุ่มแบน",
        "AtlasHomeCare (เมนูงานชุมชน → สั่ง LAB)",
        "Dashboard กลางสำหรับโรงพยาบาล (Monitor ข้อมูลตามประกาศของ สปสช.)",
        "ทดลองงาน",
        "ระบบ Refer และ MOPH Refer ใน EHP"
      ]
    },
    projectDetails: [],
    issuesDetails: [
      {
        project: "App AtlasMonitor",
        description: "งานชุมชน เมนูคัดกรองกลุ่มเสี่ยง วาง UI ใหม่เรียบร้อยแล้ว กำลังทำส่วนบันทึกข้อมูล",
        priority: "high"
      },
      {
        project: "Healthflow API",
        description: "รอ requirement API เพิ่มเติม (หอบหิด)",
        priority: "medium"
      },
      {
        project: "MyAtlas",
        description: "เพิ่มแบบประเมินหอบหืด และไฟล์เสียงอ่านคำถามแล้ว รอปรับแก้ไขตาม requirement ใหม่",
        priority: "medium"
      },
      {
        project: "BMS HOSxP+ Mobile (ER)",
        description: "สั่ง Doctor Order (Med, Lab, Xray, หัตถการ, Set OR)",
        priority: "high"
      },
      {
        project: "BMS HOSxP+ (บริจาคอวัยวะ)",
        description: "เปลี่ยน UI ใหม่",
        priority: "medium"
      },
      {
        project: "laboratory ระบบรายงานผล lab",
        description: "เมื่อกดเลือก lab แล้วกดเพิ่มในกราฟ เส้นกราฟแสดงแต่ชือ series ไม่เปลี่ยนตามชื่อ lab ให้",
        priority: "high"
      },
      {
        project: "HOSxP ระบบเยี่ยมบ้าน",
        description: "ส่งเยี่ยมบ้าน จากหน้าจอ IPD, ลด ToKen AI ลงมาอีก โดยการใช้ภาษา English แทน ภาษาไทย",
        priority: "high"
      },
      {
        project: "Tools รพ.กระทุ่มแบน",
        description: "แปลงรูป tiff เป็น jpg - ลองทำฟังก์ชันพื้นฐานขึ้นมาดึงและแปลงบน code dephi ไม่สำเร็จ",
        priority: "medium"
      },
      {
        project: "AtlasHomeCare (เมนูงานชุมชน → สั่ง LAB)",
        description: "ได้รับ requirement ให้แก้ไขเพิ่มเติม 1. เมนูตั้งค่า AuthenCode 2. ช่องค้นหา CID, HN, ชื่อ 3. LAB ยกเลิกใบสั่ง 4. ตรวจสอบข้อมูลฟิลด์บันทึกเปิด visit",
        priority: "high"
      },
      {
        project: "Dashboard กลางสำหรับโรงพยาบาล (Monitor ข้อมูลตามประกาศของ สปสช.)",
        description: "flutter ไม่สามารถนำเข้าไฟล์ Excel .xls ไม่ได้เนื่องจากเป็นเวอร์ชันเก่า รองรับแค่ .xlsx",
        priority: "medium"
      },
      {
        project: "ทดลองงาน",
        description: "VS Code ไม่สามารถรัน flutter ผ่าน Emulator ได้",
        priority: "low"
      },
      {
        project: "ระบบ Refer และ MOPH Refer ใน EHP",
        description: "เพิ่มหน้าจอ Refer In แล้วกำลังทดสอบว่าสามารถเพิ่มข้อมูลได้ถูกต้องหรือไม่",
        priority: "medium"
      }
    ],
    codeReview: [
      {
        project: "NHIP - ขอเพิ่มเมนูกิจกรรมในชุมชน Community Activity",
        description: "ตรวจสอบ Source Code และเพิ่มฟังก์ชันใหม่",
        priority: "medium"
      },
      {
        project: "NHIP - ขอเพิ่มฟังก์ชันตรวจสอบการลงค่า Vital Signs (One Stop Service)",
        description: "ตรวจสอบ Source Code และพัฒนาฟังก์ชันใหม่",
        priority: "medium"
      }
    ],
    codeReviewer: "อารยา ฉายางาม (เอิร์น)"
  })

  // Getters
  const totalProjects = computed(() => meetingData.value.projectStats.total)
  const inProgressCount = computed(() => meetingData.value.projectStats.inProgress)
  const completedCount = computed(() => meetingData.value.projectStats.completed)
  const issuesCount = computed(() => meetingData.value.projectStats.issues)

  // Actions
  const loadData = async () => {
    try {
      const response = await fetch('/data.json')
      const data = await response.json()
      meetingData.value = data
      console.log('✅ โหลดข้อมูลสำเร็จ:', data)
    } catch (error) {
      console.error('❌ Error loading data:', error)
      // ใช้ข้อมูลเริ่มต้นถ้าโหลด JSON ไม่ได้
      meetingData.value = getDefaultData()
    }
  }

  const getDefaultData = (): MeetingData => {
    return {
      meetingInfo: {
        title: "สรุปการประชุมประจำสัปดาห์ทีมพัฒนา ปี 2568",
        date: "สัปดาห์ที่ 30 วันที่ 05/08/2568"
      },
      projectStats: {
        total: 44,
        inProgress: 30,
        completed: 14,
        issues: 12
      },
      projects: {
        inProgress: [
          "App AtlasMonitor",
          "Healthflow API",
          "MyAtlas",
          "BMS HOSxP+ Mobile (ER)",
          "BMS HOSxP+ (บริจาคอวัยวะ)",
          "Diagnosis AI (HOSxP)",
          "BMS Notification Services (Flutter .exe)",
          "Rx Intervention",
          "EHP ทะเบียนรายชื่อผู้ป่วย แก้ไขหน้าจอการเก็บภาพคนไข้",
          "Medication Reconcilliation",
          "laboratory ระบบรายงานผล lab",
          "EHP ระบบแพ็คเกตเสริมความงาม",
          "Distict MOPH PC-1 Dashboard Flutter Web (PHR Viewer)",
          "HOSxP ระบบเยี่ยมบ้าน",
          "Rx Intervention Dashboard",
          "BGS NOTIFY",
          "ตู้เปิดจ่ายเวชภัณฑ์ยา Web",
          "Dental 🦷",
          "เชื่อมต่อระบบทันตกรรม EHP กับ Tomorrow Smile",
          "Stretcher Center (ศูนย์เปล)",
          "NCDs Registry Dashboard",
          "แพทย์แผนจีน",
          "HOSxP พัฒนาตัว tool ตรวจสอบส่งออก phase 2",
          "ER Registry Dashboard",
          "Tools รพ.กระทุ่มแบน",
          "ระบบครุภัณฑ์",
          "Odin Med Check สายพานยา",
          "Excellence Care",
          "HOSxPLabLinkOnline",
          "BMS Lab Online (API, AGENT)",
          "ฟังก์ชันตรวจสอบการลงค่า Vital Signs",
          "AtlasHomeCare (เมนูงานชุมชน → สั่ง LAB)",
          "ไม้กั้นหมู่บ้าน WEB",
          "Dashboard กลางสำหรับโรงพยาบาล (Monitor ข้อมูลตามประกาศของ สปสช.)",
          "EHP-Consent",
          "MOPH Death Registry Dashboard",
          "Vital Sign GW",
          "NHIP PCU",
          "BMS-Consent",
          "BMS Smart Card Plugin Flutter",
          "Tools migration Crma",
          "ทดลองงาน",
          "ระบบ Refer และ MOPH Refer ใน EHP"
        ],
        completed: [
          "ระบบจัดการหมู่บ้านจัดสรร",
          "BMS Life เบิก OT จองห้องพัก ประเมินโครงการของทีม IM รายงานประจำสัปดาห์ รายงานการมาทำงาน",
          "Tools รพ.สต my pcu"
        ],
        issues: [
          "App AtlasMonitor",
          "Healthflow API",
          "MyAtlas",
          "BMS HOSxP+ Mobile (ER)",
          "BMS HOSxP+ (บริจาคอวัยวะ)",
          "laboratory ระบบรายงานผล lab",
          "HOSxP ระบบเยี่ยมบ้าน",
          "Tools รพ.กระทุ่มแบน",
          "AtlasHomeCare (เมนูงานชุมชน → สั่ง LAB)",
          "Dashboard กลางสำหรับโรงพยาบาล (Monitor ข้อมูลตามประกาศของ สปสช.)",
          "ทดลองงาน",
          "ระบบ Refer และ MOPH Refer ใน EHP"
        ]
      },
      projectDetails: [],
      issuesDetails: [
        {
          project: "App AtlasMonitor",
          description: "งานชุมชน เมนูคัดกรองกลุ่มเสี่ยง วาง UI ใหม่เรียบร้อยแล้ว กำลังทำส่วนบันทึกข้อมูล",
          priority: "high"
        },
        {
          project: "Healthflow API",
          description: "รอ requirement API เพิ่มเติม (หอบหิด)",
          priority: "medium"
        },
        {
          project: "MyAtlas",
          description: "เพิ่มแบบประเมินหอบหืด และไฟล์เสียงอ่านคำถามแล้ว รอปรับแก้ไขตาม requirement ใหม่",
          priority: "medium"
        },
        {
          project: "BMS HOSxP+ Mobile (ER)",
          description: "สั่ง Doctor Order (Med, Lab, Xray, หัตถการ, Set OR)",
          priority: "high"
        },
        {
          project: "BMS HOSxP+ (บริจาคอวัยวะ)",
          description: "เปลี่ยน UI ใหม่",
          priority: "medium"
        },
        {
          project: "laboratory ระบบรายงานผล lab",
          description: "เมื่อกดเลือก lab แล้วกดเพิ่มในกราฟ เส้นกราฟแสดงแต่ชือ series ไม่เปลี่ยนตามชื่อ lab ให้",
          priority: "high"
        },
        {
          project: "HOSxP ระบบเยี่ยมบ้าน",
          description: "ส่งเยี่ยมบ้าน จากหน้าจอ IPD, ลด ToKen AI ลงมาอีก โดยการใช้ภาษา English แทน ภาษาไทย",
          priority: "high"
        },
        {
          project: "Tools รพ.กระทุ่มแบน",
          description: "แปลงรูป tiff เป็น jpg - ลองทำฟังก์ชันพื้นฐานขึ้นมาดึงและแปลงบน code dephi ไม่สำเร็จ",
          priority: "medium"
        },
        {
          project: "AtlasHomeCare (เมนูงานชุมชน → สั่ง LAB)",
          description: "ได้รับ requirement ให้แก้ไขเพิ่มเติม 1. เมนูตั้งค่า AuthenCode 2. ช่องค้นหา CID, HN, ชื่อ 3. LAB ยกเลิกใบสั่ง 4. ตรวจสอบข้อมูลฟิลด์บันทึกเปิด visit",
          priority: "high"
        },
        {
          project: "Dashboard กลางสำหรับโรงพยาบาล (Monitor ข้อมูลตามประกาศของ สปสช.)",
          description: "flutter ไม่สามารถนำเข้าไฟล์ Excel .xls ไม่ได้เนื่องจากเป็นเวอร์ชันเก่า รองรับแค่ .xlsx",
          priority: "medium"
        },
        {
          project: "ทดลองงาน",
          description: "VS Code ไม่สามารถรัน flutter ผ่าน Emulator ได้",
          priority: "low"
        },
        {
          project: "ระบบ Refer และ MOPH Refer ใน EHP",
          description: "เพิ่มหน้าจอ Refer In แล้วกำลังทดสอบว่าสามารถเพิ่มข้อมูลได้ถูกต้องหรือไม่",
          priority: "medium"
        }
      ],
      codeReview: [
        {
          project: "NHIP - ขอเพิ่มเมนูกิจกรรมในชุมชน Community Activity",
          description: "ตรวจสอบ Source Code และเพิ่มฟังก์ชันใหม่",
          priority: "medium"
        },
        {
          project: "NHIP - ขอเพิ่มฟังก์ชันตรวจสอบการลงค่า Vital Signs (One Stop Service)",
          description: "ตรวจสอบ Source Code และพัฒนาฟังก์ชันใหม่",
          priority: "medium"
        }
      ],
      codeReviewer: "อารยา ฉายางาม (เอิร์น)"
    }
  }

  const updateMeetingInfo = (title: string, date: string) => {
    meetingData.value.meetingInfo.title = title
    meetingData.value.meetingInfo.date = date
  }

  const updateProjects = (category: keyof typeof meetingData.value.projects, projects: string[]) => {
    meetingData.value.projects[category] = projects
    updateStats()
  }

  const updateStats = () => {
    const { inProgress, completed, issues } = meetingData.value.projects
    meetingData.value.projectStats.inProgress = inProgress.length
    meetingData.value.projectStats.completed = completed.length
    meetingData.value.projectStats.issues = issues.length
    meetingData.value.projectStats.total = inProgress.length + completed.length
  }

  const addProject = (category: keyof typeof meetingData.value.projects, projectName: string) => {
    if (meetingData.value.projects[category]) {
      meetingData.value.projects[category].push(projectName)
      updateStats()
    }
  }

  const removeProject = (category: keyof typeof meetingData.value.projects, projectName: string) => {
    if (meetingData.value.projects[category]) {
      const index = meetingData.value.projects[category].indexOf(projectName)
      if (index > -1) {
        meetingData.value.projects[category].splice(index, 1)
        updateStats()
      }
    }
  }

  const updateProjectStatus = (projectName: string, newStatus: keyof typeof meetingData.value.projects) => {
    // ลบจากสถานะเดิม
    Object.keys(meetingData.value.projects).forEach(status => {
      const index = meetingData.value.projects[status as keyof typeof meetingData.value.projects].indexOf(projectName)
      if (index > -1) {
        meetingData.value.projects[status as keyof typeof meetingData.value.projects].splice(index, 1)
      }
    })
    
    // เพิ่มในสถานะใหม่
    if (meetingData.value.projects[newStatus]) {
      meetingData.value.projects[newStatus].push(projectName)
    }
    
    updateStats()
  }

  const saveData = () => {
    // ในความเป็นจริงจะต้องส่งข้อมูลไปยัง server
    console.log('Data to save:', JSON.stringify(meetingData.value, null, 2))
    
    // จำลองการดาวน์โหลดไฟล์ JSON
    const dataStr = JSON.stringify(meetingData.value, null, 2)
    const dataBlob = new Blob([dataStr], {type: 'application/json'})
    const url = URL.createObjectURL(dataBlob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = 'updated_data.json'
    link.click()
    
    URL.revokeObjectURL(url)
  }

  return {
    // State
    meetingData,
    
    // Getters
    totalProjects,
    inProgressCount,
    completedCount,
    issuesCount,
    
    // Actions
    loadData,
    updateMeetingInfo,
    updateProjects,
    addProject,
    removeProject,
    updateProjectStatus,
    saveData
  }
})

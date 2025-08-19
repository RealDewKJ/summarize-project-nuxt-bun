<template>
  <div class="csv-reader">
    <div class="header-actions">
      <button class="back-btn" @click="$emit('close')">
        🏠 กลับหน้าหลัก
      </button>
    </div>

    <div class="upload-section">
      <h3>เลือกไฟล์ CSV</h3>
      <input 
        type="file" 
        ref="fileInput" 
        accept=".csv" 
        class="file-input" 
        @change="handleFileSelect"
      />
      <br />
      <button class="csv-btn" @click="readCSVFile" :disabled="!selectedFile">
        📖 อ่านไฟล์ CSV
      </button>
      <button class="convert-btn" @click="convertToJSON" :disabled="!csvData">
        🔄 แปลงเป็น JSON
      </button>
      <button class="download-btn" @click="downloadJSON" :disabled="!jsonData">
        💾 ดาวน์โหลด JSON
      </button>
    </div>

    <div v-if="message" :class="['message', messageType]">
      {{ message }}
    </div>

    <div v-if="csvData" class="data-preview">
      <div class="summary-box">
        <h3>📊 สรุปข้อมูล CSV:</h3>
        <div class="summary-item">
          <strong>จำนวนแถวทั้งหมด:</strong> {{ csvData.length }}
        </div>
        <div class="summary-item">
          <strong>จำนวนคอลัมน์:</strong> {{ csvData[0] ? csvData[0].length : 0 }}
        </div>
      </div>

      <div class="preview-section">
        <h4>🔍 ข้อมูลแถวแรกๆ (สำหรับ debug):</h4>
        <div v-for="(row, index) in previewRows" :key="index" class="preview-row">
          <strong>แถว {{ index }}:</strong> [{{ row.map(cell => `"${cell}"`).join(', ') }}]
        </div>
        <div v-if="csvData.length > maxPreviewRows" class="preview-more">
          ... และอีก {{ csvData.length - maxPreviewRows }} แถว
        </div>
      </div>
    </div>

    <div v-if="jsonData" class="json-output">
      <h3>📄 ผลลัพธ์ JSON:</h3>
      <pre>{{ JSON.stringify(jsonData, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMeetingStore } from '../stores/meetingStore'

const emit = defineEmits(['close'])
const store = useMeetingStore()

// Reactive data
const selectedFile = ref<File | null>(null)
const csvData = ref<string[][]>([])
const jsonData = ref<any>(null)
const message = ref('')
const messageType = ref<'success' | 'error' | 'info'>('info')
const maxPreviewRows = 10

// Computed
const previewRows = computed(() => {
  return csvData.value.slice(0, maxPreviewRows)
})

// Methods
const showMessage = (msg: string, type: 'success' | 'error' | 'info') => {
  message.value = msg
  messageType.value = type
  setTimeout(() => {
    message.value = ''
  }, 5000)
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0]
  }
}

const readCSVFile = () => {
  if (!selectedFile.value) {
    showMessage('❌ กรุณาเลือกไฟล์ CSV', 'error')
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const csvText = e.target?.result as string
      csvData.value = parseCSV(csvText)
      showMessage('✅ อ่านไฟล์ CSV สำเร็จ!', 'success')
    } catch (error) {
      showMessage(`❌ เกิดข้อผิดพลาดในการอ่านไฟล์: ${error}`, 'error')
      console.error('Error reading CSV file:', error)
    }
  }
  reader.readAsText(selectedFile.value, 'UTF-8')
}

const parseCSV = (csvText: string): string[][] => {
  const lines = csvText.split('\n')
  const data: string[][] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (line) {
      const row = parseCSVLine(line)
      if (row.length > 0) {
        data.push(row)
      }
    }
  }

  return data
}

const parseCSVLine = (line: string): string[] => {
  const result: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }

  result.push(current.trim())
  return result
}

const convertToJSON = () => {
  if (!csvData.value.length) {
    showMessage('❌ กรุณาอ่านไฟล์ CSV ก่อน', 'error')
    return
  }

  try {
    jsonData.value = convertCSVToJSON(csvData.value)
    showMessage('✅ แปลงข้อมูลเป็น JSON สำเร็จ!', 'success')
  } catch (error) {
    showMessage(`❌ เกิดข้อผิดพลาดในการแปลง: ${error}`, 'error')
  }
}

const convertCSVToJSON = (csvData: string[][]): any => {
  if (csvData.length < 2) {
    throw new Error('ข้อมูลไม่เพียงพอ')
  }

  console.log('🔍 CSV Data for conversion:', csvData)

  // วิเคราะห์โครงสร้างข้อมูล
  const projects: any[] = []
  let currentProject: any = null

  for (let i = 0; i < csvData.length; i++) {
    const row = csvData[i]
    if (row.length < 3) continue

    const col1 = row[0] || ''
    const col2 = row[1] || ''
    const col3 = row[2] || ''

    console.log(`Row ${i}: [${col1}, ${col2}, ${col3}]`)

    // ตรวจสอบว่าเป็นแถวเริ่มต้นโครงการใหม่หรือไม่
    if (col1 === 'ลำดับ' && col2 === 'ระบบงาน' && col3.trim() !== '') {
      // เริ่มโครงการใหม่
      const projectName = col3.trim()
      const isCompleted = projectName.endsWith('(ปิด)')

      currentProject = {
        ลำดับ: '',
        ระบบงาน: projectName,
        ผู้รับผิดชอบ: '',
        PM: '',
        ปัญหาที่พบ: [],
        วิธีแก้ปัญหา: [],
        หมายเหตุ: [],
        isCompleted: isCompleted,
      }
      projects.push(currentProject)

      if (isCompleted) {
        console.log(`  🆕 เริ่มโครงการใหม่ (ปิดแล้ว): ${projectName}`)
      } else {
        console.log(`  🆕 เริ่มโครงการใหม่ (กำลังทำ): ${projectName}`)
      }
    } else if (currentProject) {
      // ตรวจสอบประเภทข้อมูล
      if (col2 === 'ผู้รับผิดชอบ' && col3.trim() !== '') {
        currentProject.ผู้รับผิดชอบ = col3.trim()
        console.log(`  👤 ผู้รับผิดชอบ: ${col3.trim()}`)
      } else if (col2 === 'PM' && col3.trim() !== '') {
        currentProject.PM = col3.trim()
        console.log(`  👨‍💼 PM: ${col3.trim()}`)
      } else if (col2 === 'ปัญหาที่พบ' && col3.trim() !== '') {
        if (col3.trim() !== '1' && col3.trim() !== '2' && col3.trim() !== '3') {
          currentProject.ปัญหาที่พบ.push(col3.trim())
          console.log(`  ⚠️ ปัญหาที่พบ: ${col3.trim()}`)
        }
      } else if (col2 === 'วิธีแก้ปัญหา' && col3.trim() !== '') {
        if (col3.trim() !== '1' && col3.trim() !== '2' && col3.trim() !== '3') {
          currentProject.วิธีแก้ปัญหา.push(col3.trim())
          console.log(`  🔧 วิธีแก้ปัญหา: ${col3.trim()}`)
        }
      } else if (col2 === 'หมายเหตุ' && col3.trim() !== '') {
        if (col3.trim() !== '1' && col3.trim() !== '2' && col3.trim() !== '3') {
          currentProject.หมายเหตุ.push(col3.trim())
          console.log(`  📝 หมายเหตุ: ${col3.trim()}`)
        }
      }
    }
  }

  console.log('🔍 Projects found:', projects)

  // แยกประเภทโครงการ
  const inProgressProjects = projects.filter((p) => !p.isCompleted)
  const completedProjects = projects.filter((p) => p.isCompleted)
  const issueProjects = projects.filter((p) => p.ปัญหาที่พบ.length > 0)

  console.log(`📊 โครงการที่กำลังทำ: ${inProgressProjects.length}`)
  console.log(`📊 โครงการที่ปิดแล้ว: ${completedProjects.length}`)
  console.log(`📊 โครงการที่มีปัญหา: ${issueProjects.length}`)

  // สร้างโครงสร้าง JSON
  const result: any = {
    meetingInfo: {
      title: 'สรุปการประชุมประจำสัปดาห์ทีมพัฒนา ปี 2568',
      date: 'สัปดาห์ที่ 30 วันที่ 05/08/2568',
    },
    projectStats: {
      total: projects.length,
      inProgress: inProgressProjects.length,
      completed: completedProjects.length,
      issues: issueProjects.length,
    },
    projects: {
      inProgress: inProgressProjects.map((p) => p.ระบบงาน),
      completed: completedProjects.map((p) => p.ระบบงาน),
      issues: issueProjects.map((p) => p.ระบบงาน),
    },
    projectDetails: projects,
    issuesDetails: [] as any[],
    codeReview: [] as any[],
    codeReviewer: 'อารยา ฉายางาม (เอิร์น)',
  }

  // วิเคราะห์ข้อมูลเพื่อจัดหมวดหมู่
  projects.forEach((project) => {
    if (project.ปัญหาที่พบ.length > 0) {
      result.issuesDetails.push({
        project: project.ระบบงาน,
        description: project.ปัญหาที่พบ.join(', '),
        priority: 'medium',
      })
    }
  })

  return result
}

const downloadJSON = () => {
  if (!jsonData.value) {
    showMessage('❌ กรุณาแปลงข้อมูลเป็น JSON ก่อน', 'error')
    return
  }

  const jsonString = JSON.stringify(jsonData.value, null, 2)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = 'data.json'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)

  showMessage('✅ ดาวน์โหลดไฟล์ JSON สำเร็จ!', 'success')
}
</script>

<style scoped>
.csv-reader {
  max-width: 1200px;
  width: 100%;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  padding: 20px;
  margin: 0 auto;
  position: relative;
}

.header-actions {
  text-align: left;
  margin-bottom: 20px;
}

.back-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
}

.back-btn:hover {
  background: #2980b9;
}

.upload-section {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  border: 2px dashed #3498db;
  border-radius: 10px;
  background: #ecf0f1;
}

.csv-btn, .convert-btn, .download-btn {
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  margin: 10px;
  transition: background 0.3s;
}

.csv-btn {
  background: #3498db;
  color: white;
}

.csv-btn:hover {
  background: #2980b9;
}

.csv-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.convert-btn {
  background: #e74c3c;
  color: white;
}

.convert-btn:hover {
  background: #c0392b;
}

.convert-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.download-btn {
  background: #9b59b6;
  color: white;
}

.download-btn:hover {
  background: #8e44ad;
}

.download-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.file-input {
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
}

.message {
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  text-align: center;
}

.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.info {
  background-color: #d1ecf1;
  color: #0c5460;
  border: 1px solid #bee5eb;
}

.data-preview {
  margin: 20px 0;
}

.summary-box {
  background: #e8f5e8;
  border: 1px solid #4caf50;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
}

.summary-box h3 {
  color: #2e7d32;
  margin-top: 0;
}

.summary-item {
  margin: 10px 0;
  padding: 8px;
  background: white;
  border-radius: 4px;
  border-left: 4px solid #4caf50;
}

.preview-section {
  margin: 20px 0;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 5px;
}

.preview-row {
  margin: 8px 0;
  padding: 5px;
  background: white;
  border-radius: 4px;
  border-left: 3px solid #3498db;
}

.preview-more {
  margin-top: 10px;
  padding: 8px;
  background: #ecf0f1;
  border-radius: 4px;
  text-align: center;
  color: #7f8c8d;
}

.json-output {
  margin: 20px 0;
  padding: 15px;
  background: #2c3e50;
  color: #ecf0f1;
  border-radius: 5px;
  white-space: pre-wrap;
  font-family: 'Courier New', monospace;
  max-height: 400px;
  overflow-y: auto;
}

.json-output pre {
  margin: 0;
}
</style>

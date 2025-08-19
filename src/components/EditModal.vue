<template>
  <div v-if="isOpen" id="editModal" class="modal" @click="closeModal">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h2>✏️ แก้ไขข้อมูลการประชุม</h2>
        <span class="close" @click="closeModal">&times;</span>
      </div>
      
      <div class="modal-body">
        <form @submit.prevent="saveData">
          <div class="form-group">
            <label for="edit-title">หัวข้อการประชุม:</label>
            <input 
              type="text" 
              id="edit-title" 
              v-model="formData.title"
              required 
            />
          </div>

          <div class="form-group">
            <label for="edit-date">วันที่:</label>
            <input 
              type="text" 
              id="edit-date" 
              v-model="formData.date"
              required 
            />
          </div>

          <div class="form-group">
            <label>โครงการที่กำลังดำเนินงาน:</label>
            <textarea
              id="edit-in-progress"
              v-model="formData.inProgress"
              rows="8"
              placeholder="ใส่รายชื่อโครงการที่กำลังดำเนินงาน (หนึ่งโครงการต่อบรรทัด)"
            ></textarea>
          </div>

          <div class="form-group">
            <label>โครงการที่เสร็จสิ้นแล้ว:</label>
            <textarea
              id="edit-completed"
              v-model="formData.completed"
              rows="8"
              placeholder="ใส่รายชื่อโครงการที่เสร็จสิ้นแล้ว (หนึ่งโครงการต่อบรรทัด)"
            ></textarea>
          </div>

          <div class="form-group">
            <label>โครงการที่มีปัญหา:</label>
            <textarea
              id="edit-issues"
              v-model="formData.issues"
              rows="8"
              placeholder="ใส่รายชื่อโครงการที่มีปัญหา (หนึ่งโครงการต่อบรรทัด)"
            ></textarea>
          </div>

          <div class="form-group">
            <label>รายละเอียดปัญหา:</label>
            <textarea
              id="edit-issues-details"
              v-model="formData.issuesDetails"
              rows="10"
              placeholder="ใส่รายละเอียดปัญหาของแต่ละโครงการ"
            ></textarea>
          </div>

          <div class="form-group">
            <label>งานตรวจสอบ Code:</label>
            <textarea
              id="edit-code-review"
              v-model="formData.codeReview"
              rows="6"
              placeholder="ใส่รายละเอียดงานตรวจสอบ Code"
            ></textarea>
          </div>

          <div class="form-group">
            <label for="edit-code-reviewer">ผู้ตรวจสอบ Code:</label>
            <input
              type="text"
              id="edit-code-reviewer"
              v-model="formData.codeReviewer"
              placeholder="ใส่ชื่อผู้ตรวจสอบ Code"
            />
          </div>

          <div class="form-actions">
            <button type="submit" class="btn-save">
              💾 บันทึกข้อมูล
            </button>
            <button type="button" @click="closeModal" class="btn-cancel">
              ❌ ยกเลิก
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useMeetingStore } from '@/stores/meetingStore'

interface Props {
  isOpen: boolean
}

interface FormData {
  title: string
  date: string
  inProgress: string
  completed: string
  issues: string
  issuesDetails: string
  codeReview: string
  codeReviewer: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

const store = useMeetingStore()
const { meetingData, updateMeetingInfo, updateProjects, saveData: saveStoreData } = store

const formData = ref<FormData>({
  title: '',
  date: '',
  inProgress: '',
  completed: '',
  issues: '',
  issuesDetails: '',
  codeReview: '',
  codeReviewer: ''
})

// เติมข้อมูลในฟอร์มเมื่อ modal เปิด
watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    fillFormData()
  }
})

const fillFormData = () => {
  formData.value = {
    title: meetingData.meetingInfo.title,
    date: meetingData.meetingInfo.date,
    inProgress: meetingData.projects.inProgress.join('\n'),
    completed: meetingData.projects.completed.join('\n'),
    issues: meetingData.projects.issues.join('\n'),
    issuesDetails: meetingData.issuesDetails.map(issue => 
      `${issue.project}: ${issue.description}`
    ).join('\n\n'),
    codeReview: meetingData.codeReview.map(review => 
      `${review.project}: ${review.description}`
    ).join('\n\n'),
    codeReviewer: meetingData.codeReviewer
  }
}

const closeModal = () => {
  emit('close')
}

const saveData = () => {
  // อัปเดตข้อมูลใน store
  updateMeetingInfo(formData.value.title, formData.value.date)
  
  // อัปเดตโครงการ
  updateProjects('inProgress', formData.value.inProgress.split('\n').filter(item => item.trim()))
  updateProjects('completed', formData.value.completed.split('\n').filter(item => item.trim()))
  updateProjects('issues', formData.value.issues.split('\n').filter(item => item.trim()))
  
  // บันทึกข้อมูล
  saveStoreData()
  
  // ปิด modal
  closeModal()
  
  // แสดงข้อความสำเร็จ
  showSuccessMessage('บันทึกข้อมูลเรียบร้อยแล้ว!')
}

const showSuccessMessage = (message: string) => {
  const successDiv = document.createElement('div')
  successDiv.className = 'success-message'
  successDiv.textContent = message
  document.body.appendChild(successDiv)
  
  setTimeout(() => {
    successDiv.remove()
  }, 3000)
}
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: white;
  margin: auto;
  padding: 0;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
  background: #f8f9fa;
  border-radius: 8px 8px 0 0;
}

.modal-header h2 {
  margin: 0;
  color: #007bff;
  font-size: 20px;
}

.close {
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  line-height: 1;
}

.close:hover {
  color: #000;
}

.modal-body {
  padding: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #495057;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.form-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
}

.btn-save,
.btn-cancel {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-save {
  background: #28a745;
  color: white;
}

.btn-save:hover {
  background: #218838;
}

.btn-cancel {
  background: #6c757d;
  color: white;
}

.btn-cancel:hover {
  background: #5a6268;
}

.success-message {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #28a745;
  color: white;
  padding: 15px 20px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1001;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>

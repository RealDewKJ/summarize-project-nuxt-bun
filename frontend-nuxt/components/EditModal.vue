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

          <!-- รายละเอียดโครงการ -->
          <div class="form-group">
            <label>รายละเอียดโครงการ:</label>
            <div class="project-details-section">
              <div
                v-for="(detail, index) in formData.projectDetails"
                :key="index"
                class="project-detail-item"
              >
                <div class="detail-header">
                  <h4>โครงการที่ {{ index + 1 }}</h4>
                  <button
                    type="button"
                    class="remove-detail-btn"
                    @click="removeProjectDetail(index)"
                    v-if="formData.projectDetails.length > 1"
                  >
                    ❌ ลบ
                  </button>
                </div>

                <div class="detail-fields">
                  <div class="field-row">
                    <div class="field-group">
                      <label>ลำดับ:</label>
                      <input type="number" v-model="detail.ลำดับ" min="1" />
                    </div>
                    <div class="field-group">
                      <label>ระบบงาน:</label>
                      <input
                        type="text"
                        v-model="detail.ระบบงาน"
                        placeholder="ชื่อระบบงาน"
                      />
                    </div>
                  </div>

                  <div class="field-row">
                    <div class="field-group">
                      <label>ผู้รับผิดชอบ:</label>
                      <input
                        type="text"
                        v-model="detail.ผู้รับผิดชอบ"
                        placeholder="ชื่อผู้รับผิดชอบ"
                      />
                    </div>
                    <div class="field-group">
                      <label>PM:</label>
                      <input
                        type="text"
                        v-model="detail.PM"
                        placeholder="ชื่อ PM"
                      />
                    </div>
                  </div>

                  <div class="field-group">
                    <label>ปัญหาที่พบ:</label>
                    <textarea
                      v-model="detail.ปัญหาที่พบText"
                      rows="3"
                      placeholder="ใส่ปัญหาที่พบ (หนึ่งปัญหาต่อบรรทัด)"
                    ></textarea>
                  </div>

                  <div class="field-group">
                    <label>วิธีแก้ปัญหา:</label>
                    <textarea
                      v-model="detail.วิธีแก้ปัญหาText"
                      rows="3"
                      placeholder="ใส่วิธีแก้ปัญหา (หนึ่งวิธีต่อบรรทัด)"
                    ></textarea>
                  </div>

                  <div class="field-group">
                    <label>หมายเหตุ:</label>
                    <textarea
                      v-model="detail.หมายเหตุText"
                      rows="3"
                      placeholder="ใส่หมายเหตุ (หนึ่งหมายเหตุต่อบรรทัด)"
                    ></textarea>
                  </div>
                </div>
              </div>

              <button
                type="button"
                class="add-detail-btn"
                @click="addProjectDetail"
              >
                ➕ เพิ่มโครงการ
              </button>
            </div>
          </div>

          <div class="form-group">
            <label>รายละเอียดปัญหา:</label>
            <div class="issues-details-section">
              <div
                v-for="(issue, index) in formData.issuesDetails"
                :key="index"
                class="issue-detail-item"
              >
                <div class="issue-header">
                  <h4>ปัญหา {{ index + 1 }}</h4>
                  <button
                    type="button"
                    class="remove-issue-btn"
                    @click="removeIssueDetail(index)"
                  >
                    ❌ ลบ
                  </button>
                </div>

                <div class="issue-fields">
                  <div class="field-group">
                    <label>โครงการ:</label>
                    <input
                      type="text"
                      v-model="issue.project"
                      placeholder="ชื่อโครงการ"
                    />
                  </div>

                  <div class="field-group">
                    <label>รายละเอียด:</label>
                    <textarea
                      v-model="issue.description"
                      rows="2"
                      placeholder="รายละเอียดปัญหา"
                    ></textarea>
                  </div>

                  <div class="field-group">
                    <label>ความสำคัญ:</label>
                    <select v-model="issue.priority">
                      <option value="low">ต่ำ</option>
                      <option value="medium">ปานกลาง</option>
                      <option value="high">สูง</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="button"
                class="add-issue-btn"
                @click="addIssueDetail"
              >
                ➕ เพิ่มปัญหา
              </button>
            </div>
          </div>

          <div class="form-group">
            <label>งานตรวจสอบ Code:</label>
            <div class="code-review-section">
              <div
                v-for="(review, index) in formData.codeReview"
                :key="index"
                class="code-review-item"
              >
                <div class="review-header">
                  <h4>งานตรวจสอบ {{ index + 1 }}</h4>
                  <button
                    type="button"
                    class="remove-review-btn"
                    @click="removeCodeReview(index)"
                  >
                    ❌ ลบ
                  </button>
                </div>

                <div class="review-fields">
                  <div class="field-group">
                    <label>โครงการ:</label>
                    <input
                      type="text"
                      v-model="review.project"
                      placeholder="ชื่อโครงการ"
                    />
                  </div>

                  <div class="field-group">
                    <label>รายละเอียด:</label>
                    <textarea
                      v-model="review.description"
                      rows="2"
                      placeholder="รายละเอียดงานตรวจสอบ"
                    ></textarea>
                  </div>

                  <div class="field-group">
                    <label>ความสำคัญ:</label>
                    <select v-model="review.priority">
                      <option value="low">ต่ำ</option>
                      <option value="medium">ปานกลาง</option>
                      <option value="high">สูง</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="button"
                class="add-review-btn"
                @click="addCodeReview"
              >
                ➕ เพิ่มงานตรวจสอบ
              </button>
            </div>
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
            <button type="submit" class="btn-save">💾 บันทึกข้อมูล</button>
            <button type="button" @click="closeModal" class="btn-cancel">
              ❌ ยกเลิก
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Loading Modal -->
    <LoadingModal
      :is-visible="isLoading"
      :message="loadingMessage"
      :progress="loadingProgress"
    />

    <!-- Success Modal -->
    <SuccessModal
      :is-visible="showSuccess"
      :title="successTitle"
      :message="successMessage"
      @close="closeSuccessModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useMeetingStore } from "~/stores/meetingStore";
import { storeToRefs } from "pinia";
import LoadingModal from "~/components/LoadingModal.vue";
import SuccessModal from "~/components/SuccessModal.vue";

interface Props {
  isOpen: boolean;
}

interface FormData {
  title: string;
  date: string;
  inProgress: string;
  completed: string;
  issues: string;
  projectDetails: any[];
  issuesDetails: any[];
  codeReview: any[];
  codeReviewer: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  close: [];
}>();

const store = useMeetingStore();
const {
  meetingData,
  isLoading,
  loadingMessage,
  loadingProgress,
  showSuccess,
  successMessage,
  successTitle,
} = storeToRefs(store);
const {
  updateMeetingInfo,
  updateProjects,
  saveData: saveStoreData,
  closeSuccessModal,
} = store;

const formData = ref<FormData>({
  title: "",
  date: "",
  inProgress: "",
  completed: "",
  issues: "",
  projectDetails: [],
  issuesDetails: [],
  codeReview: [],
  codeReviewer: "",
});

// เติมข้อมูลในฟอร์มเมื่อ modal เปิด
watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      fillFormData();
    }
  }
);

const fillFormData = () => {
  formData.value = {
    title: meetingData.value.meetingInfo.title,
    date: meetingData.value.meetingInfo.date,
    inProgress: meetingData.value.projects.inProgress.join("\n"),
    completed: meetingData.value.projects.completed.join("\n"),
    issues: meetingData.value.projects.issues.join("\n"),
    projectDetails: meetingData.value.projectDetails.map((detail: any) => ({
      ลำดับ: detail.ลำดับ,
      ระบบงาน: detail.ระบบงาน,
      ผู้รับผิดชอบ: detail.ผู้รับผิดชอบ,
      PM: detail.PM,
      ปัญหาที่พบText: Array.isArray(detail.ปัญหาที่พบ)
        ? detail.ปัญหาที่พบ.join("\n")
        : "",
      วิธีแก้ปัญหาText: Array.isArray(detail.วิธีแก้ปัญหา)
        ? detail.วิธีแก้ปัญหา.join("\n")
        : "",
      หมายเหตุText: Array.isArray(detail.หมายเหตุ)
        ? detail.หมายเหตุ.join("\n")
        : "",
    })),
    issuesDetails: meetingData.value.issuesDetails.map((issue: any) => ({
      project: issue.project,
      description: issue.description,
      priority: issue.priority,
    })),
    codeReview: meetingData.value.codeReview.map((review: any) => ({
      project: review.project,
      description: review.description,
      priority: review.priority,
    })),
    codeReviewer: meetingData.value.codeReviewer,
  };
};

const closeModal = () => {
  emit("close");
};

const saveData = async () => {
  try {
    // อัปเดตข้อมูลใน store
    updateMeetingInfo(formData.value.title, formData.value.date);

    // อัปเดตโครงการ
    updateProjects(
      "inProgress",
      formData.value.inProgress.split("\n").filter((item) => item.trim())
    );
    updateProjects(
      "completed",
      formData.value.completed.split("\n").filter((item) => item.trim())
    );
    updateProjects(
      "issues",
      formData.value.issues.split("\n").filter((item) => item.trim())
    );

    // อัปเดตรายละเอียดโครงการ
    const projectDetails = formData.value.projectDetails.map((detail) => ({
      ลำดับ: parseInt(detail.ลำดับ) || 0,
      ระบบงาน: detail.ระบบงาน,
      ผู้รับผิดชอบ: detail.ผู้รับผิดชอบ,
      PM: detail.PM,
      ปัญหาที่พบ: detail.ปัญหาที่พบText
        .split("\n")
        .filter((item: string) => item.trim()),
      วิธีแก้ปัญหา: detail.วิธีแก้ปัญหาText
        .split("\n")
        .filter((item: string) => item.trim()),
      หมายเหตุ: detail.หมายเหตุText
        .split("\n")
        .filter((item: string) => item.trim()),
    }));

    // อัปเดตรายละเอียดปัญหา
    const issuesDetails = formData.value.issuesDetails.filter(
      (issue) => issue.project.trim() && issue.description.trim()
    );

    // อัปเดตงานตรวจสอบ Code
    const codeReview = formData.value.codeReview.filter(
      (review) => review.project.trim() && review.description.trim()
    );

    // อัปเดตข้อมูลทั้งหมดใน store
    store.meetingData = {
      ...store.meetingData,
      projectDetails,
      issuesDetails,
      codeReview,
      codeReviewer: formData.value.codeReviewer,
    };

    // บันทึกข้อมูล
    await saveStoreData();

    // ปิด modal
    closeModal();

    // แสดงข้อความสำเร็จ
    showSuccessMessage("บันทึกข้อมูลเรียบร้อยแล้ว!");
  } catch (error) {
    console.error("Error saving data:", error);
    showErrorMessage("เกิดข้อผิดพลาดในการบันทึกข้อมูล!");
  }
};

// ฟังก์ชันสำหรับจัดการรายละเอียดโครงการ
const addProjectDetail = () => {
  formData.value.projectDetails.push({
    ลำดับ: formData.value.projectDetails.length + 1,
    ระบบงาน: "",
    ผู้รับผิดชอบ: "",
    PM: "",
    ปัญหาที่พบText: "",
    วิธีแก้ปัญหาText: "",
    หมายเหตุText: "",
  });
};

const removeProjectDetail = (index: number) => {
  formData.value.projectDetails.splice(index, 1);
};

// ฟังก์ชันสำหรับจัดการรายละเอียดปัญหา
const addIssueDetail = () => {
  formData.value.issuesDetails.push({
    project: "",
    description: "",
    priority: "medium",
  });
};

const removeIssueDetail = (index: number) => {
  formData.value.issuesDetails.splice(index, 1);
};

// ฟังก์ชันสำหรับจัดการงานตรวจสอบ Code
const addCodeReview = () => {
  formData.value.codeReview.push({
    project: "",
    description: "",
    priority: "medium",
  });
};

const removeCodeReview = (index: number) => {
  formData.value.codeReview.splice(index, 1);
};

const showSuccessMessage = (message: string) => {
  const successDiv = document.createElement("div");
  successDiv.className = "success-message";
  successDiv.textContent = message;
  document.body.appendChild(successDiv);

  setTimeout(() => {
    successDiv.remove();
  }, 3000);
};

const showErrorMessage = (message: string) => {
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;
  document.body.appendChild(errorDiv);

  setTimeout(() => {
    errorDiv.remove();
  }, 3000);
};
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

.error-message {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #e74c3c;
  color: white;
  padding: 15px 20px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1001;
  animation: slideIn 0.3s ease;
}

/* CSS สำหรับรายละเอียดโครงการ */
.project-details-section,
.issues-details-section,
.code-review-section {
  margin-top: 10px;
}

.project-detail-item,
.issue-detail-item,
.code-review-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  background: #f9f9f9;
}

.detail-header,
.issue-header,
.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
}

.detail-header h4,
.issue-header h4,
.review-header h4 {
  margin: 0;
  color: #2c3e50;
  font-size: 16px;
}

.field-row {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
}

.field-group {
  flex: 1;
  margin-bottom: 10px;
}

.field-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #34495e;
  font-size: 14px;
}

.field-group input,
.field-group textarea,
.field-group select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.field-group input:focus,
.field-group textarea:focus,
.field-group select:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

.detail-fields,
.issue-fields,
.review-fields {
  margin-top: 10px;
}

.add-detail-btn,
.add-issue-btn,
.add-review-btn {
  background: #27ae60;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: background 0.3s;
  margin-top: 10px;
}

.add-detail-btn:hover,
.add-issue-btn:hover,
.add-review-btn:hover {
  background: #229954;
}

.remove-detail-btn,
.remove-issue-btn,
.remove-review-btn {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background 0.3s;
}

.remove-detail-btn:hover,
.remove-issue-btn:hover,
.remove-review-btn:hover {
  background: #c0392b;
}

/* Responsive design */
@media (max-width: 768px) {
  .field-row {
    flex-direction: column;
    gap: 0;
  }

  .detail-header,
  .issue-header,
  .review-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
}
</style>

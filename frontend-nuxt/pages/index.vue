<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useMeetingStore } from "~/stores/meetingStore";
import { storeToRefs } from "pinia";
import MeetingHeader from "~/components/MeetingHeader.vue";
import ProjectStatus from "~/components/ProjectStatus.vue";
import IssuesList from "~/components/IssuesList.vue";
import CodeReviewList from "~/components/CodeReviewList.vue";
import EditModal from "~/components/EditModal.vue";
import CSVReader from "~/components/CSVReader.vue";
import LoadingModal from "~/components/LoadingModal.vue";
import SuccessModal from "~/components/SuccessModal.vue";

const store = useMeetingStore();
const {
  isLoading,
  loadingMessage,
  loadingProgress,
  showSuccess,
  successMessage,
  successTitle,
} = storeToRefs(store);
const { closeSuccessModal } = store;
const isEditModalOpen = ref(false);
const isCSVReaderOpen = ref(false);

// โหลดข้อมูลเมื่อ component mount
onMounted(async () => {
  console.log("🚀 Nuxt App mounted, กำลังโหลดข้อมูล...");
  await store.loadData();
  console.log("📊 ข้อมูลที่โหลดแล้ว:", store.meetingData);
});

const openEditModal = () => {
  isEditModalOpen.value = true;
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
};

const openCSVReader = () => {
  isCSVReaderOpen.value = true;
};

const closeCSVReader = () => {
  isCSVReaderOpen.value = false;
};

const printPage = () => {
  if (process.client) {
    window.print();
  }
};
</script>

<template>
  <div id="app">
    <!-- ปุ่มควบคุม -->
    <div class="control-buttons">
      <button class="print-btn" @click="printPage">📄 พิมพ์ PDF</button>
      <button class="edit-btn" @click="openEditModal">✏️ แก้ไขข้อมูล</button>
      <button class="csv-btn" @click="openCSVReader">📊 อ่านไฟล์ CSV</button>
    </div>

    <!-- เนื้อหาหลัก -->
    <div class="container">
      <MeetingHeader />

      <div class="summary-section">
        <ProjectStatus />
        <IssuesList />
        <CodeReviewList />
      </div>
    </div>

    <!-- Modal แก้ไขข้อมูล -->
    <EditModal :is-open="isEditModalOpen" @close="closeEditModal" />

    <!-- CSV Reader Modal -->
    <div v-if="isCSVReaderOpen" class="csv-modal-overlay">
      <CSVReader @close="closeCSVReader" />
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

<style scoped>
#app {
  min-height: 100vh;
}

.control-buttons {
  position: sticky;
  top: 20px;
  z-index: 100;
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-bottom: 20px;
}

.print-btn,
.edit-btn,
.csv-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.print-btn {
  background: #17a2b8;
  color: white;
}

.print-btn:hover {
  background: #138496;
  transform: translateY(-2px);
}

.edit-btn {
  background: #28a745;
  color: white;
}

.edit-btn:hover {
  background: #218838;
  transform: translateY(-2px);
}

.csv-btn {
  background: #6f42c1;
  color: white;
}

.csv-btn:hover {
  background: #5a32a3;
  transform: translateY(-2px);
}

.container {
  max-width: 210mm;
  margin: 0 auto;
  background: white;
  padding: 30px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.summary-section {
  margin-top: 15px;
}

/* Print styles */
@media print {
  .control-buttons {
    display: none;
  }

  .container {
    box-shadow: none;
    max-width: none;
    margin: 0;
    padding: 20px;
  }

  body {
    background: white;
    padding: 0;
  }

  .status-examples,
  .issues-container,
  .code-review-container {
    max-height: none !important;
    overflow-y: visible !important;
  }

  .status-card {
    page-break-inside: avoid;
    margin-bottom: 20px;
  }

  .status-card.in-progress .status-header {
    margin-top: -10px;
    margin-bottom: 15px;
  }

  .status-card.in-progress .status-header h4 {
    margin-top: 0;
    margin-bottom: 8px;
  }

  .tasks-list {
    page-break-inside: avoid;
    margin-bottom: 20px;
  }

  /* ปรับขนาดตัวอักษรสำหรับ PDF */
  .example-item,
  .task-item {
    font-size: 12px;
    line-height: 1.2;
    margin-bottom: 3px;
  }

  /* ปรับขนาดฟอนต์ชื่อโครงการให้เล็กลงอีกนิดนึง */
  .status-examples .example-item {
    font-size: 10px;
    line-height: 1.1;
    padding: 3px 0;
  }

  .stat-number {
    font-size: 28px;
  }

  .stat-label {
    font-size: 12px;
  }

  .status-grid {
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 15px !important;
  }

  .project-status-section h3 {
    font-size: 20px;
  }

  .tasks-list h4 {
    font-size: 16px;
  }

  .status-header h4 {
    font-size: 16px;
  }

  .status-description {
    font-size: 12px;
  }
}

/* CSV Modal Overlay */
.csv-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  overflow-y: auto;
}

/* Responsive design */
@media (max-width: 768px) {
  .control-buttons {
    flex-direction: column;
    align-items: center;
  }

  .container {
    padding: 20px;
    margin: 10px;
  }

  body {
    padding: 10px;
  }

  .csv-modal-overlay {
    padding: 10px;
  }
}
</style>

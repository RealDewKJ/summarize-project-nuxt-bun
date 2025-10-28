<template>
  <div class="project-status-section">
    <h3>📈 สถานะโครงการ</h3>

    <div class="summary-stats">
      <div class="stat-item">
        <div class="stat-number">{{ totalProjects }}</div>
        <div class="stat-label">โครงการทั้งหมด</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">{{ inProgressCount }}</div>
        <div class="stat-label">กำลังดำเนินงาน</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">{{ completedCount }}</div>
        <div class="stat-label">เสร็จสิ้นแล้ว</div>
      </div>
    </div>

    <!-- การ์ดสถานะ -->
    <div class="status-grid">
      <!-- กำลังดำเนินงาน -->
      <div class="status-card in-progress">
        <div class="status-header">
          <h4>🔄 กำลังดำเนินงาน</h4>
          <div class="status-count">{{ inProgressCount }}</div>
        </div>
        <div class="status-description">
          โครงการที่อยู่ระหว่างการพัฒนาและทดสอบ
        </div>
        <div class="status-examples no-scroll">
          <div
            v-for="project in meetingData.projects.inProgress"
            :key="project"
            class="example-item"
          >
            • {{ project }}
          </div>
        </div>
      </div>

      <!-- เสร็จสิ้นแล้ว -->
      <div class="status-card completed">
        <div class="status-header">
          <h4>✅ เสร็จสิ้นแล้ว</h4>
          <div class="status-count">{{ completedCount }}</div>
        </div>
        <div class="status-description">โครงการที่เสร็จสิ้นและพร้อมใช้งาน</div>
        <div class="status-examples no-scroll">
          <div
            v-for="project in meetingData.projects.completed"
            :key="project"
            class="example-item"
          >
            • {{ project }}
          </div>
        </div>
      </div>

      <!-- ปัญหาที่พบ -->
      <div class="status-card issues">
        <div class="status-header">
          <h4>⚠️ ปัญหาที่พบ</h4>
          <div class="status-count">{{ issuesCount }}</div>
        </div>
        <div class="status-description">โครงการที่พบปัญหาและต้องแก้ไข</div>
        <div class="status-examples no-scroll">
          <div
            v-for="project in meetingData.projects.issues"
            :key="project"
            class="example-item"
          >
            • {{ project }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMeetingStore } from "~/stores/meetingStore";
import { storeToRefs } from "pinia";

const store = useMeetingStore();
const {
  meetingData,
  totalProjects,
  inProgressCount,
  completedCount,
  issuesCount,
} = storeToRefs(store);
</script>

<style scoped>
.project-status-section {
  margin-bottom: 20px;
}

.project-status-section h3 {
  color: #007bff;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 2px solid #e9ecef;
}

.summary-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.stat-item {
  text-align: center;
  background: white;
  padding: 15px 12px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  border: 1px solid #e9ecef;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.stat-number {
  font-size: 28px;
  font-weight: 700;
  color: #007bff;
  margin-bottom: 6px;
}

.stat-label {
  font-size: 12px;
  color: #666;
  font-weight: 500;
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 15px;
}

.status-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e9ecef;
  min-height: 250px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.status-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
}

.status-card.in-progress {
  border-left: 4px solid #ffc107;
}

.status-card.completed {
  border-left: 4px solid #28a745;
}

.status-card.issues {
  border-left: 4px solid #dc3545;
}

.status-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.status-header h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.status-count {
  background: #007bff;
  color: white;
  padding: 3px 10px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 600;
}

.status-description {
  color: #666;
  font-size: 13px;
  margin-bottom: 12px;
  line-height: 1.4;
}

.status-examples {
  max-height: none;
  overflow-y: visible;
}

.status-examples.no-scroll {
  max-height: none;
  overflow-y: visible;
}

.example-item {
  padding: 4px 0;
  border-bottom: 1px solid #f0f0f0;
  font-size: 12px;
  color: #333;
  line-height: 1.3;
}

.example-item:last-child {
  border-bottom: none;
}

.example-item:hover {
  background: #f8f9fa;
  padding-left: 6px;
  transition: all 0.2s ease;
}
</style>

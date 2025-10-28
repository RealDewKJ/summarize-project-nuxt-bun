<template>
  <div class="tasks-list">
    <h4 id="code-review-header">
      🔍 ตรวจสอบ Code - {{ meetingData.codeReviewer }}
    </h4>
    <div class="code-review-container">
      <div
        v-for="review in meetingData.codeReview"
        :key="review.project"
        :class="`task-item priority-${review.priority}`"
      >
        <strong>{{ review.project }}:</strong> {{ review.description }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMeetingStore } from "~/stores/meetingStore";
import { storeToRefs } from "pinia";

const store = useMeetingStore();
const { meetingData } = storeToRefs(store);
</script>

<style scoped>
.tasks-list {
  margin: 30px 0;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e9ecef;
}

.tasks-list h4 {
  color: #17a2b8;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid #bee5eb;
}

.code-review-container {
  max-height: none;
  overflow-y: visible;
}

.task-item {
  padding: 10px;
  margin-bottom: 6px;
  border-radius: 6px;
  border-left: 4px solid #17a2b8;
  background: #f8f9fa;
  font-size: 13px;
  line-height: 1.4;
}

.task-item.priority-high {
  border-left-color: #dc3545;
  background: #f8d7da;
}

.task-item.priority-medium {
  border-left-color: #ffc107;
  background: #fff3cd;
}

.task-item.priority-low {
  border-left-color: #6c757d;
  background: #e9ecef;
}

.task-item:last-child {
  margin-bottom: 0;
}

.task-item strong {
  color: #495057;
  font-weight: 600;
}
</style>

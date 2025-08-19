<template>
  <div class="header">
    <h1 id="meeting-title">{{ meetingData.meetingInfo.title }}</h1>
    <div class="date" id="meeting-date">
      {{ meetingData.meetingInfo.date }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMeetingStore } from '@/stores/meetingStore'

const store = useMeetingStore()
const { meetingData } = store
</script>

<style scoped>
.header {
  text-align: center;
  padding-bottom: 20px;
  border-bottom: 3px solid #007bff;
}

.header h1 {
  color: #007bff;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 10px;
}

.header .date {
  color: #666;
  font-size: 16px;
  font-weight: 500;
}
</style>

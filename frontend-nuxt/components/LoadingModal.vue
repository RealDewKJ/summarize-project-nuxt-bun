<template>
  <div v-if="isVisible" class="loading-modal-overlay">
    <div class="loading-modal">
      <div class="loading-content">
        <!-- Spinner Animation -->
        <div class="spinner-container">
          <div class="spinner"></div>
        </div>

        <!-- Loading Text -->
        <div class="loading-text">
          <h3>กำลังโหลดข้อมูล...</h3>
          <p>{{ message }}</p>
        </div>

        <!-- Progress Bar -->
        <div class="progress-container">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progress + '%' }"></div>
          </div>
          <span class="progress-text">{{ progress }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

interface Props {
  isVisible: boolean;
  message?: string;
  progress?: number;
}

const props = withDefaults(defineProps<Props>(), {
  message: "กรุณารอสักครู่...",
  progress: 0,
});

// Auto progress animation
const animatedProgress = ref(0);

watch(
  () => props.isVisible,
  (newValue) => {
    if (newValue) {
      animatedProgress.value = 0;
      const interval = setInterval(() => {
        if (animatedProgress.value < 90) {
          animatedProgress.value += Math.random() * 15;
        } else {
          clearInterval(interval);
        }
      }, 200);
    } else {
      animatedProgress.value = 100;
    }
  }
);

watch(
  () => props.progress,
  (newValue) => {
    if (newValue > 0) {
      animatedProgress.value = newValue;
    }
  }
);
</script>

<style scoped>
.loading-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease;
}

.loading-modal {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 90%;
  text-align: center;
  animation: slideUp 0.4s ease;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
}

.spinner-container {
  position: relative;
  width: 80px;
  height: 80px;
}

.spinner {
  width: 80px;
  height: 80px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  position: relative;
}

.spinner::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  background: #007bff;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: pulse 1.5s ease-in-out infinite;
}

.loading-text h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
}

.loading-text p {
  margin: 0;
  color: #7f8c8d;
  font-size: 16px;
  line-height: 1.4;
}

.progress-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: #ecf0f1;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #007bff, #00d4ff);
  border-radius: 4px;
  transition: width 0.3s ease;
  position: relative;
}

.progress-fill::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  animation: shimmer 2s infinite;
}

.progress-text {
  font-size: 14px;
  font-weight: 600;
  color: #007bff;
  text-align: center;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.7;
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Responsive */
@media (max-width: 480px) {
  .loading-modal {
    padding: 30px 20px;
    margin: 20px;
  }

  .loading-text h3 {
    font-size: 20px;
  }

  .loading-text p {
    font-size: 14px;
  }

  .spinner-container {
    width: 60px;
    height: 60px;
  }

  .spinner {
    width: 60px;
    height: 60px;
  }
}
</style>

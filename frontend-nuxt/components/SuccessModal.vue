<template>
  <div v-if="isVisible" class="success-modal-overlay" @click="closeModal">
    <div class="success-modal" @click.stop>
      <div class="success-content">
        <!-- Success Icon -->
        <div class="success-icon">
          <div class="checkmark">
            <div class="checkmark-circle"></div>
            <div class="checkmark-stem"></div>
            <div class="checkmark-kick"></div>
          </div>
        </div>

        <!-- Success Text -->
        <div class="success-text">
          <h3>{{ title }}</h3>
          <p>{{ message }}</p>
        </div>

        <!-- Action Buttons -->
        <div class="success-actions">
          <button class="btn-primary" @click="closeModal">
            <span class="btn-icon">✓</span>
            {{ confirmText }}
          </button>
          <button v-if="showDetails" class="btn-secondary" @click="viewDetails">
            <span class="btn-icon">👁️</span>
            ดูรายละเอียด
          </button>
        </div>

        <!-- Auto Close Timer -->
        <div v-if="autoClose" class="auto-close-timer">
          <div class="timer-circle">
            <svg class="timer-svg" viewBox="0 0 36 36">
              <path
                class="timer-circle-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                class="timer-circle-fill"
                :stroke-dasharray="`${circumference}, ${circumference}`"
                :stroke-dashoffset="
                  circumference - (progress * circumference) / 100
                "
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span class="timer-text">{{ remainingTime.toFixed(1) }}s</span>
          </div>
          <p class="timer-label">ปิดอัตโนมัติใน</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";

interface Props {
  isVisible: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  showDetails?: boolean;
  autoClose?: boolean;
  autoCloseDelay?: number;
}

const props = withDefaults(defineProps<Props>(), {
  title: "บันทึกสำเร็จ!",
  message: "ข้อมูลถูกบันทึกลงฐานข้อมูลเรียบร้อยแล้ว",
  confirmText: "ตกลง",
  showDetails: false,
  autoClose: true,
  autoCloseDelay: 3,
});

const emit = defineEmits<{
  close: [];
  viewDetails: [];
}>();

const remainingTime = ref(props.autoCloseDelay);
const progress = ref(0);
let timer: NodeJS.Timeout | null = null;

const circumference = 2 * Math.PI * 15.9155; // radius = 15.9155

const closeModal = () => {
  emit("close");
};

const viewDetails = () => {
  emit("viewDetails");
};

const startTimer = () => {
  if (!props.autoClose) return;

  remainingTime.value = props.autoCloseDelay;
  progress.value = 0;

  timer = setInterval(() => {
    remainingTime.value -= 0.1;
    progress.value =
      ((props.autoCloseDelay - remainingTime.value) / props.autoCloseDelay) *
      100;

    if (remainingTime.value <= 0) {
      closeModal();
    }
  }, 100);
};

const stopTimer = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
};

watch(
  () => props.isVisible,
  (newValue) => {
    if (newValue) {
      startTimer();
    } else {
      stopTimer();
    }
  }
);

onMounted(() => {
  if (props.isVisible) {
    startTimer();
  }
});

onUnmounted(() => {
  stopTimer();
});
</script>

<style scoped>
.success-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.4s ease;
}

.success-modal {
  background: white;
  border-radius: 24px;
  padding: 0;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.2);
  max-width: 450px;
  width: 90%;
  text-align: center;
  animation: slideUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  overflow: hidden;
  position: relative;
}

.success-modal::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #00c851, #00d4ff, #007bff);
}

.success-content {
  padding: 40px 30px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
}

.success-icon {
  position: relative;
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
}

.checkmark {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00c851, #00d4ff);
  position: relative;
  animation: checkmarkPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.checkmark-circle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60px;
  height: 60px;
  border: 4px solid white;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  animation: circleExpand 0.8s ease-out 0.2s both;
}

.checkmark-stem {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 25px;
  background: white;
  transform: translate(-50%, -50%) rotate(45deg);
  transform-origin: bottom center;
  animation: stemDraw 0.4s ease-out 0.6s both;
}

.checkmark-kick {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 15px;
  background: white;
  transform: translate(-50%, -50%) rotate(-45deg);
  transform-origin: bottom center;
  animation: kickDraw 0.4s ease-out 0.8s both;
}

.success-text h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #00c851, #007bff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.success-text p {
  margin: 0;
  color: #7f8c8d;
  font-size: 16px;
  line-height: 1.5;
  max-width: 300px;
}

.success-actions {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
}

.btn-primary,
.btn-secondary {
  padding: 12px 24px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 120px;
  justify-content: center;
}

.btn-primary {
  background: linear-gradient(135deg, #00c851, #00d4ff);
  color: white;
  box-shadow: 0 4px 15px rgba(0, 200, 81, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 200, 81, 0.4);
}

.btn-secondary {
  background: #f8f9fa;
  color: #6c757d;
  border: 2px solid #e9ecef;
}

.btn-secondary:hover {
  background: #e9ecef;
  transform: translateY(-1px);
}

.btn-icon {
  font-size: 18px;
}

.auto-close-timer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
}

.timer-circle {
  position: relative;
  width: 40px;
  height: 40px;
}

.timer-svg {
  width: 40px;
  height: 40px;
  transform: rotate(-90deg);
}

.timer-circle-bg {
  fill: none;
  stroke: #e9ecef;
  stroke-width: 2;
}

.timer-circle-fill {
  fill: none;
  stroke: #00c851;
  stroke-width: 2;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.1s linear;
}

.timer-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
  font-weight: 600;
  color: #00c851;
}

.timer-label {
  margin: 0;
  font-size: 12px;
  color: #adb5bd;
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
    transform: translateY(50px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes checkmarkPop {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes circleExpand {
  0% {
    transform: translate(-50%, -50%) scale(0);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes stemDraw {
  0% {
    height: 0;
  }
  100% {
    height: 25px;
  }
}

@keyframes kickDraw {
  0% {
    width: 0;
  }
  100% {
    width: 4px;
  }
}

/* Responsive */
@media (max-width: 480px) {
  .success-modal {
    margin: 20px;
    max-width: none;
  }

  .success-content {
    padding: 30px 20px 25px;
    gap: 20px;
  }

  .success-icon {
    width: 80px;
    height: 80px;
  }

  .checkmark {
    width: 80px;
    height: 80px;
  }

  .checkmark-circle {
    width: 50px;
    height: 50px;
  }

  .success-text h3 {
    font-size: 24px;
  }

  .success-text p {
    font-size: 14px;
  }

  .btn-primary,
  .btn-secondary {
    padding: 10px 20px;
    font-size: 14px;
    min-width: 100px;
  }

  .success-actions {
    flex-direction: column;
    width: 100%;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .success-modal {
    background: #2c3e50;
    color: white;
  }

  .success-text h3 {
    color: white;
  }

  .success-text p {
    color: #bdc3c7;
  }

  .btn-secondary {
    background: #34495e;
    color: #ecf0f1;
    border-color: #4a5f7a;
  }

  .btn-secondary:hover {
    background: #4a5f7a;
  }
}
</style>

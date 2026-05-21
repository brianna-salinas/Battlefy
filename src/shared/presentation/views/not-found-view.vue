<script setup>
/**
 * @file not-found-view.vue
 * @summary Page not found view for unsupported navigation routes.
 * @author Brianna Salinas Guzman
 */
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

function goHome () { router.push('/home') }
</script>

<template>
  <div class="not-found" role="alert" aria-live="assertive">
    <i class="pi pi-exclamation-triangle not-found-icon mb-3" aria-hidden="true"></i>
    <h1 class="not-found-code mb-2">404</h1>
    <p class="not-found-message mb-4">
      {{ t('not-found.message', { path: route.fullPath }) }}
    </p>
    <pv-button
      :label="t('not-found.back-home')"
      icon="pi pi-home"
      @click="goHome"
      aria-label="Return to Home"
    />
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  gap: 0.5rem;
}

.not-found-icon {
  font-size: 4rem;
  color: #f59e0b;
}

.not-found-code {
  font-family: 'Rajdhani', sans-serif;
  font-size: 5rem;
  font-weight: 700;
  color: #e2e8f0;
  line-height: 1;
}

.not-found-message {
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.1rem;
  color: #94a3b8;
  max-width: 480px;
}
</style>

<script setup>
/**
 * @file home-view.vue
 * @summary Home view accessible from /home route.
 * @author Brianna Salinas Guzman
 */
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <div class="home-view" aria-labelledby="home-title">
    <h1 id="home-title" class="home-title text-4xl font-bold mb-4">{{ t('home.title') }}</h1>
    <p class="home-subtitle text-xl">{{ t('home.subtitle') }}</p>
  </div>
</template>

<style scoped>
.home-view {
  max-width: 800px;
  margin: 4rem auto;
  text-align: center;
  padding: 2rem;
}

.home-title {
  color: #e2e8f0;
}

.home-subtitle {
  color: #94a3b8;
}
</style>

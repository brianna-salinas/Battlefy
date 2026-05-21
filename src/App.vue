<script setup>
/**
 * @file App.vue
 * @summary Root application component with toolbar and router-view.
 * @author Brianna Salinas Guzman
 */
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'

const { locale } = useI18n()
const router = useRouter()
const route = useRoute()

/**
 * Switches the application locale.
 * @param {string} lang - Language code ('en' or 'es')
 */
function switchLocale (lang) {
  locale.value = lang
}

function goHome () { router.push('/home') }
function goTournaments () { router.push('/planning/tournaments') }

function isActive (path) {
  return route.path.startsWith(path)
}
</script>

<template>
  <div class="app-wrapper app-dark">
    <pv-toolbar class="app-toolbar" aria-label="Main navigation">
      <template #start>
        <div class="toolbar-brand" role="banner">
          <img
            :src="`https://img.logo.dev/battlefy.com?token=pk_X-1ZO13GSgeOoUrIuJ6BeQ`"
            alt="Battlefy logo"
            class="brand-logo"
            height="32"
            @error="e => e.target.style.display='none'"
          />
          <span class="brand-text">{{ $t('nav.brand') }}</span>
        </div>
      </template>

      <template #center>
        <nav class="toolbar-nav" aria-label="Primary navigation">
          <pv-button
            text
            :label="$t('nav.home')"
            :class="['nav-btn', { 'nav-btn--active': isActive('/home') }]"
            @click="goHome"
            aria-label="Go to Home"
            :aria-current="isActive('/home') ? 'page' : undefined"
          />
          <pv-button
            text
            :label="$t('nav.tournaments')"
            :class="['nav-btn', { 'nav-btn--active': isActive('/planning') }]"
            @click="goTournaments"
            aria-label="Go to Tournaments"
            :aria-current="isActive('/planning') ? 'page' : undefined"
          />
        </nav>
      </template>

      <template #end>
        <div class="locale-switcher" role="group" aria-label="Language selector">
          <pv-button
            label="EN"
            :outlined="locale !== 'en'"
            :severity="locale === 'en' ? 'primary' : 'secondary'"
            size="small"
            class="locale-btn"
            @click="switchLocale('en')"
            :aria-pressed="locale === 'en'"
            aria-label="Switch to English"
          />
          <pv-button
            label="ES"
            :outlined="locale !== 'es'"
            :severity="locale === 'es' ? 'primary' : 'secondary'"
            size="small"
            class="locale-btn"
            @click="switchLocale('es')"
            :aria-pressed="locale === 'es'"
            aria-label="Switch to Spanish"
          />
        </div>
      </template>
    </pv-toolbar>

    <main class="app-content" role="main">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #0d0d14;
}

.app-toolbar {
  position: sticky;
  top: 0;
  z-index: 100;
}

.toolbar-brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.brand-logo {
  object-fit: contain;
}

.brand-text {
  font-family: 'Rajdhani', sans-serif;
  font-weight: 700;
  font-size: 1.05rem;
  white-space: nowrap;
  letter-spacing: 0.04em;
}

.toolbar-nav {
  display: flex;
  gap: 0.25rem;
}

.nav-btn {
  font-family: 'Rajdhani', sans-serif;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-size: 0.85rem;
  position: relative;
  transition: color 0.2s;
}

.nav-btn--active::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 2px;
  border-radius: 2px;
  background: var(--p-primary-color, #7c3aed);
}

.locale-switcher {
  display: flex;
  gap: 0.25rem;
}

.app-content {
  flex: 1;
  padding: 1.5rem;
}
</style>

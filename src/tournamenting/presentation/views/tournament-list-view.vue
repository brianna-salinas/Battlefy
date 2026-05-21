<script setup>
/**
 * @file tournament-list-view.vue
 * @summary Tournaments view accessible from /planning/tournaments route.
 * @author Brianna Salinas Guzman
 */
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTournamentStore } from '../../application/tournament.store.js'
import TournamentSummary from '../components/tournament-summary.vue'

const { t } = useI18n()
const store = useTournamentStore()

onMounted(() => {
  store.fetchAll()
})
</script>

<template>
  <div class="tournament-list-view" aria-labelledby="tournaments-title">
    <h1 id="tournaments-title" class="view-title mb-4" style="color:#e2e8f0;font-family:'Rajdhani',sans-serif;font-weight:700;">
      {{ t('tournaments.title') }}
    </h1>

    <pv-progress-spinner v-if="store.loading" aria-label="Loading tournaments" />

    <pv-message
      v-else-if="store.error"
      severity="error"
      :closable="false"
    >
      {{ store.error }}
    </pv-message>

    <div v-else class="grid">
      <div
        v-for="tournament in store.tournaments"
        :key="tournament.id"
        class="col-12 md:col-6"
      >
        <tournament-summary
          :tournament="tournament"
          :games="store.gamesByTournament(tournament.id)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.tournament-list-view {
  max-width: 1200px;
  margin: 0 auto;
}

.view-title {
  font-size: 2rem;
  font-weight: 700;
  color: #e2e8f0;
  letter-spacing: 0.03em;
}
</style>

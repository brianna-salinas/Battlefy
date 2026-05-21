<script setup>
/**
 * @file tournament-summary.vue
 * @summary Tournament summary card component showing tournament details, player count, and game list.
 * @author Brianna Salinas Guzman
 */
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  /** @type {import('../../domain/tournament.entity.js').Tournament} */
  tournament: { type: Object, required: true },
  /** @type {import('../../domain/tournament-game.entity.js').TournamentGame[]} */
  games: { type: Array, default: () => [] }
})

const { t } = useI18n()
const router = useRouter()

/** Total players across all games for this tournament */
const totalPlayers = computed(() =>
  props.games.reduce((sum, g) => sum + g.players, 0)
)

/** Total registered games count */
const totalGames = computed(() => props.games.length)

/** Formatted player count */
const formattedPlayers = computed(() =>
  new Intl.NumberFormat().format(totalPlayers.value)
)

function openTournament () {
  window.open(props.tournament.urlToTournament, '_blank')
}

function editTournament () {
  router.push(`/planning/tournaments/${props.tournament.id}/edit`)
}
</script>

<template>
  <pv-card
    class="tournament-card"
    aria-label="Tournament card"
  >
    <template #header>
      <img
        :src="tournament.bannerUrl"
        :alt="tournament.name + ' banner'"
        class="tournament-banner"
      />
    </template>

    <template #title>
      {{ tournament.name }}
    </template>

    <template #subtitle>
      <div class="card-subtitle" aria-label="Tournament statistics">
        <span aria-label="Total players">
          {{ t('tournaments.players', { count: formattedPlayers }) }}
        </span>
        <span aria-label="Total games">
          {{ t('tournaments.games', { count: totalGames }) }}
        </span>
      </div>
    </template>

    <template #content>
      <div class="game-list" aria-label="Registered games">
        <template v-if="games.length > 0">
          <pv-tag
            v-for="game in games"
            :key="game.id"
            :value="game.gameTitle"
            severity="secondary"
            class="game-tag"
          />
        </template>
        <span v-else class="no-games text-color-secondary">
          {{ t('tournaments.no-games') }}
        </span>
      </div>
    </template>

    <template #footer>
      <div class="card-footer">
        <pv-button
          :label="t('tournaments.edit')"
          icon="pi pi-pencil"
          outlined
          severity="secondary"
          size="small"
          @click="editTournament"
          :aria-label="`Edit ${tournament.name}`"
        />
        <pv-button
          :label="t('tournaments.view-tournament')"
          icon="pi pi-external-link"
          size="small"
          @click="openTournament"
          :aria-label="`View ${tournament.name} tournament`"
        />
      </div>
    </template>
  </pv-card>
</template>

<style scoped>
.tournament-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tournament-banner {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.card-subtitle {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
}

.game-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  min-height: 2rem;
}

.game-tag {
  font-size: 0.75rem;
}

.no-games {
  font-style: italic;
  font-size: 0.875rem;
}

.card-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
</style>

<script setup>
/**
 * @file tournament-edit-view.vue
 * @summary Edit Tournament view with games data-table and delete/add actions.
 * @author Brianna Salinas Guzman
 */
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useTournamentStore } from '../../application/tournament.store.js'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'

const props = defineProps({
  tournamentId: { type: String, required: true }
})

const { t } = useI18n()
const router = useRouter()
const store = useTournamentStore()
const toast = useToast()
const confirm = useConfirm()

/** @type {import('vue').Ref<import('../../domain/tournament.entity.js').Tournament|null>} */
const tournament = ref(null)

const numericId = computed(() => Number(props.tournamentId))

const games = computed(() => store.gamesByTournament(numericId.value))

/**
 * Formats a date string to a locale date-time string.
 * @param {string} dateStr
 * @returns {string}
 */
function formatDate (dateStr) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(dateStr))
}

onMounted(async () => {
  tournament.value = await store.fetchById(numericId.value)
  await store.fetchGamesByTournament(numericId.value)
})

/**
 * Confirms and deletes a tournament game.
 * @param {import('../../domain/tournament-game.entity.js').TournamentGame} game
 */
function confirmDelete (game) {
  confirm.require({
    message: t('edit-tournament.confirm-delete-message'),
    header: t('edit-tournament.confirm-delete'),
    icon: 'pi pi-exclamation-triangle',
    acceptLabel: t('edit-tournament.yes'),
    rejectLabel: t('edit-tournament.no'),
    accept: async () => {
      await store.deleteTournamentGame(game.id)
      toast.add({
        severity: 'success',
        summary: 'Deleted',
        detail: `${game.gameTitle} removed.`,
        life: 3000
      })
    }
  })
}

function addGame () {
  router.push(`/planning/tournaments/${props.tournamentId}/games/new`)
}
</script>

<template>
  <div class="edit-tournament-view" aria-labelledby="edit-title">
    <h1 id="edit-title" class="view-title mb-1" style="color:#e2e8f0;font-family:'Rajdhani',sans-serif;font-weight:700;">
      {{ t('edit-tournament.title') }}
    </h1>
    <h2 v-if="tournament" class="view-subtitle mb-4" style="color:#94a3b8;font-family:'Rajdhani',sans-serif;font-weight:600;">
      {{ tournament.name }}
    </h2>

    <!-- Tournament info header -->
    <pv-card v-if="tournament" class="mb-4" aria-label="Tournament information">
      <template #content>
        <div class="tournament-info grid">
          <div class="col-12 md:col-2">
            <img
              :src="tournament.bannerUrl"
              :alt="tournament.name + ' banner'"
              class="info-banner"
            />
          </div>
          <div class="col-12 md:col-10 flex flex-column gap-2">
            <p><strong>Name:</strong> {{ tournament.name }}</p>
            <p><strong>Genre:</strong> {{ tournament.gameGenre }}</p>
            <p><strong>Description:</strong> {{ tournament.description }}</p>
          </div>
        </div>
      </template>
    </pv-card>

    <!-- Games data-table -->
    <div class="games-section">
      <div class="section-header flex justify-content-between align-items-center mb-3">
        <h3 class="games-title m-0">Games</h3>
        <pv-button
          :label="t('edit-tournament.add-game')"
          icon="pi pi-plus"
          size="small"
          @click="addGame"
          aria-label="Add new tournament game"
        />
      </div>

      <pv-data-table
        :value="games"
        responsive-layout="scroll"
        aria-label="Tournament games table"
        show-gridlines
      >
        <pv-column
          field="gameTitle"
          :header="t('edit-tournament.game-title')"
          sortable
        />
        <pv-column
          field="players"
          :header="t('edit-tournament.players')"
          sortable
          style="width: 10rem"
        />
        <pv-column
          field="registeredAt"
          :header="t('edit-tournament.registered-at')"
          sortable
          style="width: 16rem"
        >
          <template #body="{ data }">
            {{ formatDate(data.registeredAt) }}
          </template>
        </pv-column>
        <pv-column
          :header="t('edit-tournament.actions')"
          style="width: 8rem"
        >
          <template #body="{ data }">
            <pv-button
              icon="pi pi-trash"
              severity="danger"
              text
              rounded
              size="small"
              @click="confirmDelete(data)"
              :aria-label="`Delete ${data.gameTitle}`"
            />
          </template>
        </pv-column>

        <template #empty>
          <div class="text-center p-3 text-color-secondary">
            {{ t('tournaments.no-games') }}
          </div>
        </template>
      </pv-data-table>
    </div>

    <pv-confirm-dialog aria-live="assertive" />
    <pv-toast />
  </div>
</template>

<style scoped>
.edit-tournament-view {
  max-width: 1000px;
  margin: 0 auto;
}

.info-banner {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
}

.games-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #e2e8f0;
}
</style>

<script setup>
/**
 * @file tournament-game-new-view.vue
 * @summary New Tournament Game view for adding a game to a tournament.
 * @author Brianna Salinas Guzman
 */
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useTournamentStore } from '../../application/tournament.store.js'
import { freeToGameApi } from '@/gaming/infrastructure/free-to-game.api.js'
import { useToast } from 'primevue/usetoast'

const props = defineProps({
  tournamentId: { type: String, required: true }
})

const { t } = useI18n()
const router = useRouter()
const store = useTournamentStore()
const toast = useToast()

/** @type {import('vue').Ref<import('../../domain/tournament.entity.js').Tournament|null>} */
const tournament = ref(null)

/** @type {import('vue').Ref<object[]>} Available games from FreeToGame API */
const availableGames = ref([])

/** @type {import('vue').Ref<object|null>} */
const selectedGame = ref(null)

/** @type {import('vue').Ref<number|null>} */
const players = ref(null)

/** @type {import('vue').Ref<boolean>} */
const loadingGames = ref(false)

/** @type {import('vue').Ref<boolean>} */
const submitting = ref(false)

/** @type {import('vue').Ref<string>} */
const errorMessage = ref('')

/** @type {import('vue').Ref<string>} */
const loadError = ref('')

const numericId = computed(() => Number(props.tournamentId))

/** Existing game titles for this tournament to prevent duplicates */
const existingTitles = computed(() =>
  store.gamesByTournament(numericId.value).map(g => g.gameTitle)
)

onMounted(async () => {
  tournament.value = await store.fetchById(numericId.value)
  await store.fetchGamesByTournament(numericId.value)
  if (tournament.value) {
    await loadGames(tournament.value.gameGenre)
  }
})

/**
 * Loads games from FreeToGame API by genre.
 * @param {string} genre
 */
async function loadGames (genre) {
  loadingGames.value = true
  loadError.value = ''
  try {
    const games = await freeToGameApi.getByCategory(genre)
    availableGames.value = games
  } catch {
    availableGames.value = []
    loadError.value = `Could not load games for genre "${genre}". Check your connection or try again.`
  } finally {
    loadingGames.value = false
  }
}

/** Validates and creates the tournament game record */
async function handleCreate () {
  errorMessage.value = ''

  if (!selectedGame.value) {
    errorMessage.value = 'Please select a game.'
    return
  }
  if (!players.value || players.value < 1 || players.value > 128) {
    errorMessage.value = 'Players must be between 1 and 128.'
    return
  }
  if (existingTitles.value.includes(selectedGame.value.title)) {
    errorMessage.value = t('new-tournament-game.duplicate-error')
    return
  }

  submitting.value = true
  try {
    await store.createTournamentGame({
      tournamentId: numericId.value,
      gameGenre: tournament.value.gameGenre,
      gameId: selectedGame.value.id,
      gameTitle: selectedGame.value.title,
      players: players.value,
      registeredAt: new Date().toISOString()
    })
    toast.add({
      severity: 'success',
      summary: 'Created',
      detail: t('new-tournament-game.success'),
      life: 3000
    })
    goBack()
  } catch {
    errorMessage.value = 'Failed to create tournament game. Please try again.'
  } finally {
    submitting.value = false
  }
}

function goBack () {
  router.push(`/planning/tournaments/${props.tournamentId}/edit`)
}
</script>

<template>
  <div class="new-game-view" aria-labelledby="new-game-title">
    <h1 id="new-game-title" class="view-title mb-4" style="color:#e2e8f0;font-family:'Rajdhani',sans-serif;font-weight:700;">
      {{ t('new-tournament-game.title', { name: tournament?.name ?? '' }) }}
    </h1>

    <pv-card style="max-width: 600px">
      <template #content>
        <div class="flex flex-column gap-4">

          <!-- Game selector -->
          <div class="field">
            <label for="game-select" class="font-semibold mb-2 block">
              {{ t('new-tournament-game.select-game') }}
            </label>
            <pv-message
              v-if="loadError"
              severity="warn"
              :closable="false"
              class="mb-2"
            >
              {{ loadError }}
            </pv-message>
            <pv-select
              id="game-select"
              v-model="selectedGame"
              :options="availableGames"
              option-label="title"
              :placeholder="t('new-tournament-game.select-game')"
              :loading="loadingGames"
              :empty-message="loadError ? 'Failed to load games' : 'No games found for this genre'"
              filter
              class="w-full"
              aria-label="Select game"
            />
          </div>

          <!-- Players input -->
          <div class="field">
            <label for="players-input" class="font-semibold mb-2 block">
              {{ t('new-tournament-game.players') }}
            </label>
            <pv-input-number
              id="players-input"
              v-model="players"
              :min="1"
              :max="128"
              :placeholder="t('new-tournament-game.players-hint')"
              class="w-full"
              aria-label="Number of players"
              aria-describedby="players-hint"
            />
            <small id="players-hint" class="text-color-secondary">
              {{ t('new-tournament-game.players-hint') }}
            </small>
          </div>

          <!-- Error message -->
          <pv-message
            v-if="errorMessage"
            severity="error"
            :closable="false"
            aria-live="assertive"
          >
            {{ errorMessage }}
          </pv-message>

          <!-- Actions -->
          <div class="flex gap-2 justify-content-end">
            <pv-button
              :label="t('new-tournament-game.cancel')"
              severity="secondary"
              outlined
              icon="pi pi-times"
              @click="goBack"
              aria-label="Cancel and go back"
            />
            <pv-button
              :label="t('new-tournament-game.create')"
              icon="pi pi-check"
              :loading="submitting"
              @click="handleCreate"
              aria-label="Create tournament game"
            />
          </div>

        </div>
      </template>
    </pv-card>

    <pv-toast />
  </div>
</template>

<style scoped>
.new-game-view {
  max-width: 700px;
  margin: 0 auto;
}
</style>

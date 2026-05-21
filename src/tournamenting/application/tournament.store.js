/**
 * @file tournament.store.js
 * @summary Pinia store for Tournament state management.
 * @author Brianna Salinas Guzman
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { tournamentApi } from '../infrastructure/tournament.api.js'
import { tournamentGameApi } from '../infrastructure/tournament-game.api.js'

export const useTournamentStore = defineStore('tournament', () => {
  /** @type {import('vue').Ref<import('../domain/tournament.entity.js').Tournament[]>} */
  const tournaments = ref([])

  /** @type {import('vue').Ref<import('../domain/tournament-game.entity.js').TournamentGame[]>} */
  const tournamentGames = ref([])

  /** @type {import('vue').Ref<boolean>} */
  const loading = ref(false)

  /** @type {import('vue').Ref<string>} */
  const error = ref('')

  const totalPlayersByTournament = computed(() => (tournamentId) => {
    return tournamentGames.value
      .filter(g => g.tournamentId === tournamentId)
      .reduce((sum, g) => sum + g.players, 0)
  })

  const gamesByTournament = computed(() => (tournamentId) => {
    return tournamentGames.value.filter(g => g.tournamentId === tournamentId)
  })

  async function fetchAll () {
    loading.value = true
    error.value = ''
    try {
      const [t, g] = await Promise.all([
        tournamentApi.getAll(),
        tournamentGameApi.getAll()
      ])
      tournaments.value = t
      tournamentGames.value = g
    } catch (e) {
      error.value = 'Could not connect to the server. Make sure the backend (json-server) is running on port 3000.'
    } finally {
      loading.value = false
    }
  }

  async function fetchById (id) {
    return tournamentApi.getById(id)
  }

  async function fetchGamesByTournament (tournamentId) {
    loading.value = true
    error.value = ''
    try {
      const games = await tournamentGameApi.getByTournamentId(tournamentId)
      tournamentGames.value = [
        ...tournamentGames.value.filter(g => g.tournamentId !== tournamentId),
        ...games
      ]
    } catch (e) {
      error.value = 'Could not load games for this tournament.'
    } finally {
      loading.value = false
    }
  }

  async function createTournamentGame (payload) {
    const newGame = await tournamentGameApi.create(payload)
    tournamentGames.value.push(newGame)
    return newGame
  }

  async function deleteTournamentGame (id) {
    await tournamentGameApi.remove(id)
    tournamentGames.value = tournamentGames.value.filter(g => g.id !== id)
  }

  return {
    tournaments,
    tournamentGames,
    loading,
    error,
    totalPlayersByTournament,
    gamesByTournament,
    fetchAll,
    fetchById,
    fetchGamesByTournament,
    createTournamentGame,
    deleteTournamentGame
  }
})

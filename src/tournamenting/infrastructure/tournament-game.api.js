/**
 * @file tournament-game.api.js
 * @summary API endpoint service for TournamentGame resources.
 * @author Brianna Salinas Guzman
 */
import httpService from '@/shared/infrastructure/http.service.js'
import { TournamentGameAssembler } from './tournament-game.assembler.js'

const ENDPOINT = '/tournament-games'

export const tournamentGameApi = {
  /**
   * Fetches all tournament games.
   * @returns {Promise<import('../domain/tournament-game.entity.js').TournamentGame[]>}
   */
  async getAll () {
    const { data } = await httpService.get(ENDPOINT)
    return TournamentGameAssembler.toEntities(data)
  },

  /**
   * Fetches tournament games by tournament ID.
   * @param {number} tournamentId
   * @returns {Promise<import('../domain/tournament-game.entity.js').TournamentGame[]>}
   */
  async getByTournamentId (tournamentId) {
    const { data } = await httpService.get(`${ENDPOINT}?tournamentId=${tournamentId}`)
    return TournamentGameAssembler.toEntities(data)
  },

  /**
   * Creates a new tournament game.
   * @param {object} payload
   * @returns {Promise<import('../domain/tournament-game.entity.js').TournamentGame>}
   */
  async create (payload) {
    const { data } = await httpService.post(ENDPOINT, payload)
    return TournamentGameAssembler.toEntity(data)
  },

  /**
   * Deletes a tournament game by ID.
   * @param {number} id
   * @returns {Promise<void>}
   */
  async remove (id) {
    await httpService.delete(`${ENDPOINT}/${id}`)
  }
}

/**
 * @file tournament.api.js
 * @summary API endpoint service for Tournament resources.
 * @author Brianna Salinas Guzman
 */
import httpService from '@/shared/infrastructure/http.service.js'
import { TournamentAssembler } from './tournament.assembler.js'

const ENDPOINT = '/tournaments'

export const tournamentApi = {
  /**
   * Fetches all tournaments.
   * @returns {Promise<import('../domain/tournament.entity.js').Tournament[]>}
   */
  async getAll () {
    const { data } = await httpService.get(ENDPOINT)
    return TournamentAssembler.toEntities(data)
  },

  /**
   * Fetches a single tournament by ID.
   * @param {number} id
   * @returns {Promise<import('../domain/tournament.entity.js').Tournament>}
   */
  async getById (id) {
    const { data } = await httpService.get(`${ENDPOINT}/${id}`)
    return TournamentAssembler.toEntity(data)
  }
}

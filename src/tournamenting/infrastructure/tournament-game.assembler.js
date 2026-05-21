/**
 * @file tournament-game.assembler.js
 * @summary Assembler for mapping raw API responses to TournamentGame domain entities.
 * @author Brianna Salinas Guzman
 */
import { TournamentGame } from '../domain/tournament-game.entity.js'

export class TournamentGameAssembler {
  /**
   * @param {object} resource
   * @returns {TournamentGame}
   */
  static toEntity (resource) {
    return new TournamentGame(resource)
  }

  /**
   * @param {object[]} resources
   * @returns {TournamentGame[]}
   */
  static toEntities (resources) {
    return resources.map(r => TournamentGameAssembler.toEntity(r))
  }

  /**
   * @param {TournamentGame} entity
   * @returns {object}
   */
  static toResource (entity) {
    return { ...entity }
  }
}

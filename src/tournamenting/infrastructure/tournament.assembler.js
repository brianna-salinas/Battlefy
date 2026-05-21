/**
 * @file tournament.assembler.js
 * @summary Assembler for mapping raw API responses to Tournament domain entities.
 * @author Brianna Salinas Guzman
 */
import { Tournament } from '../domain/tournament.entity.js'

export class TournamentAssembler {
  /**
   * Maps a raw resource object to a Tournament entity.
   * @param {object} resource - Raw API object
   * @returns {Tournament}
   */
  static toEntity (resource) {
    return new Tournament(resource)
  }

  /**
   * Maps an array of raw resources to Tournament entities.
   * @param {object[]} resources
   * @returns {Tournament[]}
   */
  static toEntities (resources) {
    return resources.map(r => TournamentAssembler.toEntity(r))
  }

  /**
   * Maps a Tournament entity to a plain resource object for the API.
   * @param {Tournament} entity
   * @returns {object}
   */
  static toResource (entity) {
    return { ...entity }
  }
}

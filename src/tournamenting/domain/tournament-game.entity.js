/**
 * @file tournament-game.entity.js
 * @summary Domain entity representing a TournamentGame.
 * @author Brianna Salinas Guzman
 */
export class TournamentGame {
  /**
   * @param {object} data - Raw tournament game data
   * @param {number} data.id
   * @param {number} data.tournamentId
   * @param {string} data.gameGenre
   * @param {number} data.gameId
   * @param {string} data.gameTitle
   * @param {number} data.players
   * @param {string} data.registeredAt
   */
  constructor ({ id, tournamentId, gameGenre, gameId, gameTitle, players, registeredAt }) {
    this.id = id
    this.tournamentId = tournamentId
    this.gameGenre = gameGenre
    this.gameId = gameId
    this.gameTitle = gameTitle
    this.players = players
    this.registeredAt = registeredAt
  }
}

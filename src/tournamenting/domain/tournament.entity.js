/**
 * @file tournament.entity.js
 * @summary Domain entity representing a Tournament.
 * @author Brianna Salinas Guzman
 */
export class Tournament {
  /**
   * @param {object} data - Raw tournament data
   * @param {number} data.id
   * @param {string} data.name
   * @param {string} data.description
   * @param {string} data.gameGenre
   * @param {string} data.bannerUrl
   * @param {string} data.urlToTournament
   */
  constructor ({ id, name, description, gameGenre, bannerUrl, urlToTournament }) {
    this.id = id
    this.name = name
    this.description = description
    this.gameGenre = gameGenre
    this.bannerUrl = bannerUrl
    this.urlToTournament = urlToTournament
  }
}

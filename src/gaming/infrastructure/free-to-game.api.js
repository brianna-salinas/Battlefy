/**
 * @file free-to-game.api.js
 * @summary API service for the FreeToGame external API.
 * @author Brianna Salinas Guzman
 */
import axios from 'axios'

const freeToGameClient = axios.create({
  baseURL: import.meta.env.VITE_FREETOGAME_API_URL
})

export const freeToGameApi = {
  /**
   * Fetches games by category/genre.
   * @param {string} category - game genre (shooter, mmorpg, strategy, racing, sports, fighting)
   * @returns {Promise<object[]>}
   */
  async getByCategory (category) {
    const { data } = await freeToGameClient.get('/games', { params: { category } })
    return data
  }
}

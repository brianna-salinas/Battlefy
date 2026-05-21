/**
 * @file http.service.js
 * @summary Shared Axios HTTP client configured with base URL from environment.
 * @author Brianna Salinas Guzman
 */
import axios from 'axios'

/** @type {import('axios').AxiosInstance} */
const httpService = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
})

export default httpService

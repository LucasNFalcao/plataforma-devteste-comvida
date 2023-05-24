import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://api-dev-comvida.ctc.ufsc.br/api',
})

export const createSession = async (email, password) => {
  return api.post('/sessions', { email, password })
}

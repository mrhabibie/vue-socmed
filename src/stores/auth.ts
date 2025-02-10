import axios from 'axios'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
    token: localStorage.getItem('token') || null,
  }),

  actions: {
    async login(email: string, password: string) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
          email,
          password,
        })
        this.token = response.data.token
        this.user = response.data.user
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        return true
      } catch (error) {
        console.error('Login error:', error?.response?.data?.message ?? error)
        return false
      }
    },

    async register(username: string, email: string, password: string) {
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/register`, {
          username,
          email,
          password,
        })
        return true
      } catch (error) {
        console.error('Registration error:', error?.response?.data?.message ?? error)
        return false
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/'
    },
  },
})

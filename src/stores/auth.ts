import axios from 'axios'
import { defineStore } from 'pinia'

interface User {
  _id: string
  username: string
  email: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: localStorage.getItem('user') || null,
  }),

  actions: {
    async login(email: string, password: string) {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          email,
          password,
        })
        this.token = response.data.token
        this.user = response.data.user
        localStorage.setItem('token', response.data.token)
        return true
      } catch (error) {
        console.error('Login error:', error)
        return false
      }
    },

    async register(username: string, email: string, password: string) {
      try {
        await axios.post('http://localhost:5000/api/auth/register', {
          username,
          email,
          password,
        })
        return true
      } catch (error) {
        console.error('Registration error:', error)
        return false
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    },
  },
})

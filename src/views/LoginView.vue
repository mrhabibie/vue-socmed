<template>
  <form @submit.prevent="handleLogin">
    <label>Email</label>
    <input type="email" v-model="email" />
    <label>Password</label>
    <input type="password" v-model="password" />
    <button type="submit">Login</button>
  </form>
  <p>Don't have an account? <RouterLink to="/register">Register</RouterLink></p>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  const success = await authStore.login(email.value, password.value)
  if (success) {
    router.push('/')
  }
}
</script>

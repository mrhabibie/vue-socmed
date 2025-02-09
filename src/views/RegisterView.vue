<template>
  <form @submit.prevent="handleRegister">
    <label>Username</label>
    <input type="text" v-model="username" />
    <label>Email</label>
    <input type="email" v-model="email" />
    <label>Password</label>
    <input type="password" v-model="password" />
    <button type="submit">Register</button>
  </form>
  <p>Already have an account? <RouterLink to="/login">Login</RouterLink></p>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const email = ref('')
const password = ref('')

const handleRegister = async () => {
  const success = await authStore.register(username.value, email.value, password.value)
  if (success) {
    router.push('/login')
  }
}
</script>

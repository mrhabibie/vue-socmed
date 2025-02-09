<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 p-4"
  >
    <div
      class="max-w-md w-full transform transition-all duration-300 hover:scale-[1.01] space-y-8 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl"
    >
      <!-- Header -->
      <div class="text-center space-y-2">
        <h2
          class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent"
        >
          Create your account
        </h2>
        <p class="text-sm text-gray-600">Join us and start your journey</p>
      </div>

      <!-- Form -->
      <form class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <!-- Username Field -->
        <div class="space-y-2">
          <label for="username" class="block text-sm font-medium text-gray-700"> Username </label>
          <div class="relative">
            <input
              id="username"
              v-model="username"
              type="text"
              required
              class="peer w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              placeholder="Enter your username"
            />
            <label
              class="absolute left-4 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600"
              >Username</label
            >
          </div>
        </div>

        <!-- Email Field -->
        <div class="space-y-2">
          <label for="email" class="block text-sm font-medium text-gray-700"> Email address </label>
          <div class="relative">
            <input
              id="email"
              v-model="email"
              type="email"
              autocomplete="email"
              required
              class="peer w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              placeholder="Enter your email"
            />
            <label
              class="absolute left-4 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600"
              >Email address</label
            >
          </div>
        </div>

        <!-- Password Field -->
        <div class="space-y-2">
          <label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
          <div class="relative">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              required
              class="peer w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm placeholder-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              placeholder="Enter your password"
            />
            <label
              class="absolute left-4 -top-2.5 bg-white px-2 text-sm text-gray-600 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600"
              >Password</label
            >
            <button
              type="button"
              class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              @click="showPassword = !showPassword"
            >
              <svg
                v-if="showPassword"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            class="relative w-full py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 overflow-hidden group"
          >
            <span
              class="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"
            ></span>
            <span class="relative">Register</span>
          </button>
        </div>
      </form>

      <!-- Sign Up Link -->
      <div class="text-center text-sm">
        <p class="text-gray-600">
          Already have an account?
          <router-link
            to="/login"
            class="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
            >Login</router-link
          >
        </p>
      </div>
    </div>
  </div>
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
const showPassword = ref(false)

const handleRegister = async () => {
  const success = await authStore.register(username.value, email.value, password.value)
  if (success) {
    router.push('/')
  }
}
</script>

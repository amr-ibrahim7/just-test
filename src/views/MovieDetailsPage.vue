<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useMovies } from '@/composables/useMovies.js'

const route = useRoute()
const { fetchOneMovie } = useMovies()

const movie = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const movieId = route.params.id
    movie.value = await fetchOneMovie(movieId)
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white p-8">
    <div class="container mx-auto max-w-4xl">
      <div class="mb-8">
        <RouterLink
          to="/"
          class="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clip-rule="evenodd"
            />
          </svg>
          Back to Movie List
        </RouterLink>
      </div>

      <div v-if="loading" class="text-center text-2xl text-gray-400">Loading movie details...</div>
      <div v-else-if="error" class="text-center text-2xl text-red-400">Error: {{ error }}</div>
      <div v-else-if="movie" class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="md:col-span-1">
          <img
            :src="movie.image"
            :alt="movie.name"
            class="rounded-lg shadow-lg w-full object-cover"
          />
        </div>
        <div class="md:col-span-2">
          <h1 class="text-4xl font-bold mb-2">{{ movie.name }}</h1>

          <div
            v-if="movie.inTheaters"
            class="inline-block bg-green-500 text-white px-3 py-1 text-sm rounded-full mb-4"
          >
            Currently In Theaters
          </div>

          <div class="flex items-center mb-4">
            <div class="flex items-center text-2xl">
              <span
                v-for="star in 5"
                :key="star"
                :class="star <= movie.rating ? 'text-yellow-400' : 'text-gray-600'"
              >
                ★
              </span>
            </div>
            <span class="ml-3 text-gray-400 text-lg">({{ movie.rating }} / 5)</span>
          </div>

          <div class="mb-4">
            <h3 class="text-lg font-semibold text-gray-300 mb-2">Genres</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="genre in movie.genres"
                :key="genre"
                class="px-3 py-1 bg-gray-700 text-cyan-300 text-sm rounded-full"
              >
                {{ genre }}
              </span>
            </div>
          </div>

          <h3 class="text-lg font-semibold text-gray-300 mb-2">Description</h3>
          <p class="text-gray-400 leading-relaxed">{{ movie.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

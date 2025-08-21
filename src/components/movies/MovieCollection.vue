<script setup>
import { ref, onMounted, computed } from 'vue'
import MovieCard from './MovieCard.vue'

const movies = ref([])

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/items')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    movies.value = data
  } catch (error) {
    console.error('Failed to fetch movies:', error)
  }
})
const totalMovies = computed(() => {
  return movies.value.length
})

const averageRating = computed(() => {
  if (movies.value.length === 0) {
    return 0
  }

  const total = movies.value.reduce((sum, movie) => sum + movie.rating, 0)

  return (total / movies.value.length).toFixed(1)
})
</script>

<template>
  <div class="flex items-center justify-between mb-12">
    <div class="flex items-center space-x-8">
      <div class="text-gray-300 text-lg font-medium">
        <span class="text-white font-semibold">Total Movies:</span> {{ totalMovies }}
      </div>
      <div class="text-gray-400 text-xl font-light">/</div>
      <div class="text-gray-300 text-lg font-medium">
        <span class="text-white font-semibold">Average Rating:</span> {{ averageRating }}
      </div>
    </div>

    <div class="flex space-x-4">
      <button
        class="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200"
      >
        Remove Ratings
      </button>
      <button
        class="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors duration-200"
      >
        Add Movie
      </button>
    </div>
  </div>

  <div v-if="movies.length === 0" class="text-center text-gray-400">Loading movies...</div>
  <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <MovieCard
      v-for="movie in movies"
      :key="movie.id"
      :title="movie.name"
      :genres="movie.genres"
      :description="movie.description"
      :rating="movie.rating"
      :poster="movie.image"
      :alt-text="movie.name"
    />
  </div>
</template>

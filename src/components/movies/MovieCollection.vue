<script setup>
import { computed, ref } from 'vue'
import MovieCard from './MovieCard.vue'
import MovieModal from './MovieModal.vue'
import { useMovies } from '@/composables/useMovies.js'
import SuccessModal from './SuccessModal.vue'

const { movies, loading, error } = useMovies()

const isAddModalOpen = ref(false)
const isSuccessModalOpen = ref(false)

const totalMovies = computed(() => {
  return movies.value.length
})

const averageRating = computed(() => {
  if (movies.value.length === 0) return 0
  const total = movies.value.reduce((sum, movie) => sum + movie.rating, 0)
  return (total / movies.value.length).toFixed(1)
})

function openAddMovieModal() {
  isAddModalOpen.value = true
}

function closeAddMovieModal() {
  isAddModalOpen.value = false
}

function closeSuccessModal() {
  isSuccessModalOpen.value = false
}

function handleMovieAdded(newMovie) {
  movies.value.push(newMovie)
  isAddModalOpen.value = false
  isSuccessModalOpen.value = true
}

function handleEditMovie(movieId) {
  console.log('edit movie:', movieId)
}

function handleDeleteMovie(movieId) {
  console.log('delete movie:', movieId)
}
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
        @click="openAddMovieModal"
        class="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors duration-200"
      >
        Add Movie
      </button>
    </div>
  </div>

  <div v-if="loading" class="text-center text-gray-400 text-xl">Loading movies...</div>
  <div v-else-if="error" class="text-center text-red-400 text-xl">
    An error occurred: {{ error }}
  </div>
  <div v-else-if="movies.length === 0" class="text-center text-gray-400">No movies found.</div>
  <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <MovieCard
      v-for="movie in movies"
      :key="movie.id"
      :movie-id="movie.id"
      :title="movie.name"
      :genres="movie.genres"
      :description="movie.description"
      :rating="movie.rating"
      :poster="movie.image"
      :alt-text="movie.name"
      @edit-movie="handleEditMovie(movie.id)"
      @delete-movie="handleDeleteMovie(movie.id)"
    />
  </div>

  <MovieModal
    :is-open="isAddModalOpen"
    @close="closeAddMovieModal"
    @movie-added="handleMovieAdded"
  />

  <SuccessModal :is-open="isSuccessModalOpen" @close="closeSuccessModal" />
</template>

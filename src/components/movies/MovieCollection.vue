<script setup>
import { computed, ref } from 'vue'
import MovieCard from './MovieCard.vue'
import MovieModal from './MovieModal.vue'
import EditMovieModal from './EditMovieModal.vue'
import SuccessModal from './SuccessModal.vue'
import ConfirmationModal from './ConfirmationModal.vue'
import { useMovies } from '@/composables/useMovies.js'

const { movies, loading, error, deleteMovie, updateMovie } = useMovies()

const isAddModalOpen = ref(false)
const isEditModalOpen = ref(false)
const isSuccessModalOpen = ref(false)
const isConfirmModalOpen = ref(false)

const movieToEdit = ref(null)
const movieToDeleteId = ref(null)

const totalMovies = computed(() => movies.value.length)

const averageRating = computed(() => {
  if (movies.value.length === 0) return 0
  const total = movies.value.reduce((sum, movie) => sum + movie.rating, 0)
  return (total / movies.value.length).toFixed(1)
})

function openAddMovieModal() {
  movieToEdit.value = null
  isAddModalOpen.value = true
}

function closeAddMovieModal() {
  isAddModalOpen.value = false
}

function handleMovieAdded(newMovie) {
  movies.value.push(newMovie)
  closeAddMovieModal()
  isSuccessModalOpen.value = true
}

function openEditMovieModal(movieId) {
  movieToEdit.value = movies.value.find((m) => m.id === movieId)
  if (movieToEdit.value) {
    isEditModalOpen.value = true
  }
}

function closeEditMovieModal() {
  isEditModalOpen.value = false
}

async function handleMovieUpdated(updatedMovieData) {
  await updateMovie(updatedMovieData)
  closeEditMovieModal()
}

async function handleUpdateRating({ id, rating }) {
  const movie = movies.value.find((m) => m.id === id)
  if (movie) {
    const updatedMovieData = { ...movie, rating: rating }
    await updateMovie(updatedMovieData)
  }
}

async function handleRemoveRating(movieId) {
  await handleUpdateRating({ id: movieId, rating: 0 })
}

function openDeleteConfirmation(movieId) {
  movieToDeleteId.value = movieId
  isConfirmModalOpen.value = true
}

async function confirmDelete() {
  if (movieToDeleteId.value) {
    await deleteMovie(movieToDeleteId.value)
  }
  isConfirmModalOpen.value = false
  movieToDeleteId.value = null
}

function closeSuccessModal() {
  isSuccessModalOpen.value = false
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
      @edit-movie="openEditMovieModal"
      @delete-movie="openDeleteConfirmation"
      @update-rating="handleUpdateRating"
      @remove-rating="handleRemoveRating"
    />
  </div>

  <MovieModal
    :is-open="isAddModalOpen"
    @close="closeAddMovieModal"
    @movie-added="handleMovieAdded"
  />

  <EditMovieModal
    :is-open="isEditModalOpen"
    :movie="movieToEdit"
    @close="closeEditMovieModal"
    @movie-updated="handleMovieUpdated"
  />

  <SuccessModal :is-open="isSuccessModalOpen" @close="closeSuccessModal" />

  <ConfirmationModal
    :is-open="isConfirmModalOpen"
    @close="isConfirmModalOpen = false"
    @confirm="confirmDelete"
  />
</template>

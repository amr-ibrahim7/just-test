<script setup>
import { computed, ref, watch } from 'vue'
import MovieCard from './MovieCard.vue'
import MovieModal from './MovieModal.vue'
import EditMovieModal from './EditMovieModal.vue'
import SuccessModal from './SuccessModal.vue'
import ConfirmationModal from './ConfirmationModal.vue'
import { useMovies } from '@/composables/useMovies.js'

const { movies, loading, error, deleteMovie, updateMovie } = useMovies()

const searchQuery = ref('')
const selectedGenres = ref([])
const inTheatersOnly = ref(false)
const availableGenres = ['Drama', 'Crime', 'Action', 'Comedy']

const filteredMovies = computed(() => {
  let moviesToFilter = movies.value

  if (searchQuery.value.trim() !== '') {
    const lowerCaseQuery = searchQuery.value.toLowerCase()
    moviesToFilter = moviesToFilter.filter((movie) =>
      movie.name.toLowerCase().includes(lowerCaseQuery),
    )
  }

  if (inTheatersOnly.value) {
    moviesToFilter = moviesToFilter.filter((movie) => movie.inTheaters)
  }

  if (selectedGenres.value.length > 0) {
    moviesToFilter = moviesToFilter.filter((movie) =>
      selectedGenres.value.some((selectedGenre) => movie.genres.includes(selectedGenre)),
    )
  }

  return moviesToFilter
})

const currentPage = ref(1)
const itemsPerPage = ref(6)

const totalPages = computed(() => {
  return Math.ceil(filteredMovies.value.length / itemsPerPage.value)
})

const paginatedMovies = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value
  const endIndex = startIndex + itemsPerPage.value
  return filteredMovies.value.slice(startIndex, endIndex)
})

watch(filteredMovies, () => {
  if (currentPage.value > totalPages.value) {
    currentPage.value = 1
  }
})

function resetFilters() {
  searchQuery.value = ''
  selectedGenres.value = []
  inTheatersOnly.value = false
}

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

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
  <div class="flex items-center justify-between mb-6">
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

  <div class="mb-8 p-4 bg-gray-800 rounded-lg space-y-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search for a movie..."
        class="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
      />
      <div class="flex items-center justify-start space-x-4">
        <div class="flex items-center">
          <input
            id="inTheaters"
            v-model="inTheatersOnly"
            type="checkbox"
            class="h-4 w-4 text-cyan-600 bg-gray-900 border-gray-600 rounded focus:ring-cyan-500"
          />
          <label for="inTheaters" class="ml-2 text-sm text-gray-300">In Theaters Only</label>
        </div>
        <button
          @click="resetFilters"
          class="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg text-sm font-medium transition-colors duration-200"
        >
          Reset Filters
        </button>
      </div>
    </div>
    <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
      <span class="text-sm font-medium text-gray-300">Genres:</span>
      <div v-for="genre in availableGenres" :key="genre" class="flex items-center">
        <input
          :id="`genre-${genre}`"
          v-model="selectedGenres"
          :value="genre"
          type="checkbox"
          class="h-4 w-4 text-cyan-600 bg-gray-900 border-gray-600 rounded focus:ring-cyan-500"
        />
        <label :for="`genre-${genre}`" class="ml-2 text-sm text-gray-400">{{ genre }}</label>
      </div>
    </div>
  </div>

  <div v-if="loading" class="text-center text-gray-400 text-xl">Loading movies...</div>
  <div v-else-if="error" class="text-center text-red-400 text-xl">
    An error occurred: {{ error }}
  </div>
  <div v-else-if="paginatedMovies.length === 0" class="text-center text-gray-400 py-10">
    No movies match your filters.
  </div>
  <div v-else>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <MovieCard
        v-for="movie in paginatedMovies"
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

    <div v-if="totalPages > 1" class="flex justify-center items-center mt-12 space-x-2">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-4 py-2 bg-gray-700 text-white rounded-lg transition-colors duration-200"
        :class="{
          'opacity-50 cursor-not-allowed': currentPage === 1,
          'hover:bg-gray-600': currentPage > 1,
        }"
      >
        Prev
      </button>
      <button
        v-for="page in totalPages"
        :key="page"
        @click="goToPage(page)"
        class="px-4 py-2 rounded-lg transition-colors duration-200"
        :class="{
          'bg-cyan-600 text-white font-bold': page === currentPage,
          'bg-gray-700 text-white hover:bg-gray-600': page !== currentPage,
        }"
      >
        {{ page }}
      </button>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-gray-700 text-white rounded-lg transition-colors duration-200"
        :class="{
          'opacity-50 cursor-not-allowed': currentPage === totalPages,
          'hover:bg-gray-600': currentPage < totalPages,
        }"
      >
        Next
      </button>
    </div>
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

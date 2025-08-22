<script setup>
import { ref, watch } from 'vue'
import { z } from 'zod'
import { useMovies } from '@/composables/useMovies.js'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  movie: {
    type: Object,
    default: () => null,
  },
})

const emit = defineEmits(['close', 'movie-updated'])
const { updateMovie } = useMovies()

const availableGenres = ['Drama', 'Crime', 'Action', 'Comedy']

const movieSchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  image: z.string().url('Please enter a valid image URL'),
  rating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating cannot exceed 5'),
  genres: z.array(z.string()).min(1, 'Please select at least one genre'),
  inTheaters: z.boolean(),
})

const movieData = ref({})
const errors = ref({})

watch(
  () => props.movie,
  (newMovieToEdit) => {
    if (newMovieToEdit) {
      movieData.value = JSON.parse(JSON.stringify(newMovieToEdit))
      errors.value = {}
    }
  },
  { immediate: true, deep: true },
)

function closeModal() {
  emit('close')
}

async function handleSubmit() {
  errors.value = {}
  const result = movieSchema.safeParse(movieData.value)

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      errors.value[issue.path[0]] = issue.message
    })
    return
  }

  await updateMovie(result.data)
  emit('movie-updated', result.data)
  closeModal()
}
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
    @click.self="closeModal"
  >
    <div class="bg-gray-900 rounded-lg p-6 w-full max-w-md mx-4 relative border border-gray-700">
      <button @click="closeModal" class="absolute top-4 right-4 text-gray-400 hover:text-white">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>

      <h2 class="text-2xl font-bold text-white mb-6 text-center">Edit Movie</h2>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="edit-name" class="block text-sm font-medium text-gray-300 mb-2">Name</label>
          <input
            id="edit-name"
            v-model="movieData.name"
            type="text"
            class="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            :class="{ 'border-red-500': errors.name }"
          />
          <p v-if="errors.name" class="text-red-400 text-xs mt-1">{{ errors.name }}</p>
        </div>

        <div>
          <label for="edit-description" class="block text-sm font-medium text-gray-300 mb-2"
            >Description</label
          >
          <textarea
            id="edit-description"
            v-model="movieData.description"
            rows="3"
            class="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-gray-500"
            :class="{ 'border-red-500': errors.description }"
          ></textarea>
          <p v-if="errors.description" class="text-red-400 text-xs mt-1">
            {{ errors.description }}
          </p>
        </div>

        <div>
          <label for="edit-image" class="block text-sm font-medium text-gray-300 mb-2">Image</label>
          <input
            id="edit-image"
            v-model="movieData.image"
            type="url"
            class="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            :class="{ 'border-red-500': errors.image }"
          />
          <p v-if="errors.image" class="text-red-400 text-xs mt-1">{{ errors.image }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Genres</label>
          <div
            class="bg-gray-800 border border-gray-600 rounded-md p-3 space-y-2"
            :class="{ 'border-red-500': errors.genres }"
          >
            <div v-for="genre in availableGenres" :key="genre" class="flex items-center">
              <input
                :id="`edit-genre-${genre}`"
                v-model="movieData.genres"
                :value="genre"
                type="checkbox"
                class="h-4 w-4 text-cyan-600 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500 focus:ring-2"
              />
              <label :for="`edit-genre-${genre}`" class="ml-3 text-sm text-gray-300 cursor-pointer">
                {{ genre }}
              </label>
            </div>
          </div>
          <p v-if="errors.genres" class="text-red-400 text-xs mt-1">{{ errors.genres }}</p>
        </div>

        <div class="flex items-center">
          <input
            id="edit-inTheaters"
            v-model="movieData.inTheaters"
            type="checkbox"
            class="h-4 w-4 text-cyan-600 bg-gray-800 border-gray-600 rounded focus:ring-cyan-500 focus:ring-2"
          />
          <label for="edit-inTheaters" class="ml-3 text-sm text-gray-300">In theaters</label>
        </div>

        <div class="flex space-x-3 pt-4">
          <button
            type="button"
            @click="closeModal"
            class="flex-1 py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-md font-medium transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="flex-1 py-2 px-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-md font-medium transition-colors duration-200"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

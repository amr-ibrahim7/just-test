<script setup>
import { ref, watch } from 'vue'
import { z } from 'zod'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['close', 'movie-added'])

const availableGenres = ['Drama', 'Crime', 'Action', 'Comedy']

const movieSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  image: z.string().url('Please enter a valid image URL'),
  rating: z.number().min(1, 'Rating must be at least 1').max(5, 'Rating cannot exceed 5'),
  genres: z.array(z.string()).min(1, 'Please select at least one genre'),
  inTheaters: z.boolean(),
})

const newMovie = ref({
  name: '',
  description: '',
  image: '',
  rating: 5,
  genres: [],
  inTheaters: false,
})

const errors = ref({})

function resetForm() {
  newMovie.value = {
    name: '',
    description: '',
    image: '',
    rating: 5,
    genres: [],
    inTheaters: false,
  }
  errors.value = {}
}

watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      resetForm()
    }
  },
)

function closeModal() {
  emits('close')
}

async function handleSubmit() {
  errors.value = {}
  const result = movieSchema.safeParse(newMovie.value)

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      errors.value[issue.path[0]] = issue.message
    })
    return
  }

  try {
    const response = await fetch(import.meta.env.VITE_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result.data),
    })

    if (!response.ok) {
      throw new Error('Failed to add the movie.')
    }

    const addedMovieData = await response.json()

    emits('movie-added', addedMovieData)

    closeModal()
  } catch (error) {
    console.error('Error submitting form:', error)
    alert('An error occurred: ' + error.message)
  }
}

function validateField(fieldName) {
  try {
    const fieldValue = newMovie.value[fieldName]
    const fieldSchema = movieSchema.shape[fieldName]

    if (fieldSchema) {
      fieldSchema.parse(fieldValue)
      if (errors.value[fieldName]) {
        delete errors.value[fieldName]
      }
    }
  } catch (error) {
    if (error.issues && error.issues[0]) {
      errors.value[fieldName] = error.issues[0].message
    }
  }
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

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-300 mb-2">Name</label>
          <input
            id="name"
            v-model="newMovie.name"
            type="text"
            @blur="validateField('name')"
            class="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
            :class="{ 'border-red-500': errors.name }"
          />
          <p v-if="errors.name" class="text-red-400 text-xs mt-1">{{ errors.name }}</p>
        </div>

        <div>
          <label for="description" class="block text-sm font-medium text-gray-300 mb-2"
            >Description</label
          >
          <textarea
            id="description"
            v-model="newMovie.description"
            rows="3"
            placeholder="NO DESCRIPTION"
            @blur="validateField('description')"
            class="w-full bg-gray-800 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 placeholder-gray-500"
            :class="{ 'border-red-500': errors.description }"
          ></textarea>
          <p v-if="errors.description" class="text-red-400 text-xs mt-1">
            {{ errors.description }}
          </p>
        </div>

        <div>
          <label for="image" class="block text-sm font-medium text-gray-300 mb-2">Image</label>
          <input
            id="image"
            v-model="newMovie.image"
            type="url"
            @blur="validateField('image')"
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
                :id="`genre-${genre}`"
                v-model="newMovie.genres"
                :value="genre"
                type="checkbox"
                class="h-4 w-4 text-cyan-600 bg-gray-700 border-gray-600 rounded focus:ring-cyan-500 focus:ring-2"
              />
              <label :for="`genre-${genre}`" class="ml-3 text-sm text-gray-300 cursor-pointer">
                {{ genre }}
              </label>
            </div>
          </div>
          <p v-if="errors.genres" class="text-red-400 text-xs mt-1">{{ errors.genres }}</p>
          <p
            v-if="!errors.genres && newMovie.genres.length === 0"
            class="text-gray-500 text-xs mt-1"
          >
            Select at least one genre
          </p>
        </div>

        <div class="flex items-center">
          <input
            id="inTheaters"
            v-model="newMovie.inTheaters"
            type="checkbox"
            class="h-4 w-4 text-cyan-600 bg-gray-800 border-gray-600 rounded focus:ring-cyan-500 focus:ring-2"
          />
          <label for="inTheaters" class="ml-3 text-sm text-gray-300">In theaters</label>
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
            Add
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

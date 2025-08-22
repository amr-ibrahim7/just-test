<script setup>
const props = defineProps({
  title: String,
  genres: Array,
  description: String,
  rating: Number,
  poster: String,
  altText: String,
  movieId: [String, Number],
})

const emit = defineEmits(['edit-movie', 'delete-movie', 'update-rating', 'remove-rating'])

function handleEdit(event) {
  event.stopPropagation()
  event.preventDefault()
  emit('edit-movie', props.movieId)
}

function handleDelete(event) {
  event.stopPropagation()
  event.preventDefault()
  emit('delete-movie', props.movieId)
}

function handleSetRating(event, newRating) {
  event.stopPropagation()
  event.preventDefault()
  if (newRating === props.rating) return
  emit('update-rating', { id: props.movieId, rating: newRating })
}

function handleRemoveRating(event) {
  event.stopPropagation()
  event.preventDefault()
  emit('remove-rating', props.movieId)
}
</script>

<template>
  <RouterLink
    :to="{ name: 'movie-details', params: { id: movieId } }"
    class="bg-white rounded-lg overflow-hidden shadow-lg group relative flex flex-col hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300"
  >
    <div class="relative">
      <img :src="poster" :alt="altText" class="w-full h-80 object-cover" />

      <div
        class="absolute top-3 right-3 bg-yellow-400 text-gray-900 rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg shadow-md"
      >
        {{ rating }}
      </div>
    </div>

    <div class="p-4 bg-white">
      <h3 class="text-xl font-bold text-gray-900 mb-2">{{ title }}</h3>

      <div class="flex flex-wrap gap-1 mb-3">
        <span
          v-for="genre in genres"
          :key="genre"
          class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded font-medium"
        >
          {{ genre }}
        </span>
      </div>

      <p class="text-gray-700 text-sm leading-relaxed mb-4">
        {{ description }}
      </p>

      <div class="flex items-center justify-between mt-auto">
        <div class="flex items-center space-x-2">
          <span class="text-gray-600 text-sm font-medium">Rating:</span>
          <div class="flex items-center">
            <button
              v-for="star in 5"
              :key="star"
              @click="handleSetRating(star)"
              :class="star <= rating ? 'text-yellow-400' : 'text-gray-300'"
              class="text-2xl focus:outline-none transition-transform duration-200 hover:scale-125"
              :aria-label="`Rate ${star} stars`"
            >
              ★
            </button>
          </div>
        </div>

        <div
          class="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <button
            @click="handleEdit"
            class="text-gray-500 hover:text-blue-600 transition-colors duration-200"
            title="Edit Movie"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              ></path>
            </svg>
          </button>

          <button
            @click="handleDelete"
            class="text-gray-500 hover:text-red-600 transition-colors duration-200"
            title="Delete Movie"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <button
        v-if="rating > 0"
        @click="handleRemoveRating"
        class="mt-4 w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md font-medium text-sm transition-colors duration-200"
      >
        Remove Rating
      </button>
    </div>
  </RouterLink>
</template>

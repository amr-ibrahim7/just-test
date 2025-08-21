<script setup>
defineProps({
  title: String,
  genres: Array,
  description: String,
  rating: Number,
  poster: String,
  altText: String,
})
</script>

<template>
  <div class="bg-white rounded-lg overflow-hidden shadow-lg">
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

      <div class="flex items-center space-x-2">
        <span class="text-gray-600 text-sm font-medium">Rating: ({{ rating }}/5)</span>
        <div class="flex items-center">
          <span
            v-for="star in 5"
            :key="star"
            :class="star <= rating ? 'text-yellow-400' : 'text-gray-300'"
            class="text-base"
          >
            ★
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<template>
  <div class="flex items-center justify-between mb-12">
    <div class="flex items-center space-x-8">
      <div class="text-gray-300 text-lg font-medium">
        <span class="text-white font-semibold">Total Movies:</span> 3
      </div>
      <div class="text-gray-400 text-xl font-light">/</div>
      <div class="text-gray-300 text-lg font-medium">
        <span class="text-white font-semibold">Average Rating:</span> 3.7
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
</template>

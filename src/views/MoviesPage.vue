<script setup>
import MovieCollection from '@/components/movies/MovieCollection.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <div class="fixed inset-0 opacity-5">
      <div
        class="absolute inset-0"
        style="
          background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0);
          background-size: 30px 30px;
        "
      ></div>
    </div>

    <div class="relative z-10 container mx-auto px-6 py-8">
      <MovieCollection />
    </div>
  </div>
</template>

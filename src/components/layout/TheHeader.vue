<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="bg-gray-800 text-white p-4 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <RouterLink to="/" class="text-xl font-bold hover:text-gray-300">
        Movie Rating App
      </RouterLink>
      <RouterLink to="/add">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
        >
          Add New Movie
        </button>
      </RouterLink>
    </div>
  </header>
</template>

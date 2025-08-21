<script setup>
import MovieCard from './MovieCard.vue'
</script>

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
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <MovieCard
      title="The Godfather"
      :genres="['Crime', 'Drama']"
      description="The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son."
      :rating="4"
      poster="https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UY1982_.jpg"
      alt-text="The Godfather"
    />

    <MovieCard
      title="The Shawshank Redemption"
      :genres="['Drama']"
      description="Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
      :rating="4"
      poster="https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1200_.jpg"
      alt-text="The Shawshank Redemption"
    />

    <MovieCard
      title="The Dark Knight"
      :genres="['Action', 'Crime', 'Drama']"
      description="When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice."
      :rating="3"
      poster="https://m.media-amazon.com/images/I/81IfoBox2TL.__AC_SX300_SY300_QL70_FMwebp_.jpg"
      alt-text="The Dark Knight"
    />
  </div>
</template>

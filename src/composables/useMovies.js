import { ref, onMounted } from 'vue'

export function useMovies() {
  const movies = ref([])
  const loading = ref(true)
  const error = ref(null)

  const fetchMovies = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL)
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      movies.value = await response.json()
    } catch (e) {
      error.value = e.message
      console.error('Failed to fetch movies:', e)
    } finally {
      loading.value = false
    }
  }

  async function updateMovie(movieData) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/${movieData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
      })
      if (!response.ok) {
        throw new Error('Failed to update the movie.')
      }
      const updatedMovie = await response.json()

      const index = movies.value.findIndex((m) => m.id === updatedMovie.id)
      if (index !== -1) {
        movies.value[index] = updatedMovie
      }
    } catch (e) {
      console.error('Error updating movie:', e)
    }
  }

  async function deleteMovie(movieId) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/${movieId}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error('Failed to delete the movie.')
      }
      movies.value = movies.value.filter((movie) => movie.id !== movieId)
    } catch (e) {
      console.error('Error deleting movie:', e)
    }
  }

  onMounted(fetchMovies)

  return { movies, loading, error, fetchMovies, updateMovie, deleteMovie }
}

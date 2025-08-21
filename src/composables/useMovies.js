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

  onMounted(fetchMovies)

  return { movies, loading, error, fetchMovies }
}

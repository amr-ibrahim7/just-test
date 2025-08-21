<script setup>
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const emits = defineEmits(['movie-added'])

const newMovie = ref({
  name: '',
  description: '',
  image: '',
  rating: null,
  genres: [],
})
const genresInput = ref('')

async function handleSubmit() {
  try {
    newMovie.value.genres = genresInput.value.split(',').map((g) => g.trim())

    const response = await fetch('http://localhost:3000/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMovie.value),
    })

    if (!response.ok) {
      throw new Error('Failed to add the movie.')
    }

    const data = await response.json()

    emits('movie-added', data)

    alert('Movie added successfully!')
  } catch (error) {
    console.error('Error submitting form:', error)
    alert('An error occurred.')
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <Label for="name">Title</Label>
      <Input id="name" v-model="newMovie.name" required />
    </div>
    <div>
      <Label for="description">Description</Label>
      <Textarea id="description" v-model="newMovie.description" required />
    </div>
    <div>
      <Label for="image">Poster URL</Label>
      <Input id="image" v-model="newMovie.image" type="url" required />
    </div>
    <div>
      <Label for="genres">Genres (comma separated)</Label>
      <Input id="genres" v-model="genresInput" placeholder="e.g. Crime, Drama" required />
    </div>
    <div>
      <Label for="rating">Rating (1-5)</Label>
      <Input id="rating" v-model.number="newMovie.rating" type="number" min="1" max="5" required />
    </div>
    <Button type="submit" class="w-full">Add Movie</Button>
  </form>
</template>

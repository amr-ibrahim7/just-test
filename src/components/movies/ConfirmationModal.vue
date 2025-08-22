<script setup>
defineProps({
  isOpen: Boolean,
})
const emit = defineEmits(['close', 'confirm'])
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
  >
    <div class="bg-gray-800 rounded-lg p-8 w-full max-w-sm mx-4 text-center border border-gray-700">
      <h3 class="text-xl font-bold text-white mb-4">Are you sure?</h3>
      <p class="text-gray-300 mb-6">
        This action cannot be undone. The movie will be permanently deleted.
      </p>
      <div class="flex space-x-4">
        <button
          @click="emit('close')"
          class="flex-1 py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-md"
        >
          Cancel
        </button>
        <button
          @click="emit('confirm')"
          class="flex-1 py-2 px-4 bg-red-600 hover:bg-red-500 text-white rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

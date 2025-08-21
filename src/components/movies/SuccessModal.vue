<script setup>
defineProps({
  isOpen: Boolean,
})

const emit = defineEmits(['close'])
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm"
  >
    <div
      class="bg-gray-800 rounded-lg p-8 w-full max-w-sm mx-4 text-center border border-gray-700 shadow-xl"
    >
      <h3 class="text-xl font-bold text-white mb-4">Success!</h3>
      <p class="text-gray-300 mb-6">The movie has been added to your collection.</p>
      <button
        @click="emit('close')"
        class="w-full py-2 px-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-800"
      >
        OK
      </button>
    </div>
  </div>
</template>

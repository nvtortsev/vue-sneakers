<script setup>
defineProps({
  title: String,
  imageUrl: String,
  description: String
})
</script>

<template>
  <div class="flex flex-col items-center text-center w-72 mx-auto">
    <img class="h-40 w-40" :src="imageUrl" alt="Info" />
    <h2 class="mt-4 text-2xl font-medium">{{ title }}</h2>
    <p class="text-gray-400">{{ description }}</p>
  </div>
</template>

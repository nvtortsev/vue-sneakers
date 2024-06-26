<script setup>
defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  removeToCart: Function
})

const emit = defineEmits(['removeToCart'])

</script>

<template>
  <div class="flex gap-4 items-center border border-slate-100 p-4 rounded-xl">
    <img class="w-16 h-16" :src="imageUrl" alt="Sneakers Image" />
    <div class="flex flex-col flex-1">
      <p>{{ title }}</p>
      <div class="flex justify-between mt-2">
        <b class="mt-2 flex-1">{{ price }} руб.</b>
        <img
          @click="() => emit('removeToCart')"
          class="opacity-40 hover:opacity-100 cursor-pointer transition"
          src="/close.svg"
          alt="Close"
        />
      </div>
    </div>
  </div>
</template>

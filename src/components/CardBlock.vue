<script setup>
defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickFavorite: Function,
  onClickAdd: Function
})
</script>

<template>
  <div
    class="relative flex flex-col bg-white border border-slate-200 rounded-2xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition h-106"
  >
    <img
      v-if="onClickFavorite"
      @click="onClickFavorite"
      class="absolute top-2 left-2"
      :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'"
      alt="Like 2"
    />
    <img class="h-60 w-full object-cover" :src="imageUrl" alt="Sneaker 1" />
    <p class="mt-2 flex-1">{{ title }}</p>

    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-slate-400">Цена:</span>
        <b>{{ price }} руб.</b>
      </div>
      <img
        v-if="onClickAdd"
        @click="onClickAdd"
        :src="!isAdded ? '/plus.svg' : '/checked.svg'"
        alt="Plus"
      />
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

import CardList from '../components/CardList.vue'

const favorites = ref([])

const fetchFavorites = async () => {
  try {
    const { data } = await axios.get(
      'https://73c2f1e0d79b39f9.mokky.dev/favorites?_relations=items'
    )
    favorites.value = data.map((obj) => {
      return obj.item
    })
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  await fetchFavorites()
})
</script>

<template>
  <h2 class="text-3xl font-bold mb-8">Закладки</h2>

  <div v-if="!favorites.length" class="flex flex-col items-center gap-3">
    <img width="70" src="/emoji-1.png" alt="emoji" />
    <h2 class="font-bold text-2xl">Закладок нет :(</h2>
    <p class="text-slate-400">Вы ничего не добавляли в закладки</p>
    <RouterLink to="/"
      ><button
        class="flex items-center gap-3 py-3 px-10 border rounded-xl text-white bg-lime-500 font-medium mt-8 hover:bg-lime-600 hover:text-white"
      >
        <svg
          class="rotate-180"
          width="16"
          height="14"
          viewBox="0 0 16 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 7H14.7143"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M8.71436 1L14.7144 7L8.71436 13"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Вернуться назад
      </button></RouterLink
    >
  </div>

  <CardList :items="favorites" :is-favorites="true" />
</template>

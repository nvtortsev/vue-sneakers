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

  <CardList :items="favorites" :is-favorites="true" />
</template>

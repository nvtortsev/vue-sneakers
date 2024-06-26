<script setup>
import { inject, reactive, watch, ref, onMounted } from 'vue'
import axios from 'axios'
import CardList from '../components/CardList.vue'

const { cart, addToCart, removeToCart } = inject('cart')

const items = ref([])

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearch = (event) => {
  filters.searchQuery = event.target.value
}

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeToCart(item)
  }
}

const addToFavorite = async (item) => {
  try {
    if (!item.isFavorite) {
      const obj = {
        parentId: item.id
      }
      const { data } = await axios.post('https://73c2f1e0d79b39f9.mokky.dev/favorites', obj)

      item.isFavorite = true
      item.sneakersId = data.id
    } else {
      axios.delete(`https://73c2f1e0d79b39f9.mokky.dev/favorites/${item.sneakersId}`)

      item.isFavorite = false
      item.sneakersId = null
    }
  } catch (error) {
    console.log(error)
  }
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get('https://73c2f1e0d79b39f9.mokky.dev/favorites')

    items.value = items.value.map((item) => {
      const favorite = favorites.find((favorite) => favorite.parentId === item.id)

      if (!favorite) {
        return item
      }

      return {
        ...item,
        isFavorite: true,
        sneakersId: favorite.id
      }
    })
  } catch (error) {
    console.log(error)
  }
}

const fetchItems = async () => {
  try {
    const params = {
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get(`https://73c2f1e0d79b39f9.mokky.dev/items`, { params })
    items.value = data.map((obj) => ({
      ...obj,
      isFavorite: false,
      isAdded: false,
      sneakersId: null
    }))
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []

  await fetchItems()
  await fetchFavorites()

  //после fetchItems получаю items, прохожусь по всем объектам,
  //и если хоть какой нибудь из items есть в cart, то isAdded => true,
  //если нет => false
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
  }))
})

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})

watch(filters, fetchItems)
</script>

<template>
  <div class="flex justify-between items-center">
    <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>
    <div class="flex gap-4">
      <select
        @change="onChangeSelect"
        class="py-1.5 px-3 border rounded-md outline-none cursor-pointer"
      >
        <option value="title">По названию</option>
        <option value="price">По цене (дешевле)</option>
        <option value="-price">По цене (дороже)</option>
      </select>
      <div class="relative">
        <img class="absolute left-3 top-2.5" src="/search.svg" alt="Search" />
        <input
          @change="onChangeSearch"
          class="border rounded-md py-1.5 pl-11 pr-4 outline-none focus:border-gray-400"
          type="text"
          placeholder="Поиск"
        />
      </div>
    </div>
  </div>

  <CardList @on-click-add-plus="onClickAddPlus" :items="items" @add-to-favorite="addToFavorite" />
</template>

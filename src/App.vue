<script setup>
import { onMounted, ref, watch, reactive, provide, computed } from 'vue'
import axios from 'axios'

import HeaderBlock from './components/HeaderBlock.vue'
import CardList from './components/CardList.vue'
import DrawerBlock from './components/DrawerBlock.vue'

const items = ref([])
const cart = ref([])

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))
const vatPrice = computed(() => Math.round(totalPrice.value * 0.05))

const drawerOpen = ref(false)
const closeDrawer = () => {
  drawerOpen.value = false
}

const openDrawer = () => {
  drawerOpen.value = true
}

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeToCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

const createOrder = async () => {
  try {
    const { data } = await axios.post('https://73c2f1e0d79b39f9.mokky.dev/orders', {
      items: cart.value,
      totalPrice: totalPrice.value
    })

    cart.value = []

    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

const onClickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeToCart(item)
  }
}

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeSearch = (event) => {
  filters.searchQuery = event.target.value
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

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)

watch(filters, fetchItems)

provide('cart', {
  cart,
  closeDrawer,
  openDrawer,
  addToCart,
  removeToCart
})
</script>

<template>
  <DrawerBlock
    v-if="drawerOpen"
    :total-price="totalPrice"
    :vat-price="vatPrice"
    @create-order="createOrder"
  />
  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl mt-14 mb-14">
    <HeaderBlock @open-drawer="openDrawer" :total-price="totalPrice" />

    <div class="p-10">
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

      <CardList
        @on-click-add-plus="onClickAddPlus"
        :items="items"
        @add-to-favorite="addToFavorite"
      />
    </div>
  </div>
</template>

<style scoped></style>

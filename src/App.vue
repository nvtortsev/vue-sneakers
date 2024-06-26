<script setup>
import { ref, watch, provide, computed } from 'vue'
import axios from 'axios'

import HeaderBlock from './components/HeaderBlock.vue'
import DrawerBlock from './components/DrawerBlock.vue'

/* Cart (start) */
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

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)

provide('cart', {
  cart,
  closeDrawer,
  openDrawer,
  addToCart,
  removeToCart
})
/* Cart (end)*/
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
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>

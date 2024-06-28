<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

import CardList from '../components/CardList.vue'

const route = useRoute()
const url_param = ref(null)
const isLoading = ref(false)

const orders = ref([])
const items = ref([])

const findOrders = () => {
  items.value = orders.value.find((order) => order.id === url_param.value)
}
const fetchOrders = async () => {
  try {
    isLoading.value = true
    url_param.value = Number(route.params.id)
    const { data } = await axios.get('https://73c2f1e0d79b39f9.mokky.dev/orders')
    orders.value = data.map((order) => {
      return order
    })
    findOrders()
  } catch (error) {
    console.log(error)
  } finally {
    isLoading.value = false
  }
}
onMounted(async () => {
  await fetchOrders()
})

watch(route, () => {
  url_param.value = Number(route.params.id)
  findOrders()
})
</script>

<template>
  <h2 class="text-3xl font-bold mb-8">Мои покупки</h2>

  <div
    v-if="!orders.length && isLoading == false"
    class="flex flex-col items-center gap-3 text-center"
  >
    <img width="70" src="/emoji-2.png" alt="emoji" />
    <h2 class="font-bold text-2xl">У вас нет заказов</h2>
    <p class="text-slate-400">Вы нищеброд? <br />Оформите хотя бы один заказ.</p>
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

  <div v-if="!url_param" v-auto-animate class="flex flex-col gap-6">
    <div
      class="border flex gap-10 rounded-md p-5 cursor-pointer items-center w-max"
      v-for="order in orders"
      :key="order.id"
    >
      <div>
        <p>
          Номер заказа: <span>№{{ order.id }}</span>
        </p>
        <p>
          Итоговая сумма: <b>{{ order.totalPrice }} </b> руб.
        </p>
      </div>
      <RouterLink :to="`/orders/${order.id}`"
        ><svg
          class="hover:fill-slate-200 rotate-180"
          width="35"
          height="35"
          viewBox="0 0 35 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.5" y="0.5" width="34" height="34" rx="7.5" stroke="#F2F2F2" />
          <path
            d="M19 22L14 17L19 12"
            stroke="#C8C8C8"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </RouterLink>
    </div>
  </div>

  <div v-else class="flex flex-col">
    <div class="flex gap-4">
      <RouterLink to="/orders"
        ><svg
          class="hover:fill-slate-200"
          width="35"
          height="35"
          viewBox="0 0 35 35"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="0.5" y="0.5" width="34" height="34" rx="7.5" stroke="#F2F2F2" />
          <path
            d="M19 22L14 17L19 12"
            stroke="#C8C8C8"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </RouterLink>
      <h3 class="text-2xl mb-8 font-medium text-slate-500">Заказ №{{ url_param }}</h3>
    </div>

    <CardList :items="items.items" :is-favorites="true" />
  </div>
</template>

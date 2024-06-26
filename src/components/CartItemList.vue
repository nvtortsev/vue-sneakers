<script setup>
import { inject } from 'vue'
import CartItem from './CartItem.vue'

const { cart, removeToCart } = inject('cart')
</script>

<template>
  <div v-auto-animate class="flex flex-col gap-4 flex-1">
    <CartItem
      v-for="item in cart"
      :key="item.id"
      :title="item.title"
      :imageUrl="item.imageUrl"
      :price="item.price"
      @remove-to-cart="() => removeToCart(item)"
    />
  </div>
</template>

<script setup>
defineProps({
  totalPrice: Number
})

const emit = defineEmits(['openDrawer'])
</script>

<template>
  <header class="flex justify-between border-b border-slate-200 px-10 py-8">
    <RouterLink to="/">
      <div class="flex items-center gap-4">
        <img class="w-10" src="/logo.png" alt="Logo" />
        <div class="max-md:hidden">
          <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
          <p class="text-slate-500">Магазин лучших кроссовок</p>
        </div>
      </div>
    </RouterLink>

    <ul class="flex items-center gap-10 max-md:gap-5 max-sm:gap-3">
      <li
        @click="emit('openDrawer')"
        class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black"
      >
        <img src="/cart.svg" alt="cart" />
        <b class="max-sm:hidden">{{ totalPrice }} руб.</b>
      </li>
      <RouterLink to="/favorites">
        <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
          <img src="/heart.svg" alt="cart" />
          <span class="max-lg:hidden">Закладки</span>
        </li>
      </RouterLink>

      <RouterLink to="/orders">
        <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
          <img src="/profile.svg" alt="cart" />
          <span class="max-lg:hidden">Профиль</span>
        </li>
      </RouterLink>
    </ul>
  </header>
</template>

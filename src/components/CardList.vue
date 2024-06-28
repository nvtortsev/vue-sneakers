<script setup>
import CardBlock from './CardBlock.vue'

defineProps({
  items: Array,
  isFavorites: Boolean
})

const emit = defineEmits(['addToFavorite', 'onClickAddPlus'])
</script>

<template>
  <div v-auto-animate class="grid grid-cols-4 gap-5 mt-10 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:flex flex-col">
    <CardBlock
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :image-url="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :is-favorite="item.isFavorite"
      :is-added="item.isAdded"
      :on-click-favorite="isFavorites ? null : () => emit('addToFavorite', item)"
      :on-click-add="isFavorites ? null : () => emit('onClickAddPlus', item)"
    />
  </div>
</template>

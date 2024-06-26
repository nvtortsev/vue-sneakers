<script setup>
import CardBlock from './CardBlock.vue'

defineProps({
  items: Array
})

const emit = defineEmits(['addToFavorite', 'onClickAddPlus'])
</script>

<template>
  <div class="grid grid-cols-4 gap-5 mt-10">
    <CardBlock
      v-for="item in items"
      :key="item.id"
      :id="item.id"
      :image-url="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :is-favorite="item.isFavorite"
      :is-added="item.isAdded"
      :on-click-favorite="() => emit('addToFavorite', item)"
      :on-click-add="() => emit('onClickAddPlus', item)"
    />
  </div>
</template>

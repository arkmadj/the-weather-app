<template>
  <div class="highlight-card">
    <span class="highlight-card__title" data-test="title">{{ title }}</span>
    
    <div class="value-container">
      <slot name="value-body"></slot>
    </div>
    <p>{{ description }}</p>
  </div>
</template>
<script setup>
const props = defineProps({
  title: String,
  value: String,
  description: String,
});
</script>
<style lang="scss" scoped>
@import "./HighlightCard.scss";
</style>

<template>
  <div class="empty-container">
    <div class="empty__icon" data-test="icon">
      <CloudIcon size="100" color="#414FD1" />
    </div>
    <p class="empty__text" data-test="text">
      Weather information unavailable. Please retry your location search or use the
      locator icon for current weather.
    </p>
  </div>
</template>
<script setup>
import CloudIcon from "../icons/CloudIcon.vue";
</script>
<style lang="scss" scoped>
@import "./EmptyState.scss";
</style>

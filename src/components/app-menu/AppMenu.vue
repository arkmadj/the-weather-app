<template>
  <div class="flex-container">
    <div :class="[{ opened: isOpen }, 'fab']" @click="toggleClick" data-test="menu-icon">
      <svg viewBox="0 0 100 100" class="hamburger">
        <path
          class="line1 line"
          d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
        />
        <path class="line2 line" d="M 20,50 H 80" />
        <path
          class="line3 line"
          d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
        />
      </svg>
    </div>

    <div :class="[{ opened: isOpen }, 'menu']" data-test="menu-container">
      <ToggleContainer orientation="vertical"/>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import ToggleContainer from "../toggle-container/ToggleContainer.vue";

const isOpen = ref(false);
const toggleClick = () => {
  isOpen.value = !isOpen.value;
};
</script>
<style lang="scss" scoped>
@import "./AppMenu.scss";
</style>

<template>
  <div class="suntime-container">
    <div class="suntime__details">
      <div class="suntime__icon" data-test="sunrise-icon">↑</div>
      <div class="suntime__time-container">
        <p class="suntime__actual-time" data-test="sunrise-time">{{ sunriseTime }}</p>
      </div>
    </div>
    <div class="suntime__details">
      <div class="suntime__icon" data-test="sunset-icon">↓</div>
      <div class="suntime__time-container">
        <p class="suntime__actual-time" data-test="sunset-time">{{ sunsetTime }}</p>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  sunriseTime: { type: String, default: "6:00 AM" },
  sunsetTime: { type: String, default: "6:00 PM" },
});
</script>
<style lang="scss" scoped>
@import "./SunTime.scss";
</style>

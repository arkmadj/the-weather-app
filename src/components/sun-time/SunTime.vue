<template>
  <div class="suntime-container">
    <div class="suntime__details">
      <div class="suntime__icon">I</div>
      <div class="suntime__time-container">
        <p class="suntime__actual-time">{{ sunriseTime }}</p>
        <p class="suntime__time-diff">- 1m 46s</p>
      </div>
    </div>
    <div class="suntime__details">
      <div class="suntime__icon">I</div>
      <div class="suntime__time-container">
        <p class="suntime__actual-time">{{ sunsetTime }}</p>
        <p class="suntime__time-diff">- 1m 46s</p>
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

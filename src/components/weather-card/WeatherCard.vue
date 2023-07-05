<template>
  <div class="card">
    <p class="card__day">{{day}}</p>
    <div class="card__image-container">
      <div class="card__image">{{ type }}</div>
    </div>
    <div class="card__footer">
      <span class="card__high-temp">{{ highTemp }}ºC</span>
      <span class="card__low-temp">{{ lowTemp }}ºF</span>
    </div>
  </div>
</template>
<script setup>

const props = defineProps({
  day: String,
  type: String,
  highTemp: String,
  lowTemp: String
})
</script>
<style lang="scss" scoped>
@import "./WeatherCard.scss";
</style>
<template>
  <div class="card">
    <p class="card__day" data-test="card-day">{{ day }}</p>
    <div class="card__image-container">
      <img
        :src="`https://openweathermap.org/img/wn/${type}@4x.png`"
        alt="Weather Image"
        class="card__image"
        data-test="card-image"
      />
    </div>
    <div class="card__footer">
      <span class="card__temp" v-if="isHistory" data-test="card-temp">{{ temp }}</span>
      <span class="card__high-temp" v-if="!isHistory" data-test="card-high-temp">{{
        highTemp
      }}</span>
      <span class="card__low-temp" v-if="!isHistory" data-test="card-low-temp">{{
        lowTemp
      }}</span>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  day: { type: String, default: "Sun" },
  type: { type: String, default: "10d" },
  highTemp: { type: String, default: "36" },
  lowTemp: { type: String, default: "25" },
  temp: { type: String, default: "25" },
  isHistory: { type: Boolean, default: false },
});
</script>
<style lang="scss" scoped>
@import "./WeatherCard.scss";
</style>

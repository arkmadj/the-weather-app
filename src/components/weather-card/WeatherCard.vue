<template>
  <div class="card">
    <p class="card__day">{{ day }}</p>
    <div class="card__image-container">
      <img
        :src="`https://openweathermap.org/img/wn/${type}@4x.png`"
        alt="Weather Image"
        class="card__image"
      />
    </div>
    <div class="card__footer">
      <span v-if="isHistory">{{ temp }}ºC</span>
      <span class="card__high-temp" v-if="!isHistory">{{ highTemp }}ºC</span>
      <span class="card__low-temp" v-if="!isHistory">{{ lowTemp }}ºC</span>
    </div>
  </div>
</template>
<script setup>

const props = defineProps({
  day: { type: String, default: "Sun" },
  type: { type: String, default: "10d" },
  highTemp: { type: Number, default: 36 },
  lowTemp: { type: Number, default: 25 },
  temp: { type: Number, default: 25},
  isHistory: {type: Boolean, default: false}
});

</script>
<style lang="scss" scoped>
@import "./WeatherCard.scss";
</style>

<template>
  <nav class="header">
    <div class="header__links">
      <span class="header__link-item">Last 5 days</span>
      <span class="header__link-item">Next 7 days</span>
    </div>
    <div class="header__right">
      <div class="header__switch">
        <div class="header__switch-item"></div>
        <div class="header__switch-item"></div>
      </div>
      <div class="header__image"></div>
    </div>
  </nav>
  <section class="weather-list">
    <WeatherCard
      v-for="(day, index) in days"
      :key="index"
      :day="day.day"
      :type="day.type"
      :high-temp="day.highTemp"
      :low-temp="day.lowTemp"
    />
  </section>
</template>
<script setup>
import { ref } from "vue";
import WeatherCard from "../../components/weather-card/WeatherCard.vue";

const days = ref([
  {
    day: "Sun",
    type: "Rainy",
    highTemp: 31,
    lowTemp: 21,
  },
  {
    day: "Mon",
    type: "Sunny",
    highTemp: 31,
    lowTemp: 21,
  },
  {
    day: "Tue",
    type: "Rainy",
    highTemp: 31,
    lowTemp: 21,
  },
  {
    day: "Wed",
    type: "Rainy",
    highTemp: 31,
    lowTemp: 21,
  },
  {
    day: "Thur",
    type: "Rainy",
    highTemp: 31,
    lowTemp: 21,
  },
  {
    day: "Fri",
    type: "Rainy",
    highTemp: 31,
    lowTemp: 21,
  },
  {
    day: "Sat",
    type: "Rainy",
    highTemp: 31,
    lowTemp: 21,
  },
]);
</script>
<style lang="scss" scoped>
@import "./HomePage.scss";
</style>

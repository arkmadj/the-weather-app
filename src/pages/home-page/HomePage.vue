<template>
  <nav class="header" :style="`${isEmpty ? 'justify-content: flex-end' : null}`">
    <div class="header__links" v-if="!isEmpty">
      <span class="header__link-item" @click="showHistory">Last 5 days</span>
      <span class="header__link-item" @click="showForecast">Next 7 days</span>
      <span
        class="header__slider"
        :style="`transform: translateX(${sliderPosition}px)`"
      ></span>
    </div>
    <div class="header__right">
      <div class="header__switch" v-if="!isEmpty">
        <button
          :class="[
            { 'header__switch-item--active': activeTempUnit.name === 'celsius' },
            'header__switch-item',
          ]"
          @click="changeTempUnit('celsius', 'ºC')"
        >
          ºC
        </button>
        <button
          :class="[
            { 'header__switch-item--active': activeTempUnit.name === 'fahrenheit' },
            'header__switch-item',
          ]"
          @click="changeTempUnit('fahrenheit', 'ºF')"
        >
          ºF
        </button>
      </div>
      <div class="header__dark-mode" @click="toggleDarkMode">
        <div
          :class="[
            { 'dark-mode__sun-container--active': isDarkMode },
            'dark-mode__sun-container',
          ]"
        >
          <MoonIcon color="#000" size="24" />
        </div>
        <SunIcon color="#fff" size="24" />
      </div>
    </div>
  </nav>
  <div v-if="!isEmpty">
    <div v-if="!isLoadingForecast">
      <section class="weather-list" v-if="dataIsForecast">
        <WeatherCard
          v-for="(day, index) in days"
          :key="index"
          :day="day.day"
          :type="day.type"
          :high-temp="formatTemp(day.highTemp, activeTempUnit.name, true)"
          :low-temp="formatTemp(day.lowTemp, activeTempUnit.name, true)"
        />
      </section>
      <section class="weather-list" v-else>
        <WeatherCard
          v-for="(day, index) in history"
          :key="index"
          :day="day.day"
          :type="day.type"
          :temp="day.temp"
          :isHistory="true"
        />
      </section>
    </div>
    <div v-else></div>
    <section class="highlights" v-if="showHighlights">
      <p class="highlights__title">Today's Highlights</p>
      <div class="highlights__list">
        <HighlightCard
          v-for="(highlight, key) in highlights"
          :key="key"
          :title="highlight.title"
        >
          <template v-slot:value-body>
            <component
              :is="highlight.body"
              v-if="highlight.type === 'sun'"
              :sunriseTime="highlight.sunriseTime"
              :sunsetTime="highlight.sunsetTime"
            />
            <component
              :is="highlight.body"
              v-else-if="highlight.type === 'wind'"
              :speed="highlight.speed"
              :degree="highlight.degree"
            />
            <component
              :is="highlight.body"
              v-else-if="highlight.type === 'gauge'"
              :value="highlight.value"
              :showBar="highlight.showBar"
              :unit="highlight.unit"
              :superUnit="highlight.superUnit"
            />
            <component
              :is="highlight.body"
              v-else
              :value="highlight.value"
              :showBar="highlight.showBar"
              :unit="highlight.unit"
            />
          </template>
        </HighlightCard>
      </div>
    </section>
  </div>
  <div v-else class="home-empty">
    <EmptyState />
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import WeatherCard from "../../components/weather-card/WeatherCard.vue";
import HighlightCard from "../../components/highlight-card/HighlightCard.vue";
import SunTime from "../../components/sun-time/SunTime.vue";
import WindSpeed from "../../components/wind-speed/WindSpeed.vue";
import Gauge from "../../components/gauge/Gauge.vue";
import { getDay, getTime } from "@/helpers/formatTime";
import DialGauge from "../../components/dial-gauge/DialGauge.vue";
import EmptyState from "../../components/empty-state/EmptyState.vue";
import SunIcon from "../../components/icons/SunIcon.vue";
import MoonIcon from "../../components/icons/MoonIcon.vue";
import { formatTemp } from "../../helpers/formatTemp";
import { useStore } from "vuex";

const store = useStore();

const sliderPosition = ref(120);

const showHighlights = computed(() => store.state.app.showHighlights);

const isDarkMode = ref(false);

const activeTempUnit = computed(() => store.state.app.unit);

const isLoadingForecast = computed(() => store.state.app.loadingForecast);

const dataIsForecast = computed(() => store.state.app.showForecast);

const showHistory = () => {
  store.commit("app/toggleShowForecast", false);
  sliderPosition.value = 0;
};

const showForecast = () => {
  store.commit("app/toggleShowForecast", true);
  sliderPosition.value = 120;
};

const days = computed(() => {
  const forecastData = store.state.weather.forecast;
  if (forecastData.length < 1) return forecastData;
  return forecastData?.map((item) => ({
    day: getDay(item?.dt, true) || "",
    type: item.weather[0].icon,
    highTemp: item.temp.max,
    lowTemp: item.temp.min,
  }));
});

const history = computed(() => {
  const historyData = store.state.weather.history;
  if (historyData.length < 1) return historyData;
  return historyData.map((item) => ({
    day: getDay(item?.dt, true) || "",
    type: item.weather[0].icon,
    temp: formatTemp(item.temp, activeTempUnit.value.name, true),
  }));
});

const highlights = computed(() => {
  const weatherData = store.state.weather.current;
  if (Object.keys(weatherData) < 1) return weatherData;
  return [
    {
      title: "UV Index",
      value: parseInt(weatherData?.current?.uvi) || 0,
      body: DialGauge,
    },
    {
      title: "Wind Status",
      type: "wind",
      speed: weatherData?.current?.wind_speed || 0,
      degree: weatherData?.current?.wind_deg || 0,
      body: WindSpeed,
    },
    {
      title: "Sunrise & Sunset",
      type: "sun",
      sunriseTime:
        getTime(
          Number(weatherData?.current?.sunrise) -
            Number(weatherData?.timezone_offset) -
            3600
        ) || "",
      sunsetTime:
        getTime(
          Number(weatherData?.current?.sunset) -
            Number(weatherData?.timezone_offset) -
            3600
        ) || "",
      body: SunTime,
    },
    {
      title: "Humidity",
      type: "gauge",
      showBar: true,
      unit: "%",
      superUnit: true,
      value: weatherData?.current?.humidity || 0,
      body: Gauge,
    },
    {
      title: "Visibility",
      type: "gauge",
      showBar: false,
      unit: "km",
      superUnit: false,
      value: Number(weatherData?.current?.visibility) / 1000 || 0,
      body: Gauge,
    },
    {
      title: "Atmospheric Pressure",
      type: "gauge",
      showBar: false,
      unit: "hPa",
      superUnit: false,
      value: parseInt(weatherData?.current?.pressure) || 0,
      body: Gauge,
    },
  ];
});

const changeTempUnit = (val, unit) => {
  store.commit("app/setCurrentUnit", { name: val, unit });
};

const isEmpty = computed(() => {
  return (
    Object.keys(highlights.value).length === 0 &&
    history.value.length === 0 &&
    days.value.length === 0
  );
});

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  const body = document.body;
  !body.classList.contains("dark-mode") ? addDarkMode() : addLightMode();
};

const addDarkMode = () => {
  const body = document.body;
  body.classList.remove("light-mode");
  body.classList.add("dark-mode");
};

const addLightMode = () => {
  const body = document.body;
  body.classList.remove("dark-mode");
  body.classList.add("light-mode");
};
</script>
<style lang="scss" scoped>
@import "./HomePage.scss";
</style>

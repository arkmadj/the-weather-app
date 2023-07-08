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
    <div v-if="!loadingWeatherForecast">
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
import { ref, watch, computed } from "vue";
import WeatherCard from "../../components/weather-card/WeatherCard.vue";
import HighlightCard from "../../components/highlight-card/HighlightCard.vue";
import SunTime from "../../components/sun-time/SunTime.vue";
import WindSpeed from "../../components/wind-speed/WindSpeed.vue";
import Gauge from "../../components/gauge/Gauge.vue";
import useEventBus from "../../composables/eventBus";
import api from "@/api";
import { getDay, getTime } from "@/helpers/formatTime";
import DialGauge from "../../components/dial-gauge/DialGauge.vue";
import EmptyState from "../../components/empty-state/EmptyState.vue";
import SunIcon from "../../components/icons/SunIcon.vue";
import MoonIcon from "../../components/icons/MoonIcon.vue";
import { formatTemp } from "../../helpers/formatTemp";

const { bus, emit } = useEventBus();

const loadingWeatherForecast = ref(false);
const weatherForcastResponse = ref();

const loadingWeatherHistory = ref(false);

const loadingCurrentWeather = ref(false);
const currentWeatherResponse = ref();

const sliderPosition = ref(120);

const weatherHistoryData = ref([]);

const dataIsForecast = ref(true);

const showHighlights = ref(false);

const isDarkMode = ref(false);

const activeTempUnit = ref({ name: "celsius", unit: "ºC" });

watch(
  () => bus.value.get("selectedLocation"),
  (val) => {
    getWeatherForecast(val[0]);
    getCurrentWeather(val[0]);
    getWeatherHistory(val[0]);
    showForecast();
    showHighlights.value = false;
  }
);

watch(
  () => bus.value.get("showHighlights"),
  (val) => {
    showHighlights.value = val[0];
  }
);

const getWeatherForecast = async (val) => {
  loadingWeatherForecast.value = true;
  try {
    weatherForcastResponse.value = await api.weather.fetchWeatherForecast({
      lat: val.lat,
      lon: val.lon,
    });
  } catch (error) {
    console.log(error);
  }
  loadingWeatherForecast.value = false;
};

const getWeatherHistory = async (val) => {
  loadingWeatherHistory.value = true;
  weatherHistoryData.value = [];
  try {
    const currentUTCDate = Math.floor(Date.now() / 1000);

    for (let i = 1; i <= 5; i++) {
      const response = await api.weather.fetchWeatherHistory({
        lat: val.lat,
        lon: val.lon,
        date: currentUTCDate - 86400 * i,
      });
      weatherHistoryData.value.push(response.data.current);
    }
  } catch (error) {
    console.log(error);
  }
  loadingWeatherHistory.value = false;
};

const showHistory = async () => {
  dataIsForecast.value = false;
  sliderPosition.value = 0;
};

const showForecast = () => {
  dataIsForecast.value = true;
  sliderPosition.value = 120;
};

const getCurrentWeather = async (val) => {
  loadingCurrentWeather.value = true;
  try {
    currentWeatherResponse.value = await api.weather.fetchCurrentWeather({
      lat: val.lat,
      lon: val.lon,
    });
  } catch (error) {
    console.log(error);
  }
  loadingCurrentWeather.value = false;
};

const days = computed(() => {
  if (!weatherForcastResponse.value?.data) return [];
  weatherForcastResponse.value?.data?.daily.shift();
  return weatherForcastResponse.value.data?.daily?.map((item) => ({
    day: getDay(item?.dt, true) || "",
    type: item.weather[0].icon,
    highTemp: item.temp.max,
    lowTemp: item.temp.min,
  }));
});

const history = computed(() => {
  if (weatherHistoryData.value.length < 1) return [];
  return weatherHistoryData.value.map((item) => ({
    day: getDay(item?.dt, true) || "",
    type: item.weather[0].icon,
    temp: formatTemp(item.temp, activeTempUnit.value.name, true),
  }));
});

const highlights = computed(() => {
  if (!currentWeatherResponse.value?.data) return {};
  return [
    {
      title: "UV Index",
      value: parseInt(currentWeatherResponse.value?.data?.current?.uvi) || 0,
      body: DialGauge,
    },
    {
      title: "Wind Status",
      type: "wind",
      speed: currentWeatherResponse.value?.data?.current?.wind_speed || 0,
      degree: currentWeatherResponse.value?.data?.current?.wind_deg || 0,
      body: WindSpeed,
    },
    {
      title: "Sunrise & Sunset",
      type: "sun",
      sunriseTime:
        getTime(
          Number(currentWeatherResponse.value?.data?.current?.sunrise) -
            Number(currentWeatherResponse.value?.data?.timezone_offset) -
            3600
        ) || "",
      sunsetTime:
        getTime(
          Number(currentWeatherResponse.value?.data?.current?.sunset) -
            Number(currentWeatherResponse.value?.data?.timezone_offset) -
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
      value: currentWeatherResponse.value?.data?.current?.humidity || 0,
      body: Gauge,
    },
    {
      title: "Visibility",
      type: "gauge",
      showBar: false,
      unit: "km",
      superUnit: false,
      value: Number(currentWeatherResponse.value?.data?.current?.visibility) / 1000 || 0,
      body: Gauge,
    },
    {
      title: "Atmospheric Pressure",
      type: "gauge",
      showBar: false,
      unit: "hPa",
      superUnit: false,
      value: parseInt(currentWeatherResponse.value?.data?.current?.pressure) || 0,
      body: Gauge,
    },
  ];
});

const changeTempUnit = (val, unit) => {
  emit("changeTempUnit", {
    name: val,
    unit,
  });
  activeTempUnit.value.name = val;
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

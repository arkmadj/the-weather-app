<template>
  <div class="sidebar">
    <div>
      <SearchInput />
    </div>

    <div class="sidebar__main-container" v-if="!loadingCurrentWeather && !isEmpty">
      <img
        :src="`https://openweathermap.org/img/wn/${currentWeather.imgType}@4x.png`"
        alt="Weather Image"
        class="weather-image"
      />
      <div class="sidebar__toggle-container">
        <span class="sidebar__toggle-text">Show More Info</span>
        <AppToggle />
      </div>
      <div class="temp-container">
        <div class="current-temp">
          <span class="current-temp__value">{{ currentWeather.temp }}</span>
          <span class="current-temp__unit">ºC</span>
        </div>
        <div class="high-low-container">
          <span class="high-low-container__high">{{ currentWeather.highTemp }}ºC</span>
          <span class="high-low-container__low">{{ currentWeather.lowTemp }}ºC</span>
        </div>
      </div>
      <div class="date-container">
        <span class="date-container__day">{{ currentWeather.day }},</span>
        <span class="date-container__time"> {{ currentWeather.time }}</span>
      </div>
      <hr class="divider" />
      <div class="weather-description">
        <p class="weather-description__top">{{ currentWeather.description }}</p>
        <p class="weather-description__bottom">
          Feels like - {{ currentWeather.subText }}ºC
        </p>
      </div>
      <div class="country-card">
        <div class="country-card__text-container">
          <div class="country-card__text">
            {{ currentLocation.city }}
          </div>
          <div class="country-card__coord">
            {{ currentLocation.lat }}, {{ currentLocation.lon }}
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="!loadingCurrentWeather && isEmpty" class="sidebar__empty-state">
      <EmptyState />
    </div>
    <div v-else class="sidebar__loader">
      <AppLoader />
    </div>
  </div>
</template>
<script setup>
import SearchInput from "../search-input/SearchInput.vue";
import api from "@/api";
import { ref, computed, watch } from "vue";
import AppLoader from "../app-loader/AppLoader.vue";
import { getTime, getDay } from "@/helpers/formatTime";
import useEventBus from "../../composables/eventBus";
import EmptyState from "../empty-state/EmptyState.vue";
import AppToggle from "../app-toggle/AppToggle.vue";

const { bus } = useEventBus();

watch(
  () => bus.value.get("selectedLocation"),
  (val) => {
    getCurrentWeather(val[0]);
  }
);

const currentLocation = ref({
  city: "",
  lon: "",
  lat: "",
});
const loadingCurrentWeather = ref(false);

const currentWeatherResponse = ref({});

const getCurrentWeather = async (val) => {
  loadingCurrentWeather.value = true;
  try {
    currentWeatherResponse.value = await api.weather.fetchCurrentWeather({
      lat: val.lat,
      lon: val.lon,
    });
    currentLocation.value = val;
  } catch (error) {
    console.log(error);
  }
  loadingCurrentWeather.value = false;
};

const currentWeather = computed(() => {
  if (!currentWeatherResponse.value?.data) return {};
  return {
    imgType: currentWeatherResponse.value?.data?.current?.weather[0]?.icon || "",
    temp: parseInt(currentWeatherResponse.value?.data?.current?.temp) || "",
    highTemp: parseInt(currentWeatherResponse.value?.data?.daily[0]?.temp?.max) || "",
    lowTemp: parseInt(currentWeatherResponse.value?.data?.daily[0]?.temp?.min) || "",
    // day: new Date(currentWeatherResponse.value?.data?.list[0].dt_txt) || "",
    day: getDay(currentWeatherResponse.value?.data?.current?.dt),
    time: getTime(
      Number(currentWeatherResponse.value?.data?.current?.dt) +
        Number(currentWeatherResponse.value?.data?.timezone_offset) -
        3600
    ),
    description: currentWeatherResponse.value?.data?.current?.weather[0]?.main || "",
    subText: parseInt(currentWeatherResponse.value?.data?.current?.feels_like) || "",
  };
});

const isEmpty = computed(() => {
  return Object.keys(currentWeather.value).length === 0;
});
</script>

<style scoped lang="scss">
@import "./SideBar.scss";
</style>

<template>
  <div class="sidebar">
    <div class="sidebar__header">
      <SearchInput
        class="sidebar__input-container"
        @selected-location="fetchUserWeather"
      />
      <AppMenu class="sidebar__menu-container" />
    </div>

    <div class="sidebar__main-container" v-if="!loadingCurrentWeather && !isEmpty">
      <img
        :src="`https://openweathermap.org/img/wn/${currentWeather.imgType}@4x.png`"
        alt="Weather Image"
        class="weather-image"
      />
      <div class="sidebar__toggle-container">
        <span class="sidebar__toggle-text">Show More Info</span>
        <AppToggle v-model:checked="showMoreInfo" @update:checked="toggleShowMoreInfo" />
      </div>
      <div class="temp-container">
        <div class="current-temp">
          <span class="current-temp__value">{{ currentWeather.temp }}</span>
          <span class="current-temp__unit">{{ currentUnit.unit }}</span>
        </div>
        <div class="high-low-container">
          <span class="high-low-container__high">{{ currentWeather.highTemp }}</span>
          <span class="high-low-container__low">{{ currentWeather.lowTemp }}</span>
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
          Feels like - {{ currentWeather.subText }}
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
import { ref, computed } from "vue";
import AppLoader from "../app-loader/AppLoader.vue";
import { getTime, getDay } from "@/helpers/formatTime";
import EmptyState from "../empty-state/EmptyState.vue";
import AppToggle from "../app-toggle/AppToggle.vue";
import { formatTemp } from "../../helpers/formatTemp";
import AppMenu from "../app-menu/AppMenu.vue";
import { useStore } from "vuex";


const store = useStore();

const loadingCurrentWeather = ref(false);

const currentUnit = computed(() => store.state.app.unit);

const showMoreInfo = ref(false);

const toggleShowMoreInfo = async () => {
  store.commit("app/toggleShowHighlights");
}

const fetchUserWeather = async (position) => {
  await store.dispatch("location/fetchCurrentLocation", {
    lat: position.lat,
    lon: position.lon,
  });

  await store.dispatch("weather/fetchCurrentWeather", {
    lat: position.lat,
    lon: position.lon,
  });

  await store.dispatch("weather/fetchWeatherForecast", {
    lat: position.lat,
    lon: position.lon,
  });

  await store.dispatch("weather/fetchWeatherHistory", {
    lat: position.lat,
    lon: position.lon,
  });

  await getWeatherHistory({
    lat: position.lat,
    lon: position.lon,
  });

  store.commit("app/setLoading", false);
};

const getWeatherHistory = async (val) => {
  store.commit("app/setLoadingForecast", true);
  try {
    const currentUTCDate = Math.floor(Date.now() / 1000);

    for (let i = 1; i <= 5; i++) {
      await store.dispatch("weather/fetchWeatherHistory", {
        lat: val.lat,
        lon: val.lon,
        date: currentUTCDate - 86400 * i,
      });
    }
  } catch (error) {
    console.log(error);
  }
  store.commit("app/setLoadingForecast", true);
};

const currentWeather = computed(() => {
  const weatherData = store.state.weather.current;
  if (Object.keys(weatherData).length < 1) return weatherData;
  return {
    imgType: weatherData?.current?.weather[0]?.icon || "",
    temp: formatTemp(weatherData?.current?.temp, currentUnit.value.name, false) || "",
    highTemp:
      formatTemp(weatherData?.daily[0]?.temp?.max, currentUnit.value.name, true) || "",
    lowTemp:
      formatTemp(weatherData?.daily[0]?.temp?.min, currentUnit.value.name, true) || "",
    // day: new Date(weatherData?.list[0].dt_txt) || "",
    day: getDay(weatherData?.current?.dt),
    time: getTime(
      Number(weatherData?.current?.dt) + Number(weatherData?.timezone_offset) - 3600
    ),
    description: weatherData?.current?.weather[0]?.main || "",
    subText:
      formatTemp(weatherData?.current?.feels_like, currentUnit.value.name, true) || "",
  };
});

const currentLocation = computed(() => store.state.location.current);

const isEmpty = computed(() => {
  return Object.keys(currentWeather.value).length === 0;
});
</script>

<style scoped lang="scss">
@import "./SideBar.scss";
</style>

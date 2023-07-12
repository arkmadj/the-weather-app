<template>
  <div class="main-container" v-if="!loadingPage">
    <div class="side-bar">
      <SideBar />
    </div>
    <section class="main-content">
      <router-view />
    </section>
  </div>
  <PageLoader v-else />
</template>
<script setup>
import SideBar from "@/components/side-bar/SideBar.vue";
import { computed, onMounted } from "vue";
import PageLoader from "../../pages/page-loader/PageLoader.vue";
import { useStore } from "vuex";

const store = useStore();

onMounted(() => {
  store.commit("app/setLoading", true);

  if (window.navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition(fetchUserWeather, handleError);
  } else {
    fetchUserWeather({
      coords: { latitude: 6.5243793, longitude: 3.3792057 },
      city: "Lagos, Nigeria",
    });
  }
});

const loadingPage = computed(() => store.state.app.loading);

const fetchUserWeather = async (position) => {
  await store.dispatch("location/fetchCurrentLocation", {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
  });

  await store.dispatch("weather/fetchCurrentWeather", {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
  });

  await store.dispatch("weather/fetchWeatherForecast", {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
  });

  await store.dispatch("weather/fetchWeatherHistory", {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
  });

  await getWeatherHistory({
    lat: position.coords.latitude,
    lon: position.coords.longitude,
  });

  store.commit("app/setLoading", false);
};

const getWeatherHistory = async (val) => {
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
};

const handleError = () => {
  fetchUserWeather({
    coords: { latitude: 6.5243793, longitude: 3.3792057 },
    city: "Lagos, Nigeria",
  });
};
</script>
<style lang="scss" scoped>
@import "./MainLayout.scss";
</style>

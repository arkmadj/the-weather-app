<template>
  <div class="main-container" v-if="!loadingPage">
    <div class="side-bar">
      <SideBar />
    </div>
    <section class="main-content">
      <router-view />
    </section>
  </div>
  <PageLoader v-else/>
</template>
<script setup>
import SideBar from "@/components/side-bar/SideBar.vue";
import { onMounted, ref } from "vue";
import useEventBus from "../../composables/eventBus";
import PageLoader from "../../pages/page-loader/PageLoader.vue";

const { emit: customEmit } = useEventBus();

const loadingPage = ref(false)

onMounted(() => {
  loadingPage.value = true
  if (window.navigator.geolocation) {
     window.navigator.geolocation.getCurrentPosition(fetchUserWeather, console.log);
  } else {
    fetchUserWeather({
      coords: { lat: 6.5243793, lon: 3.3792057 },
      city: "Lagos, Nigeria",
    });
  }
  loadingPage.value = false
});

const fetchUserWeather = (position) => {
  customEmit("selectedLocation", {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
    city: "Lagos, Nigeria",
  });
};
</script>
<style lang="scss" scoped>
@import "./MainLayout.scss";
</style>

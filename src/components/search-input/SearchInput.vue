<template>
  <div class="select-container">
    <div class="input-container" >
      <component :is="SearchIcon" color="#929292" data-test="search-icon"/>
      <input
        type="text"
        placeholder="Search for places"
        class="main-input"
        ref="city"
        data-test="search-input"
      />
      <component
        :is="TargetIcon"
        color="#929292"
        @click="getLocation"
        class="input-target"
        data-test="target-icon"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import SearchIcon from "../icons/SearchIcon.vue";
import TargetIcon from "../icons/TargetIcon.vue";
import { useStore } from "vuex";

const emits = defineEmits({
  selectedLocation(payload) {
    if (Object.keys(payload).length) return true;
    return false;
  },
});

const city = ref(null);

const store = useStore();

onMounted(() => {
  const cityAutocomplete = new google.maps.places.Autocomplete(city.value);

  cityAutocomplete.setTypes(["(cities)"]);

  cityAutocomplete.addListener("place_changed", () => {
    const place = cityAutocomplete.getPlace();

    fetchUserWeather({
      coords: {
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
      },
    });
  });
});

const getLocation = async () => {
  if (window.navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition(fetchUserWeather, console.log);
  } else {
    fetchUserWeather({
      coords: { latitude: 6.5243793, longitude: 3.3792057 },
    });
  }
};

const fetchUserWeather = async (position) => {
  store.commit("app/setLoading", true);

  emits("selectedLocation", {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
  });

};
</script>
<style lang="scss" scoped>
@import "./SearchInput.scss";
</style>

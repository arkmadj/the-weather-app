<template>
  <div class="select-container">
    <div class="input-container">
      <component :is="SearchIcon" color="#929292" />
      <input type="text" placeholder="Search for places" class="main-input" ref="city" />
      <component :is="TargetIcon" color="#929292" @click="getLocation" class="input-target" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import SearchIcon from "../icons/SearchIcon.vue";
import TargetIcon from "../icons/TargetIcon.vue";
import useEventBus from "../../composables/eventBus";
import api from "@/api"

const city = ref(null);
const { emit: customEmit } = useEventBus();

onMounted(() => {
  const cityAutocomplete = new google.maps.places.Autocomplete(city.value);

  cityAutocomplete.setTypes(["(cities)"]);

  cityAutocomplete.addListener("place_changed", () => {
    const place = cityAutocomplete.getPlace();

    customEmit("selectedLocation", {
      lat: place.geometry.location.lat(),
      lon: place.geometry.location.lng(),
      city: place.formatted_address,
    });
  });
});

const getLocation = () => {
  if (window.navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition(fetchUserWeather, console.log);
  } else {
    fetchUserWeather({
      coords: { lat: 6.5243793, lon: 3.3792057 },
      city: "Lagos, Nigeria",
    });
  }
}

const fetchUserWeather = async(position) => {
  customEmit("selectedLocation", {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
    city: await getCoordinatesAddress(position.coords.latitude, position.coords.longitude),
  });
};

const getCoordinatesAddress = async (lat, lon) => {
  const location = await api.location.fetchCurrentLocation(lat, lon)
  return location.data.results[0].formatted_address || ""
}

</script>
<style lang="scss" scoped>
@import "./SearchInput.scss";
</style>

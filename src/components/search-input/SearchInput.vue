<template>
  <div class="select-container">
    <div class="input-container">
      <component :is="SearchIcon" color="#929292" />
      <input type="text" placeholder="Search for places" class="main-input" ref="city" />
      <component :is="TargetIcon" color="#929292" />
    </div>
    <div class="dropdown-container">
      <p></p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import SearchIcon from "../icons/SearchIcon.vue";
import TargetIcon from "../icons/TargetIcon.vue";
import useEventBus from "../../composables/eventBus";

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
</script>
<style lang="scss" scoped>
@import "./SearchInput.scss";
</style>

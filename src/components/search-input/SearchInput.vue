<template>
  <div class="select-container">
    <div class="input-container">
      <input type="text" placeholder="Search for places" class="main-input" ref="city" />
      <img src="" alt="" class="input__icon" />
    </div>
    <div class="dropdown-container">
      <p></p>
    </div>
  </div>
</template>



<script setup>
import { onMounted, ref } from 'vue';
const city = ref(null)


onMounted(() => {
  const cityAutocomplete = new google.maps.places.Autocomplete(
    city.value
  );

  cityAutocomplete.setTypes(["(cities)"])
})

</script>
<style lang="scss" scoped>
@import url("./SearchInput.scss");
</style>

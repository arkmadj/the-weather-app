<template>
  <div
    :class="[
      { 'toggle-container--column': orientation !== 'horizontal' },
      'toggle-container',
    ]"
  >
    <div
      :class="[
        { 'header__switch--column': orientation !== 'horizontal' },
        'header__switch',
      ]"
    >
      <button
        :class="[
          { 'header__switch-item--active': activeTempUnit.name === 'celsius' },
          'header__switch-item',
        ]"
        @click="changeTempUnit('celsius', 'ºC')"
        data-test="celsius-button"
      >
        ºC
      </button>
      <button
        :class="[
          { 'header__switch-item--active': activeTempUnit.name === 'fahrenheit' },
          'header__switch-item',
        ]"
        @click="changeTempUnit('fahrenheit', 'ºF')"
        data-test="fahrenheit-button"
      >
        ºF
      </button>
    </div>
    <div class="header__dark-mode" @click="toggleDarkMode" data-test="dark-mode-button">
      <div
        :class="[
          { 'dark-mode__sun-container--active': isDarkMode },
          'dark-mode__sun-container',
        ]"
      >
        <MoonIcon color="#000" size="24" data-test="moon-icon"/>
      </div>
      <SunIcon color="#fff" size="24" data-test="sun-icon"/>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import MoonIcon from "../icons/MoonIcon.vue";
import SunIcon from "../icons/SunIcon.vue";
import { useStore } from "vuex";

const store = useStore()

const props = defineProps({
  orientation: {
    type: String,
    default: "horizontal",
  },
});

const activeTempUnit = ref({ name: "celsius", unit: "ºC" });

const isDarkMode = ref(false);

const changeTempUnit = (val, unit) => {
  store.commit("app/setCurrentUnit", { name: val, unit });
}

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
@import "./ToggleContainer.scss";
</style>

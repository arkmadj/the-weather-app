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
</template>
<script setup>
import { ref } from "vue";
import useEventBus from "../../composables/eventBus";
import MoonIcon from "../icons/MoonIcon.vue";
import SunIcon from "../icons/SunIcon.vue";

const props = defineProps({
  orientation: {
    type: String,
    default: "horizontal",
  },
});

const activeTempUnit = ref({ name: "celsius", unit: "ºC" });

const isDarkMode = ref(false);

const { emit } = useEventBus();

const changeTempUnit = (val, unit) => {
  emit("changeTempUnit", {
    name: val,
    unit,
  });
  activeTempUnit.value.name = val;
};

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

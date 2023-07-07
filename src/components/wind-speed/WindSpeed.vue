<template>
  <div class="wind-speed">
    <div class="wind-speed__value-container">
      <span class="wind-speed__value-text">{{ speed }}</span>
      <span class="wind-speed__value-unit">m/s</span>
    </div>
    <div class="wind-speed__footer">
      <div class="wind-speed__icon" :style="`transform: rotate(${180 + degree}deg)`">
        <MapMarker color="#414FD1"/>
      </div>
      <div class="wind-speed__direction">{{ windDirection }} - {{ degree }}º</div>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";
import MapMarker from "../icons/MapMarker.vue"

const props = defineProps({
  speed: { type: Number, default: 1 },
  degree: { type: Number, default: 1 },
});

console.log("Degree", props.degree)

const windDirection = computed(() => {
  let direction = "N"

  if(props.degree >= 348.75 && props.degree < 11.25){
    direction = "N"
  }else if(props.degree >= 11.25 && props.degree < 33.75){
      direction = "NNE"
  }else if(props.degree >= 33.75 && props.degree < 56.25){
      direction = "NE"
  }else if(props.degree >= 56.25 && props.degree < 78.75){
      direction = "ENE"
  }else if(props.degree >= 78.75 && props.degree < 101.25){
      direction = "E"
  }else if(props.degree >= 101.25 && props.degree < 123.75){
      direction = "ESE"
  }else if(props.degree >= 123.75 && props.degree < 146.25){
      direction = "SE"
  }else if(props.degree >= 146.25 && props.degree < 168.75){
      direction = "SSE"
  }else if(props.degree >= 168.75 && props.degree < 191.25){
      direction = "S"
  }else if(props.degree >= 191.25  && props.degree < 213.75){
      direction = "SSW"
  }else if(props.degree >= 213.75 && props.degree < 236.25){
      direction = "SW"
  }else if(props.degree >= 236.25 && props.degree < 258.75){
      direction = "WSW"
  }else if(props.degree >= 258.75 && props.degree < 281.25){
      direction = "W"
  }else if(props.degree >= 281.25 && props.degree < 303.75){
      direction = "WNW"
  }else if(props.degree >= 303.75 && props.degree < 326.25){
      direction = "NW"
  }else if(props.degree >= 326.25 && props.degree < 348.75){
      direction = "NNW"
  }
  return direction
})
</script>
<style lang="scss" scoped>
@import "./WindSpeed.scss";
</style>

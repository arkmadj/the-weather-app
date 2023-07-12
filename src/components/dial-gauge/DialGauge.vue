<template>
  <div class="dial-container">
    <div class="semi-circle__container"></div>
    <div class="semi-circle__container scale" data-test="dial-scale">
      <div class="scale__top">
        <span>6</span>
      </div>
      <div class="scale__center">
        <span>3</span>
        <span>9</span>
      </div>
      <div class="scale__bottom">
        <span>0</span>
        <span>12</span>
      </div>
    </div>
    <div class="semi-circle__container" data-test="dial-track">
      <div class="track__top"></div>
      <div class="track__bottom"></div>
    </div>
    <div class="semi-circle__container" data-test="dial-top">
      <div
        class="dial__top"
        :style="`transform: rotate(${rotation}deg); background: ${dialColor}`"
      ></div>
      <div class="dial__bottom" data-test="dial-value">{{ value }}</div>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";
defineOptions({
  inheritAttrs: false,
  name: "DialGaugee"
});

const props = defineProps({
  value: { type: Number, default: 5 },
});

const dialColor = computed(() => {
  let color = "#67BE4D";

  if (props.value > 2 && props.value >= 5) {
    color = "#FCBD21";
  } else if (props.value > 5 && props.value >= 7) {
    color = "#F66B34";
  } else if (props.value > 7 && props.value <= 10) {
    color = "#EE154B";
  } else if (props.value > 10) {
    color = "#7C439C";
  }

  return color;
});

const rotation = computed(() => {
  return (props.value / 12) * 180 - 180;
});
</script>

<style lang="scss" scoped>
@import "./DialGauge.scss";
</style>

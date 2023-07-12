<template>
  <div class="gauge">
    <div class="gauge__value">
      <div class="gauge__value-container" :style="`align-items: ${unitAlignment}`">
        <div class="gauge__value-text" data-test="value-text">{{ value }}</div>
        <div class="gauge__value-unit" :style="unitMargin" data-test="value-unit">{{ unit }}</div>
      </div>
      <div class="gauge__bar" v-if="showBar" data-test="bar">
        <div class="gauge__bar-ball" :style="`transform: translateY(${delta}px)`" data-test="bar-ball"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps({
  value: { type: Number, default: 12 },
  showBar: { type: Boolean, default: false },
  unit: { type: String, default: "%" },
  superUnit: {type: Boolean, default: false}
});

const delta = computed(() => {
  return 66 - (props.value / 100) * 66;
});

const unitAlignment = computed(() => {
  return props.superUnit ? "flex-start" : "flex-end"
})

const unitMargin = computed(() => {
  return props.superUnit ? "margin-top: 18px" : "margin-bottom: 24px"
})

</script>
<style lang="scss" scoped>
@import "./Gauge.scss";
</style>

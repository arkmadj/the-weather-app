<template>
  <input type="checkbox" v-model="checkbox" @change="handleCheck" />
</template>
<script setup>
import { ref } from "vue";
import useEventBus from "../../composables/eventBus";

const { emit } = useEventBus();
const checkbox = ref(false);

const handleCheck = () => {
  emit("showHighlights", checkbox.value);
};
</script>
<style lang="scss" scoped>
@import "./AppToggle.scss";
</style>

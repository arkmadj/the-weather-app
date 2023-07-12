<template>
  <input
    v-bind="$attrs"
    type="checkbox"
    :checked="checked"
    @change="$emit('update:checked', $event.target.checked)"
    data-test="check-box"
  />
</template>
<script setup>
const props = defineProps({
  checked: { type: Boolean, required: true },
});
defineOptions({
  inheritAttrs: false,
});
</script>
<style lang="scss" scoped>
@import "./AppToggle.scss";
</style>

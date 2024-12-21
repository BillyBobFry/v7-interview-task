<script setup lang="ts">
import type { Entity } from '@v7-product-interview-task/api'
import { computed, ref } from "vue";
import '@v7-product-interview-task/styles/ProjectTableCell.module.css';

const props = defineProps<{
  propertyIndex: number;
  entityIndex: number;
  field: Entity["fields"][string];
}>();

const cellRef = ref<HTMLTableCellElement | null>(null);
const onClickCell = () => {
  if (cellRef.value) {
    cellRef.value.focus();
  }
};

const text = computed(() => {
  return (
    props.field?.tool_value.value?.toString() ||
    props.field?.manual_value.value?.toString()
  );
});
</script>

<template>
  <td
    ref="cellRef"
    role="gridcell"
    :aria-rowindex="entityIndex + 1"
    :aria-colindex="propertyIndex + 1"
    tabindex="0"
    @click="onClickCell"
  >
    <span v-if="text">{{ text }}</span>
    <i v-else>(empty)</i>
  </td>
</template>

<style scoped>
@import "@v7-product-interview-task/styles/ProjectTableCell.module.css";
</style>


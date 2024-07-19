<script setup lang="ts">
import type { Entity } from "@/backend/types";
import { computed, ref } from "vue";

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
td {
  padding: 0.5rem;
  min-width: 300px;
  max-width: 500px;
  overflow: hidden;
}

i {
  opacity: 0.75;
}
</style>


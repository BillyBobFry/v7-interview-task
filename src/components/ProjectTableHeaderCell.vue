<script setup lang="ts">
import type { Property } from "@/backend/types";

defineProps<{
  columnIndex: number;
  property: Property;
}>();
</script>

<template>
  <th
    role="gridcell"
    aria-rowindex="1"
    :aria-colindex="columnIndex + 1"
    tabindex="0"
  >
    {{ property.name }}
    <i>({{ property.type }})</i>
  </th>
</template>

<style scoped>
th {
  padding: 0.5rem;
}

i {
  font-weight: 400;
}
</style>


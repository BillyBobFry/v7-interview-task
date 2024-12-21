<script setup lang="ts">
import type { Property } from '@v7-product-interview-task/api'

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
@import "@v7-product-interview-task/styles/ProjectTableHeaderCell.module.css";
</style>


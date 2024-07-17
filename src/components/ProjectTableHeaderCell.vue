<script setup lang="ts">
defineProps<{
  columnIndex: number
  propertyName: string
}>()
</script>

<template>
<th role="gridcell" aria-rowindex="1" :aria-colindex="columnIndex + 1"
tabindex="0">
  {{propertyName}}
</th>
</template>

<style scoped>
th {
  padding: 0.5rem;
}
</style>
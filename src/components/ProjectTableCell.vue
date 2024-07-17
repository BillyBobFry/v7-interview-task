<script setup lang="ts">
import type { Entity } from '@/backend/types'
defineProps<{
  propertyIndex: number
  entityIndex: number
  field: Entity['fields'][string]
}>()
</script>

<template>
  <td role="gridcell" :aria-rowindex="entityIndex + 1" :aria-colindex="propertyIndex + 1" tabindex="0">
    {{ field?.tool_value.value?.toString() || field?.manual_value.value?.toString() }}
  </td>
</template>

<style scoped>
td {
  padding: 0.5rem;
}
</style>
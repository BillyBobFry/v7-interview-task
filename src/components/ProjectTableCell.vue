<script setup lang="ts">
import type { Entity } from '@/backend/types'
import {ref} from 'vue'

defineProps<{
  propertyIndex: number
  entityIndex: number
  field: Entity['fields'][string]
}>()

const cellRef = ref<HTMLTableCellElement | null>(null)
const onClickCell = () => {
  if (cellRef.value) {
    cellRef.value.focus()
  }
}
</script>

<template>
  <td ref="cellRef" role="gridcell" :aria-rowindex="entityIndex + 1" :aria-colindex="propertyIndex + 1" tabindex="0" @click="onClickCell">
    {{ field?.tool_value.value?.toString() || field?.manual_value.value?.toString() }}
  </td>
</template>

<style scoped>
td {
  padding: 0.5rem;
  min-width: 300px;
  max-width: 500px;
  overflow: hidden;
}
</style>
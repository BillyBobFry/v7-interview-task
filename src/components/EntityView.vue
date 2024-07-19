<script setup lang="ts">
defineProps<{
  workspaceId: string
  projectId: string
  entityId: string
}>()
</script>

<template>
  <ul>
    <li>Entity ID: {{ entityId }}</li>
    <li>Workspace ID: {{ workspaceId }}</li>
    <li>Project ID: {{ projectId }}</li>
  </ul>
</template>
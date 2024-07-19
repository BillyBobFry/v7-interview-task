<script setup lang="ts">
import { useRouter } from 'vue-router';

defineProps<{
  workspaceId: string
  projectId: string
  entityId: string
}>()

const router = useRouter()
</script>

<template>
	<a href="#" @click.preventDefault="router.back()">Back</a>
  <ul>
    <li>Entity ID: {{ entityId }}</li>
    <li>Workspace ID: {{ workspaceId }}</li>
    <li>Project ID: {{ projectId }}</li>
  </ul>
</template>

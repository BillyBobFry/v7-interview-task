<script setup lang="ts">
import { ref, watch } from 'vue'
import { getEntities } from '@/backend/getEntities'
import { getProject } from '@/backend/getProject'
import { useEntitiesStore } from '@/stores/entities'
import { useProjectStore } from '@/stores/project'
import { useStorage } from '@vueuse/core'
import ProjectTableHeaderCell from '@/components/ProjectTableHeaderCell.vue'
import ProjectTableCell from '@/components/ProjectTableCell.vue'
const props = defineProps<{
  workspaceId: string
  projectId: string
}>()

const authToken = useStorage('authToken', '')
const entityStore = useEntitiesStore()
const projectStore = useProjectStore()

watch(authToken, async (newTokenValue) => {
  if (!newTokenValue) {
    throw new Error('Auth token is required')
  }

  projectStore.project = await getProject({
    authToken: newTokenValue,
    projectId: props.projectId,
    workspaceId: props.workspaceId
  })

  entityStore.entities = await getEntities({
    authToken: newTokenValue,
    projectId: props.projectId,
    workspaceId: props.workspaceId
  })

}, {
  immediate: true
})
</script>

<template>
  <div>
    <div class="auth-token-config">
      <div>Log onto Go and paste your auth token here for the page to work:</div>
      <input aria-label="Auth token" type="text" v-model="authToken" />
    </div>

    <table class="grid" role="grid" v-if="projectStore.project"
      :style="{ gridTemplateColumns: `repeat(${projectStore.project.properties.length}, 1fr)` }">
      <thead>
        <th />
        <ProjectTableHeaderCell v-for="property, index in projectStore.project.properties" 
          :key="property.id"
          :property-name="property.name" 
          :column-index="index" />
      </thead>
      <tbody>
        <tr v-for="entity, entityIndex in entityStore.entities" :key="entity.id">
          <td tabindex="0">{{ entityIndex + 1 }}</td>
          <ProjectTableCell v-for="property, propertyIndex in projectStore.project.properties" 
            :key="property.id"
            :field="entity.fields[property.slug]" 
            :entity-index="entityIndex" 
            :property-index="propertyIndex" />
        </tr>
      </tbody>
    </table>

  </div>
</template>

<style scoped>
.auth-token-config {
  display: flex;
  align-items: center;
  gap: 8px;
}

table {
  min-width: 100vw;
  border-collapse: collapse;
}

td {
  position: relative;
}

td>div {}

:focus {}

td:focus>* {
  overflow: auto;
  max-width: 100%;
  position: absolute;
  background-color: white;
  outline: 2px solid red;
}
</style>
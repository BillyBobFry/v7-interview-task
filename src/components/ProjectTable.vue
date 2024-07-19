<script setup lang="ts">
import { getEntities } from '@/backend/getEntities'
import { getProject } from '@/backend/getProject'
import ProjectTableCell from '@/components/ProjectTableCell.vue'
import ProjectTableHeaderCell from '@/components/ProjectTableHeaderCell.vue'
import { useProjectChannel } from '@/composables/useProjectChannel'
import { useAuthTokenStore } from '@/stores/authToken'
import { useEntitiesStore } from '@/stores/entities'
import { useProjectStore } from '@/stores/project'
import { watch } from 'vue'
import AuthHandler from './AuthHandler.vue'

const props = defineProps<{
  workspaceId: string
  projectId: string
}>()

const authTokenStore = useAuthTokenStore()
const entityStore = useEntitiesStore()
const projectStore = useProjectStore()

useProjectChannel(props.projectId)

watch(() => authTokenStore.token, async (newTokenValue) => {
  if (!newTokenValue) {
    throw new Error('Auth token is required')
  }

  try {
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

    authTokenStore.isValid = true
  } catch (error) {
    // probably an invalid token
    authTokenStore.isValid = false
    entityStore.entities = []
    projectStore.project = null
  }

}, {
  immediate: true
})
</script>

<template>
  <div class="container">
		<AuthHandler />

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
          <td tabindex="0">
            <RouterLink :to="{
              name: 'entity',
              params: {
                workspaceId: props.workspaceId,
                projectId: props.projectId,
                entityId: entity.id
              }
            }">
              {{ entityIndex + 1 }}
            </RouterLink>
          </td>
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
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-height: 100vh;
  padding: 0.5rem;
}

.auth-token-config {
  display: flex;
  align-items: center;
  gap: 8px;
}

table {
  min-width: 100vw;
  border-collapse: collapse;
}

td, th {
  border: 1px solid grey;
}

td {
  position: relative;
}

td:focus, th:focus {
  outline: 2px solid deepskyblue;
}
</style>

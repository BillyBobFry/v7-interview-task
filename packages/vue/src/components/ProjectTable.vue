<script setup lang="ts">
import ProjectTableCell from '@/components/ProjectTableCell.vue'
import ProjectTableHeaderCell from '@/components/ProjectTableHeaderCell.vue'
import { useProjectChannel } from '@/composables/useProjectChannel'
import { useEntitiesStore } from '@/stores/entities'
import { useProjectStore } from '@/stores/project'
import { watch } from 'vue'
import {getEntities, getProject} from '@v7-product-interview-task/api'

const props = defineProps<{
  workspaceId: string
  projectId: string
}>()

const entityStore = useEntitiesStore()
const projectStore = useProjectStore()

useProjectChannel(props.projectId)

watch(() => props.projectId, async () => {
  const apiKey = import.meta.env.VITE_API_KEY
  if (!apiKey) {
    throw new Error('API Key is required')
  }

  try {
    projectStore.project = await getProject({
      apiKey,
      projectId: props.projectId,
      workspaceId: props.workspaceId
    })

    entityStore.entities = await getEntities({
      apiKey,
      projectId: props.projectId,
      workspaceId: props.workspaceId
    })

  } catch (error) {
    // probably an invalid token
    entityStore.entities = []
    projectStore.project = null
  }

}, {
  immediate: true
})
</script>

<template>
  <div class="container">
    <table class="grid" role="grid" v-if="projectStore.project"
      :style="{ gridTemplateColumns: `repeat(${projectStore.project.properties.length}, 1fr)` }">
      <thead>
        <tr>
        <th />
        <ProjectTableHeaderCell v-for="property, index in projectStore.project.properties"
          :key="property.id"
          :property="property"
          :column-index="index" />
        </tr>
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
@import "@v7-product-interview-task/styles/ProjectTable.module.css";
</style>

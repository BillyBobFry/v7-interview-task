import type { MaybeRef } from '@vueuse/shared'
import { computed, onBeforeUnmount, watch } from 'vue'

import {
  type Entity,
  type Project,
  type Property,
} from '@/backend/types'

import { useWebSocketChannel } from './useWebSocketChannel'

import type { components } from '@/api'

export type ProjectChannelHandlers = {
  onCreateEntity: (entity: Entity) => void
  onDeleteEntities: (entityId: string[]) => void
  onUpdateEntity: (entity: Entity) => void
  onDeleteProperty: (propertyId: string) => void
  onUpdateProperty: (property: Property) => void
  onUpdateField: (field: components['schemas']['Projects.Entities.FieldResponse']) => void
}

/**
 * When given a project ID, this composable will subscribe to a websocket channel
 * for that project. It will then call the provided handlers when messages are
 * received.
 * 
 * usage:
 * useProjectChannel(projectId, handlers)
 */
export const useProjectChannel = (
  projectId: MaybeRef<Project['id'] | undefined>,
  handlers?: ProjectChannelHandlers,
) => {
  const topic = computed<`project:${string}` | null>(() => {
    if (typeof projectId === 'string') {
      return `project:${projectId}`
    }

    if (!projectId?.value) {
      return null
    }

    return `project:${projectId.value}`
  })

  const { channel, channelState, leaveChannel } = useWebSocketChannel(topic)

  onBeforeUnmount(async () => {
    await leaveChannel()
  })

  watch(
    channel,
    () => {
      channel.value?.on('property:updated', (data: Property) => {
        handlers?.onUpdateProperty(data)
      })
      channel.value?.on('property:deleted', (data: { property_id: string }) => {
        handlers?.onDeleteProperty(data.property_id)
      })
      channel.value?.on('entity:updated', (data: Entity) => {
        handlers?.onUpdateEntity(data)
      })
      channel.value?.on('entity:created', (data: Entity) => {
        handlers?.onCreateEntity(data)
      })
      channel.value?.on('entity:deleted', (data: { entity_id: string }) => {
        handlers?.onDeleteEntities([data.entity_id])
      })
      channel.value?.on('entity:bulk_deleted', (data: { entity_ids: string[] }) => {
        handlers?.onDeleteEntities(data.entity_ids)
      })
      channel.value?.on(
        'field:updated',
        (data: components['schemas']['Projects.Entities.FieldResponse']) => {
          handlers?.onUpdateField(data)
        },
      )
    },
    { immediate: true },
  )

  return {
    channelState,
    leaveChannel,
  }
}

import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Entity } from '@/backend/types'

export const useEntitiesStore = defineStore('entities', () => {
  
  const entities = ref<Entity[]>([])
  
  return { entities }
})

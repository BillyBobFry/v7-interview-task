import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Entity } from '@v7-product-interview-task/api'

export const useEntitiesStore = defineStore('entities', () => {
  
  const entities = ref<Entity[]>([])
  
  return { entities }
})

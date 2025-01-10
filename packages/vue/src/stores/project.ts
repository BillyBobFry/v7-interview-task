import { ref } from "vue";
import { defineStore } from "pinia";
import type { Project } from '@v7-product-interview-task/api'

export const useProjectStore = defineStore("project", () => {
  const project = ref<Project | null>(null);

  return { project };
});

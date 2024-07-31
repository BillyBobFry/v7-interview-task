import { ref } from "vue";
import { defineStore } from "pinia";
import type { Project } from "@/backend/types";

export const useProjectStore = defineStore("project", () => {
  const project = ref<Project | null>(null);

  return { project };
});

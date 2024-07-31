import { ref } from "vue";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useApiKeyStore = defineStore("apiKey", () => {
  const token = useStorage("apiKey", "");
  const isValid = ref(false);

  return { token, isValid };
});

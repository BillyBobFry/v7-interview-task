import { ref } from "vue";
import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useAuthTokenStore = defineStore("authToken", () => {
  const token = useStorage("authToken", "");
  const isValid = ref(false);

  return { token, isValid };
});

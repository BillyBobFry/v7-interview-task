<script setup lang="ts">
import { useApiKeyStore } from "@/stores/apiKey";
import { ref } from "vue";

const apiKeyStore = useApiKeyStore();
const dialogEl = ref<HTMLDialogElement | null>(null);
</script>

<template>
  <label>
    {{ apiKeyStore.isValid ? "API key is valid" : "Please add an API key" }}
    <button @click="dialogEl?.showModal()">
      {{ apiKeyStore.isValid ? "Modify" : "Add" }} API key
    </button>
  </label>

  <dialog ref="dialogEl">
    <label>
      Log onto Go (Staging) and paste your API key here for the page to work:
      <br />
      <br />
      <input aria-label="API key" type="text" v-model="apiKeyStore.token" />
    </label>
    <button @click="dialogEl?.close()">Close dialog</button>
  </dialog>
</template>

<style scoped>
dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

button {
  margin-left: 0.5rem;
}
</style>

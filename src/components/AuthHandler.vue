<script setup lang="ts">
import { useAuthTokenStore } from "@/stores/authToken";
import { ref } from "vue";

const authTokenStore = useAuthTokenStore();
const dialogEl = ref<HTMLDialogElement | null>(null);
</script>

<template>
  <label>
    {{
      authTokenStore.isValid
        ? "Auth token is valid"
        : "Please add an auth token"
    }}
    <button @click="dialogEl?.showModal()">
      {{ authTokenStore.isValid ? "Modify" : "Add" }} auth token
    </button>
  </label>

  <dialog ref="dialogEl">
    <label>
      Log onto Go (Staging) and paste your auth token here for the page to work:
      <br />
      <br />
      <input
        aria-label="Auth token"
        type="text"
        v-model="authTokenStore.token"
      />
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

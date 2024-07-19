<script setup lang="ts">
const hostname = window.location.hostname;
const port = window.location.port;
</script>

<template>
  <div>
    <h1>Welcome to Go-lite</h1>
    <p>
      Visit <span class="monospace">/:workspaceId/projects/:projectId</span> to
      use this app.
    </p>
    <p>
      Or visit a project in
      <a
        href="https://go.v7labs.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Go
      </a>
      and replace the hostname with
      <span class="monospace">{{ `${hostname}:${port}` }}</span>
    </p>
  </div>
</template>

<style scoped>
.monospace {
  font-family: monospace;
}
</style>


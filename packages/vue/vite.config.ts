import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    cors: false,
    proxy: {
      "/api": {
        target: "https://go.v7labs.com",
        changeOrigin: true,
      },
      '/socket': {
        target: `ws://go.v7labs.com:4000`,
        ws: true,
      },
      "/ws": {
        target: "wss://go.v7labs.com",
        rewriteWsOrigin: true,
        ws: true,
      },
    },
  },
});

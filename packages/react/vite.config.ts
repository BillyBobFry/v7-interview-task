import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
      "/ws": {
        target: "wss://go.v7labs.com",
        rewriteWsOrigin: true,
        ws: true,
      },
    },
  },
});

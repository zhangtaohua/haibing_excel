import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
      },
    },
  },
  server: {
    proxy: {
      "/daily": {
        target: "https://www.bing.com/HPImageArchive.aspx?format=js&n=1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/daily/, ""),
      },
      "/api/v1": {
        target: "http://localhost:8088",
        changeOrigin: true,
      },
    },
  },
});

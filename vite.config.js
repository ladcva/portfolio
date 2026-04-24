import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.[jt]sx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          three: ["three"],
          markdown: ["react-markdown", "remark-gfm", "remark-math", "rehype-katex", "katex"],
        },
      },
    },
  },
  server: {
    port: 3000,
    allowedHosts: true,
    proxy: {
      "/api": {
        target: "http://localhost:3600",
        changeOrigin: true,
      },
    },
  },
});

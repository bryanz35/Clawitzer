import { defineConfig } from "vite";

export default defineConfig({
  base: "/operator/",
  server: { port: 5173 },
  build: {
    outDir: "../robot-android/app/src/main/assets/web/operator",
    emptyOutDir: true,
    target: "es2022",
  },
});

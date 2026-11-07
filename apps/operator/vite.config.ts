import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/operator/",
  server: { port: 5173 },
  build: {
    outDir: "../robot-android/app/src/main/assets/web/operator",
    emptyOutDir: true,
    target: "es2022",
    rollupOptions: {
      input: {
        operator: fileURLToPath(new URL("./index.html", import.meta.url)),
        control: fileURLToPath(new URL("./control.html", import.meta.url)),
      },
    },
  },
});

import { resolve } from "path";
import { defineConfig } from "vite";
import { modulePlugin } from "./modulePlugin";

export default defineConfig({
  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "src") }],
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "src/index.ts",
      output: {
        entryFileNames: "scripts/[name].js",
      },
    },
  },
  plugins: [
    modulePlugin({ modulePath: resolve(__dirname, "src/module.json") }),
  ],
});

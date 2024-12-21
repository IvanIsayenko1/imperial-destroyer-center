import type { UserConfig as VitestUserConfig } from "vitest/config";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

declare module "vite" {
  export interface UserConfig {
    test: VitestUserConfig["test"];
  }
}

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
  },
});

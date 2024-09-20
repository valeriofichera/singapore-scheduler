import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";

export default defineConfig({
  // optimizeDeps: {
  //   esbuildOptions: {
  //     plugins: [
  //       NodeGlobalsPolyfillPlugin({
  //         process: true,
  //       }),
  //       NodeModulesPolyfillPlugin(),
  //     ],
  //   },
  // },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

import type { ConfigEnv, UserConfig } from "vite";
import { defineConfig } from "vite";
import { pluginExposeRenderer } from "./vite.base.config";
import VuePlugin from "@vitejs/plugin-vue";
import { resolve } from "path";

const root = process.cwd();
function pathResolve(dir: string) {
  return resolve(root, ".", dir);
}
// https://vitejs.dev/config
export default defineConfig((env: ConfigEnv) => {
  const forgeEnv = env as ConfigEnv<"renderer">;
  const { root, mode, forgeConfigSelf } = forgeEnv;
  console.log("forgeConfigSelf", forgeConfigSelf);
  const name = forgeConfigSelf.name ?? "";

  return {
    root,
    mode,
    base: "./",
    build: {
      outDir: `.vite/renderer/${name}`,
    },
    plugins: [pluginExposeRenderer(name), VuePlugin()],
    resolve: {
      preserveSymlinks: true,
      extensions: [
        ".mjs",
        ".js",
        ".ts",
        ".jsx",
        ".tsx",
        ".json",
        ".less",
        ".css",
      ],
      alias: [
        // {
        //   find: 'vue-i18n',
        //   replacement: 'vue-i18n/dist/vue-i18n.cjs.js'
        // },
        {
          find: /\@\//,
          replacement: `${pathResolve("src")}/`,
        },
      ],
    },
    clearScreen: false,
  } as UserConfig;
});

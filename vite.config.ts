// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
// import VueRouter from 'unplugin-vue-router/vite'
import dts from "vite-plugin-dts";
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 1234,
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ['deep-chat'].includes(tag)
        }
      }
    }),
    vuetify({
      autoImport: true,
      styles: {
        configFile: resolve(__dirname, "src/styles/variables.scss"),
      },
    }), // Vuetify plugin
    dts(
      {
        insertTypesEntry: true,
      }
    ),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // or "modern"
      }
    }
  },
  // optimizeDeps: {
  //   include: ["vuetify"],
  // },
  build: {
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, "src/plugins/vuetify-desys.ts"),
      name: "vuetify-desys",
      fileName: "vuetify-desys",
    },
    rollupOptions: {
      // Make sure to exclude Vue from the bundle
      external: ["vue"],
      output: {
        // exports: "named",
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      }
    },
    sourcemap: false,
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  publicDir: false,
})

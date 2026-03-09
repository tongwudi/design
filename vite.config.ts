import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: true,
  },
  plugins: [
    vue(),
    unocss(),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core'],
      dts: 'types/auto-imports.d.ts',
      eslintrc: {
        enabled: true, // Default `false`
      },
    }),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false,
          resolveIcons: true,
        }),
      ],
      dts: 'types/components.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

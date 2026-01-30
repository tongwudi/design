// pnpm add  "@iconify/utils": "^2.3.0",
// import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import { defineConfig, presetAttributify, presetMini, presetWind3, transformerDirectives, transformerVariantGroup } from 'unocss'// presetIcons

export default defineConfig({
  presets: [
    presetWind3(),
    presetAttributify(),
    presetMini(),
    // presetIcons({
    //   collections: {
    //     'my-icons': FileSystemIconLoader('./src/assets/icons', svg =>
    //       svg.replace(/(?<=['"])(#\w{6}|#\w{3})(?=['"])/g, 'currentColor')),
    //     'extraProperties': {
    //       display: 'inline-block',
    //     },
    //   },
    // }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  shortcuts: [
    ['wh-full', 'w-full h-full'],
    ['f-c-c', 'flex justify-center items-center'],
    ['f-s-c', 'flex justify-start items-center'],
    ['f-b-c', 'flex justify-between items-center'],
    ['f-b-s', 'flex justify-between items-start'],
    ['f-col', 'flex flex-col'],
    ['absolute-lt', 'absolute left-0 top-0'],
    ['margin-auto', 'my-0 mx-auto'],
    ['text-ellipsis', 'truncate'],
    ['base-wrapper', 'w-1200px mx-auto min-w-1200px px-10px'],
    ['min-wrapper', 'min-w-1200px w-full'],
  ],
  rules: [
    [/^transition-custom-([\w-]+)$/, ([, property]) => ({
      'transition-property': property,
      'transition-duration': '0.3s',
      'transition-timing-function': 'cubic-bezier(0.2, 0, 0, 1)',
      'transition-delay': '0s',
    })],
  ],
  theme: {
    colors: {
      primary: 'var(--primary-color)',
      info: 'var(--info-color)',
      success: 'var(--success-color)',
      warning: 'var(--warning-color)',
      error: 'var(--error-color)',
    },
  },
})

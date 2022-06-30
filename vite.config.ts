import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import tsconfigPaths from 'vite-tsconfig-paths'
import replace from '@rollup/plugin-replace'
import { config } from 'dotenv'

const configToReplace = {}
for (const [key, v] of Object.entries(config().parsed)) {
  configToReplace[`process.env.${key}`] = `'${v}'`
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({ hot: !process.env.VITEST }),
    tsconfigPaths(),
    replace({
      include: ['src/**/*.ts', 'src/**/*.svelte'],
      preventAssignment: true,
      values: configToReplace,
    }),
  ],
})

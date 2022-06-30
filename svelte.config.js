import sveltePreprocess from 'svelte-preprocess'

export default {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  compilerOptions: {
    enableSourcemap: true,
    dev: process.env.NODE_ENV !== 'production',
  },
  preprocess: sveltePreprocess({
    sourcemap: true,
  }),
}

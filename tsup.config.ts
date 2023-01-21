import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  entry: ['src/**/*.ts'],
  skipNodeModulesBundle: true,
  format: ['esm'],
  minify: true,
  splitting: true,
})

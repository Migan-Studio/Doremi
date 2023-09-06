import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  entry: [
    'src/index.ts',
    'src/Commands/**/*.ts',
    'src/Events/*.ts',
    'src/Interactions/Components/**/*.ts',
  ],
  skipNodeModulesBundle: true,
  format: ['esm'],
  minify: true,
  splitting: true,
})

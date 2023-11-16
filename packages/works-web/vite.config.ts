import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    visualizer({
      filename: 'stats/analysis.html'
    })
  ],
  server: {
    strictPort: true
  },
  resolve: {
    alias: {
      lodash: 'lodash-es'
    }
  }
});

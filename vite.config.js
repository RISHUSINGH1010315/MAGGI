import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  server: {
    fs: {
      allow: ['.']
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        product: resolve(__dirname, 'Product.html'),
        recipes: resolve(__dirname, 'Recipes.html'),
        kitchen: resolve(__dirname, 'Kitchen.html'),
        impact: resolve(__dirname, 'impact.html'),
        joinclub: resolve(__dirname, 'JoinClub.html')
      }
    }
  }
});

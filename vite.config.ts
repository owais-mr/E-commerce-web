import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/E-commerce-web/', // 👈 must match repo name exactly (capital E)
});

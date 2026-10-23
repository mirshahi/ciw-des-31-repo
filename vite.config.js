import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The preview proxy forwards an environment-specific hostname, so the dev
// server must bind every interface. Vite >= 6.1 also honours the
// __VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS variable that the sandbox supplies,
// which is how the external preview host is accepted.
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    // Bind mounts do not always emit inotify events, so poll for changes.
    watch: { usePolling: true, interval: 300 }
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true
  }
});

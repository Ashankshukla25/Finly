// client/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Polyfill crypto.hash if not present
if (!globalThis.crypto?.hash) {
  globalThis.crypto.hash = async (algorithm, data) => {
    // Use the existing SubtleCrypto.digest under the hood
    const subtle = globalThis.crypto.subtle;
    return subtle.digest(algorithm, data);
  };
}

export default defineConfig({
  plugins: [react()],
});


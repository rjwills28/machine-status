import { defineConfig, loadEnv } from 'vite'
import { nodePolyfills } from "vite-plugin-node-polyfills";
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint';

export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [react(), eslint(), nodePolyfills()],
        test: {
            environment: 'jsdom',
            include: ['**/*.test.ts', '**/*.test.tsx'],
            globals: true,
        },
        server: {    
            // this ensures that the browser opens upon server start
            open: true,
            // this sets a default port to 3000  
            port: 3000, 
        }
    }    
})

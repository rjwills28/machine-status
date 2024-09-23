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
        },
        define: {
            'process.env.VITE_CONIQL_SOCKET': JSON.stringify(env.VITE_CONIQL_SOCKET),
            'process.env.VITE_CONIQL_SSL': JSON.stringify(env.VITE_CONIQL_SSL),
            'process.env.VITE_PROFILER_ENABLED': JSON.stringify(env.VITE_PROFILER_ENABLED),
            'process.env.VITE_THROTTLE_PERIOD': JSON.stringify(env.VITE_THROTTLE_PERIOD),
            'process.env.VITE_LOG_LEVEL': JSON.stringify(env.VITE_LOG_LEVEL),
            'process.env.VITE_CYCLE_CONFIG_FILE': JSON.stringify(env.VITE_CYCLE_CONFIG_FILE),
            'process.env.VITE_BUILD_TARGET': JSON.stringify(env.VITE_BUILD_TARGET),
        },
    }    
})

import react from "@vitejs/plugin-react"
import path from "node:path"
import { defineConfig } from "vite"
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/
export default defineConfig({
    server: { port: 8080 },
    plugins: [
        react(),
        svgr({
            svgrOptions: {},
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
})

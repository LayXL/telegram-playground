#!/usr/bin/env node
import react from "@vitejs/plugin-react"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { createServer } from "vite"

const __dirname = fileURLToPath(new URL(".", import.meta.url))

const server = await createServer({
    server: { port: 8080 },
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    root: __dirname,
})
await server.listen()

server.printUrls()

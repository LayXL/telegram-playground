#!/usr/bin/env node
import { fileURLToPath } from "node:url"
import { createServer } from "vite"

const __dirname = fileURLToPath(new URL(".", import.meta.url))

const server = await createServer({
    configFile: "vite.config.ts",
    root: __dirname,
})
await server.listen()

server.printUrls()

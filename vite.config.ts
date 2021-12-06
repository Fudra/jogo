import path from 'path'
import { defineConfig } from 'vite'

module.exports = defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/main.ts'),
            name: 'JOGO',
            fileName: (format: string) => `jogo.${format}.js`
        },
        rollupOptions: {
            external: [],
            output: {
                globals: {}
            }
        }
    }
})
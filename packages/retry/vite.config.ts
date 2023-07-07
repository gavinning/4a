import { defineConfig } from 'vitest/config'
import { getBaseViteConfig } from '../../base/vite.base'

// https://vitejs.dev/config/
export default defineConfig(getBaseViteConfig(__dirname))

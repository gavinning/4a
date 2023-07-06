// @ts-ignore
import extend from 'extend'
import { resolve, isAbsolute } from 'path'
import { UserConfigExport } from 'vitest/config'

export function getBaseViteConfig(dirname: string, override?: Partial<UserConfigExport>): UserConfigExport {
  const isExternal = (id: string) => !id.startsWith('.') && !isAbsolute(id)

  return extend(true, {
    plugins: [],

    test: {
      testTimeout: 5000,
    },

    resolve: {
      alias: {
        '@a': resolve(__dirname, '..'),
      },
    },

    esbuild: {
      // jsxInject: "import React from 'react'",
    },

    build: {
      lib: {
        fileName: 'index',
        formats: ['esm', 'cjs'],
        entry: resolve(dirname, 'src/index.ts'),
      },
      rollupOptions: {
        external: isExternal,
        output: {
          exports: "named"
        }
      },
    },
  }, override)
}

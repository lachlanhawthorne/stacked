/// <reference types="vitest" />

import * as path from "path";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import tsconfigPaths from 'vite-tsconfig-paths';
import dts from "vite-dts";
import WindiCSS from 'vite-plugin-windicss'


const isExternal = (id: string) => !id.startsWith(".") && !path.isAbsolute(id);

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: isExternal,
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
  plugins: [
    // dts(),
    react({
      exclude: [/\.stories\.(t|j)sx?$/, /node_modules/],
      fastRefresh: true,
      babel: {
        plugins: ['babel-plugin-macros'],
      },
    }),
    WindiCSS()
    // tsconfigPaths(),
  ],
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
  test: {
    environment: "happy-dom", // or 'jsdom', 'node',
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
});

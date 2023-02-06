import * as path from "path";
import { defineConfig } from "vite";

// const isExternal = (id) => !id.startsWith(".") && !path.isAbsolute(id);

export default defineConfig(() => ({
  esbuild: {
    jsxFactory: "jsx",
    jsxInject: `
      import React from 'react';
    `,
  },
  // test: {
  //   environment: "happy-dom", // or 'jsdom', 'node',
  //   coverage: {
  //     reporter: ["text", "json", "html"],
  //   },
  // },
  build: {
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      formats: ["cjs"],
    },
    // rollupOptions: {
    //   external: isExternal,
    //   output: {
    //     globals: {
    //       react: "React",
    //     },
    //   },
    // },
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
  plugins: [
    // dts(),
    // svgrPlugin({
    //   // exportAsDefault: true,
    //   svgrOptions: {
    //     icon: true,
    //   },
    // }),
  ],
}));

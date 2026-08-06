import { resolve } from "path";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import HandlebarUpdate from "./hbaTrigger";

const partDirs = [
  "src/partials",
  "src/partials/headers",
  "src/partials/footers",
  "src/partials/sidebars",
];

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: partDirs,
      reloadOnPartialChange: true,
    }),
    HandlebarUpdate(),
  ],
  server: {},
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/js/main.js"),
        style: resolve(__dirname, "src/styles/global.scss"),
        index: resolve(__dirname, "index.html"),
        contacts: resolve(__dirname, "pages/contacts.html"),
        blog: resolve(__dirname, "pages/blog.html"),
        comparison: resolve(__dirname, "pages/comparison.html"),
        solutions: resolve(__dirname, "pages/solutions.html"),
        solution: resolve(__dirname, "pages/solution.html"),
        payservices: resolve(__dirname, "pages/payservices.html"),
        devices: resolve(__dirname, "pages/devices.html"),
        device: resolve(__dirname, "pages/device.html"),
        search: resolve(__dirname, "pages/search.html"),
        technology: resolve(__dirname, "pages/technology.html"),
        case: resolve(__dirname, "pages/case.html"),
        notFound: resolve(__dirname, "pages/404.html"),
        po: resolve(__dirname, "pages/po.html"),
        peripherals: resolve(__dirname, "pages/peripherals.html"),
        configurator: resolve(__dirname, "pages/configurator.html"),
      },
      output: {
        entryFileNames: `js/[name].js`,
        chunkFileNames: `js/[name].js`,
        assetFileNames: `css/[name].[ext]`,
      },
    },
  },
});

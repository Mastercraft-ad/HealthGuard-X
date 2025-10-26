import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// Import optional plugins only in dev mode
const devPlugins = [];
if (process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined) {
  const cartographer = await import("@replit/vite-plugin-cartographer").then(
    (m) => m.cartographer()
  );
  const devBanner = await import("@replit/vite-plugin-dev-banner").then(
    (m) => m.devBanner()
  );
  devPlugins.push(cartographer, devBanner);
}

export default defineConfig({
  root: path.resolve(process.cwd(), "client"), // ✅ Points Vite to your client folder
  plugins: [react(), runtimeErrorOverlay(), ...devPlugins],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "client", "src"),
      "@shared": path.resolve(process.cwd(), "shared"),
      "@assets": path.resolve(process.cwd(), "attached_assets"),

      // ✅ Ensures react-hook-form uses a compatible build
      "react-hook-form": path.resolve(
        process.cwd(),
        "node_modules",
        "react-hook-form",
        "dist",
        "index.cjs.js"
      ),
    },
  },
  build: {
    outDir: path.resolve(process.cwd(), "dist/public"), // ✅ Output goes here
    emptyOutDir: true, // Cleans dist before build
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
    strictPort: false,
    hmr: {
      clientPort: 443,
    },
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});

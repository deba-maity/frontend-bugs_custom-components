import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4173,
    host: "0.0.0.0",
  },
  base: "/frontend-bugs_custom-components/",
});

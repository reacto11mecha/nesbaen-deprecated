import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    proxy: {
      "/users": {
        target: "http://localhost:3000/",
        changeOrigin: false,
      },
    },
  },
});

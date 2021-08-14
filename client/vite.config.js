import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

export default defineConfig({
  plugins: [reactRefresh()],
  define: {
    REACT_API_ENDPOINT: JSON.stringify("http://localhost:3000"),
  },
});

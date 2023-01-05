// vite.config.js
import { defineConfig } from "file:///mnt/c/Users/abdep/Documents/Thaali/tools/fmb-ui/node_modules/vite/dist/node/index.js";
import react from "file:///mnt/c/Users/abdep/Documents/Thaali/tools/fmb-ui/node_modules/@vitejs/plugin-react/dist/index.mjs";

// package.json
var dependencies = {
  axios: "^1.2.2",
  bootstrap: "^5.2.3",
  react: "^18.2.0",
  "react-bootstrap": "^2.7.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.6.1"
};

// vite.config.js
var vendor = ["react", "react-router-dom", "react-dom"];
function renderChunks(deps) {
  let chunks = {};
  Object.keys(deps).forEach((key) => {
    if (vendor.includes(key))
      return;
    chunks[key] = [key];
  });
  return chunks;
}
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3e3
  },
  base: "/",
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor,
          ...renderChunks(dependencies)
        }
      }
    }
  },
  resolve: {
    alias: [
      { find: "@/components", replacement: "/src/components" },
      { find: "@/atoms", replacement: "/src/components/atoms" },
      { find: "@/molecules", replacement: "/src/components/molecules" },
      { find: "@/organisms", replacement: "/src/components/organisms" },
      { find: "@/templates", replacement: "/src/components/templates" },
      { find: "@/screens", replacement: "/src/components/screens" },
      { find: "@/api", replacement: "/src/api" },
      { find: "@/assets", replacement: "/src/assets" },
      { find: "@/redux", replacement: "/src/redux" },
      { find: "@/styles", replacement: "/src/styles" },
      { find: "@/utils", replacement: "/src/utils" }
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvbW50L2MvVXNlcnMvYWJkZXAvRG9jdW1lbnRzL1RoYWFsaS90b29scy9mbWItdWlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9tbnQvYy9Vc2Vycy9hYmRlcC9Eb2N1bWVudHMvVGhhYWxpL3Rvb2xzL2ZtYi11aS92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vbW50L2MvVXNlcnMvYWJkZXAvRG9jdW1lbnRzL1RoYWFsaS90b29scy9mbWItdWkvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHsgZGVwZW5kZW5jaWVzIH0gZnJvbSAnLi9wYWNrYWdlLmpzb24nO1xuXG5jb25zdCB2ZW5kb3IgPSBbJ3JlYWN0JywgJ3JlYWN0LXJvdXRlci1kb20nLCAncmVhY3QtZG9tJ107XG5cbmZ1bmN0aW9uIHJlbmRlckNodW5rcyhkZXBzKSB7XG4gIGxldCBjaHVua3MgPSB7fTtcbiAgT2JqZWN0LmtleXMoZGVwcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgaWYgKHZlbmRvci5pbmNsdWRlcyhrZXkpKSByZXR1cm47XG4gICAgY2h1bmtzW2tleV0gPSBba2V5XTtcbiAgfSk7XG4gIHJldHVybiBjaHVua3M7XG59XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6ICcwLjAuMC4wJyxcbiAgICBwb3J0OiAzMDAwLFxuICB9LFxuICBiYXNlOiAnLycsXG4gIGJ1aWxkOiB7XG4gICAgc291cmNlbWFwOiBmYWxzZSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgdmVuZG9yOiB2ZW5kb3IsXG4gICAgICAgICAgLi4ucmVuZGVyQ2h1bmtzKGRlcGVuZGVuY2llcyksXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczogW1xuICAgICAgeyBmaW5kOiAnQC9jb21wb25lbnRzJywgcmVwbGFjZW1lbnQ6ICcvc3JjL2NvbXBvbmVudHMnIH0sXG4gICAgICB7IGZpbmQ6ICdAL2F0b21zJywgcmVwbGFjZW1lbnQ6ICcvc3JjL2NvbXBvbmVudHMvYXRvbXMnIH0sXG4gICAgICB7IGZpbmQ6ICdAL21vbGVjdWxlcycsIHJlcGxhY2VtZW50OiAnL3NyYy9jb21wb25lbnRzL21vbGVjdWxlcycgfSxcbiAgICAgIHsgZmluZDogJ0Avb3JnYW5pc21zJywgcmVwbGFjZW1lbnQ6ICcvc3JjL2NvbXBvbmVudHMvb3JnYW5pc21zJyB9LFxuICAgICAgeyBmaW5kOiAnQC90ZW1wbGF0ZXMnLCByZXBsYWNlbWVudDogJy9zcmMvY29tcG9uZW50cy90ZW1wbGF0ZXMnIH0sXG4gICAgICB7IGZpbmQ6ICdAL3NjcmVlbnMnLCByZXBsYWNlbWVudDogJy9zcmMvY29tcG9uZW50cy9zY3JlZW5zJyB9LFxuICAgICAgeyBmaW5kOiAnQC9hcGknLCByZXBsYWNlbWVudDogJy9zcmMvYXBpJyB9LFxuICAgICAgeyBmaW5kOiAnQC9hc3NldHMnLCByZXBsYWNlbWVudDogJy9zcmMvYXNzZXRzJyB9LFxuICAgICAgeyBmaW5kOiAnQC9yZWR1eCcsIHJlcGxhY2VtZW50OiAnL3NyYy9yZWR1eCcgfSxcbiAgICAgIHsgZmluZDogJ0Avc3R5bGVzJywgcmVwbGFjZW1lbnQ6ICcvc3JjL3N0eWxlcycgfSxcbiAgICAgIHsgZmluZDogJ0AvdXRpbHMnLCByZXBsYWNlbWVudDogJy9zcmMvdXRpbHMnIH0sXG4gICAgXSxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtVLFNBQVMsb0JBQW9CO0FBQy9WLE9BQU8sV0FBVzs7Ozs7Ozs7Ozs7OztBQUdsQixJQUFNLFNBQVMsQ0FBQyxTQUFTLG9CQUFvQixXQUFXO0FBRXhELFNBQVMsYUFBYSxNQUFNO0FBQzFCLE1BQUksU0FBUyxDQUFDO0FBQ2QsU0FBTyxLQUFLLElBQUksRUFBRSxRQUFRLENBQUMsUUFBUTtBQUNqQyxRQUFJLE9BQU8sU0FBUyxHQUFHO0FBQUc7QUFDMUIsV0FBTyxPQUFPLENBQUMsR0FBRztBQUFBLEVBQ3BCLENBQUM7QUFDRCxTQUFPO0FBQ1Q7QUFHQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLE1BQU07QUFBQSxFQUNOLE9BQU87QUFBQSxJQUNMLFdBQVc7QUFBQSxJQUNYLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGNBQWM7QUFBQSxVQUNaO0FBQUEsVUFDQSxHQUFHLGFBQWEsWUFBWTtBQUFBLFFBQzlCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxFQUFFLE1BQU0sZ0JBQWdCLGFBQWEsa0JBQWtCO0FBQUEsTUFDdkQsRUFBRSxNQUFNLFdBQVcsYUFBYSx3QkFBd0I7QUFBQSxNQUN4RCxFQUFFLE1BQU0sZUFBZSxhQUFhLDRCQUE0QjtBQUFBLE1BQ2hFLEVBQUUsTUFBTSxlQUFlLGFBQWEsNEJBQTRCO0FBQUEsTUFDaEUsRUFBRSxNQUFNLGVBQWUsYUFBYSw0QkFBNEI7QUFBQSxNQUNoRSxFQUFFLE1BQU0sYUFBYSxhQUFhLDBCQUEwQjtBQUFBLE1BQzVELEVBQUUsTUFBTSxTQUFTLGFBQWEsV0FBVztBQUFBLE1BQ3pDLEVBQUUsTUFBTSxZQUFZLGFBQWEsY0FBYztBQUFBLE1BQy9DLEVBQUUsTUFBTSxXQUFXLGFBQWEsYUFBYTtBQUFBLE1BQzdDLEVBQUUsTUFBTSxZQUFZLGFBQWEsY0FBYztBQUFBLE1BQy9DLEVBQUUsTUFBTSxXQUFXLGFBQWEsYUFBYTtBQUFBLElBQy9DO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==

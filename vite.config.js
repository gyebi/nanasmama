import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        products: resolve(__dirname, "products.html"),
        about: resolve(__dirname, "AboutUs.html"),
        cart: resolve(__dirname, "cart.html"),
        faq: resolve(__dirname, "faq.html"),
        favorites: resolve(__dirname, "favorites.html"),
        gifts: resolve(__dirname, "gifts.html")
      }
    }
  }
});

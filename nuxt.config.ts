// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  app: {
    head: {
      title: "Weather App",
      htmlAttrs: {
        lang: "en",
      },
    },
    pageTransition: {
      name: "slide",
      mode: "out-in",
    },
  },
  nitro: {
    preset: "vercel",
  },
  css: ["@/assets/main.scss"],
  modules: ["@nuxtjs/google-fonts", "@pinia/nuxt", "@nuxt/image"],
  googleFonts: {
    families: {
      "DM Sans": {
        wght: [300, 500, 600, 600, 700],
        ital: [600],
      },
      "Bricolage Grotesque": {
        wght: [700],
      },
    },
    display: "swap",
    preload: true,
  },
});

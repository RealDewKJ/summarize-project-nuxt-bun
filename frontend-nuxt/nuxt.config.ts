// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: ["@pinia/nuxt"],

  // CSS
  css: ["~/assets/css/main.css"],

  // Runtime config for API URL
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || "http://localhost:27801",
    },
  },

  // Development server configuration
  devServer: {
    port: 27802,
  },

  // Build configuration
  build: {
    transpile: [],
  },

  // TypeScript
  typescript: {
    strict: true,
  },

  // App configuration
  app: {
    head: {
      title: "สรุปการประชุมทีมพัฒนา",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content: "ระบบจัดการข้อมูลสรุปการประชุมประจำสัปดาห์ทีมพัฒนา",
        },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700&display=swap",
        },
      ],
    },
  },
});

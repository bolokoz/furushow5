import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  devtools: { enabled: true },

  build: {
    transpile: ['vuetify'],
  },

  modules: [
    // "@nuxt/ui",
    // "nuxt-icon",
    // "@nuxtjs/google-fonts",
    // "@nuxtjs/fontaine",
    "@nuxt/image",
    "@nuxt/content",
    "@nuxtjs/tailwindcss",
    // "@nuxthq/studio",
    "@vueuse/nuxt",
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  runtimeConfig: {
    public: {
      GITHUB_TOKEN: process.env.GITHUB_TOKEN
    }
  },

  // ui: {
  //   icons: ["heroicons", "lucide"],
  // },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      // htmlAttrs: {
      //   lang: "en",
      //   class: "h-full",
      // },
      // bodyAttrs: {
      //   class: "antialiased bg-gray-50 dark:bg-black min-h-screen",
      // },
      script: [
          // {src: "https://upload-widget.cloudinary.com/latest/global/all.js", type: 'text/javascript' }
      ]
    },
  },

  // googleFonts: {
  //   display: "swap",
  //   families: {
  //     Inter: [400, 500, 600, 700, 800, 900],
  //   },
  // },
  content: {
    highlight: {
      theme: "github-dark",
    },
  },

  compatibilityDate: "2024-08-14",
});
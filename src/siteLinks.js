const { Facebook, Instagram } = require("mdi-material-ui")

module.exports.nav = {
  internal: [
    {
      id: "home",
      label: {
        en: "Home",
        es: "Iniciar",
      },
      url: {
        en: "/",
        es: "/",
      },
    },
    {
      id: "the-dogs",
      label: {
        en: "Dogs",
        es: "Perros",
      },
      url: {
        en: "/dogs",
        es: "/perros",
      },
    },
    {
      dropdown: true,
      id: "how-to",
      label: {
        en: "Help",
        es: "Ayuda",
      },
      options: [
        {
          id: "adopt",
          label: {
            en: "Adopt",
            es: "Adoptar",
          },
          url: {
            en: "/adopt",
            es: "/adoptar",
          },
        },
        {
          id: "foster",
          label: {
            en: "Foster",
            es: "Acoger",
          },
          url: {
            en: "/foster",
            es: "/acoger",
          },
        },
        {
          id: "donate",
          label: {
            en: "Donate",
            es: "Donar",
          },
          url: {
            en: "/donate",
            es: "/donar",
          },
        },
        {
          id: "volunteer",
          label: {
            en: "Volunteer",
            es: "Voluntario",
          },
          url: {
            en: "/volunteer",
            es: "/voluntario",
          },
        },
      ],
    },
    {
      id: "about",
      label: {
        en: "About",
        es: "Conocenos",
      },
      url: {
        en: "/about",
        es: "/conocenos",
      },
    },
    {
      id: "contact",
      label: {
        en: "Contact",
        es: "Contáctenos",
      },
      url: {
        en: "/contact",
        es: "/contactenos",
      },
    },
  ],
  external: [
    {
      id: "facebook",
      Icon: Facebook,
      baseUrl: "https://facebook.com/",
      graphqlQuery: "facebook_id",
    },
    {
      id: "instagram",
      Icon: Instagram,
      baseUrl: "https://instagram.com/",
      graphqlQuery: "instagram_id",
    },
  ],
}

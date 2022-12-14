const style = require("./style")

module.exports = {
  siteMetadata: {
    title: `Fuerteventura Dog Rescue`,
    shortTitle: `FDR`,
    description: `A volunteer association that rescues, rehabilitates and rehomes abandoned and mistreated dogs in Fuerteventura.`,
    descriptions: {
      en: `Fuerteventura Dog Rescue is a volunteer association that rescues, rehabilitates and rehomes abandoned and mistreated dogs in Fuerteventura.`,
      es: `Fuerteventura Dog Rescue es una Asociación de voluntarios que rescata, rehabilita y acoge perros abandonados y maltratados en Fuerteventura.`,
    },
    supportedLanguages: [`en`, `es`],
    author: `@dandrewsdeveloper`,
    siteUrl: `https://fuerteventura-dog-rescue.netlify.app`,
  },
  plugins: [
    "gatsby-plugin-site-wrapper",
    `gatsby-plugin-mui-emotion`,
    "gatsby-plugin-redux",
    `gatsby-plugin-image`,
    `gatsby-plugin-netlify`,

    // NETLIFY CMS
    `gatsby-plugin-netlify-cms`,

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `dogs`,
        path: `${__dirname}/dogs`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,

    // MARKDOWN TRANSFORMER
    {
      resolve: `gatsby-transformer-remark`,
      // options: {
      //   plugins: [
      //     // gatsby-remark-relative-images must go before gatsby-remark-images
      //     {
      //       resolve: `gatsby-remark-relative-images-v2`,
      //       options: {
      //         staticFolderName: "content/site_images",
      //       },
      //       // options: {
      //       // [Optional] The root of "media_folder" in your config.yml
      //       // Defaults to "static"
      //       // staticFolderName: 'static',
      //       // [Optional] Include the following fields, use dot notation for nested fields
      //       // All fields are included by default
      //       // include: ['featured'],
      //       // [Optional] Exclude the following fields, use dot notation for nested fields
      //       // No fields are excluded by default
      //       // exclude: ['featured.skip'],
      //       // },
      //     },
      //     {
      //       resolve: `gatsby-remark-images`,
      //       options: {
      //         maxWidth: 500,
      //         linkImagesToOriginal: false,
      //         withWebp: true,
      //       },
      //     },
      //   ],
      // },
    },

    // REACT LEAFTLET (MAPS)
    {
      resolve: "gatsby-plugin-react-leaflet",
      options: {
        linkStyles: true, // (default: true) Enable/disable loading stylesheets via CDN
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `fuerteventura-dog-rescue`,
        short_name: `fdr`,
        start_url: `/`,
        background_color: style.palette.main,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        theme_color: style.palette.main,
        display: `minimal-ui`,
        icon: `src/images/fdr-logo.png`, // This path is relative to the root of the site.
      },
    },
  ],
}

const { createFilePath } = require("gatsby-source-filesystem")
const path = require("path")
const { nav } = require("./src/siteLinks")
const config = require("./gatsby-config")
const { DogService } = require("mdi-material-ui")
const { node } = require("prop-types")

// CREATING A SLUG HOOK
exports.onCreateNode = async ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    await createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

// CREATE PAGES
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  config.siteMetadata.supportedLanguages.map(async (language) => {
    const dogsQuery = await graphql(`
      {
        allFile(
          filter: {
            sourceInstanceName: { eq: "dogs" }
            extension: { eq: "md" }
          }
        ) {
          edges {
            node {
              childMarkdownRemark {
                id
                fields {
                  slug
                }
                frontmatter {
                  available
                  photos {
                    photo {
                      childImageSharp {
                        id
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `)
    if (dogsQuery.errors) {
      reporter.panicOnBuild("There was a problem with dogsQuery")
      return
    }
    const dogs = dogsQuery.data.allFile.edges.filter(
      ({ node }) => node.childMarkdownRemark.frontmatter.available === "Yes"
    )
    dogs.forEach(({ node }) => {
      return createPage({
        path:
          language +
          nav.internal.filter((j) => j.id === "the-dogs")[0].url[language] +
          node.childMarkdownRemark.fields.slug,
        component: path.resolve("src/templates/dog.js"),
        context: {
          id: node.childMarkdownRemark.id,
          language,
          ogImgId:
            node.childMarkdownRemark.frontmatter.photos[0].photo.childImageSharp
              .id,
        },
      })
    })
    nav.internal.map((link) => {
      if (!link.dropdown) {
        return createPage({
          path: language + link.url[language],
          component: path.resolve("src/templates/temp.js"),
          context: { id: link.id, language, title: link.label[language] },
        })
      } else {
        link.options.map((dropLink) =>
          createPage({
            path: language + dropLink.url[language],
            component: path.resolve("src/templates/temp.js"),
            context: {
              id: dropLink.id,
              language,
              title: dropLink.label[language],
              staticPage: true,
            },
          })
        )
      }
    })
    createPage({
      path: language + `/`,
      component: path.resolve("src/templates/home.js"),
      context: {
        language,
      },
    })
    createPage({
      path:
        language +
        nav.internal.filter((i) => i.id === "the-dogs")[0].url[language],
      component: path.resolve("src/templates/the-dogs.js"),
      context: {
        language,
      },
    })
    createPage({
      path:
        language +
        nav.internal
          .filter((i) => i.id === "how-to")[0]
          .options.filter((i) => i.id === "adopt")[0].url[language],
      component: path.resolve("src/templates/adopt.js"),
      context: {
        language,
      },
    })
    createPage({
      path:
        language +
        nav.internal
          .filter((i) => i.id === "how-to")[0]
          .options.filter((i) => i.id === "foster")[0].url[language],
      component: path.resolve("src/templates/foster.js"),
      context: {
        language,
      },
    })
    createPage({
      path:
        language +
        nav.internal
          .filter((i) => i.id === "how-to")[0]
          .options.filter((i) => i.id === "donate")[0].url[language],
      component: path.resolve("src/templates/donate.js"),
      context: {
        language,
      },
    })
    createPage({
      path:
        language +
        nav.internal
          .filter((i) => i.id === "how-to")[0]
          .options.filter((i) => i.id === "volunteer")[0].url[language],
      component: path.resolve("src/templates/volunteer.js"),
      context: {
        language,
      },
    })
    createPage({
      path:
        language +
        nav.internal.filter((i) => i.id === "about")[0].url[language],
      component: path.resolve("src/templates/about.js"),
      context: {
        language,
      },
    })
    createPage({
      path:
        language +
        nav.internal.filter((i) => i.id === "contact")[0].url[language],
      component: path.resolve("src/templates/contact.js"),
      context: {
        language,
      },
    })
  })
}

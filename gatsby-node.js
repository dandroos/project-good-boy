// const { createFilePath } = require("gatsby-source-filesystem")
// const path = require("path")

// CREATING A SLUG HOOK
// exports.onCreateNode = async ({ node, actions, getNode }) => {
//   const { createNodeField } = actions

//   if (node.internal.type === `MarkdownRemark`) {
//     const value = createFilePath({ node, getNode })
//     createNodeField({
//       name: `slug`,
//       node,
//       value,
//     })
//   }
// }

// CREATE PAGES
// exports.createPages = async ({ actions }) => {
//   const { createPage } = actions

//   createPage({
//     path: "/",
//     component: path.resolve("src/templates/index.js"),
//     context: {},
//   })
// }

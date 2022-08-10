import Layout from "./src/components/Layout"
import React from "react"

export const wrapPageElement = ({ props, element }) => {
  return <Layout {...props}>{element}</Layout>
}

export const onRenderBody = ({
  pathname,
  setHtmlAttributes,
  getHtmlAttributes,
  loadPageDataSync,
}) => {
  // console.log(pathname)
  const {
    result: { pageContext },
  } = loadPageDataSync(pathname)
  if (pathname === "/") {
    setHtmlAttributes({ lang: "es" })
  } else {
    setHtmlAttributes({ lang: pageContext.language })
  }
}
// export const onRenderBody = (
//   { setHeadComponents, setHtmlAttributes, setBodyAttributes },
//   pluginOptions
// ) => {
//   const helmet = Helmet.renderStatic()
//   setHtmlAttributes(helmet.htmlAttributes.toComponent())
//   setBodyAttributes(helmet.bodyAttributes.toComponent())
//   setHeadComponents([
//     helmet.title.toComponent(),
//     helmet.link.toComponent(),
//     helmet.meta.toComponent(),
//     helmet.noscript.toComponent(),
//     helmet.script.toComponent(),
//     helmet.style.toComponent(),
//   ])
// }

// export const onPreRenderHTML = ({
//   getHeadComponents,
//   replaceHeadComponents,
// }) => {
//   console.log(`bellend`)
//   const headComponents = getHeadComponents()
//   console.log(headComponents)
//   headComponents.sort((a, b) => {
//     if (a.props && a.props["data-react-helmet"]) {
//       return 0
//     }
//     return 1
//   })
//   replaceHeadComponents(headComponents)
// }

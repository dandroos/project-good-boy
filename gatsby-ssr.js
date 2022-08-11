import Layout from "./src/components/Layout"
import React from "react"

export const wrapPageElement = ({ props, element }) => {
  return <Layout {...props}>{element}</Layout>
}

export const onRenderBody = ({
  pathname,
  setHtmlAttributes,
  loadPageDataSync,
}) => {
  if (typeof loadPageDataSync === "function") {
    const {
      result: { pageContext },
    } = loadPageDataSync(pathname)
    if (pathname === "/") {
      setHtmlAttributes({ lang: "es" })
    } else {
      setHtmlAttributes({ lang: pageContext.language })
    }
  }
}

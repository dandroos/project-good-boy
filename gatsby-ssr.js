import Layout from "./src/components/Layout"
import React from "react"
import { typography } from "./style"

export const wrapPageElement = ({ props, element }) => {
  return <Layout {...props}>{element}</Layout>
}

export const onRenderBody = ({
  pathname,
  setHtmlAttributes,
  setHeadComponents,
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
  setHeadComponents([
    <link rel="preconnect" href="https://fonts.googleapis.com" />,
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      crossOrigin="true"
    />,
    <link
      href={`https://fonts.googleapis.com/css2?family=${typography.fontFamily
        .split(" ")
        .join("+")}:wght@${typography.fontWeights.join(";")}&display=swap`}
      rel="stylesheet"
    ></link>,
  ])
}

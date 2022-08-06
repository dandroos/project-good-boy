import Layout from "./src/components/Layout"
import React from "react"

export const wrapPageElement = ({ props, element }) => {
  return <Layout {...props}>{element}</Layout>
}

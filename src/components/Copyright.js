import { graphql, useStaticQuery } from "gatsby"

import React from "react"
import { Typography } from "@mui/material"
import { connect } from "react-redux"

const Copyright = ({ language }) => {
  const { site, file } = useStaticQuery(
    graphql`
      {
        site: site {
          siteMetadata {
            title
          }
        }
        file: file(
          sourceInstanceName: { eq: "content" }
          name: { eq: "copyright" }
        ) {
          childMarkdownRemark {
            frontmatter {
              all_content {
                en
                es
              }
            }
          }
        }
      }
    `
  )
  const getCopyrightYear = () => {
    const currYear = new Date().getFullYear()
    if (currYear > 2022) {
      return `2022 - ${currYear}`
    } else {
      return 2022
    }
  }
  return (
    <Typography variant="caption" display="block">
      {file.childMarkdownRemark.frontmatter.all_content[language]} &copy;{" "}
      {getCopyrightYear()} {site.siteMetadata.title}
    </Typography>
  )
}

const stp = (s) => ({
  language: s.language,
})

export default connect(stp)(Copyright)

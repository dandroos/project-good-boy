import { graphql, useStaticQuery } from "gatsby"

import React from "react"
import { Typography } from "@mui/material"
import { connect } from "react-redux"

const Copyright = ({ language }) => {
  const { site, file, declaration } = useStaticQuery(
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
        declaration: file(
          sourceInstanceName: { eq: "content" }
          extension: { eq: "md" }
          name: { eq: "legal" }
        ) {
          childMarkdownRemark {
            frontmatter {
              charity_declaration {
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
    <>
      <Typography variant="caption" display="block" gutterBottom>
        {file.childMarkdownRemark.frontmatter.all_content[language]} &copy;{" "}
        {getCopyrightYear()} {site.siteMetadata.title}
      </Typography>

      <Typography variant="caption" display="block">
        {
          declaration.childMarkdownRemark.frontmatter.charity_declaration[
            language
          ]
        }
      </Typography>
    </>
  )
}

const stp = (s) => ({
  language: s.language,
})

export default connect(stp)(Copyright)

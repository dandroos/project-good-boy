import { Link, Typography } from "@mui/material"
import React, { useEffect } from "react"
import { setLanguage, setLocationId } from "../redux/actions"

import PageWrapper from "../components/PageWrapper"
import ReactMarkdown from "react-markdown"
import { connect } from "react-redux"
import { graphql } from "gatsby"
import { nav } from "../siteLinks"

const Adopt = ({ dispatch, pageContext, data }) => {
  const { language } = pageContext

  useEffect(() => {
    dispatch(setLocationId({ id: "adopt", staticPage: true }))
    dispatch(setLanguage(language))
    //eslint-disable-next-line
  }, [])

  return (
    <PageWrapper
      title={
        nav.internal
          .filter((i) => i.id === "how-to")[0]
          .options.filter((i) => i.id === "adopt")[0].label[language]
      }
      subtitle={
        data.file.childMarkdownRemark.frontmatter.heading_banner.intro_text[
          language
        ]
      }
      bgImage={
        data.file.childMarkdownRemark.frontmatter.heading_banner
          .background_image
      }
      language={language}
    >
      <ReactMarkdown
        components={{
          h1: ({ children }) => {
            return (
              <Typography variant="h4" gutterBottom>
                {children}
              </Typography>
            )
          },
          a: ({ href, children }) => (
            <Link href={href} target="_blank">
              {children}
            </Link>
          ),
          p: ({ children }) => {
            return <Typography paragraph>{children}</Typography>
          },
        }}
      >
        {data.file.childMarkdownRemark.frontmatter.content[language]}
      </ReactMarkdown>
    </PageWrapper>
  )
}

export default connect()(Adopt)

export const query = graphql`
  {
    file(
      sourceInstanceName: { eq: "content" }
      extension: { eq: "md" }
      name: { eq: "adopt" }
    ) {
      childMarkdownRemark {
        frontmatter {
          heading_banner {
            background_image {
              childImageSharp {
                gatsbyImageData(
                  quality: 85
                  placeholder: BLURRED
                  transformOptions: { grayscale: true }
                )
              }
            }
            intro_text {
              en
              es
            }
          }
          content {
            en
            es
          }
        }
      }
    }
  }
`

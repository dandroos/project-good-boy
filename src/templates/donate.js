import { Box, Button, Link, Typography } from "@mui/material"
import React, { useEffect } from "react"
import { setLanguage, setLocationId } from "../redux/actions"

import BankDetails from "../components/BankDetails"
import HeadComponent from "../components/Head"
import PageWrapper from "../components/PageWrapper"
import PayPalButton from "../components/PayPalButton"
import ReactMarkdown from "react-markdown"
import TeamingLogo from "../components/TeamingLogo"
import { connect } from "react-redux"
import { graphql } from "gatsby"
import { nav } from "../siteLinks"

const Donate = ({ dispatch, pageContext, data }) => {
  const { language } = pageContext

  useEffect(() => {
    dispatch(setLocationId({ id: "donate", staticPage: true }))
    dispatch(setLanguage(language))
    //eslint-disable-next-line
  }, [])

  return (
    <PageWrapper
      title={
        nav.internal
          .filter((i) => i.id === "how-to")[0]
          .options.filter((i) => i.id === "donate")[0].label[language]
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
            if (children[0] === "[[paypal]]") {
              return (
                <PayPalButton
                  btnText={
                    data.file.childMarkdownRemark.frontmatter.paypal_btn_text[
                      language
                    ]
                  }
                />
              )
            } else if (children[0] === "[[teaming]]") {
              return (
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  href={
                    data.file.childMarkdownRemark.frontmatter.teaming_btn_link
                  }
                  target="_blank"
                  startIcon={<TeamingLogo />}
                  sx={{ mb: 4 }}
                >
                  {
                    data.file.childMarkdownRemark.frontmatter.teaming_btn_text[
                      language
                    ]
                  }
                </Button>
              )
            } else if (children[0] === "[[bank_transfer]]") {
              return (
                <Box mb={4}>
                  <BankDetails language={language} />
                </Box>
              )
            }
            return <Typography paragraph>{children}</Typography>
          },
        }}
      >
        {data.file.childMarkdownRemark.frontmatter.content[language]}
      </ReactMarkdown>
    </PageWrapper>
  )
}

export default connect()(Donate)

export const Head = ({ pageContext }) => (
  <HeadComponent
    lang={pageContext.language}
    title={
      nav.internal
        .filter((i) => i.id === "how-to")[0]
        .options.filter((i) => i.id === "donate")[0].label[pageContext.language]
    }
  />
)
export const query = graphql`
  {
    file(
      sourceInstanceName: { eq: "content" }
      extension: { eq: "md" }
      name: { eq: "donate" }
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
          paypal_btn_text {
            en
            es
          }
          teaming_btn_text {
            en
            es
          }
          teaming_btn_link
        }
      }
    }
  }
`

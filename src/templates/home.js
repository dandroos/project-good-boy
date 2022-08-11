import { Box, Button, Container, Typography, useTheme } from "@mui/material"
import { Link, graphql } from "gatsby"
import React, { useEffect } from "react"
import { setLanguage, setLocationId } from "../redux/actions"

import { Dog } from "mdi-material-ui"
import HeadComponent from "../components/Head"
import HeroSlideshow from "../components/HeroSlideshow"
import { connect } from "react-redux"
import { motion } from "framer-motion"
import { nav } from "../siteLinks"

const HomePage = ({ dispatch, pageContext, data }) => {
  const { language } = pageContext
  useEffect(() => {
    dispatch(setLocationId({ id: "home" }))
    dispatch(setLanguage(language))
    //eslint-disable-next-line
  }, [])
  const theme = useTheme()
  return (
    <>
      <Box height="100vh" width="100%" position="relative">
        <HeroSlideshow />
        <Box
          position="absolute"
          component={motion.div}
          initial={{ opacity: 0, transform: `translateY(-1000px)` }}
          animate={{ opacity: 1, transform: `translateY(0px)` }}
          transition={{ type: "tween" }}
          bottom={0}
          right={0}
          left={0}
          top={0}
          pt={8}
          display="flex"
          alignItems="center"
          color="common.white"
          sx={{
            background: `linear-gradient(to top, ${theme.palette.primary.main}bb, ${theme.palette.primary.main}ee)`,
          }}
        >
          <Container
            component={motion.div}
            initial={{ opacity: 0, transform: `translateY(1000px)` }}
            animate={{ opacity: 1, transform: `translateY(0px)` }}
            transition={{ delay: 0.5 }}
          >
            <Typography variant="h2">
              {
                data.content.childMarkdownRemark.frontmatter.homepage_heading[
                  language
                ]
              }
            </Typography>
            <Typography variant="lead" display="block" gutterBottom>
              {
                data.content.childMarkdownRemark.frontmatter.homepage_lead[
                  language
                ]
              }
            </Typography>
            <Button
              size="large"
              color="secondary"
              variant="contained"
              endIcon={<Dog />}
              component={Link}
              to={(() =>
                `/${
                  language +
                  nav.internal.filter((i) => i.id === "the-dogs")[0].url[
                    language
                  ]
                }`)()}
            >
              {
                data.content.childMarkdownRemark.frontmatter.homepage_cta[
                  language
                ]
              }
            </Button>
          </Container>
        </Box>
      </Box>
    </>
  )
}

export default connect()(HomePage)

export const Head = ({ pageContext }) => (
  <HeadComponent lang={pageContext.language} />
)

export const query = graphql`
  {
    content: file(sourceInstanceName: { eq: "content" }, name: { eq: "home" }) {
      childMarkdownRemark {
        frontmatter {
          homepage_heading {
            en
            es
          }
          homepage_lead {
            en
            es
          }
          homepage_cta {
            en
            es
          }
        }
      }
    }
  }
`

import "react-responsive-carousel/lib/styles/carousel.min.css"

import { Box, Button, Container, Typography, useTheme } from "@mui/material"
import { Link, graphql } from "gatsby"
import React, { useEffect } from "react"
import { setLanguage, setLocationId } from "../redux/actions"

import BackgroundImage from "gatsby-background-image"
import { Carousel } from "react-responsive-carousel"
import { Dog } from "mdi-material-ui"
import Seo from "../components/seo"
import { connect } from "react-redux"
import { convertToBgImage } from "gbimage-bridge"
import { getImage } from "gatsby-plugin-image"
import { motion } from "framer-motion"
import { nav } from "../siteLinks"

const HomePage = ({ dispatch, pageContext, isLandscape, language, data }) => {
  useEffect(() => {
    dispatch(setLocationId({ id: "home" }))
    dispatch(setLanguage(pageContext.language))
    //eslint-disable-next-line
  }, [])
  const theme = useTheme()
  return (
    <>
      <Seo title="" />
      <Box height="100vh" width="100%" position="relative">
        <Carousel
          autoPlay
          infiniteLoop
          showArrows={false}
          showIndicators={false}
          showThumbs={false}
          showStatus={false}
          interval={5000}
        >
          {isLandscape
            ? data.content.childMarkdownRemark.frontmatter.homepage_images_landscape.map(
                (i, ind) => {
                  const bgImg = convertToBgImage(getImage(i.image))

                  return (
                    <Box
                      key={ind}
                      position="absolute"
                      height="100vh"
                      width="100%"
                      zIndex={5000}
                      component={BackgroundImage}
                      {...bgImg}
                    />
                  )
                }
              )
            : data.content.childMarkdownRemark.frontmatter.homepage_images_portrait.map(
                (i, ind) => {
                  const bgImg = convertToBgImage(getImage(i.image))

                  return (
                    <Box
                      key={ind}
                      position="absolute"
                      height="100vh"
                      width="100%"
                      zIndex={5000}
                      component={BackgroundImage}
                      {...bgImg}
                    />
                  )
                }
              )}
        </Carousel>
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
                  pageContext.language +
                  nav.internal.filter((i) => i.id === "the-dogs")[0].url[
                    pageContext.language
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

const stp = (s) => ({
  isLandscape: s.isLandscape,
  language: s.language,
})

export default connect(stp)(HomePage)

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
          homepage_images_landscape {
            alt
            image {
              childImageSharp {
                gatsbyImageData(
                  quality: 75
                  placeholder: BLURRED
                  transformOptions: { grayscale: true }
                )
              }
            }
          }
          homepage_images_portrait {
            alt
            image {
              childImageSharp {
                gatsbyImageData(
                  quality: 75
                  placeholder: BLURRED
                  transformOptions: { grayscale: true }
                )
              }
            }
          }
        }
      }
    }
  }
`

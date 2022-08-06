import "react-responsive-carousel/lib/styles/carousel.min.css"

import { graphql, useStaticQuery } from "gatsby"

import BackgroundImage from "gatsby-background-image"
import { Box } from "@mui/material"
import { Carousel } from "react-responsive-carousel"
import React from "react"
import { connect } from "react-redux"
import { convertToBgImage } from "gbimage-bridge"
import { getImage } from "gatsby-plugin-image"

const HeroSlideshow = ({ isLandscape }) => {
  const { homepage_images_landscape, homepage_images_portrait } =
    useStaticQuery(graphql`
      {
        file(sourceInstanceName: { eq: "content" }, name: { eq: "home" }) {
          childMarkdownRemark {
            frontmatter {
              homepage_images_landscape {
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
    `).file.childMarkdownRemark.frontmatter
  return (
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
        ? homepage_images_landscape.map((i, ind) => {
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
          })
        : homepage_images_portrait.map((i, ind) => {
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
          })}
    </Carousel>
  )
}

const stp = (s) => ({
  isLandscape: s.isLandscape,
})

export default connect(stp)(HeroSlideshow)

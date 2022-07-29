import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Fab,
  Grid,
  Typography,
  useTheme,
} from "@mui/material"
import { Link, graphql } from "gatsby"
import { setLanguage, setLocationId } from "../redux/actions"

import BackgroundImage from "gatsby-background-image"
import { DDS } from "../components/DogDataSanitizer"
import { InformationVariant } from "mdi-material-ui"
import PageWrapper from "../components/PageWrapper"
import React from "react"
import { connect } from "react-redux"
import { convertToBgImage } from "gbimage-bridge"
import { getImage } from "gatsby-plugin-image"
import { nav } from "../siteLinks"
import { useEffect } from "react"

const TheDogs = ({ dispatch, data, pageContext }) => {
  useEffect(() => {
    dispatch(setLanguage(pageContext.language))
    dispatch(setLocationId({ id: "the-dogs" }))
    //eslint-disable-next-line
  }, [])
  const theme = useTheme()
  return (
    <>
      <PageWrapper
        title={
          nav.internal.filter((i) => i.id === "the-dogs")[0].label[
            pageContext.language
          ]
        }
        subtitle={
          data.content.childMarkdownRemark.frontmatter.heading_banner
            .intro_text[pageContext.language]
        }
        bgImage={
          data.content.childMarkdownRemark.frontmatter.heading_banner
            .background_image
        }
      >
        <Grid container spacing={2}>
          {data.dogs.edges.map(({ node }) => {
            const img = convertToBgImage(
              getImage(node.childMarkdownRemark.frontmatter.photos[0].photo)
            )
            return (
              <Grid
                key={node.childMarkdownRemark.fields.slug}
                item
                xs={12}
                md={6}
              >
                <Card
                  elevation={2}
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                    color: theme.palette.common.white,
                  }}
                >
                  <CardActionArea
                    component={Link}
                    to={`/${
                      pageContext.language +
                      nav.internal.filter((i) => i.id === "the-dogs")[0].url[
                        pageContext.language
                      ] +
                      node.childMarkdownRemark.fields.slug
                    }`}
                    sx={{
                      position: "relative",
                    }}
                  >
                    <Fab
                      size="small"
                      color="secondary"
                      sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        zIndex: 500,
                      }}
                    >
                      <InformationVariant />
                    </Fab>
                    <CardMedia
                      component={BackgroundImage}
                      sx={{ height: 400 }}
                      {...img}
                      alt={
                        node.childMarkdownRemark.frontmatter.breed[
                          pageContext.language
                        ]
                      }
                    />
                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h4">
                        {node.childMarkdownRemark.frontmatter.name}
                      </Typography>
                      <Typography variant="caption">
                        {DDS.getSex({
                          input: node.childMarkdownRemark.frontmatter.sex,
                          language: pageContext.language,
                        })}
                        <Typography
                          color="secondary.dark"
                          display="inline"
                          sx={{ mx: 1 }}
                        >
                          |
                        </Typography>
                        {DDS.getAge({
                          dob: node.childMarkdownRemark.frontmatter.dob,
                          language: pageContext.language,
                        })}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            )
          })}
        </Grid>
      </PageWrapper>
    </>
  )
}

export default connect()(TheDogs)

export const query = graphql`
  {
    dogs: allFile(
      filter: {
        sourceInstanceName: { eq: "dogs" }
        extension: { eq: "md" }
        name: { eq: "index" }
      }
      sort: {
        fields: childMarkdownRemark___frontmatter___date_came_in
        order: ASC
      }
    ) {
      edges {
        node {
          childMarkdownRemark {
            fields {
              slug
            }
            frontmatter {
              photos {
                photo {
                  childImageSharp {
                    gatsbyImageData(quality: 90, placeholder: BLURRED)
                  }
                }
              }
              breed {
                en
                es
              }
              date_came_in
              description {
                en
                es
              }
              dob
              name
              sex
              sociability {
                children
                cats
                dogs
              }
            }
          }
        }
      }
    }
    content: file(
      sourceInstanceName: { eq: "content" }
      extension: { eq: "md" }
      name: { eq: "the-dogs" }
    ) {
      childMarkdownRemark {
        frontmatter {
          heading_banner {
            intro_text {
              en
              es
            }
            background_image {
              childImageSharp {
                gatsbyImageData(
                  quality: 85
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

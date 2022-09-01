import { setLanguage, setLocationId } from "../redux/actions"

import { DDS } from "../components/DogDataSanitizer"
import DogCard from "../components/DogCard"
import { Grid } from "@mui/material"
import HeadComponent from "../components/Head"
import PageWrapper from "../components/PageWrapper"
import React from "react"
import ShareBar from "../components/ShareBar"
import { connect } from "react-redux"
import { convertToBgImage } from "gbimage-bridge"
import { getImage } from "gatsby-plugin-image"
import { graphql } from "gatsby"
import { nav } from "../siteLinks"
import { useEffect } from "react"

const TheDogs = ({ dispatch, data, pageContext }) => {
  const { language } = pageContext
  useEffect(() => {
    dispatch(setLanguage(language))
    dispatch(setLocationId({ id: "the-dogs" }))
    //eslint-disable-next-line
  }, [])
  return (
    <>
      <PageWrapper
        noCta
        title={
          nav.internal.filter((i) => i.id === "the-dogs")[0].label[language]
        }
        subtitle={
          data.content.childMarkdownRemark.frontmatter.heading_banner
            .intro_text[language]
        }
        bgImage={
          data.content.childMarkdownRemark.frontmatter.heading_banner
            .background_image
        }
        language={language}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ShareBar noDivider />
          </Grid>
          {data.dogs.edges.map(({ node }, ind) => {
            if (node.childMarkdownRemark.frontmatter.available === "Yes") {
              const img = convertToBgImage(
                getImage(node.childMarkdownRemark.frontmatter.photos[0].photo)
              )
              return (
                <DogCard
                  key={ind}
                  name={node.childMarkdownRemark.frontmatter.name}
                  breed={node.childMarkdownRemark.frontmatter.breed}
                  age={DDS.getAge({
                    dob: node.childMarkdownRemark.frontmatter.dob,
                    language,
                  })}
                  img={img}
                  slug={node.childMarkdownRemark.fields.slug}
                  sex={DDS.getSex({
                    input: node.childMarkdownRemark.frontmatter.sex,
                    language,
                  })}
                />
              )
            } else {
              return null
            }
          })}
        </Grid>
      </PageWrapper>
    </>
  )
}

export default connect()(TheDogs)

export const Head = ({ pageContext }) => (
  <HeadComponent
    lang={pageContext.language}
    title={
      nav.internal.filter((i) => i.id === "the-dogs")[0].label[
        pageContext.language
      ]
    }
  />
)

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
              available
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

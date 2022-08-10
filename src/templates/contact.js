import { Button, Divider, Grid, ListItemText, Typography } from "@mui/material"
import { Email, FacebookMessenger } from "mdi-material-ui"
import React, { useEffect } from "react"
import { setLanguage, setLocationId } from "../redux/actions"

import CommonQueries from "../components/CommonQueries"
import ContactForm from "../components/ContactForm"
import HeadComponent from "../components/Head"
import PageWrapper from "../components/PageWrapper"
import { connect } from "react-redux"
import { graphql } from "gatsby"
import { nav } from "../siteLinks"

const Contact = ({ data, dispatch, pageContext }) => {
  const { language } = pageContext

  useEffect(() => {
    dispatch(setLocationId({ id: "contact" }))
    dispatch(setLanguage(language))

    //eslint-disable-next-line
  }, [])

  const { contact_button_intro, heading_banner } =
    data.page.childMarkdownRemark.frontmatter

  const { facebook_username, email_address } =
    data.contact_and_social.childMarkdownRemark.frontmatter

  const ContactButton = ({ Icon, text, url }) => (
    <Button
      color="secondary"
      fullWidth
      variant="contained"
      sx={{
        pt: 2,
        display: "flex",
        flexDirection: "column",
      }}
      href={url}
      target="_blank"
      size="large"
    >
      <Icon />
      <ListItemText
        primaryTypographyProps={{ variant: "button" }}
        primary={text}
      />
    </Button>
  )

  const title = nav.internal.filter((i) => i.id === "contact")[0].label[
    language
  ]
  return (
    <>
      <PageWrapper
        noCta
        title={title}
        subtitle={heading_banner.intro_text[language]}
        bgImage={heading_banner.background_image}
        language={language}
      >
        <CommonQueries language={language} />
        <Typography variant="lead" gutterBottom>
          {contact_button_intro[language]}
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <ContactButton
              text="Messenger"
              Icon={FacebookMessenger}
              url={`https://m.me/${facebook_username}`}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ContactButton
              text="Email"
              Icon={Email}
              url={`mailto:${email_address}`}
            />
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <ContactForm language={language} />
      </PageWrapper>
    </>
  )
}

export default connect()(Contact)

export const Head = ({ pageContext }) => (
  <HeadComponent
    lang={pageContext.language}
    title={
      nav.internal.filter((i) => i.id === "contact")[0].label[
        pageContext.language
      ]
    }
  />
)

export const query = graphql`
  {
    page: file(
      sourceInstanceName: { eq: "content" }
      extension: { eq: "md" }
      name: { eq: "contact" }
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
          contact_button_intro {
            en
            es
          }
        }
      }
    }
    contact_and_social: file(
      sourceInstanceName: { eq: "content" }
      extension: { eq: "md" }
      name: { eq: "contact_and_social" }
    ) {
      childMarkdownRemark {
        frontmatter {
          email_address
          facebook_username
        }
      }
    }
  }
`

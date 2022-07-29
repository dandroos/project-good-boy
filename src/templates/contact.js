import {
  Alert,
  AlertTitle,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material"
import { CircleSmall, Email, FacebookMessenger, Send } from "mdi-material-ui"
import React, { useEffect, useState } from "react"
import { setLanguage, setLocationId } from "../redux/actions"

import PageWrapper from "../components/PageWrapper"
import Seo from "../components/seo"
import { connect } from "react-redux"
import { graphql } from "gatsby"
import { nav } from "../siteLinks"

const Contact = ({ data, dispatch, isMobile, pageContext }) => {
  const { language } = pageContext

  useEffect(() => {
    dispatch(setLocationId({ id: "contact" }))
    dispatch(setLanguage(language))

    //eslint-disable-next-line
  }, [])

  const [fields, setFields] = useState({
    name: "",
    email: "",
    tel: "",
    msg: "",
  })

  const handleChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const encode = (data) => {
      return Object.keys(data)
        .map(
          (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
        )
        .join("&")
    }

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "contact",
        ...fields,
      }),
    }).then(() => {
      // setToast({
      //   open: true,
      //   msg: data.contact_us_contact_form_message_sent[
      //     `contact_us_contact_form_message_sent_${language}`
      //   ],
      //   severity: "success",
      // })
      setFields({
        name: "",
        email: "",
        phone: "",
        message: "",
      })
    })
    // .catch(() =>
    // setToast({
    //   open: true,
    //   msg: data.contact_us_contact_form_message_failed[
    //     `contact_us_contact_form_message_failed_${language}`
    //   ],
    //   severity: "error",
    // })
    // )
  }

  const {
    contact_warning,
    common_queries,
    contact_button_intro,
    contact_and_social,
    contact_form_intro,
    contact_form_fields,
    heading_banner,
  } = data.file.childMarkdownRemark.frontmatter

  const { name, email, phone, message, send } = contact_form_fields

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

  const CommonContact = ({ primary, secondary }) => (
    <ListItem disableGutters>
      {!isMobile && (
        <ListItemIcon>
          <CircleSmall />
        </ListItemIcon>
      )}
      <ListItemText primary={primary} secondary={secondary} />
    </ListItem>
  )

  const title = nav.internal.filter((i) => i.id === "contact")[0].label[
    language
  ]
  return (
    <>
      <Seo title={title} />
      <PageWrapper
        title={title}
        subtitle={heading_banner.intro_text[language]}
        bgImage={heading_banner.background_image}
      >
        <Alert variant="outlined" severity="error" sx={{ mb: 2 }}>
          <AlertTitle>{contact_warning.heading[language]}</AlertTitle>
          <Typography>{contact_warning.text[language]}</Typography>
          <List dense>
            {common_queries.map((i) => (
              <CommonContact
                primary={i.query[language]}
                secondary={i.response[language]}
              />
            ))}
          </List>
        </Alert>
        <Typography variant="lead" gutterBottom>
          {contact_button_intro[language]}
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <ContactButton
              text="Messenger"
              Icon={FacebookMessenger}
              url={`https://m.me/${contact_and_social.facebook_username}`}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ContactButton
              text="Email"
              Icon={Email}
              url={`mailto:${contact_and_social.email_address}`}
            />
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        <form
          name="contact"
          action="#"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
        >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography gutterBottom>
                {contact_form_intro[language]}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                name="name"
                label={name[language]}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                name="email"
                type="email"
                label={email[language]}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                name="tel"
                type="tel"
                label={phone[language]}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="msg"
                label={message[language]}
                minRows={3}
                multiline
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                fullWidth
                endIcon={<Send />}
              >
                {send[language]}
              </Button>
            </Grid>
          </Grid>
        </form>
      </PageWrapper>
    </>
  )
}

const stp = (s) => ({ isMobile: s.isMobile })

export default connect(stp)(Contact)

export const query = graphql`
  {
    file(
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
          contact_form_fields {
            email {
              en
              es
            }
            message {
              en
              es
            }
            name {
              en
              es
            }
            phone {
              en
              es
            }
            send {
              en
              es
            }
          }
          contact_form_intro {
            en
            es
          }
          contact_warning {
            heading {
              en
              es
            }
            text {
              en
              es
            }
          }
          common_queries {
            query {
              en
              es
            }
            response {
              en
              es
            }
          }
          contact_and_social {
            email_address
            facebook_username
            instagram_username
          }
        }
      }
    }
  }
`

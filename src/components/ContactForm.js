import { Button, Grid, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"

import { Send } from "mdi-material-ui"
import { connect } from "react-redux"
import { setToast } from "../redux/actions"

const ContactForm = ({ dispatch, language }) => {
  const {
    contact_form_fields,
    contact_form_intro,
    contact_form_notifications,
  } = useStaticQuery(graphql`
    {
      file(
        sourceInstanceName: { eq: "content" }
        extension: { eq: "md" }
        name: { eq: "contact" }
      ) {
        childMarkdownRemark {
          frontmatter {
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
            contact_form_notifications {
              message_sent {
                en
                es
              }
              message_not_sent {
                en
                es
              }
            }
          }
        }
      }
    }
  `).file.childMarkdownRemark.frontmatter

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

    const encode = (formData) => {
      return Object.keys(formData)
        .map(
          (key) =>
            encodeURIComponent(key) + "=" + encodeURIComponent(formData[key])
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
    })
      .then(() => {
        dispatch(
          setToast({
            open: true,
            msg: contact_form_notifications.message_sent[language],
            severity: "success",
          })
        )
        setFields({
          name: "",
          email: "",
          phone: "",
          message: "",
        })
      })
      .catch(() =>
        dispatch(
          setToast({
            open: true,
            msg: contact_form_notifications.message_not_sent[language],
            severity: "error",
          })
        )
      )
  }

  return (
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
          <Typography gutterBottom>{contact_form_intro[language]}</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            name="name"
            label={contact_form_fields.name[language]}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            name="email"
            type="email"
            label={contact_form_fields.email[language]}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            name="tel"
            type="tel"
            label={contact_form_fields.phone[language]}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="msg"
            label={contact_form_fields.message[language]}
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
            {contact_form_fields.send[language]}
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

export default connect()(ContactForm)

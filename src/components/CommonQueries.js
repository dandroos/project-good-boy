import {
  Alert,
  AlertTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material"
import { graphql, useStaticQuery } from "gatsby"

import { CircleSmall } from "mdi-material-ui"
import React from "react"
import { connect } from "react-redux"

const CommonQueries = ({ language, isMobile }) => {
  const { contact_warning, common_queries } = useStaticQuery(graphql`
    {
      file(
        sourceInstanceName: { eq: "content" }
        extension: { eq: "md" }
        name: { eq: "contact" }
      ) {
        childMarkdownRemark {
          frontmatter {
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
          }
        }
      }
    }
  `).file.childMarkdownRemark.frontmatter

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

  return (
    <Alert variant="outlined" severity="error" sx={{ mb: 2 }}>
      <AlertTitle>{contact_warning.heading[language]}</AlertTitle>
      <Typography>{contact_warning.text[language]}</Typography>
      <List dense>
        {common_queries.map((i, ind) => (
          <CommonContact
            key={ind}
            primary={i.query[language]}
            secondary={i.response[language]}
          />
        ))}
      </List>
    </Alert>
  )
}

const stp = (s) => ({
  isMobile: s.isMobile,
})

export default connect(stp)(CommonQueries)

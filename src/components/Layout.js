import { Container, Typography, useMediaQuery, useTheme } from "@mui/material"
import React, { useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"

import { connect } from "react-redux"
import { setIsMobile } from "../redux/actions"

const Layout = ({ dispatch, location, children }) => {
  const { title, description } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `).site.siteMetadata

  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"))

  useEffect(() => {
    dispatch(setIsMobile(isMobile))
    //eslint-disable-next-line
  }, [isMobile])

  return (
    <Container>
      <Typography variant="h1">{title}</Typography>
      <Typography variant="lead">{description}</Typography>
      {children}
    </Container>
  )
}

export default connect()(Layout)

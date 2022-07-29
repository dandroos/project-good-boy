import {
  Box,
  Container,
  Divider,
  Link,
  Typography,
  useTheme,
} from "@mui/material"

import Copyright from "./Copyright"
import Hours from "./Hours"
import LanguageButton from "./LanguageButton"
import LocationMap from "./LocationMap"
import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { connect } from "react-redux"

const Footer = ({ locationId, language }) => {
  const theme = useTheme()

  const text = {
    spain: {
      en: "Spain",
      es: "España",
    },
    websiteBy: {
      en: "Website by ",
      es: "Sitio web de ",
    },
  }
  return (
    <Box
      bgcolor={locationId.id === "home" ? "common.white" : "primary.main"}
      color={locationId.id === "home" ? "common.black" : "common.white"}
      textAlign="center"
      component="footer"
      py={6}
      boxShadow={-5}
      zIndex={500}
      sx={{ boxShadow: `0rem -.25rem .3rem ${theme.palette.common.black}66` }}
    >
      <Container>
        <Box mb={3}>
          <StaticImage
            src="../images/fdr-logo.png"
            width={120}
            quality={100}
            alt="Fuerteventura Dog Rescue Logo"
            placeholder="none"
          />
          <Typography mt={2}>
            Calle Juan Cabrera Méndez, La Oliva, 35640, Fuerteventura,{" "}
            {text.spain[language]}
          </Typography>
        </Box>
        <Box mb={3}>
          <LocationMap />
        </Box>
        <Hours />
        <LanguageButton noEdge />
        <Copyright />
        <Divider sx={{ my: 3 }} />
        <Box component="a" href="https://daveandrews.dev" target="_blank">
          {locationId.id === "home" ? (
            <StaticImage
              src="../images/dd-dark-text.png"
              width={50}
              alt="Dave Andrews Logo"
            />
          ) : (
            <StaticImage
              src="../images/dd-light-text.png"
              width={50}
              alt="Dave Andrews Logo"
            />
          )}
        </Box>
        <Link
          href="https://daveandrews.dev"
          target="_blank"
          color="inherit"
          underline="hover"
          variant="caption"
          display="block"
        >
          {text.websiteBy[language]} Dave Andrews
        </Link>
      </Container>
    </Box>
  )
}

const stp = (s) => ({
  locationId: s.locationId,
  language: s.language,
})

export default connect(stp)(Footer)

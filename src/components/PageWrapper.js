import {
  Box,
  Button,
  Container,
  Divider,
  Toolbar,
  Typography,
  rgbToHex,
  useTheme,
} from "@mui/material"

import BackgroundImage from "gatsby-background-image"
import { Link } from "gatsby"
import { Phone } from "mdi-material-ui"
import React from "react"
import Seo from "./seo"
import { connect } from "react-redux"
import { convertToBgImage } from "gbimage-bridge"
import { getImage } from "gatsby-plugin-image"
import { nav } from "../siteLinks"

const PageWrapper = ({
  title,
  subtitle,
  bgImage,
  children,
  isMobile,
  noCta,
  language,
  ogImgOverride,
}) => {
  const theme = useTheme()

  const text = {
    forMoreInfo: {
      en: "For more information...",
      es: "Para más información...",
    },
    contactUs: {
      en: "Contact us",
      es: "Contáctenos",
    },
  }
  return (
    <>
      <Seo
        title={title}
        lang={language}
        ogImg={ogImgOverride ? ogImgOverride : undefined}
      />
      <Box
        sx={{
          py: 10,
          boxShadow: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
        color="common.white"
        component={BackgroundImage}
        {...convertToBgImage(getImage(bgImage))}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 50,
            background: `linear-gradient(to bottom, ${
              theme.palette.primary.main
            }ee, ${rgbToHex(theme.palette.primary.dark)}ee)`,
          }}
        />
        <Container
          sx={{ zIndex: 100, textAlign: isMobile ? "center" : undefined }}
        >
          <Toolbar />
          <Typography
            variant="h2"
            color="common.white"
            textTransform="capitalize"
          >
            {title}
          </Typography>
          <Typography variant="lead">{subtitle}</Typography>
        </Container>
      </Box>

      <Box>
        <Container sx={{ pt: 4 }}>
          {children}
          {!noCta && (
            <>
              <Divider sx={{ mt: 1 }} />
              <Box my={3} textAlign="center">
                <Typography>{text.forMoreInfo[language]}</Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  endIcon={<Phone />}
                  component={Link}
                  to={`/${
                    language +
                    nav.internal.filter((i) => i.id === "contact")[0].url[
                      language
                    ]
                  }`}
                >
                  {text.contactUs[language]}
                </Button>
              </Box>
            </>
          )}
        </Container>
      </Box>
    </>
  )
}

const stp = (s) => ({
  isMobile: s.isMobile,
})

export default connect(stp)(PageWrapper)

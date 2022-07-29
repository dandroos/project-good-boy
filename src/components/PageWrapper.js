import {
  Box,
  Container,
  Toolbar,
  Typography,
  rgbToHex,
  useTheme,
} from "@mui/material"

import BackgroundImage from "gatsby-background-image"
import React from "react"
import Seo from "./seo"
import { connect } from "react-redux"
import { convertToBgImage } from "gbimage-bridge"
import { getImage } from "gatsby-plugin-image"

const PageWrapper = ({ title, subtitle, bgImage, children, isMobile }) => {
  const theme = useTheme()
  return (
    <>
      <Seo title={title} />
      <Box
        py={10}
        boxShadow={3}
        display="flex"
        justifyContent="center"
        alignItems="center"
        color="common.white"
        component={BackgroundImage}
        {...convertToBgImage(getImage(bgImage))}
      >
        <Box
          position="absolute"
          top={0}
          bottom={0}
          left={0}
          right={0}
          zIndex={50}
          sx={{
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
        <Container sx={{ pt: 4 }}>{children}</Container>
      </Box>
    </>
  )
}

const stp = (s) => ({
  isMobile: s.isMobile,
})

export default connect(stp)(PageWrapper)

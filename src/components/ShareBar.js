import { Box, Divider, IconButton, Tooltip, Typography } from "@mui/material"
import { ContentCopy, Facebook, Twitter, Whatsapp } from "mdi-material-ui"

import React from "react"
import { connect } from "react-redux"
import { setToast } from "../redux/actions"

const ShareBar = ({ dispatch, language, dogName, noDivider }) => {
  const text = {
    share: {
      en: "Share",
      es: "Compartir",
    },
    spreadTheWord: {
      en: `Help us to find a forever home for ${
        dogName ? dogName : `the dogs!`
      }`,
      es: `Ayúdanos a encontrar un hogar para ${
        dogName ? dogName : `nuestros perros`
      } para siempre`,
    },
    copyUrl: {
      en: `Copy URL to clipboard`,
      es: `Copiar URL al portapapeles`,
    },
    copySuccess: {
      en: `Successfully copied URL to clipboard!`,
      es: `URL copiada con éxito al portapapeles!`,
    },
  }
  return (
    typeof window !== "undefined" && (
      <>
        {!noDivider && <Divider sx={{ mb: 3 }} />}
        <Box textAlign="center">
          <Typography variant="h5">{text.share[language]}</Typography>
          <Typography variant="lead">
            {text.spreadTheWord[language]}...
          </Typography>
          <Tooltip title="Facebook">
            <IconButton
              size="large"
              color="facebook"
              href={`https://facebook.com/sharer.php?u=${window.location.href}`}
              target="_blank"
            >
              <Facebook />
            </IconButton>
          </Tooltip>
          <Tooltip title="Twitter">
            <IconButton
              size="large"
              color="twitter"
              href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
              target="_blank"
            >
              <Twitter />
            </IconButton>
          </Tooltip>
          <Tooltip title="WhatsApp">
            <IconButton
              size="large"
              color="whatsapp"
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                window.location.href
              )}`}
              target="_blank"
            >
              <Whatsapp />
            </IconButton>
          </Tooltip>
          <Tooltip title={language ? text.copyUrl[language] : "..."}>
            <IconButton
              size="large"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href).then(() => {
                  dispatch(
                    setToast({
                      open: true,
                      severity: "info",
                      msg: text.copySuccess[language],
                    })
                  )
                })
              }}
            >
              <ContentCopy />
            </IconButton>
          </Tooltip>
        </Box>
      </>
    )
  )
}

const stp = (s) => ({
  language: s.language,
})

export default connect(stp)(ShareBar)

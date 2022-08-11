import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Portal,
  Typography,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import { setDisablePrompt, setLanguage } from "../redux/actions"

import { connect } from "react-redux"
import detectBrowserLanguage from "detect-browser-language"
import { nav } from "../siteLinks"

const LanguageUtility = ({ dispatch, language, locationId }) => {
  const [dialogLang, setDialogLang] = useState(false)
  const [checked, setChecked] = useState(false)
  const { internal } = nav

  const { siteQuery, languageQuery } = useStaticQuery(graphql`
    {
      siteQuery: site {
        siteMetadata {
          supportedLanguages
        }
      }
      languageQuery: file(
        sourceInstanceName: { eq: "content" }
        name: { eq: "language" }
      ) {
        childMarkdownRemark {
          frontmatter {
            redirect_prompt {
              en
              es
            }
          }
        }
      }
    }
  `)

  const handleClose = () => {
    setDialogLang(false)
  }

  const handleClick = (e) => {
    dispatch(setDisablePrompt(true))
    handleClose()
    if (checked) {
      localStorage.setItem("fdr_ignore_lang_redirect", "y")
    }
    switch (e.target.id) {
      case "yes":
        const browserLang = detectBrowserLanguage().substr(0, 2)
        localStorage.setItem("fdr_def_lang", browserLang)
        dispatch(setLanguage(browserLang))
        let redirectUrl
        if (locationId.staticPage) {
          redirectUrl = internal
            .filter((i) => i.id === "how-to")[0]
            .options.filter((j) => j.id === locationId.id)[0].url[browserLang]
        } else {
          redirectUrl = `${
            internal.filter((i) => {
              return i.id === locationId.id
            })[0].url[browserLang]
          }${locationId.id !== `home` ? "/" : ""}`
        }
        window.location = `/${browserLang}${redirectUrl}${
          locationId.dog ? locationId.dog : ""
        }`

        break
      case "no":
        // no further action required
        break
      default:
        break
    }
  }

  useEffect(() => {
    const browserLang = detectBrowserLanguage().substr(0, 2)
    if (
      siteQuery.siteMetadata.supportedLanguages.includes(browserLang) &&
      !localStorage.getItem("fdr_ignore_lang_redirect") &&
      language !== browserLang &&
      localStorage.getItem("fdr_def_lang") !== language
    ) {
      setDialogLang(browserLang)
    }
    //eslint-disable-next-line
  }, [])
  const text = {
    dontShow: {
      en: "Don't show this again in future",
      es: "No volver a mostrar este aviso",
    },
    yes: {
      en: "Yes",
      es: "Sí",
    },
    no: {
      en: "No",
      es: "No",
    },
  }
  return (
    <>
      <Portal>
        <Dialog open={Boolean(dialogLang)} maxWidth="sm" fullWidth>
          <DialogContent>
            <Typography>
              {
                languageQuery.childMarkdownRemark.frontmatter.redirect_prompt[
                  dialogLang
                ]
              }
            </Typography>
          </DialogContent>
          <DialogActions>
            <FormControlLabel
              label={
                <Typography variant="caption">
                  {text.dontShow[dialogLang]}
                </Typography>
              }
              control={
                <Checkbox
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                />
              }
              disableTypography
            />
            <Button id="yes" color="success" onClick={handleClick}>
              {text.yes[dialogLang]}
            </Button>
            <Button id="no" color="error" onClick={handleClick}>
              {text.no[dialogLang]}
            </Button>
          </DialogActions>
        </Dialog>
      </Portal>
    </>
  )
}

const stp = (s) => ({
  language: s.language,
  disablePrompt: s.disablePrompt,
  locationId: s.locationId,
})

export default connect(stp)(LanguageUtility)

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
import React, { useState } from "react"
import { setDisablePrompt, setLanguage } from "../redux/actions"

import { connect } from "react-redux"
import detectBrowserLanguage from "detect-browser-language"
import { nav } from "../siteLinks"
import { navigate } from "gatsby"

const LanguageUtility = ({ dispatch, language, disablePrompt, locationId }) => {
  const [showDialog, setShowDialog] = useState(false)
  const [checked, setChecked] = useState(false)
  const { internal } = nav

  const handleClose = () => {
    setShowDialog(false)
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
        // navigate(
        //   `/${browserLang}${redirectUrl}${locationId.dog ? locationId.dog : ""}`
        // )
        window.location = `/${browserLang}${redirectUrl}${
          locationId.dog ? locationId.dog : ""
        }`

        break
      case "no":
        // do more stuff
        break
      default:
        break
    }
  }
  return (
    <>
      <Portal>
        <Dialog open={showDialog} maxWidth="sm" fullWidth>
          <DialogContent>
            <Typography>
              Would you like to change the language to your browser default?
            </Typography>
          </DialogContent>
          <DialogActions>
            <FormControlLabel
              label={
                <Typography variant="caption">
                  Don't show this again in future
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
              Yes
            </Button>
            <Button id="no" color="error" onClick={handleClick}>
              No
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

import { IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material"
import React, { useState } from "react"
import { graphql, navigate, useStaticQuery } from "gatsby"

import ReactCountryFlag from "react-country-flag"
import { connect } from "react-redux"
import { nav } from "../siteLinks"

const LanguageButton = ({ noEdge, language, locationId }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClose = () => {
    setAnchorEl(null)
  }

  const { supportedLanguages } = useStaticQuery(
    graphql`
      {
        site {
          siteMetadata {
            supportedLanguages
          }
        }
      }
    `
  ).site.siteMetadata

  const { internal } = nav

  return (
    <>
      <IconButton
        size="small"
        edge={noEdge ? undefined : "end"}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <ReactCountryFlag
          countryCode={(() => {
            switch (language) {
              case "en":
                return "gb"
              case "es":
                return "es"
              default:
                return
            }
          })()}
          svg
        />
      </IconButton>
      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose}>
        {supportedLanguages.map((lang, ind) => (
          <MenuItem
            key={ind}
            onClick={() => {
              let redirectUrl
              if (locationId.staticPage) {
                redirectUrl = internal
                  .filter((i) => i.id === "how-to")[0]
                  .options.filter((j) => j.id === locationId.id)[0].url[lang]
              } else {
                redirectUrl = `${
                  internal.filter((i) => {
                    return i.id === locationId.id
                  })[0].url[lang]
                }${locationId.id !== `home` ? "/" : ""}`
              }
              // navigate(
              //   `/${lang}${redirectUrl}${
              //     locationId.dog ? locationId.dog.substring(1) : ""
              //   }`
              // )
              window.location = `/${lang}${redirectUrl}${
                locationId.dog ? locationId.dog.substring(1) : ""
              }`

              handleClose()
            }}
          >
            <ListItemIcon>
              <ReactCountryFlag
                countryCode={(() => {
                  switch (lang) {
                    case "en":
                      return "gb"
                    case "es":
                      return "es"
                    default:
                      return
                  }
                })()}
                svg
              />
            </ListItemIcon>
            {(() => {
              switch (lang) {
                case "en":
                  return "English"
                case "es":
                  return "Español"
                default:
                  return
              }
            })()}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

const stp = (s) => ({
  language: s.language,
  locationId: s.locationId,
})

export default connect(stp)(LanguageButton)

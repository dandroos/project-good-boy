import React, { useEffect } from "react"

import { connect } from "react-redux"
import { nav } from "../siteLinks"
import { navigate } from "gatsby"

const LanguageRedirect = ({ newLang, language, locationId }) => {
  const { internal } = nav

  useEffect(() => {
    if (language) {
      let redirectUrl
      if (locationId.staticPage) {
        redirectUrl = internal
          .filter((i) => i.id === "how-to")[0]
          .options.filter((j) => j.id === locationId.id)[0].url[newLang]
      } else {
        redirectUrl = `${
          internal.filter((i) => {
            return i.id === locationId.id
          })[0].url[lang]
        }${locationId.id !== `home` ? "/" : ""}`
      }
      return navigate(
        `/${newLang}${redirectUrl}${
          locationId.dog ? locationId.dog.substring(1) : ""
        }`
      )
    }
  }, [language])

  return null
}

const stp = (s) => ({
  language: s.language,
  locationId: s.locationId,
})

export default connect(stp)(LanguageRedirect)

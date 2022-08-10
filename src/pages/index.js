import React, { useEffect } from "react"
import { graphql, navigate, useStaticQuery } from "gatsby"

import HeadComponent from "../components/Head"
import detectBrowserLanguage from "detect-browser-language"

const Index = () => {
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

  useEffect(() => {
    const storedLang = localStorage.getItem("fdr_def_lang")
    if (storedLang) {
      navigate(`/${storedLang}/`)
    } else {
      const browserLang = detectBrowserLanguage().substring(0, 2)
      if (supportedLanguages.includes(browserLang)) {
        navigate(`/${browserLang}/`)
      } else {
        navigate(`/es/`)
      }
    }
    //eslint-disable-next-line
  }, [])
  return null
}

export default Index

export const Head = ({ pageContext }) => <HeadComponent lang="es" />

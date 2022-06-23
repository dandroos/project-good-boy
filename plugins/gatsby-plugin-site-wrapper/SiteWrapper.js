import { CssBaseline, ThemeProvider } from "@mui/material"

import { Helmet } from "react-helmet"
import React from "react"
import { theme } from "../../src/theme"
import { typography } from "../../style"

const SiteWrapper = ({ children }) => {
  return (
    <>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href={`https://fonts.googleapis.com/css2?family=${typography.fontFamily
            .split(" ")
            .join("+")}&display=swap`}
          rel="stylesheet"
        ></link>
      </Helmet>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  )
}

export default SiteWrapper

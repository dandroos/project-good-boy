import { CssBaseline, ThemeProvider } from "@mui/material"

import Loading from "../../src/components/Loading"
import NetlifyForm from "../../src/components/NetlifyForm"
import React from "react"
import { theme } from "../../src/theme"

const SiteWrapper = ({ children }) => {
  return (
    <>
      <Loading />
      <NetlifyForm />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </>
  )
}

export default SiteWrapper

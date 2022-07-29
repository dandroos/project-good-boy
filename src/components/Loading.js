import { Box, CircularProgress } from "@mui/material"

import React from "react"
import { connect } from "react-redux"

const Loading = ({ ready }) => {
  return (
    !ready && (
      <Box
        position="fixed"
        bgcolor="common.white"
        top={0}
        right={0}
        bottom={0}
        left={0}
        zIndex={5000}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress size={250} />
      </Box>
    )
  )
}

const stp = (s) => ({
  ready: s.siteReady,
})

export default connect(stp)(Loading)

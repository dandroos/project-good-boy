import React, { useEffect } from "react"
import { setLanguage, setLocationId } from "../redux/actions"

import { Container } from "@mui/material"
import { connect } from "react-redux"

const Temp = ({ dispatch, pageContext }) => {
  useEffect(() => {
    dispatch(
      setLocationId({ id: pageContext.id, staticPage: pageContext.staticPage })
    )
    dispatch(setLanguage(pageContext.language))
    //eslint-disable-next-line
  }, [])
  return <Container>{pageContext.title}</Container>
}

export default connect()(Temp)

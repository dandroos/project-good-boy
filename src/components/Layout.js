import { AnimatePresence, motion } from "framer-motion"
import { Box, useMediaQuery, useTheme } from "@mui/material"
import React, { useEffect, useState } from "react"
import {
  setAtTop,
  setFontLoaded,
  setIsLandscape,
  setIsMobile,
  setPageAnimating,
  setSiteReady,
} from "../redux/actions"

import FontFaceObserver from "fontfaceobserver"
import Footer from "./Footer"
import LanguageUtility from "./LanguageUtility"
import Navigation from "./Navigation"
import Toast from "./Toast"
import { connect } from "react-redux"
import style from "../../style"

const Layout = ({
  dispatch,
  location,
  children,
  language,
  fontLoaded,
  locationId,
  ready,
}) => {
  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"))
  const isLandscape = useMediaQuery("(orientation: landscape")

  useEffect(() => {
    dispatch(setIsLandscape(isLandscape))
    //eslint-disable-next-line
  }, [isLandscape])

  useEffect(() => {
    dispatch(setIsMobile(isMobile))
    //eslint-disable-next-line
  }, [isMobile])

  useEffect(() => {
    const loadFont = () => {
      const font = new FontFaceObserver(style.typography.fontFamily)
      font.load().then(() => {
        dispatch(setFontLoaded(true))
      }, loadFont)
    }
    loadFont()
    document.addEventListener("scroll", () => {
      dispatch(setAtTop(window.scrollY === 0))
    })
    dispatch(setAtTop(window.scrollY === 0))
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    setWhiteTextAtTop(locationId.id === "home")
    //eslint-disable-next-line
  }, [locationId, language])

  useEffect(() => {
    if (language.length > 0 && fontLoaded && !ready) {
      dispatch(setSiteReady(true))
    }
    //eslint-disable-next-line
  }, [language, fontLoaded])
  const [whiteTextAtTop, setWhiteTextAtTop] = useState(true)
  return (
    typeof window !== "undefined" && (
      <>
        {language && <LanguageUtility />}
        <Toast />
        <Navigation
          home={locationId.id === "home"}
          whiteTextAtTop={whiteTextAtTop}
        />

        {/* <Box sx={{ display: "flex", flexDirection: "column", overflow: "hidden" }}> */}
        <div
          className="helmettttttttttt"
          style={{
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <AnimatePresence exitBeforeEnter>
            <motion.div
              onAnimationStart={(e) => {
                dispatch(setPageAnimating(true))
              }}
              onAnimationComplete={(e) => {
                if (e.opacity === 1) {
                  dispatch(setPageAnimating(false))
                }
              }}
              key={location.pathname}
              initial={{ opacity: 0, transform: `translateY(1000px)` }}
              animate={{ opacity: 1, transform: `translateY(0px)` }}
              exit={{ opacity: 0, transform: `translateY(1000px)` }}
              transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
            >
              <Box
                display="flex"
                flexDirection="column"
                minHeight={
                  !isMobile ? "100vh" : window.innerHeight * 0.01 * 100
                }
                justifyContent="space-between"
              >
                <Box component="main" pb={locationId.id !== `home` && 4}>
                  {children}
                </Box>
                <Footer />
              </Box>
            </motion.div>
          </AnimatePresence>
        </div>
      </>
    )
  )
}

const stp = (s) => ({
  language: s.language,
  fontLoaded: s.fontLoaded,
  ready: s.siteReady,
  locationId: s.locationId,
})

export default connect(stp)(Layout)

import {
  AppBar,
  Box,
  Button,
  IconButton,
  Link as MLink,
  Menu as MMenu,
  MenuItem,
  Slide,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { ChevronDown, Menu } from "mdi-material-ui"
import { Link, graphql, useStaticQuery } from "gatsby"
import React, { Fragment, useState } from "react"

import LanguageButton from "./LanguageButton"
import MobileMenu from "./MobileMenu"
import { StaticImage } from "gatsby-plugin-image"
import { connect } from "react-redux"
import { nav } from "../siteLinks"
import { setShowMobileMenu } from "../redux/actions"

const Navigation = ({
  dispatch,
  isMobile,
  language,
  atTop,
  howToPage,
  pageAnimating,
}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const handleClose = () => {
    setAnchorEl(null)
  }
  const { site, contact } = useStaticQuery(
    graphql`
      {
        site: site {
          siteMetadata {
            title
          }
        }
        contact: file(
          sourceInstanceName: { eq: "content" }
          extension: { eq: "md" }
          name: { eq: "contact" }
        ) {
          childMarkdownRemark {
            frontmatter {
              contact_and_social {
                facebook_username
                instagram_username
              }
            }
          }
        }
      }
    `
  )

  const theme = useTheme()
  const isXS = useMediaQuery(`(max-width: 280px)`)
  return (
    <>
      <MobileMenu />
      <Slide direction="down" in={!pageAnimating}>
        <AppBar
          elevation={atTop ? 0 : 3}
          color={atTop ? "transparent" : undefined}
          sx={{
            color: atTop ? theme.palette.common.white : undefined,
            transition: `background-color .2s`,
          }}
        >
          <Toolbar
            sx={{
              mx: isMobile ? 0 : 3,
              my: atTop ? 0 : -0.5,
              transition: `margin .2s`,
            }}
          >
            <MLink
              display="flex"
              justifyContent="center"
              alignItems="center"
              color="inherit"
              component={Link}
              to={`/${language}`}
              underline="none"
            >
              <StaticImage
                src="../images/fdr-logo.png"
                alt="FDR logo"
                height={50}
                quality={100}
                placeholder="none"
              />
              {!isXS && (
                <Typography
                  variant={isMobile ? "subtitle1" : "h5"}
                  variantMapping={{ h5: "h1", subtitle1: "h1" }}
                  display="inline-block"
                  fontWeight={isMobile ? 700 : undefined}
                  sx={{
                    mx: isMobile ? 1 : 2,
                    textShadow: `.1rem .1rem .6rem ${theme.palette.common.black}44`,
                  }}
                >
                  {site.siteMetadata.title}
                </Typography>
              )}
            </MLink>

            {!isMobile && (
              <>
                {nav.internal.map(
                  (i, ind) =>
                    ind !== 0 && (
                      <Fragment key={ind}>
                        {!i.dropdown ? (
                          <Button
                            color="inherit"
                            sx={{
                              ml: 3,
                              textTransform: "capitalize",
                              textShadow: `.1rem .1rem .6rem ${theme.palette.common.black}44`,
                            }}
                            component={Link}
                            to={`/${language + i.url[language]}`}
                            activeStyle={{ fontWeight: "bold" }}
                          >
                            {i.label[language]}
                          </Button>
                        ) : (
                          <>
                            <Button
                              color="inherit"
                              sx={{
                                fontWeight: howToPage ? "bold" : undefined,
                                ml: 3,
                                textTransform: "capitalize",
                                textShadow: `.1rem .1rem .6rem ${theme.palette.common.black}44`,
                              }}
                              endIcon={<ChevronDown />}
                              onClick={(e) => setAnchorEl(e.currentTarget)}
                            >
                              {i.label[language]}
                            </Button>
                            <MMenu
                              open={Boolean(anchorEl)}
                              anchorEl={anchorEl}
                              onClose={handleClose}
                              MenuListProps={{ onMouseLeave: handleClose }}
                            >
                              {i.options.map((j, jInd) => (
                                <MenuItem
                                  key={jInd}
                                  component={Link}
                                  to={`/${language + j.url[language]}`}
                                  onClick={handleClose}
                                  activeStyle={{ fontWeight: "bold" }}
                                >
                                  {j.label[language]}
                                </MenuItem>
                              ))}
                            </MMenu>
                          </>
                        )}
                      </Fragment>
                    )
                )}
              </>
            )}
            <Box flexGrow={1} />
            {!isMobile ? (
              <>
                {nav.external.map((i, ind) => (
                  <IconButton
                    color="inherit"
                    key={ind}
                    sx={{ mr: ind === nav.external.length - 1 ? 2 : undefined }}
                    href={
                      i.baseUrl +
                      contact.childMarkdownRemark.frontmatter
                        .contact_and_social[`${i.id}_username`]
                    }
                    target="_blank"
                  >
                    <i.Icon />
                  </IconButton>
                ))}
              </>
            ) : (
              <IconButton
                color="inherit"
                edge="end"
                onClick={() => dispatch(setShowMobileMenu(true))}
              >
                <Menu />
              </IconButton>
            )}
            {!isMobile && <LanguageButton />}
          </Toolbar>
        </AppBar>
      </Slide>
    </>
  )
}

const stp = (s) => ({
  isMobile: s.isMobile,
  language: s.language,
  atTop: s.atTop,
  howToPage: s.locationId.staticPage,
  pageAnimating: s.pageAnimating,
})

export default connect(stp)(Navigation)

import {
  Box,
  Collapse,
  Dialog,
  Divider,
  Fab,
  Grow,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Portal,
  useTheme,
} from "@mui/material"
import { ChevronDown, ChevronUp, Close } from "mdi-material-ui"
import { Link, graphql, navigate, useStaticQuery } from "gatsby"
import React, { Fragment, useState } from "react"

import LanguageButton from "./LanguageButton"
import { StaticImage } from "gatsby-plugin-image"
import { connect } from "react-redux"
import { nav } from "../siteLinks"
import { setShowMobileMenu } from "../redux/actions"

const MobileMenu = ({
  dispatch,
  isMobile,
  isOpen,
  language,
  staticPage,
  dogPage,
}) => {
  const [collapse, setCollapse] = useState(true)
  const theme = useTheme()
  const handleClose = () => {
    dispatch(setShowMobileMenu(false))
  }

  const data = useStaticQuery(graphql`
    {
      file(
        sourceInstanceName: { eq: "content" }
        extension: { eq: "md" }
        name: { eq: "contact_and_social" }
      ) {
        childMarkdownRemark {
          frontmatter {
            facebook_username
            instagram_username
          }
        }
      }
    }
  `).file.childMarkdownRemark.frontmatter
  return (
    isMobile && (
      <Portal>
        <Dialog
          TransitionComponent={Grow}
          open={isOpen}
          fullScreen
          onClose={handleClose}
          PaperProps={{ sx: { overflowY: "clip" } }}
        >
          <Fab
            sx={{ position: "fixed", top: 20, right: 20 }}
            onClick={handleClose}
          >
            <Close />
          </Fab>
          <Box
            height="100vh"
            width="100%"
            py={1}
            bgcolor="primary.main"
            color="common.white"
            textAlign="center"
            display="flex"
            flexDirection="column"
            justifyContent="space-evenly"
          >
            <Box>
              <StaticImage
                src="../images/fdr-logo.png"
                width={150}
                quality={100}
                alt="FDR Logo"
                placeholder="none"
                onClick={() => {
                  navigate(`/${language}`)
                  handleClose()
                }}
              />
              <List>
                {nav.internal.map((i, ind) =>
                  !i.dropdown ? (
                    <Fragment key={ind}>
                      {ind !== 0 && (
                        <ListItem
                          button
                          component={Link}
                          to={`/${language + i.url[language]}`}
                          onClick={handleClose}
                          activeStyle={{ fontWeight: "bold" }}
                        >
                          <ListItemText
                            primary={i.label[language]}
                            primaryTypographyProps={{
                              align: "center",
                              fontWeight:
                                i.id === "the-dogs" && dogPage
                                  ? "bold"
                                  : "inherit",
                            }}
                          />
                        </ListItem>
                      )}
                    </Fragment>
                  ) : (
                    <Fragment key={ind}>
                      <ListItem button onClick={() => setCollapse(!collapse)}>
                        <ListItemText
                          primary={
                            <>
                              {i.label[language]}
                              {collapse ? (
                                <ChevronUp sx={{ fontSize: 12, ml: 0.5 }} />
                              ) : (
                                <ChevronDown sx={{ fontSize: 12, ml: 0.5 }} />
                              )}
                            </>
                          }
                          primaryTypographyProps={{
                            align: "center",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: staticPage ? "bold" : undefined,
                          }}
                        />
                      </ListItem>
                      <Collapse in={collapse}>
                        <List
                          dense
                          sx={{
                            backgroundColor: theme.palette.secondary.main,
                            color: theme.palette.common.white,
                          }}
                          disablePadding
                        >
                          <Divider />
                          {i.options.map((j, jInd) => (
                            <ListItem
                              key={jInd}
                              button
                              divider
                              component={Link}
                              to={`/${language + j.url[language]}`}
                              activeStyle={{ fontWeight: "bold" }}
                              onClick={handleClose}
                            >
                              <ListItemText
                                primary={j.label[language]}
                                primaryTypographyProps={{
                                  variant: "caption",
                                  align: "center",
                                  fontWeight: "inherit",
                                }}
                              />
                            </ListItem>
                          ))}
                        </List>
                      </Collapse>
                    </Fragment>
                  )
                )}
              </List>
            </Box>
            <Box>
              {nav.external.map((i, ind) => (
                <IconButton
                  color="inherit"
                  key={ind}
                  href={i.baseUrl + data[`${i.id}_username`]}
                  target="_blank"
                >
                  <i.Icon />
                </IconButton>
              ))}
            </Box>
            <LanguageButton />
          </Box>
        </Dialog>
      </Portal>
    )
  )
}

const stp = (s) => ({
  isMobile: s.isMobile,
  isOpen: s.showMobileMenu,
  language: s.language,
  staticPage: s.locationId.staticPage,
  dogPage: s.locationId.dog,
})
export default connect(stp)(MobileMenu)

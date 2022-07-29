import "../components/carousel.css"

import {
  Cake,
  CalendarMonth,
  Cat,
  Dog as DogIcon,
  ExclamationThick,
  GenderMaleFemale,
  HumanChild,
  Information,
  Paw,
} from "mdi-material-ui"
import {
  CardActionArea,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React, { useEffect } from "react"
import { setLanguage, setLocationId } from "../redux/actions"

import BackgroundImage from "gatsby-background-image"
import { Carousel } from "react-responsive-carousel"
import { DDS } from "../components/DogDataSanitizer"
import PageWrapper from "../components/PageWrapper"
import { connect } from "react-redux"
import { convertToBgImage } from "gbimage-bridge"
import { graphql } from "gatsby"

// import "react-responsive-carousel/lib/styles/carousel.min.css"

const Dog = ({ pageContext, dispatch, data, isMobile }) => {
  const language = pageContext.language
  useEffect(() => {
    dispatch(setLocationId({ id: "the-dogs", dog: data.main.fields.slug }))
    dispatch(setLanguage(language))
    //eslint-disable-next-line
  }, [])

  const dog = Object.assign({}, data.main)
  const text = {
    profile: { en: "Profile", es: "Perfil" },
    breed: { en: "Breed", es: "Raza" },
    sex: { en: "Sex", es: "Sexo" },
    age: { en: "Age", es: "Edad" },
    dateCameIn: { en: "Came in", es: "Entró" },
    sociability: { en: "Sociability?", es: "¿Sociabilidad?" },
    otherDogs: { en: "Other dogs", es: "Otros perros" },
    cats: { en: "Cats", es: "Gatos" },
    children: { en: "Children", es: "Niños" },
    meet: {
      en: `Meet ${dog.frontmatter.name}!`,
      es: `¡Conoce a ${dog.frontmatter.name}!`,
    },
  }

  const theme = useTheme()
  const Detail = ({ primary, secondary, Icon }) => (
    <ListItem divider>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText
        disableTypography
        primary={
          <Typography display="flex" alignItems="center" color="text.secondary">
            {primary}
            {primary === "PPP" ? (
              <Tooltip title="Cock">
                <Information fontSize="small" sx={{ ml: 1 }} />
              </Tooltip>
            ) : null}
          </Typography>
        }
        secondary={secondary}
        primaryTypographyProps={{ color: "text.secondary" }}
        secondaryTypographyProps={{
          variant: "body1",
          color: "text.primary",
        }}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      />
    </ListItem>
  )
  return (
    <PageWrapper
      title={dog.frontmatter.name}
      subtitle={dog.frontmatter.breed[language]}
      bgImage={dog.frontmatter.photos[0].photo}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <Carousel
            autoPlay
            infiniteLoop
            showIndicators={false}
            interval={5000}
            showArrows={false}
            showStatus={false}
            stopOnHover
            renderThumbs={() => {
              return data.thumbs.frontmatter.photos.map((i, ind) => (
                <CardActionArea key={ind}>
                  <GatsbyImage
                    alt={dog.frontmatter.breed[language]}
                    image={getImage(i.photo)}
                    height={80}
                    width={80}
                    style={{ cursor: "pointer" }}
                  />
                </CardActionArea>
              ))
            }}
          >
            {dog.frontmatter.photos.map((i, ind) => {
              const bgImg = convertToBgImage(getImage(i.photo))
              return (
                <Paper
                  key={ind}
                  id={i.photo.childImageSharp.id}
                  component={BackgroundImage}
                  {...bgImg}
                  sx={{
                    height: "100%",
                    width: "100%",
                    minHeight: isMobile ? 525 : 425,
                  }}
                >
                  <CardActionArea
                    sx={{ height: "100%", width: "100%" }}
                    component="a"
                    href={i.photo.childImageSharp.resize.src}
                    target="_blank"
                  />
                </Paper>
              )
            })}
          </Carousel>
        </Grid>
        <Grid item xs={12} md={7}>
          <Paper>
            <List disablePadding>
              <ListSubheader
                sx={{
                  fontWeight: "bold",
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="overline"
                  sx={{ lineHeight: "inherit", textAlign: "center" }}
                >
                  {text.profile[language]}
                </Typography>
              </ListSubheader>
              <Detail
                primary={text.age[language]}
                secondary={DDS.getAge({ dob: dog.frontmatter.dob, language })}
                Icon={Cake}
              />
              <Detail
                primary={text.sex[language]}
                secondary={DDS.getSex({ input: dog.frontmatter.sex, language })}
                Icon={GenderMaleFemale}
              />
              <Detail
                primary={text.breed[language]}
                secondary={dog.frontmatter.breed[language]}
                Icon={Paw}
              />
              <Detail
                primary={text.dateCameIn[language]}
                secondary={DDS.getDateCameIn({
                  date: dog.frontmatter.date_came_in,
                  language,
                })}
                Icon={CalendarMonth}
              />
              <Detail
                primary="PPP"
                secondary={DDS.getPPP({ input: dog.frontmatter.ppp, language })}
                Icon={ExclamationThick}
              />
              <ListSubheader
                sx={{
                  fontWeight: "bold",
                  textAlign: "center",
                  mt: 3,
                  lineHeight: 2,
                }}
              >
                {text.sociability[language]}
              </ListSubheader>
              <Divider />
              <Detail
                primary={text.otherDogs[language]}
                secondary={DDS.getYesOrNo({
                  input: dog.frontmatter.sociability.dogs,
                  language,
                })}
                Icon={DogIcon}
              />
              <Detail
                primary={text.cats[language]}
                secondary={DDS.getYesOrNo({
                  input: dog.frontmatter.sociability.cats,
                  language,
                })}
                Icon={Cat}
              />
              <Detail
                primary={text.children[language]}
                secondary={DDS.getYesOrNo({
                  input: dog.frontmatter.sociability.children,
                  language,
                })}
                Icon={HumanChild}
              />
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            gutterBottom
            textAlign={isMobile ? "center" : undefined}
          >
            {text.meet[language]}
          </Typography>
          <Typography>{dog.frontmatter.description[language]}</Typography>
        </Grid>
      </Grid>
    </PageWrapper>
  )
}

const stp = (s) => ({
  isMobile: s.isMobile,
})

export default connect(stp)(Dog)

export const query = graphql`
  query Dog($id: String) {
    main: markdownRemark(id: { eq: $id }) {
      fields {
        slug
      }
      frontmatter {
        breed {
          en
          es
        }
        date_came_in
        description {
          en
          es
        }
        dob
        name
        photos {
          photo {
            childImageSharp {
              id
              resize {
                src
              }

              gatsbyImageData(quality: 90, placeholder: BLURRED)
            }
          }
        }
        sex
        ppp
        sociability {
          cats
          children
          dogs
        }
      }
    }
    thumbs: markdownRemark(id: { eq: $id }) {
      frontmatter {
        photos {
          photo {
            childImageSharp {
              id
              gatsbyImageData(quality: 90, placeholder: BLURRED, aspectRatio: 1)
            }
          }
        }
      }
    }
  }
`

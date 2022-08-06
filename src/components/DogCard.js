import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Fab,
  Grid,
  Typography,
  useTheme,
} from "@mui/material"

import BackgroundImage from "gatsby-background-image"
import { InformationVariant } from "mdi-material-ui"
import { Link } from "gatsby"
import React from "react"
import { connect } from "react-redux"
import { nav } from "../siteLinks"

const DogCard = ({ language, slug, breed, name, sex, age, img }) => {
  const theme = useTheme()
  return (
    <Grid key={slug} item xs={12} md={6}>
      <Card
        elevation={2}
        sx={{
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.common.white,
        }}
      >
        <CardActionArea
          component={Link}
          to={`/${
            language +
            nav.internal.filter((i) => i.id === "the-dogs")[0].url[language] +
            slug
          }`}
          sx={{
            position: "relative",
          }}
        >
          <Fab
            size="small"
            color="secondary"
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              zIndex: 500,
            }}
          >
            <InformationVariant />
          </Fab>
          <CardMedia
            component={BackgroundImage}
            sx={{ height: 400 }}
            {...img}
            alt={breed[language]}
          />
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="h4">{name}</Typography>
              <Typography variant="body2">{breed[language]}</Typography>
            </Box>
            <Typography variant="caption">
              {sex}
              <Typography
                color="secondary.dark"
                display="inline"
                sx={{ mx: 1 }}
              >
                |
              </Typography>
              {age}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}

const stp = (s) => ({
  language: s.language,
})

export default connect(stp)(DogCard)

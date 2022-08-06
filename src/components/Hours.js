import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material"
import { graphql, useStaticQuery } from "gatsby"

import React from "react"
import { connect } from "react-redux"

const Hours = ({ isMobile, language }) => {
  const data = useStaticQuery(graphql`
    {
      file(sourceInstanceName: { eq: "content" }, name: { eq: "hours" }) {
        childMarkdownRemark {
          frontmatter {
            schedule {
              item {
                day {
                  en
                  es
                }
                open_time
                close_time
              }
            }
            label {
              en
              es
            }
          }
        }
      }
    }
  `)

  const ScheduleItem = ({ day, start, finish }) => (
    <ListItem sx={{ display: "flex" }} divider>
      <ListItemText
        primary={day}
        secondary={`${start} - ${finish}`}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      />
    </ListItem>
  )

  return (
    <Box mb={3}>
      <Typography variant="h5">
        {data.file.childMarkdownRemark.frontmatter.label[language]}
      </Typography>
      <List
        dense={isMobile}
        sx={{ width: isMobile ? undefined : "50%", margin: "0 auto" }}
      >
        <Divider />
        {data.file.childMarkdownRemark.frontmatter.schedule.map(
          ({ item }, ind) => {
            const timeSanitizer = (time) =>
              `${time.substring(
                time.charAt(0) === "0" ? 1 : 0,
                2
              )}:${time.substring(2)}`
            return (
              <ScheduleItem
                key={ind}
                day={item.day[language]}
                start={timeSanitizer(item.open_time.toString())}
                finish={timeSanitizer(item.close_time.toString())}
              />
            )
          }
        )}
      </List>
    </Box>
  )
}

const stp = (s) => ({
  isMobile: s.isMobile,
  language: s.language,
})

export default connect(stp)(Hours)

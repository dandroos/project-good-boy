import "moment/locale/es"

import moment from "moment"

export const DDS = {
  getSex: ({ input, language }) => {
    switch (input) {
      case "m":
        switch (language) {
          case "en":
            return `Male`
          case "es":
            return `Macho`
          default:
            return
        }
      case "f":
        switch (language) {
          case "en":
            return `Female`
          case "es":
            return `Hembra`
          default:
            return
        }
      default:
        return
    }
  },
  getAge: ({ dob, language }) => {
    moment.locale(language)
    const today = moment(new Date())
    const ageInYears = today.diff(moment(dob), "years")
    if (ageInYears > 0) {
      return moment.duration(ageInYears, "years").locale(language).humanize()
    } else {
      const ageInMonths = today.diff(moment(dob), "months")
      if (ageInMonths > 0) {
        return moment
          .duration(ageInMonths, "months")
          .locale(language)
          .humanize()
      } else {
        const ageInWeeks = today.diff(moment(dob), "weeks")
        return moment.duration(ageInWeeks, "weeks").locale(language).humanize()
      }
    }
  },
  getDateCameIn: ({ date, language }) => {
    moment.locale(language)
    return moment(date).fromNow()
  },
  getPPP: ({ input, language }) => {
    switch (input) {
      case "n":
        switch (language) {
          case "en":
            return "No"
          case "es":
            return "No"
          default:
            return
        }
      case "y":
        switch (language) {
          case "en":
            return "Yes"
          case "es":
            return "Sí"
          default:
            return
        }
      default:
        return
    }
  },
}

const { createTheme, responsiveFontSizes } = require("@mui/material")
const style = require("../style")

export const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: style.palette.main,
      },
      secondary: {
        main: style.palette.secondary,
      },
      common: {
        black: style.palette.dark,
        white: style.palette.light,
      },
      background: {
        default: style.palette.light,
      },
      text: { primary: style.palette.dark },
      facebook: {
        main: "#1877f2",
      },
      twitter: {
        main: "#1da1f2",
      },
      whatsapp: {
        main: "#25d366",
      },
      gmail: {
        main: "#ea4335",
      },
    },
    typography: {
      fontFamily: style.typography.fontFamily,
      lead: {
        "@media (min-width:600px)": {
          fontSize: "1.2rem",
        },
        "@media (min-width:900px)": {
          fontSize: "1.3rem",
        },
        "@media (min-width:1200px)": {
          fontSize: "1.4rem",
        },
        fontSize: "1.15rem",
      },
      h1: { fontWeight: 700 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 700 },
      h4: { fontWeight: 700 },
      h5: { fontWeight: 700 },
      h6: { fontWeight: 700 },
      // nav: {
      //   fontSize: "1.1rem",
      //   lineHeight: 1,
      //   textTransform: "uppercase",
      //   letterSpacing: 1.5,
      // },
    },
    components: {
      MuiButton: {
        defaultProps: {
          color: "inherit",
          sx: {
            // textTransform: "capitalize",
          },
          // variant: "contained",
        },
      },
      MuiTextField: {
        defaultProps: {
          fullWidth: true,
          required: true,
          InputLabelProps: {
            required: false,
          },
        },
      },
      MuiLink: {
        defaultProps: {
          underline: "hover",
          sx: { cursor: "pointer" },
        },
      },
      MuiContainer: {
        defaultProps: {
          maxWidth: "md",
        },
      },
    },
  })
)

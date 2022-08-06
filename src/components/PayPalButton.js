import { Button } from "@mui/material"
import PayPalLogo from "./PayPalLogo"
import React from "react"

const PayPalButton = ({ btnText }) => {
  return (
    <form
      action="https://www.paypal.com/cgi-bin/webscr"
      method="post"
      target="_blank"
    >
      <input type="hidden" name="cmd" value="_donations" />
      <input
        type="hidden"
        name="business"
        value="info@fuerteventuradogrescue.org"
      />
      <input type="hidden" name="currency_code" value="EUR" />
      <Button
        variant="contained"
        color="secondary"
        size="large"
        type="submit"
        startIcon={<PayPalLogo />}
        sx={{ mb: 4 }}
      >
        {btnText}
      </Button>
    </form>
  )
}

export default PayPalButton

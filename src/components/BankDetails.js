import { graphql, useStaticQuery } from "gatsby"

import React from "react"
import { Typography } from "@mui/material"
import { connect } from "react-redux"

const BankDetails = ({ language }) => {
  const { bank_name, account_name, account_number, swift_bic } =
    useStaticQuery(graphql`
      {
        file(
          sourceInstanceName: { eq: "content" }
          extension: { eq: "md" }
          name: { eq: "donate" }
        ) {
          childMarkdownRemark {
            frontmatter {
              bank_account_details {
                bank_name
                account_name
                account_number
                swift_bic
              }
            }
          }
        }
      }
    `).file.childMarkdownRemark.frontmatter.bank_account_details
  const text = {
    nameOfBank: {
      en: "Name of bank",
      es: "Nombre del banco",
    },
    accountName: {
      en: "Account name",
      es: "Titular de la cuenta",
    },
    accountNumber: {
      en: "Account number",
      es: "Número de cuenta",
    },
  }
  return (
    <>
      <Typography>
        <strong>{text.nameOfBank[language]}: </strong>
        {bank_name}
      </Typography>
      <Typography>
        <strong>{text.accountName[language]}: </strong>
        {account_name}
      </Typography>
      <Typography>
        <strong>{text.accountNumber[language]}: </strong>
        {account_number}
      </Typography>

      <Typography>
        <strong>SWIFT/BIC: </strong>
        {swift_bic}
      </Typography>
    </>
  )
}

export default connect()(BankDetails)

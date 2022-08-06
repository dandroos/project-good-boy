import React from "react"

const NetlifyForm = () => {
  return (
    <form
      name="contact"
      action="#"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input type="hidden" name="name" />
      <input type="hidden" name="email" />
      <input type="hidden" name="tel" />
      <input type="hidden" name="msg" />
    </form>
  )
}

export default NetlifyForm

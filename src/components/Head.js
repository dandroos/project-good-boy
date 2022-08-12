import React from "react"
import defOgImage from "../images/def_og.png"
import { useSiteMetadata } from "../hooks/use-site-metadata"

const HeadComponent = ({ description, title, lang, ogImgOverride }) => {
  const metadata = useSiteMetadata()
  const metaDescription = description || metadata.descriptions[lang]
  const defaultTitle = metadata?.title
  const metaOgImg = ogImgOverride || defOgImage
  const metaTitle = title ? `${title} | ${defaultTitle}` : defaultTitle
  return (
    <>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="og:title" content={metaTitle} />
      <meta name="og:description" content={metaDescription} />
      <meta name="og:type" content="website" />
      <meta name="og:image" content={metadata.siteUrl + metaOgImg} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
    </>
  )
}

export default HeadComponent

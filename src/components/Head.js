import React from "react"
import defOgImage from "../images/def_og.png"
import { typography } from "../../style"
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
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href={`https://fonts.googleapis.com/css2?family=${typography.fontFamily
          .split(" ")
          .join("+")}:wght@${typography.fontWeights.join(";")}&display=swap`}
        rel="stylesheet"
      ></link>
    </>
    // <Helmet
    //   htmlAttributes={{
    //     lang,
    //   }}
    //   title={title ? `${title} | ${defaultTitle}` : defaultTitle}
    //   meta={[
    //     {
    //       name: `description`,
    //       content: metaDescription,
    //     },
    //     {
    //       property: `og:title`,
    //       content: title ? `${title} | ${defaultTitle}` : defaultTitle,
    //     },
    //     {
    //       property: `og:description`,
    //       content: metaDescription,
    //     },
    //     {
    //       property: `og:type`,
    //       content: `website`,
    //     },
    //     {
    //       property: `og:image`,
    //       content: site.siteMetadata.siteUrl + metaOgImg,
    //     },
    //     {
    //       name: `twitter:card`,
    //       content: `summary`,
    //     },
    //     {
    //       name: `twitter:title`,
    //       content: title ? `${title} | ${defaultTitle}` : defaultTitle,
    //     },
    //     {
    //       name: `twitter:description`,
    //       content: metaDescription,
    //     },
    //   ].concat(meta)}
    // />
  )
}

export default HeadComponent

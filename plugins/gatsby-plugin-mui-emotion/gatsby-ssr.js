// /* eslint-disable import/prefer-default-export */

// import * as React from "react"

// import { CacheProvider } from "@emotion/react"
// import createEmotionServer from "@emotion/server/create-instance"
// import getEmotionCache from "./getEmotionCache"
// import { renderToString } from "react-dom/server"

// export const replaceRenderer = ({
//   bodyComponent,
//   setHeadComponents,
//   replaceBodyHTMLString,
// }) => {
//   const cache = getEmotionCache()
//   const { extractCriticalToChunks } = createEmotionServer(cache)

//   const emotionStyles = extractCriticalToChunks(
//     renderToString(<CacheProvider value={cache}>{bodyComponent}</CacheProvider>)
//   )

//   setHeadComponents(
//     emotionStyles.styles.map((style) => (
//       <style
//         data-emotion={`${style.key} ${style.ids.join(" ")}`}
//         key={style.key}
//         // eslint-disable-next-line react/no-danger
//         dangerouslySetInnerHTML={{ __html: style.css }}
//       />
//     ))
//   )

//   // render the result from `extractCritical`
//   replaceBodyHTMLString(emotionStyles.html)
// }

// import * as React from "react"

// import { CacheProvider } from "@emotion/react"
// import createEmotionServer from "@emotion/server/create-instance"
// import getEmotionCache from "./getEmotionCache"
// import { renderToString } from "react-dom/server"

// // Inject MUI styles first to match with the prepend: true configuration.
// export const onPreRenderHTML = ({
//   getHeadComponents,
//   replaceHeadComponents,
// }) => {
//   const headComponents = getHeadComponents()
//   headComponents.sort((x, y) => {
//     if (x.key === "emotion-css-global" || x.key === "emotion-css") {
//       return -1
//     }
//     if (y.key === "style") {
//       return 1
//     }
//     return 0
//   })
//   headComponents.sort((a, b) => {
//     if (a.props && a.props["data-react-helmet"]) {
//       return 0
//     }
//     return 1
//   })
//   replaceHeadComponents(headComponents)
// }

// export const replaceRenderer = ({
//   bodyComponent,
//   setHeadComponents,
//   replaceBodyHTMLString,
// }) => {
//   const cache = getEmotionCache()
//   const { extractCriticalToChunks } = createEmotionServer(cache)

//   const emotionStyles = extractCriticalToChunks(
//     renderToString(<CacheProvider value={cache}>{bodyComponent}</CacheProvider>)
//   )

//   setHeadComponents(
//     emotionStyles.styles.map((style) => (
//       <style
//         data-emotion={`${style.key} ${style.ids.join(" ")}`}
//         key={`emotion-${style.key}`}
//         // eslint-disable-next-line react/no-danger
//         dangerouslySetInnerHTML={{ __html: style.css }}
//       />
//     ))
//   )

//   // render the result from `extractCritical`
//   replaceBodyHTMLString(emotionStyles.html)
// }

// // /* eslint-disable import/prefer-default-export */
// // import * as React from 'react';
// // import { CacheProvider } from '@emotion/react';
// // import createEmotionServer from '@emotion/server/create-instance';
// // import { renderToString } from 'react-dom/server';
// // import getEmotionCache from './getEmotionCache';

// // export const replaceRenderer = ({ bodyComponent, setHeadComponents, replaceBodyHTMLString }) => {
// //   const cache = getEmotionCache();
// //   const { extractCriticalToChunks } = createEmotionServer(cache);

// //   const emotionStyles = extractCriticalToChunks(
// //     renderToString(<CacheProvider value={cache}>{bodyComponent}</CacheProvider>),
// //   );

// //   setHeadComponents(
// //     emotionStyles.styles.map((style) => (
// //       <style
// //         data-emotion={`${style.key} ${style.ids.join(' ')}`}
// //         key={style.key}
// //         // eslint-disable-next-line react/no-danger
// //         dangerouslySetInnerHTML={{ __html: style.css }}
// //       />
// //     )),
// //   );

// //   // render the result from `extractCritical`
// //   replaceBodyHTMLString(emotionStyles.html);
// // };

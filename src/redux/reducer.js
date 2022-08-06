import {
  SET_AT_TOP,
  SET_DISABLE_PROMPT,
  SET_FONT_LOADED,
  SET_IS_LANDSCAPE,
  SET_IS_MOBILE,
  SET_LANGUAGE,
  SET_LOCATION_ID,
  SET_PAGE_ANIMATING,
  SET_SHOW_MOBILE_MENU,
  SET_SITE_READY,
  SET_TOAST,
} from "./types"

const initialState = {
  isMobile: null,
  isLandscape: null,
  fontLoaded: false,
  siteReady: false,
  language: "",
  atTop: null,
  disablePrompt: false,
  locationId: "",
  showMobileMenu: false,
  pageAnimating: true,
  toast: {
    open: false,
    severity: "success",
    msg: "",
  },
}

export const reducer = (state = initialState, { type, payload }) => {
  const newState = Object.assign({}, state)
  switch (type) {
    case SET_IS_MOBILE:
      newState.isMobile = payload
      break
    case SET_IS_LANDSCAPE:
      newState.isLandscape = payload
      break
    case SET_FONT_LOADED:
      newState.fontLoaded = payload
      break
    case SET_LANGUAGE:
      newState.language = payload
      break
    case SET_AT_TOP:
      newState.atTop = payload
      break
    case SET_DISABLE_PROMPT:
      newState.disablePrompt = payload
      break
    case SET_LOCATION_ID:
      newState.locationId = payload
      break
    case SET_SITE_READY:
      newState.siteReady = payload
      break
    case SET_SHOW_MOBILE_MENU:
      newState.showMobileMenu = payload
      break
    case SET_PAGE_ANIMATING:
      newState.pageAnimating = payload
      break
    case SET_TOAST:
      newState.toast = payload
      break
    default:
      break
  }
  return newState
}

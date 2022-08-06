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

export const setIsMobile = (payload) => ({
  type: SET_IS_MOBILE,
  payload,
})

export const setFontLoaded = (payload) => ({
  type: SET_FONT_LOADED,
  payload,
})

export const setLanguage = (payload) => ({
  type: SET_LANGUAGE,
  payload,
})

export const setAtTop = (payload) => ({
  type: SET_AT_TOP,
  payload,
})

export const setDisablePrompt = (payload) => ({
  type: SET_DISABLE_PROMPT,
  payload,
})

export const setLocationId = (payload) => ({
  type: SET_LOCATION_ID,
  payload,
})

export const setSiteReady = (payload) => ({
  type: SET_SITE_READY,
  payload,
})

export const setIsLandscape = (payload) => ({
  type: SET_IS_LANDSCAPE,
  payload,
})

export const setShowMobileMenu = (payload) => ({
  type: SET_SHOW_MOBILE_MENU,
  payload,
})

export const setPageAnimating = (payload) => ({
  type: SET_PAGE_ANIMATING,
  payload,
})

export const setToast = (payload) => ({
  type: SET_TOAST,
  payload,
})

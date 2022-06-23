import { SET_IS_MOBILE } from "./types"

const initialState = {
  isMobile: null,
}

export const reducer = (state = initialState, { type, payload }) => {
  const newState = Object.assign({}, state)

  switch (type) {
    case SET_IS_MOBILE:
      newState.isMobile = payload
      break
    default:
      break
  }
  return newState
}

const initState = {
  previousAyah: {},
  nextAyah: {}
}

export default (state = initState, action) => {
  switch (action.type) {
    case "SET_NEXT_AYAH":
      return ({
        ...state,
        nextAyah: action.ayah
      })
    case "SET_PREVIOUS_AYAH":
      return ({
        ...state,
        previousAyah: action.ayah
      })
    default:
      return state
  }
}

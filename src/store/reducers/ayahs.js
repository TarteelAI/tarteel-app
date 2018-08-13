const initState = {
  count: 0,
  currentAyah: {
    line: "",
    surah: "",
    ayah: "",
    hash: 0
  },
}

export default (state = initState  , action) => {
  switch (action.type) {
    case "SET_AYAHS":
      return ({
        ...state,
        count: action.val
      })
    case "INCREASE_AYAHS":
      return ({
        ...state,
        count: state.count + 1
      })
    case "SET_CURRENT_AYAH":
      return ({
        ...state,
        currentAyah: action.currentAyah
      })
    case "RESET_CURRENT_AYAH":
      return ({
        ...state,
        currentAyah: {}
      })
    default:
      return state
  }
}

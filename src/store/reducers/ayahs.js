const initState = {
  count: 0
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
    default:
      return state
  }
}

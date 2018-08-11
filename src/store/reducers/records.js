const initState = {
  count: 0
}

export default (state = initState  , action) => {
  switch (action.type) {
    case "INCREASE_RECORDS":
      return ({
        ...state,
        count: state.count + 1
      })
    case "RESET_RECORDS":
      return ({
        ...state,
        count: 0
      })
    case "SET_RECORDS":
      return ({
        ...state,
        count: action.val
      })
    case "SET_LAST_DATE":
      return ({
        ...state,
        lastDate: action.val
      })
    default:
      return state
  }
}

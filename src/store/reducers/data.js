const initState = {
  totalAyahsCount: 0,
  passedOnBoarding: false
}

export default (state = initState, action) => {
  switch (action.type) {
    case "SET_TOTAL_AYAHS_COUNT":
      return ({
        ...state,
        totalAyahsCount: action.count
      })
    case "SET_PASSED_ON_BOARDING":
      return ({
        ...state,
        passedOnBoarding: action.value
      })
    default:
      return state
  }
}

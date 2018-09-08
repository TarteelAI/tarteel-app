const initState = {
  totalAyahsCount: 0,
  passedOnBoarding: "",
  continuous: ""
}

export default (state = initState, action) => {
  switch (action.type) {
    case "SET_TOTAL_AYAHS_COUNT":
      return ({
        ...state,
        totalAyahsCount: action.count
      })
    case "INCREASE_TOTAL_COUNT":
      return ({
        ...state,
        totalAyahsCount: state.totalAyahsCount + 1
      })
    case "SET_PASSED_ON_BOARDING":
      return ({
        ...state,
        passedOnBoarding: action.value
      })
    case "SET_CONTINUOUS":
      return ({
        ...state,
        continuous: action.val
      })
    case "SET_LOCALE":
      return({
        ...state,
        locale: action.locale
      })
    default:
      return state
  }
}

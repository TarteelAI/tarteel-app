export default (state = {}, action) => {
  switch (action.type) {
    case "SET_DEMOGRAPHIC_DATA":
      return action.obj
    default:
      return state
  }
}

import { AsyncStorage } from "react-native"
import showError from "../../utils/showError"

export const setDemographicData = (obj) => {
  return async (dispatch, getState) => {
    try {
      await AsyncStorage.setItem('demographicData', JSON.stringify(obj))
      dispatch({
        type: "SET_DEMOGRAPHIC_DATA",
        obj
      })
    } catch (error) {
      showError(error.message)
    }
  }
}


export const getDemographicData = () => {
  return async (dispatch, getState) => {
    try {
      const obj = await AsyncStorage.getItem('demographicData') || {}
      dispatch({
        type: "SET_DEMOGRAPHIC_DATA",
        obj: JSON.parse(obj)
      })
    } catch (error) {
      showError(error.message)
    }
  }
}

import { AsyncStorage } from "react-native"
import showError from "../../utils/showError"


export const increaseRecords = () => {
  return async (dispatch, getState) => {
    try {
      await AsyncStorage.setItem('recordsCount', String(getState().records.count + 1))
      dispatch({
        type: "INCREASE_RECORDS"
      })
    } catch (error) {
      showError(error.message)
    }
  }
}

export const resetRecords = () => {
  return async (dispatch, getState) => {
    try {
      await AsyncStorage.setItem('recordsCount', String(0))
      dispatch({
        type: "RESET_RECORDS"
      })
    } catch (error) {
      showError(error.message)
    }
  }
}

export const setRecords = (val) => {
  return async (dispatch, getState) => {
    try {
      await AsyncStorage.setItem('recordsCount', String(val))
      dispatch({
        type: "SET_RECORDS",
        val
      })
    } catch (error) {
      showError(error.message)
    }
  }
}


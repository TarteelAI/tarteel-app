import { AsyncStorage } from "react-native"
import showError from "../../utils/showError"

export const setAyahs = (val) => {
  return async (dispatch, getState) => {
    try {
      await AsyncStorage.setItem('ayahsCount', String(val))
      dispatch({
        type: "SET_AYAHS",
        val
      })
    } catch (error) {
      showError(error.message)
    }
  }
}

export const getAyahs = () => {
  return async (dispatch, getState) => {
    try {
      const val = await AsyncStorage.getItem('ayahsCount')
      dispatch({
        type: "SET_AYAHS",
        val: Number(val)
      })
    } catch (error) {
      showError(error.message)
    }
  }
}

export const increaseAyahs = () => {
  return async (dispatch, getState) => {
    try {
      await AsyncStorage.setItem('ayahsCount', String(getState().ayahs.count + 1))
      dispatch({
        type: "INCREASE_AYAHS"
      })
    } catch (error) {
      showError(error.message)
    }
  }
}

export const setCurrentAyah = () => {
  return async (dispatch, getState) => {
    dispatch({
        type: "RESET_CURRENT_AYAH"
    })
    fetch("https://tarteel.io/get_ayah")
      .then(res => res.json())
      .then(json => {
          dispatch({
            type: "SET_CURRENT_AYAH",
            currentAyah: json
          })
      })
      .catch(e => {
          showError(e.message)
      })
  }
}

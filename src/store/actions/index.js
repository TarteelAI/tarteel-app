import { setRecords } from "./records"
import { setDemographicData } from "./demographicData"
import {setPassedOnBoardingScreen, setLastAyah} from "../../utils/index"
import { Actions } from "react-native-router-flux"
import showError from "../../utils/showError"
import {setAyahs} from "./ayahs";
import {AsyncStorage} from "react-native";

export const restoreRecords = () => {
  return (dispatch, getState) => {
    try {
      dispatch(setRecords(0))
      dispatch(setAyahs(0))
      dispatch(setDemographicData({}))
      setPassedOnBoardingScreen("")
      dispatch(setpassedOnBoarding(""))
      setLastAyah({})
      Actions.onBoarding()
    }
    catch (e) {
      showError(e.message);
    }
  }
}

export const getTotalAyahsCount = () => {
  return (dispatch, getState) => {
    fetch("https://tarteel.io/get_total_count/")
      .then(res => res.json())
      .then(json => {
        dispatch({
          type: "SET_TOTAL_AYAHS_COUNT",
          count: json.count
        })
      })
      .catch((e) => {
        showError(e.message);
      })
  }
}

export const setpassedOnBoarding = (value) => {
  return async (dispatch, getState) => {
    try {
      await AsyncStorage.setItem('passedOnBoarding', String(value))
      dispatch ({
        type: "SET_PASSED_ON_BOARDING",
        value
      })
    } catch (error) {
      throw new Error(error.message)
    }
  }
}
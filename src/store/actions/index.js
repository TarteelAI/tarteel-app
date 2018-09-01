import { setRecords } from "./records"
import { setDemographicData } from "./demographicData"
import {setPassedOnBoardingScreen, setLastAyah} from "../../utils/index"
import { Actions } from "react-native-router-flux"
import showError from "../../utils/showError"
import {setAyahs, setRandomAyah} from "./ayahs";
import {AsyncStorage} from "react-native";

export const restoreRecords = () => {
  return (dispatch, getState) => {
    try {
      dispatch(setRecords(0))
      dispatch(setAyahs(0))
      dispatch(setDemographicData({}))
      setPassedOnBoardingScreen("")
      dispatch(setpassedOnBoarding(""))
      dispatch(setContinuous(""))
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

export const increaseTotalCount = () => ({
  type: "INCREASE_TOTAL_COUNT"
})

export const setpassedOnBoarding = (value) => {
  return (dispatch, getState) => {
    try {
      AsyncStorage.setItem('passedOnBoarding', String(value))
      dispatch ({
        type: "SET_PASSED_ON_BOARDING",
        value: Boolean(value)
      })
    } catch (e) {
      showError(e.message);
    }
  }
}

export const setContinuous = val => {
 return (dispatch, getState) => {
   try {
     AsyncStorage.setItem("continuous", String(val))
     dispatch({
       type: "SET_CONTINUOUS",
       val: Boolean(val)
     })
   } catch (e) {
     showError(e.message);
   }
 }
}
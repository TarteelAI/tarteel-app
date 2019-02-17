import { setRecords } from "./records"
import { setDemographicData } from "./demographicData"
import {setPassedOnBoardingScreen, setLastAyah} from "../../utils/index"
import { Actions } from "react-native-router-flux"
import showError from "../../utils/showError"
import {setAyahs, setRandomAyah} from "./ayahs";
import {AsyncStorage} from "react-native";
import I18n from "ex-react-native-i18n";
import App from "../../../App"
import {bindNotifications} from "../../utils/notification";

const API_URL = 'https://api.tarteel.io';

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
    const sessionId = getState().data.sessionId;

    return fetch(`${API_URL}/get_total_count/?format=json`, {
      headers: {
        "Content-Type": "application/json",
        'Cookie': `sessionid=${sessionId}`,
      }
    })
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

export const setLocale = locale => {
 return (dispatch, getState) => {
   try {
     if (locale) AsyncStorage.setItem("locale", locale)
     dispatch({
       type: "SET_LOCALE",
       locale
     })
     I18n.locale = (locale) ? locale.replace(/_/, '-') : '';
   } catch (e) {
     showError(e.message);
   }
 }
}

export const setNotificationIteration = value => {
  return (dispatch, getState) => {
    try {
      if (value) {
        AsyncStorage.setItem("notifications", value),
        dispatch({
          type: "SET_NOTIFICATION_ITERATION",
          value
        })
        bindNotifications(value)
      }
    } catch (e) {
      showError(e.message);
    }
  }
}

export const setFontSize = value => {
  return (dispatch, getState) => {
    try {
      if (value) {
        AsyncStorage.setItem("fontSize", value),
          dispatch({
            type: "SET_FONT_SIZE",
            value
          })
      }
    } catch (e) {
      showError(e.message);
    }
  }
}


export const setSessionId = (sessionId) => {
  return (dispatch, getState) => {
    try {
      if (sessionId) {
        AsyncStorage.setItem("sessionId", sessionId),
          dispatch({
            type: "SET_SESSION_ID",
            payload: sessionId
          })
      }
    } catch (e) {
      showError(e.message);
    }
  }
}

export const getSessionId = () => {
  return async (dispatch, getState) => {
    try {
      const sessionId = await AsyncStorage.getItem("sessionId");
        dispatch({
          type: "SET_SESSION_ID",
          payload: sessionId
        })
    } catch (e) {
      showError(e.message);
    }
  }
}

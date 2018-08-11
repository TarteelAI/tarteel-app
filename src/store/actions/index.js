import { setRecords } from "./records"
import { setDemographicData } from "./demographicData"
import { setPassedOnBoarding } from "../../utils/index"
import { Actions } from "react-native-router-flux"
import showError from "../../utils/showError"

export const restoreRecords = () => {
  return (dispatch, getState) => {
    try {
      dispatch(setRecords(0))
      dispatch(setDemographicData({}))
      setPassedOnBoarding("")
      Actions.onBoarding()
    }
    catch (e) {
      showError(e.message);
    }
  }
}

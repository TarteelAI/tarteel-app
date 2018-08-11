import {AsyncStorage} from "react-native";
import {setRecords} from "../store/actions/records";

export const setPassedOnBoarding = async (val) => {
  try {
    await AsyncStorage.setItem('passedOnBoarding', String(val))
  } catch (error) {
    throw new Error(error.message)
  }
}


export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


export const checkDayReset = (store) => {
  const { lastDate } = store.getState().records
  const onDayMS = 1000*60*60*24
  const today = new Date()
  const diff = today.getTime() - lastDate
  if(lastDate) {
    if(diff > onDayMS ) {
      store.dispatch(setRecords(0))
    }
  }
}
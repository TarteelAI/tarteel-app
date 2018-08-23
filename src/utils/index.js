import {AsyncStorage} from "react-native";
import showError from "./showError";

export const setPassedOnBoardingScreen = async (val) => {
  try {
    await AsyncStorage.setItem('passedOnBoardingScreen', String(val))
  } catch (error) {
    throw new Error(error.message)
  }
}

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const setLastAyah = (ayah) => {
  try {
    AsyncStorage.setItem("lastAyah", JSON.stringify(ayah))
  } catch (e) {
    console.log(e.message)
  }
}
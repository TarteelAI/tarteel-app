import { Constants } from "expo";
import { Dimensions, StyleSheet } from "react-native"

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    height: Constants.statusBarHeight,
    position: "absolute",
    top: 0,
    left: 0,
    width,
    zIndex: 5,
  }
})
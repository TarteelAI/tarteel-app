import {StyleSheet, Dimensions} from "react-native";

const { height, width } = Dimensions.get("window")

const footerHeight = 65

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: width ,
    height: footerHeight ,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerTab: {
    flex: 1,
    height: footerHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  white: {
    color: "#fff"
  },
  buttonWrapper: {
    flex: 1,
    width: width * .5,
    height: footerHeight
  },
  buttonContent: {
    justifyContent: "center",
    alignItems: "center",
    height: footerHeight
  }
})
import {StyleSheet} from "react-native";

const containerHeight = 35
const containerWidth = 250

export default StyleSheet.create({
  container: {
    width: containerWidth,
    height: containerHeight,
    borderRadius: 23,
    overflow: "hidden"
  },
  background: {
    width: containerWidth,
    height: containerHeight,
    backgroundColor: "#D8D8D8"
  },
  foreground: {
    width: 0,
    height: containerHeight,
    backgroundColor: "#A8A8A8",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2
  },
  playButton: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 30,
    height: 50,
    zIndex: 5
  }
})



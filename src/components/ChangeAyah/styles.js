import { StyleSheet, Dimensions } from "react-native"

const { width, height } = Dimensions.get("window")

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center",
  },
  content: {
    paddingHorizontal: 25,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontFamily: "Proxima-Nova-Alt-Regular",
  },
  imageWrapper: {
    borderWidth: 2,
    borderColor: "lightgray",
    marginTop: height * 0.035,
  },
  exampleImage: {
    width: 0.75 * width,
    height: 0.75 * height,
    resizeMode: 'stretch',
  }
})
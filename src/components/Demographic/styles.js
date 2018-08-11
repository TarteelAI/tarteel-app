import {Dimensions, StyleSheet} from "react-native"

const { width, height } = Dimensions.get("window")

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center",
    paddingVertical: height * 0.05
  },
  figure: {
    position: "relative",
    height: height * 0.30,
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {

  },
  figcaption: {
    position: "absolute",
    top: 0,
    left: 0.25 * width,
    right: 0,
    bottom: 0,
  },
  title: {
    color: "#485364",
    fontSize: 18,
    fontFamily: "Proxima-Nova-Alt-Regular",
    fontWeight: "400",
    marginTop: 65,
    marginBottom: 10
  },
  text: {
    color: '#a5aab2',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: "center",
    fontFamily: "Proxima-Nova-Alt-Regular",
    marginVertical: 10,
    paddingHorizontal: 20
  },
  white: {
    color: "#fff"
  },
  bottomButtons: {
    position: "absolute",
    bottom: height * 0.05,
    alignItems: "center"
  },
  note: {
    color: "gray",
    marginTop: 10
  },
})
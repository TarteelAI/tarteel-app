import { StyleSheet, Dimensions } from "react-native"

const { width, height } = Dimensions.get("window")

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center"
  },
  swiperWrapper: {
    width,
    height: height * 0.9,
    marginVertical: 25,
  },
  slide1: {
    flex: 1,
    padding: 25,
    alignItems: 'center',
  },
  slide2: {
    flex: 1,
    padding: 25,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  slide3: {
    flex: 1,
    padding: 25,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    color: "#485364",
    fontSize: 18,
    fontFamily: "Proxima-Nova-Alt-Regular",
    fontWeight: "400",
    marginTop: 75,
    lineHeight: 25
  },
  text: {
    color: '#a5aab2',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: "center",
    fontFamily: "Proxima-Nova-Alt-Regular",
    marginVertical: 10,
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
  slideButton: {
    alignItems: "center"
  },
  white: {
    color: "#fff"
  },
  link: {
    color: "#5ec49e"
  }
})
import {Dimensions, StyleSheet} from "react-native"

const { width, height } = Dimensions.get("window")

export default (props) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: "center",
  },
  scrollView: {
    width,
    flex: 1,
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
    flexDirection: 'column',
    marginTop: 50,
    marginBottom: 25
  },
  ayahsCount: {
    fontSize: 36,
    fontFamily: "Proxima-Nova-Alt-Regular",
    fontWeight: "400",
    textAlign: 'center',
  },
  titleText: {
    fontSize: 16,
    fontFamily: "Proxima-Nova-Alt-Regular",
    fontWeight: "400",
    textAlign: 'center',
    lineHeight: 25
  },
  textContainer: {
    marginTop: height * 0.05
  },
  text: {
    color: '#878a91',
    fontSize: 16,
    fontWeight: '400',
    textAlign: props.locale === "ar" ? "right" : "left",
    fontFamily: "Proxima-Nova-Alt-Regular",
    marginVertical: 10,
    paddingHorizontal: 20
  },
  aboutTitle: {
    fontSize: 18,
    color: "#7a7e7b",
    paddingHorizontal: 20,
    fontFamily: "Proxima-Nova-Alt-SemiBold",
    writingDirection: props.locale === "ar" ? 'rtl' : 'ltr'
  },
  white: {
    color: "#fff"
  },
  bottomButtons: {
    alignItems: "center",
    marginVertical: 50
  },
  list: {
    paddingHorizontal: 20,
    marginBottom: 20
  },
  listItem: {
    paddingVertical: 5,
    color: '#878a91',
    fontSize: 16,
    fontWeight: '400',
    textAlign: props.locale === "ar" ? "right" : "left",
    fontFamily: "Proxima-Nova-Alt-Regular",
  },
  link: {
    paddingVertical: 10,
    paddingLeft: 10,
  },
  linkText: {
    color: "#5EC49E",
    fontWeight: "bold",
    textAlign: props.locale === "ar" ? "right" : "left",
  }
})

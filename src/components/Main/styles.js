import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window")

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    transform: [ { translateY: 5 } ]
  },
  left: {
    transform: [ { translateY: 9 } ],
    display: "flex",
    flexDirection: "row",
  },
  mainScreenCounter: {
    fontSize: 18,
    color: "#676A75",
    fontWeight: "bold"
  },
  ayahWrapper: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  imageWrapper: {
    flex: 1,
  },
  ayahImage: {
    width,
    height: 250,
    resizeMode: "contain",
  },
  ayahPositionText: {
    color: "#9fa1a8",
    fontSize: 14,
    letterSpacing: 3,
    fontWeight: "500",
    marginBottom: 0,
  },
  leftIconFigure: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  leftIconFigcaption: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  leftIconImageWrapper: {
    zIndex: 2,
    position: "relative",
    left: 0,
    top: 10
  },
  recordButtonWrapper: {
    maxHeight: 135,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  wrapper: {
    maxHeight: 150,
    justifyContent: "flex-end",
    alignItems: 'center',
    padding: 10,
  },
  white: {
    color: "#fff"
  },
  recordingButtonsWrapper: {
    maxHeight: 250,
    marginBottom: 30,
  },
  navigationButtons: {
    top: -40,
    flexDirection: "row",
    justifyContent: "space-between",
    width: 225,
    left: -10,
  },
  navigationButton: {
    bottom: 25,
  },
  navigationButtonText: {
    fontFamily: "Proxima-Nova-Alt-Regular",
    fontWeight: "400",
    textAlign: 'center',
    color: "#a5aab2",
  },
  exclamationIcon: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  continuousSwitch: {
    alignItems: "center",
    bottom: height * 0.04,
  },
  continuousSwitchText: {
    color: "#A5AAB2",
    fontSize: 13,
    marginTop: 7
  },
});

import { StyleSheet, Dimensions, Platform } from "react-native";

const { height, width } = Dimensions.get("window")

const os = Platform.OS;

export default props => StyleSheet.create({
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
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  ayahText: {
    textAlign: "center",
    paddingHorizontal: 20,
    fontSize: os === "android" ? 16 : 18,
    minHeight: 100,
    fontWeight: "bold",
    marginBottom: 15,
    lineHeight: 30,
    color: "#393e4e",
    fontFamily: "Uthmanic",
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
    width: props.locale === "ar" ? 250 : 225,
    left: props.locale === "ar" ? -4 : -10,
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
  tooltipContainer: {
    flex: 1,
  },
  arrow: {
    position: 'absolute',
    borderColor: 'transparent',
    borderWidth: 6,
  },
  tooltip: {
    position: 'absolute',
    paddingTop: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 3,
    overflow: 'hidden',
  },
  bottomBar: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  tooltipButton: {
    paddingVertical: 10
  },
  tooltipButtonText: {
    color: "#5ec49e"
  }
});

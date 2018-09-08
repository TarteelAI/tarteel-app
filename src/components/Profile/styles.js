import { StyleSheet, Dimensions } from "react-native"

const { height, width } = Dimensions.get("window")

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: width * 0.05
  },
  title: {
    color: "#485364",
    fontFamily: "Proxima-Nova-Alt-Regular",
    fontSize: 18,
    fontWeight: '400'
  },
  list: {
    borderTopWidth: 1,
    borderColor: "#ebebeb",
    marginTop: height * 0.05,
  },
  listItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ebebeb",
  },
  listItemText: {
    color: "#485364",
    fontFamily: "Proxima-Nova-Alt-Regular",
    fontSize: height * 0.025,
    fontWeight: '400',
    lineHeight: 25
  },
  progressContainer: {
    alignItems: 'center',
    marginTop: height * 0.03,
  },
  ayahsCount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#485364",
    textAlign: "center"
  },
  progressText: {
    color: "#485364",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Proxima-Nova-Alt-SemiBold",
    lineHeight: 25
  },
  progressNote: {
    color: "gray",
    textAlign: "center"
  }
})

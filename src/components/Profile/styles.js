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
  list: {
    borderTopWidth: 1,
    borderColor: "#ebebeb",
    marginTop: height * 0.08,
  },
  listItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ebebeb",
  },
  primaryColor: {
    color: "#485364",
    fontFamily: "Proxima-Nova-Alt-Regular",
    fontSize: 18,
    fontWeight: '400'
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
  },
  progressNote: {
    color: "gray",
    textAlign: "center"
  }
})

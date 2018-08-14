import { StyleSheet, Dimensions } from "react-native"

const { height, width } = Dimensions.get("window")

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  ayahsCount: {
    alignItems: 'center',
    marginTop: height * 0.05
  },
  content: {
    flex: 1,
    paddingHorizontal: width * 0.05

  },
  list: {
    borderTopWidth: 1,
    borderColor: "#ebebeb",
    marginTop: height * 0.15,
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
  }
})

import { StyleSheet, Dimensions } from "react-native"

const { height, width } = Dimensions.get("window")

export default StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  content: {
    paddingVertical: 15
  },
  searchBar :{
    marginBottom: 15,
    paddingHorizontal: 15
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 23,
    paddingHorizontal: 15,
    textAlign: "center"
  },
  listWrapper: {
    backgroundColor: "transparent",
    height: height * 0.75,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "lightgray",
    borderWidth: 1,
    backgroundColor: "#fff",
    borderBottomWidth: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 60
  },
  english: {
    fontSize: 18,
    lineHeight: 45,
    fontFamily: "Proxima-Nova-Alt-Regular",
    color: "#393e4e"
  },
  arabic: {
    fontFamily: "Uthmanic",
    fontSize: 25,
    color: "#393e4e",
    lineHeight: 45,
  }
})
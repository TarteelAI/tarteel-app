import { StyleSheet, Dimensions } from "react-native"

const { height, width } = Dimensions.get("window")

export default StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  content: {
    paddingVertical: 15,
    flex: 1,
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
    flexGrow: 1,
    marginBottom: 50,
  },
  listItem: {
    borderColor: "lightgray",
    borderWidth: 1,
    backgroundColor: "#fff",
    borderBottomWidth: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 65
  },
  text: {
    fontFamily: "Uthmanic",
    fontSize: 25,
    color: "#393e4e",
    lineHeight: 60,
  },
  number: {
    marginLeft: 10,
    color: "lightgray"
  }
})
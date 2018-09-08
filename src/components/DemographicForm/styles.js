import { StyleSheet, Dimensions } from "react-native"

const { height, width } = Dimensions.get("window")

export default (props) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  content: {
    paddingVertical: height * 0.1,
    alignItems: "center",
    flex: 1,
  },
  form: {
  },
  formRow: {
    flexDirection: props.locale === "ar" ? "row-reverse" : "row",
    marginBottom: 20,
    minWidth: (width / 12) * 5,
    justifyContent: "space-between",
  },
  inputLabel: {
    marginRight: props.locale === "ar" ? 0 : width * 0.05,
    color: "#a5aab2",
    fontFamily: "Proxima-Nova-Alt-Regular",
    bottom: props.locale === "ar" ? -2 : -5,
    position: 'relative',
    textAlign: props.locale === "ar" ? "right" : "left",
  },
  input: {
    minWidth: 75,
    height: 20,
    borderColor: 'gray',
    textAlign: "right"
  },
  dropdown: {
    borderBottomWidth: 0,
    borderBottomColor: 'transparent',
    position: "absolute",
    top: -2 ,
    width: props.locale === "ar" ? 50 : 1000,
    height: 1000,
    paddingLeft: -5
  },
  dropdownInputContainer: {
    borderBottomColor: 'transparent',
    minWidth: 100
  },
  bottomButton: {
    position: "absolute",
    bottom: height * 0.05,
    alignItems: "center"
  },
  white: {
    color: "#fff"
  }
})

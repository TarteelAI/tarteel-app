import { StyleSheet } from "react-native"


export default (props) =>
  StyleSheet.create({
    container: {
      height: props.Height || 65,
      width:  props.Width || 65,
      backgroundColor: "transparent",
      borderRadius: 50,
    },
    wrapper: {
      minWidth: props.Width || 65,
      minHeight: props.Height || 65,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: props.radius || 50,
      backgroundColor: props.color || "#408F84",
      // overflow: "hidden",
    },
    ripple: {
      height: props.Height || 65,
      width: props.Width || 65,
    }
  })
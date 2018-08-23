import React from "react"
import { View } from "react-native"
import styles from "./styles";

export default class Navbar extends React.Component {
  render() {
    const { style } = this.props
    return (
      <View style={[styles.container, style]}>
        { this.props.children }
      </View>
    )
  }
}
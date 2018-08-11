import React from "react"
import Ripple from 'react-native-material-ripple';
import { View, Animated, TouchableWithoutFeedback } from "react-native"

import stylesFactory from "./styles"

export default class Button extends React.Component {
  render() {
    const styles = stylesFactory(this.props)
    return (
      <Ripple rippleContainerBorderRadius={50} style={styles.ripple} {...this.props}>
        <View style={styles.wrapper}>
          { this.props.children }
        </View>
      </Ripple>
    )
  }
}

import React from "react"
import Ripple from 'react-native-material-ripple';
import { View } from "react-native"

import styles from "./styles"

export default class Button extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Ripple rippleContainerBorderRadius={50} style={styles.ripple} {...this.props}>
          <View style={styles.wrapper}>
            { this.props.children }
          </View>
        </Ripple>
      </View>
    )
  }
}

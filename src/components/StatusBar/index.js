import React from "react"
import { View, StatusBar } from "react-native"

import styles from "./styles";

export default () => (
  <View style={styles.container}>
    <StatusBar backgroundColor="transparent" barStyle="dark-content" />
  </View>
)

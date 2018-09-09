import React from "react"
import { View, ActivityIndicator, StyleSheet } from "react-native"

export default () => (
  <View style={styles.container}>
    <ActivityIndicator size={50} color="#5ec49e" />
  </View>
)


const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(255,255,255,0.5)",
    justifyContent: 'center',
    alignItems: "center"
  },
})
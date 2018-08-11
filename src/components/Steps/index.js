import React from "react"
import { View, StyleSheet } from "react-native"
import { connect }  from "react-redux"

class Steps extends React.Component {
  render() {
    const range = (n) => ",".repeat(n-1).split(",")
    const count = this.props.recordsCount
    return (
      <View style={styles.container}>
        {
          range(5).map((n, i) => {
            return (
              <View key={i} style={[styles.step, i <= count ? styles.activeStep : {}]}/>
            )
          })
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    position: "absolute",
    bottom: 25,
  },
  step: {
    backgroundColor: "#D5D5D5",
    height: 6,
    width: 6,
    borderRadius: 50,
    marginHorizontal: 3
  },
  activeStep: {
    backgroundColor: "#5EC49E"
  }
})

export default connect(
  state => ({
    recordsCount: state.records.count
  })
)(Steps)
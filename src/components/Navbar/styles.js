import React from "react"
import { Dimensions, TouchableHighlight, StyleSheet, View } from "react-native"
import { Constants } from "expo"

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    height: 50,
    position: "absolute",
    top: Constants.statusBarHeight + 5 ,
    left: 0,
    zIndex: 5,
    width: width,
  },
  right: {
    position: "absolute",
    right: 10,
  },
  left: {
    position: "absolute",
    left: 10,
  },
  menuIcon: {

  }
})

export const MenuButton = (props) => {
  const customMenuBar = (width = 35) => ({
    height: 5,
    width: width,
    marginBottom: 5,
    borderRadius: 10,
    backgroundColor: "#000",
    alignSelf: "flex-end",
  })
  return (
    <TouchableHighlight onPress={props.onPress}>
      <View>
        <View style={customMenuBar()}/>
        <View style={customMenuBar()}/>
        <View style={customMenuBar(25)}/>
      </View>
    </TouchableHighlight>
  )
}
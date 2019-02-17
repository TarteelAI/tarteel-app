import React from "react"
import { Dimensions, TouchableHighlight, StyleSheet, View } from "react-native"
import { Constants } from "expo"

const {height, width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    height: 50,
    top: 5 ,
    left: 0,
    zIndex: 5,
    width: width,
  },
  right: {
    position: "absolute",
    right: 10,
    zIndex: 2
  },
  left: {
    position: "absolute",
    left: 10,
    zIndex: 2
  },
  center: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Proxima-Nova-Alt-Regular",
    lineHeight: 35,
    // backgroundColor: "red",
  },
  menuIcon: {

  }
})

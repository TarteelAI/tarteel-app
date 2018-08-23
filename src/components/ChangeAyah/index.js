import React from "react"
import { View, Text, Image } from "react-native"
import { Actions } from "react-native-router-flux"
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Button from "../Button"
import StatusBar from "../StatusBar"
import Navbar from "../Navbar"

import NavbarStyles  from "../Navbar/styles"

import styles from "./styles";

class ChangeAyah extends React.Component {
  render() {
    return (
      <View style={styles.container} >
        <StatusBar />
        <Navbar>
          <View style={NavbarStyles.left} >
            <Button color={"transparent"} Height={35} Width={35} radius={0} onPress={Actions.pop}>
              <MaterialCommunityIcons name={"keyboard-backspace"} size={32} color={"#474f59"} />
            </Button>
          </View>
          <View >
            <Text style={NavbarStyles.center} >Changing Surah / Ayah</Text>
          </View>
        </Navbar>
        <View style={styles.content}>
          <Text style={styles.text}>
            You can change Surah or Ayah by clicking on the ayah number under the text.
          </Text>
          <View style={styles.imageWrapper}>
            <Image style={styles.exampleImage} source={require("../../../assets/imgs/change_example.png")} />
          </View>
        </View>
      </View>
    )
  }
}

export default ChangeAyah

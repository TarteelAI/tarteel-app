import React from "react"
import { connect }  from "react-redux"
import { View, Text, TouchableWithoutFeedback, Image } from "react-native"
import { Actions } from "react-native-router-flux"

import Button from "../Button"
import StatusBar from "../StatusBar"

import styles from "./styles";

class Demographic extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar />
        <View style={styles.figure}>
          <Image source={require("../../../assets/imgs/profile.png")} />
        </View>
        <Text style={styles.title}>
          Demographic Data
        </Text>
        <Text style={styles.text}>
          By sharing your demographic data, developers will be able to use it to build more robust and accurate Machine learning models. The data you share cannot be used to personally identify you. This step is completely optional, you can opt-in or skip below.
        </Text>
        <View style={styles.bottomButtons}>
          <Button radius={23} Width={150} Height={45} color={"#58BCB0"} onPress={Actions.demographicForm}>
            <Text style={styles.white}>
              Opt-in
            </Text>
          </Button>
          <TouchableWithoutFeedback onPress={Actions.home}>
            <View>
              <Text style={styles.note}>
                skip
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }
}

export default connect()(Demographic)

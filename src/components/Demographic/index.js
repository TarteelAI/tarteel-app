import React from "react"
import { connect }  from "react-redux"
import { View, Text, TouchableWithoutFeedback, Image } from "react-native"
import { Actions } from "react-native-router-flux"
import I18n from "ex-react-native-i18n"

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
          { I18n.t("demographic-info-link-text") }
        </Text>
        <Text style={styles.text}>
          { I18n.t("demographic-page-first-paragraph") }
        </Text>
        <View style={styles.bottomButtons}>
          <Button radius={23} Width={150} Height={45} color={"#58BCB0"} onPress={Actions.demographicForm}>
            <Text style={styles.white}>
              { I18n.t("demographic-page-button-text") }
            </Text>
          </Button>
          <TouchableWithoutFeedback onPress={Actions.home}>
            <View>
              <Text style={styles.note}>
                { I18n.t("skip-button-text") }
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }
}

export default connect()(Demographic)

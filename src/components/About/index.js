import React from "react"
import { connect }  from "react-redux"
import { View, Text, Linking, ScrollView, Image, TouchableWithoutFeedback } from "react-native"
import { Actions } from "react-native-router-flux"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import I18n from "ex-react-native-i18n"

import Button from "../Button"
import StatusBar from "../StatusBar"
import SnackBar from "../SnackBar"
import Navbar from "../Navbar"

import NavbarStyles  from "../Navbar/styles"

import { numberWithCommas } from "../../utils"
import showError from "../../utils/showError"

import stylesFactory from "./styles";

class About extends React.Component {
  handleContactUs = () => {
    Linking.openURL("mailto:tarteel@abdellatif.io")
  }
  handleLink = link => Linking.openURL(link)
  render() {
    const { totalAyahsCount } = this.props
    const styles = stylesFactory(this.props)
    return (
      <View style={styles.container} >
        <StatusBar />
        <Navbar>
          <View style={NavbarStyles.left} >
            <Button color={"transparent"} Height={35} Width={35} radius={0} onPress={Actions.pop}>
              <MaterialCommunityIcons name={"keyboard-backspace"} size={32} color={"#474f59"} />
            </Button>
          </View>
        </Navbar>
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.figure}>
            <Image  source={require("../../../assets/imgs/Logo.png")} />
          </View>
          <View style={styles.title}>
            <Text style={styles.ayahsCount}>{ numberWithCommas(totalAyahsCount) }</Text>
            <Text style={styles.titleText}>{ I18n.t("about-page-recited-ayahs-text") }</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.aboutTitle}>{ I18n.t("about-page-first-paragraph-title") }</Text>
            <Text style={styles.text}>
              { I18n.t("about-page-first-paragraph-text") }
            </Text>
            <Text style={styles.aboutTitle}>{ I18n.t("about-page-second-paragraph-title") }</Text>
            <Text style={styles.text}>
              { I18n.t("about-page-second-paragraph-text-1") }
            </Text>
            <Text style={styles.text}>
              { I18n.t("about-page-second-paragraph-text-2") }
            </Text>
            <View style={styles.list}>
              <Text style={styles.listItem}>
                • { I18n.t("fields-of-use-first-item") }
              </Text>
              <Text style={styles.listItem}>
                • { I18n.t("fields-of-use-second-item") }
              </Text>
              <Text style={styles.listItem}>
                • { I18n.t("fields-of-use-third-item") }
              </Text>
            </View>
            <Text style={styles.aboutTitle}>{ I18n.t("about-page-third-paragraph-title") }</Text>
            <Text style={styles.text}>
              { I18n.t("about-page-third-paragraph-text") }
            </Text>
            <View style={styles.list}>
              <Text style={styles.listItem}>
                • { I18n.t("contributor-1") }
              </Text>
              <Text style={styles.listItem}>
                • { I18n.t("contributor-2") }
              </Text>
              <Text style={styles.listItem}>
                • { I18n.t("contributor-3") }
              </Text>
              <Text style={styles.listItem}>
                • { I18n.t("contributor-4") }
              </Text>
              <Text style={styles.listItem}>
                • { I18n.t("contributor-5") }
              </Text>
              <Text style={styles.listItem}>
                • { I18n.t("contributor-6") }
              </Text>
              <Text style={styles.listItem}>
                • { I18n.t("contributor-7") }
              </Text>
              <Text style={styles.listItem}>
                • { I18n.t("contributor-8") }
              </Text>
            </View>
            <Text style={styles.aboutTitle}>{ I18n.t("about-page-fourth-paragraph-title") }</Text>
            <Text style={styles.text}>
              { I18n.t("about-page-fourth-paragraph-text") }
              <TouchableWithoutFeedback onPress={()=> this.handleLink("https://github.com/abidlabs/tarteel.io") }
                                        style={styles.link}>
                <Text style={styles.linkText}>https://github.com/abidlabs/tarteel.io.</Text>
              </TouchableWithoutFeedback>
            </Text>
          </View>
          <View style={styles.bottomButtons}>
            <Button radius={23} Width={150} Height={45} color={"#58BCB0"} onPress={this.handleContactUs}>
              <Text style={styles.white}>
                { I18n.t("contact-us-button-text") }
              </Text>
            </Button>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default connect(
  state => ({
    ayahsCount: state.ayahs.count,
    totalAyahsCount: state.data.totalAyahsCount,
    locale: state.data.locale
  })
)(About)

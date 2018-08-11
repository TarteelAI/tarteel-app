import React from "react"
import { connect }  from "react-redux"
import { View, Text, Linking, ScrollView } from "react-native"
import Image from "react-native-remote-svg"
import { Actions } from "react-native-router-flux"
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Button from "../Button"
import StatusBar from "../StatusBar"
import SnackBar from "../SnackBar"
import Navbar from "../Navbar"

import NavbarStyles  from "../Navbar/styles"

import { numberWithCommas } from "../../utils"
import showError from "../../utils/showError"

import styles from "./styles";

class About extends React.Component {
  handleContactUs = () => {
    Linking.openURL("mailto:support@tarteel.io")
  }
  componentWillMount() {
    // fetch("")
    // .then(res => res.json())
    // .then(json => {

    // })
    // .catch((e) => {
      // showError(e.message);
    // })
  }
  render() {
    const { ayahsCount } = this.props
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
            <View style={styles.imageWrapper}>
              <Image source={require("../../../assets/imgs/Logo.svg")} />
            </View>
            <View style={styles.figcaption}>
              <Image source={require("../../../assets/imgs/mask.png")} />
            </View>
          </View>
          <View style={styles.title}>
            <Text style={styles.ayahsCount}>{ numberWithCommas(ayahsCount) }</Text>
            <Text style={styles.titleText}>Ayas recorded</Text>
          </View>
          <Text style={styles.text}>
            The Tarteel 10,000 Project aims is to build a dataset of how different people -- women and men of different ethnicities and ages -- recite the Quran.
          </Text>
          <Text style={styles.text}>
            This data (of 10,000 annotated verses) will be used build machine learning models to convert recitation2text. This model will be released to developers who want use it to build cool and useful apps (for example hifz correction) for the community.
          </Text>
          <Text style={styles.text}>
            What I’d like to hear from you in particular is 1) any bugs that you find while using Tarteel 2) any suggestions you have for features we can include to incentivize more people to use the system and upload their recitations.
          </Text>
          <View style={styles.bottomButtons}>
            <Button radius={23} Width={150} Height={45} color={"#58BCB0"} onPress={this.handleContactUs}>
              <Text style={styles.white}>
                Contact Us
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
    ayahsCount: state.ayahs.count
  })
)(About)

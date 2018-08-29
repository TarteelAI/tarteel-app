import React from "react"
import { connect }  from "react-redux"
import { View, Text, Linking, ScrollView, Image, TouchableWithoutFeedback } from "react-native"
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
  handleLink = link => Linking.openURL(link)
  render() {
    const { totalAyahsCount } = this.props
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
            <Text style={styles.titleText}>Ayas recorded</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.aboutTitle}>What is Tarteel?</Text>
            <Text style={styles.text}>
              The Tarteel 10,000 Project aims is to build a dataset of how different people -- women and men of different ethnicities and ages -- recite the Quran.
            </Text>
            <Text style={styles.aboutTitle}>What is the Tarteel 10,000 Challenge?</Text>
            <Text style={styles.text}>
              The goal of the Tarteel 10,000 Challenge is to build the world's first public dataset of Quranic recitations carried out by ordinary Muslims. Most of the available audio of the Quran being recited is from professional reciters with strong fluency in tajweed (rules of recitation) and is recorded in studios. This is valuable when someone wants to listen to a recitation of the Quran.
            </Text>
            <Text style={styles.text}>
              However, many software tools that Muslim developers are interested in building require training machine learning models on Quranic recitation (e.g. to convert recitation2text), as it is recited by ordinary Muslims. The recitation of ordinary Muslims differs from professional recordings in many ways: for example, it may include background noise, or may be recited by people with limited knowledge of tajweed, or the demographics of reciters may be different. By collecting this data, we can train machine learning models, which we will release to software-developers who are interested in developing a wide variety of applications that are based on recitation2text, things like:
            </Text>
            <View style={styles.list}>
              <Text style={styles.listItem}>
                • Hifz helping tools that automatically correct mistakes
              </Text>
              <Text style={styles.listItem}>
                • Tarjweed teaching tools in a similar vein
              </Text>
              <Text style={styles.listItem}>
                • Masjid kiosks that follow the imam and display the translation of the verse
              </Text>
            </View>
            <Text style={styles.aboutTitle}>Who is a part of Tarteel?</Text>
            <Text style={styles.text}>
              Tarteel came out bi'iznillah and with the efforts of the following people:
            </Text>
            <View style={styles.list}>
              <Text style={styles.listItem}>
                • Abubakar Abid, a PhD student at Stanford University
              </Text>
              <Text style={styles.listItem}>
                • Ali Abid, a software engineer at Google
              </Text>
              <Text style={styles.listItem}>
                • Ali Abdalla, a mechanical engineer at Tesla
              </Text>
              <Text style={styles.listItem}>
                • Abdellatif Abdelfattah, a software engineer at Twitter
              </Text>
              <Text style={styles.listItem}>
                • BaHaa Jr., a software engineering student at HTI
              </Text>
              <Text style={styles.listItem}>
                • Hamzah Khan, a software engineer at Uber ATG
              </Text>
              <Text style={styles.listItem}>
                • Areeba Abid, a biomedical engineering student at Georgia Tech
              </Text>
              <Text style={styles.listItem}>
                • Abdulrahman Alfozan, a software engineer at Facebook
              </Text>
            </View>
            <Text style={styles.aboutTitle}>How can I help?</Text>
            <Text style={styles.text}>
              Tarteel is an open-source project that is maintained by developers interested in furthering the mission of Tarteel.
              If you'd like to contribute, please check out our GitHub repo:
              <TouchableWithoutFeedback onPress={()=> this.handleLink("https://github.com/abidlabs/tarteel.io") }
                                        style={styles.link}>
                <Text style={styles.linkText}>https://github.com/abidlabs/tarteel.io.</Text>
              </TouchableWithoutFeedback>
            </Text>
          </View>
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
    ayahsCount: state.ayahs.count,
    totalAyahsCount: state.data.totalAyahsCount
  })
)(About)

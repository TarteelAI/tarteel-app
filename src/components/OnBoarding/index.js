import React from "react"
import Swiper from 'react-native-swiper';
import {View, Text, StatusBar, Image, Linking} from "react-native"
import { Actions } from "react-native-router-flux"
import { connect }  from "react-redux"
import { Permissions } from "expo";
import I18n from "ex-react-native-i18n"

import Button from "../Button"
import Snackbar from '../SnackBar'
import {setPassedOnBoardingScreen} from "../../utils";
import showError from "../../utils/showError";

import styles from "./styles"

class OnBoarding extends React.Component {
  state = {
    stage: 0,
    scrollEnabled: true,
    gotPermissions: false
  }
  handleScroll = (index) => {
    if (index === 1 && !this.state.gotPermissions) {
      this.setState({ scrollEnabled: false })
    }
    this.setState({
      stage: index
    })
  }
  goNext = () => {
    const { stage } = this.state
    if(stage < 2) {
      if (stage === 1) {
        this.alertIfRemoteNotificationsDisabledAsync(() => {
          this.setState({ scrollEnabled: true, gotPermissions: true })
          this.Swiper.scrollBy(1, true)

        })
      } else {
        this.Swiper.scrollBy(1, true)
      }
    }
    else if (stage === 2) {
      setPassedOnBoardingScreen(true).catch(e => showError(e.message))
      Actions.home()
    }
  }
  alertIfRemoteNotificationsDisabledAsync = async (cb) => {
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (status !== 'granted') {
      alert('Hey! You might want to enable Audio for my app, they are good.');
    }
    else {
      cb()
    }
  }
  handleLink = () => {
    Linking.openURL("https://www.tarteel.io/privacy")
  }
  render() {
    const { stage, scrollEnabled } = this.state
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="transparent" barStyle="dark-content" />
        <View style={styles.swiperWrapper}>
          <Swiper loop={false} activeDotColor={"#5ec49e"} dotStyle={{ width: 15 }} ref={Ref => this.Swiper = Ref }
                  onIndexChanged={this.handleScroll} scrollEnabled={ scrollEnabled }>
            <View style={styles.slide1}>
              <View style={styles.figure}>
                <Image  source={require("../../../assets/imgs/Logo.png")} />
              </View>
              <Text style={styles.title}>
                { I18n.t("onboarding-first-screen-title") }
              </Text>
              <Text style={styles.text}>
                { I18n.t("onboarding-first-screen-text") }
              </Text>
            </View>
            <View style={styles.slide2}>
              <View style={styles.figure}>
                <Image source={require("../../../assets/imgs/recorder.png")} />
              </View>
              <Text style={styles.title}>
                { I18n.t("onboarding-second-screen-title") }
              </Text>
              <Text style={styles.text}>
                { I18n.t("onboarding-second-screen-text") }
              </Text>
            </View>
            <View style={styles.slide3}>
              <View style={styles.figure}>
                <Image source={require("../../../assets/imgs/privacy.png")} />
              </View>
              <Text style={styles.title}>
                { I18n.t("onboarding-third-screen-title") }
              </Text>
              <Text style={styles.text}>
                { I18n.t("onboarding-third-screen-text") } <Text style={styles.link} onPress={this.handleLink}>{ I18n.t("onboarding-third-screen-text-link") }</Text>
              </Text>
            </View>
          </Swiper>
          <View style={styles.slideButton}>
            <Button radius={23} Width={150} Height={40} color={"#58BCB0"} onPress={this.goNext}>
              <Text style={styles.white}>
                {
                  stage === 1 ? I18n.t("onboarding-second-screen-button-text") :
                    stage === 2 ? I18n.t("onboarding-third-screen-button-text") :
                      I18n.t("onboarding-first-screen-button-text")
                }
              </Text>
            </Button>
          </View>
        </View>
        <Snackbar id={"root_app"}/>
      </View>
    )
  }
}

export default connect()(OnBoarding)

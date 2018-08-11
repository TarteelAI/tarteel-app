import React from "react"
import Swiper from 'react-native-swiper';
import { View, Text, StatusBar } from "react-native"
import { Actions } from "react-native-router-flux"
import Image from "react-native-remote-svg"
import { connect }  from "react-redux"
import Expo from "expo";

// import StatusBar from "../StatusBar";
import Button from "../Button"
import Snackbar from '../SnackBar'
import {setPassedOnBoarding} from "../../utils";
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
      setPassedOnBoarding(true).catch(e => showError(e.message))
      Actions.home()
    }
  }
  alertIfRemoteNotificationsDisabledAsync = async (cb) => {
    const { Permissions } = Expo;
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (status !== 'granted') {
      alert('Hey! You might want to enable Audio for my app, they are good.');
    }
    else {
      cb()
    }
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
                Welcome to Tarteel
              </Text>
              <Text style={styles.text}>
                Thank you for helping us build the world's first public, open-source dataset of Quran recitations by ordinary people, like you and me. Tarteel is an initiative to encourage machine learning applications based on recitations of the Quran (such as hifz correction).
              </Text>
            </View>
            <View style={styles.slide2}>
              <View style={styles.figure}>
                <Image source={require("../../../assets/imgs/recorder.png")} />
              </View>
              <Text style={styles.title}>
                Voice Recording
              </Text>
              <Text style={styles.text}>
                You need to enable the audio recording in order to record your recitation.
              </Text>
            </View>
            <View style={styles.slide3}>
              <View style={styles.figure}>
                <Image source={require("../../../assets/imgs/privacy.png")} />
              </View>
              <Text style={styles.title}>
                Privacy Policy
              </Text>
              <Text style={styles.text}>
                As part of making an public dataset, we want to let you know that your recordings will be released. You can read our privacy policy here (http://tarteel.io/privacy/)
              </Text>
            </View>
          </Swiper>
          <View style={styles.slideButton}>
            <Button radius={23} Width={150} Height={40} color={"#58BCB0"} onPress={this.goNext}>
              <Text style={styles.white}>
                {
                  stage === 1 ? "Enable" : stage === 2 ? "I Agree" : "Next"
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

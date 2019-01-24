import React from "react"
import { View, Text, Animated, Switch, AsyncStorage, Image, TouchableOpacity } from "react-native";
import Expo, { KeepAwake }  from "expo"
import { MaterialCommunityIcons, MaterialIcons, Feather, FontAwesome } from '@expo/vector-icons';
import { connect }  from "react-redux"
import { Actions } from "react-native-router-flux"
import I18n from 'ex-react-native-i18n'

import Button from "../Button/index"
import Navbar from "../Navbar";
import NavbarStyles  from "../Navbar/styles"
import StatusBar from "../StatusBar";
import Loader from "../Loader"
import Line from "../Loader/Line"
import Snackbar from '../SnackBar'
import Steps from "../Steps"
import RecordingButton from "../RecordingButton"

import { increaseRecords } from "../../store/actions/records"
import {increaseAyahs, setRandomAyah, setSpecificAyah, setStaticAyah} from "../../store/actions/ayahs"
import showError from "../../utils/showError"
import { surahs } from "../PickSurah/surahs";

import stylesFactory from "./styles"
import {
  loadNextAyah,
  loadPreviousAyah,
  setNextAyah,
  setPreviousAyah
} from "../../store/actions/preloadedAyahs";
import {increaseTotalCount, setContinuous, setpassedOnBoarding} from "../../store/actions";
import {numberWithCommas, setLastAyah} from "../../utils";

let isClickedStop = false

class Main extends React.Component {
  state = {
    status: {
      isRecording: false,
      durationMillis: 0
    },
    sound: {},
    phase: 0,
    fadeAnim: new Animated.Value(1),
    animateRecordingButton: false,
  }
  alertIfRemoteNotificationsDisabledAsync = async () => {
    const { Permissions } = Expo;
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (status !== 'granted') {
      alert('Hey! You might want to enable Audio for my app, they are good.');
    }
  }
  handleRecording = async () => {
    if(this.props.continuous) isClickedStop = false
    const recordingOptions = {
      ios: {
        extension: ".wav",
        audioQuality: Expo.Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
      },
      android: {
        extension: ".wav",
        outputFormat: Expo.Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
        audioEncoder: Expo.Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
      }
    }
    Expo.Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Expo.Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Expo.Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    }).then( async () => {
      this.recording = new Expo.Audio.Recording();
      try {
        this.recording.
        prepareToRecordAsync(recordingOptions)
          .then(() => {
            this.recording.startAsync()
            // You are now recording!.
            KeepAwake.activate();
            this.recording.setOnRecordingStatusUpdate(this.onRecordingStatusUpdate)
          })
      } catch (error) {
        // An error occurred!
        showError(error.message)
      }
    })

  }
  onRecordingStatusUpdate = (status) => {
    if(this.props.continuous) {
      this.setState({
        status: {
          ...status,
          isRecording: isClickedStop ? false : true,
          isDoneRecording: !isClickedStop ,
        }
      })
    } else {
      this.setState({
        status
      })
    }
  }
  handleStopRecording = () => {
    KeepAwake.deactivate();
    this.recording.stopAndUnloadAsync().then(async () => {
      Expo.Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Expo.Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        playsInSilentLockedModeIOS: true,
        shouldDuckAndroid: true,
        interruptionModeAndroid: Expo.Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      }).then(() => {
        this.recording.createNewLoadedSound()
          .then(async ({sound, status}) => {
          try {
            this.setState({
              sound: {
                sound,
                status
              }
            })
            if(this.props.continuous)
              this.justUploadTheFile(false)
            // Your sound is playing!
          } catch (error) {
            // An error occurred!
            showError(error.message)
          }
        })
      })

    })
  }
  async componentWillMount() {
    this.alertIfRemoteNotificationsDisabledAsync()
    try {
      const lastAyah = JSON.parse(await AsyncStorage.getItem("lastAyah"))
      // If it's specific the specific function sets the ayah
      if(!this.props.currentAyah.surah) {
        if(!this.props.specific) {
          if(lastAyah && lastAyah.surah) {
            this.props.dispatch(setStaticAyah(lastAyah))
            this.props.dispatch(loadNextAyah())
            this.props.dispatch(loadPreviousAyah())
          }
          else
            this.fetchRandomAyah()
        }
      }
    }catch (e) {
      showError(e.message)
    }
  }
  fetchRandomAyah = () => {
    this.props.dispatch(setRandomAyah())
  }
  fetchSpecificAyah = (surah, ayah) => {
    this.props.dispatch(setSpecificAyah(String(surah), String(ayah)))
  }
  uploadAudioAsync = async (uri) =>  {
    const { currentAyah, continuous } = this.props
    const { surah, ayah, hash, session_id } = currentAyah
    const recitation_mode = continuous ? "continuous" : "discrete"
    console.log("Uploading " + uri);
    let apiUrl = 'https://www.tarteel.io/api/recordings/';
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();
    formData.append('surah_num', surah);
    formData.append('ayah_num', ayah);
    formData.append('hash_string', String(hash));
    formData.append('session_id', session_id);
    formData.append('recitation_mode', recitation_mode);
    formData.append('file', {
      uri,
      name: `${surah}_${ayah}_${hash}.${fileType}`,
      type: `audio/x-${fileType}`,
    });

    let options = {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
    };

    console.log("POSTing " + uri + " to " + apiUrl);
    return fetch(apiUrl, options);
  }
  resetRecording = () => {
    this.recording = null
    this.setState({
      sound: {},
      status: {},
      animateRecordingButton: false
    })
  }
  handleRetry = () => {
    this.recording = null
    this.setState({
      sound: {},
      status: {},
      animateRecordingButton: true
    })
    this.handleRecording()
  }
  increaseRecords = () => {
    this.props.dispatch(increaseRecords())
  }
  increaseAyahs = () => {
    this.props.dispatch(increaseAyahs())
  }
  handleSubmit = async () => {
    const { recordingsCount, demographicData, passedOnBoarding, dispatch } = this.props

    let uri = await this.recording.getURI();

    this.uploadAudioAsync(uri).then((res) => {
      if (res.status === 201) {
      }
    }).catch(e => {
      showError(e.message)
    })

    this.increaseRecords()
    this.increaseAyahs()
    dispatch(increaseTotalCount())
    if(recordingsCount === 4) {
      this.props.dispatch(setpassedOnBoarding(true))
      if(!demographicData)
        Actions.demographic()
      else {
        if(!demographicData.age)
          Actions.demographic()
      }

    }
    else {
      this.handleNextAyah()
      this.resetRecording()
    }
  }
  handlePreviousAyah = () => {
    const { previousAyah } = this.props.preloadedAyahs
    if (previousAyah.surah) {
      this.props.dispatch(setNextAyah(this.props.currentAyah))
      this.props.dispatch(setStaticAyah(previousAyah))
      this.props.dispatch(loadPreviousAyah())
      setLastAyah(previousAyah)
    } else  {
      const { ayah, surah } = this.props.currentAyah
      const prevAyah = Number(ayah) - 1
      if(ayah == 1) {
        const prevSurah = Number(surah) - 1
        this.fetchSpecificAyah(prevSurah, surahs[prevSurah].ayah)
      }
      else
        this.fetchSpecificAyah(surah, String(prevAyah))
    }
  }
  handleNextAyah = () => {
    const { nextAyah } = this.props.preloadedAyahs
    if (nextAyah.surah) {
      this.props.dispatch(setPreviousAyah(this.props.currentAyah))
      this.props.dispatch(setStaticAyah(nextAyah))
      this.props.dispatch(loadNextAyah())
      setLastAyah(nextAyah)

    } else {
      const { ayah, surah } = this.props.currentAyah
      const nextAyah = Number(ayah) + 1
      if(surahs[surah]["ayah"] == nextAyah - 1) {
        const nextSurah = Number(surah) + 1
        this.fetchSpecificAyah(nextSurah, 1)
      }
      else
        this.fetchSpecificAyah(surah, String(nextAyah))
    }
  }
  handleContinuousNext = () => {
    const { continuous } = this.props
    if(continuous) {
      this.recording.stopAndUnloadAsync().then(async () => {
        Expo.Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          interruptionModeIOS: Expo.Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentModeIOS: true,
          playsInSilentLockedModeIOS: true,
          shouldDuckAndroid: true,
          interruptionModeAndroid: Expo.Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        }).then(() => {
          this.justUploadTheFile(true)
        })

      })
    }
  }
  justUploadTheFile = (thenRecord) => {
    if(!thenRecord) {
      this.setState({
        sound: {},
        status: {},
        animateRecordingButton: false
      })
    }
    this.recording.createNewLoadedSound()
      .then(async ({sound, status}) => {
        try {
          let uri = await this.recording.getURI();

          this.uploadAudioAsync(uri).then((res) => {
            if (res.status === 201) {
              console.log("posted")
            }
          }).catch(e => {
            showError(e.message)
          })

          this.increaseRecords()
          this.increaseAyahs()
          this.handleNextAyah()
          this.props.dispatch(increaseTotalCount())
          if (thenRecord)
            this.handleRecording()
          else
            this.resetRecording()
          // Your sound is playing!
        } catch (error) {
          // An error occurred!
          showError(error.message)
        }
      })
  }
  handleSwitchChange = (val) => {
    const continuous = val === true ? true : ""
    this.props.dispatch(setContinuous(continuous))
  }
  render() {
    const { status, animateRecordingButton } = this.state
    const { currentAyah, passedOnBoarding, totalAyahsCount, continuous } = this.props
    const { isRecording, isDoneRecording } = status
    const styles = stylesFactory(this.props)
    const kFormatter = num => num > 999 ? (num/1000).toFixed(1) + 'k' : num
    const NavigationButtons = () => (
      <View style={styles.navigationButton}>
        <TouchableOpacity style={{ padding: 10}} onPress={() => {
          this.handlePreviousAyah()
          this.resetRecording()
        }}>
          <View>
            <Text style={styles.navigationButtonText}>{ I18n.t("previous-ayah") }</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
    return (
      <View style={styles.container}>
        <StatusBar />
        <Navbar style={{ height: 55 }}>
          <View style={[NavbarStyles.right, styles.right]}>
            <Button color={"transparent"} Height={50} Width={50} radius={0} onPress={Actions.profile}>
              <FontAwesome name="user" size={35} color="#676A75" />
            </Button>
          </View>

          <View style={[NavbarStyles.left, styles.left ]}>
            <TouchableOpacity style={{ height: 50, width: 50}} onPress={Actions.about}>
              <View style={styles.leftIconFigure}>
                <Image source={require("../../../assets/imgs/account.png")}  />
              </View>
            </TouchableOpacity>
            <View>
              {
                !totalAyahsCount ? <Line /> :
                  <Text style={styles.mainScreenCounter}>{ numberWithCommas(totalAyahsCount) }</Text>
              }
            </View>
          </View>
        </Navbar>
        <View style={[styles.container, { marginTop: 25 }]}>
          <View style={styles.ayahWrapper}>
            {
              !currentAyah.line ? <Loader /> :
                <Text style={styles.ayahText}>{ currentAyah.line }</Text>
            }
            {
              Boolean(currentAyah.ayah) &&
                <TouchableOpacity onPress={() => { Actions.pickayah({currentAyah}) }}>
                  <View style={{ paddingHorizontal: 15, justifyContent: "center"}}>
                    <MaterialIcons style={styles.exclamationIcon} name={"info-outline"} size={12} color={"gray"}/>
                    <Text style={[styles.ayahPositionText]}>
                      [{ currentAyah.surah } : { currentAyah.ayah }]
                    </Text>
                  </View>
                </TouchableOpacity>
            }
          </View>
          <View style={styles.recordingButtonsWrapper}>
            {
              isDoneRecording  && !continuous ?
                <View style={styles.wrapper}>
                  <Button onPress={this.handleRetry} Height={55} Width={55} color={"#19213B"} >
                    <Feather name={"refresh-ccw"} size={28} color={"#fff"} />
                  </Button>
                  <Button style={{ marginTop: 25 }} radius={23} Width={180} Height={45} color={"#58BCB0"} onPress={this.handleSubmit}>
                    <Text style={styles.white}>{ I18n.t("submit-button-text") }</Text>
                  </Button>
                </View>
                :
                  <View style={styles.recordButtonWrapper} >
                    <RecordingButton handleRecord={this.handleRecording}
                                     handleStop={() => {
                                       if(this.state.continuous) isClickedStop = true
                                       this.handleStopRecording()
                                     }} isRecording={isRecording} continuous={continuous} animateManual={animateRecordingButton} />
                    <View style={[ styles.navigationButtons, { opacity: isRecording ? 0 : 1 } ]}>
                      <View>
                        <TouchableOpacity style={{ padding: 10}} onPress={this.handlePreviousAyah}>
                          <View>
                            <Text style={styles.navigationButtonText}>{ I18n.t("previous-ayah") }</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <View>
                        <TouchableOpacity style={{ padding: 10}} onPress={this.handleNextAyah}>
                          <View>
                            <Text style={[styles.navigationButtonText]}>{ I18n.t("next-ayah") }</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                    {
                      isRecording && continuous ?
                      <Button radius={23} Width={180} Height={45} color={"#58BCB0"} onPress={this.handleContinuousNext}>
                        <Text style={styles.white}>{ I18n.t("submit-button-text") }</Text>
                      </Button> : null
                    }
                  </View>
            }
          </View>
          {
            isDoneRecording && !continuous ? <NavigationButtons /> : null
          }
          {
            !passedOnBoarding ? (!isRecording && !isDoneRecording ?<Steps /> : null) :
              !isRecording && !isDoneRecording &&
            <View style={styles.continuousSwitch}>
              <Switch
                value={Boolean(continuous)}
                onValueChange={this.handleSwitchChange}
                onTintColor={"#408F84"}
              />
              <Text style={styles.continuousSwitchText}>{ I18n.t('continuous-mode-note-text') }</Text>
            </View>
          }
        </View>
      </View>
    )
  }
}



export default connect(
  state => ({
    recordingsCount: state.records.count,
    demographicData: state.demographicData,
    currentAyah: state.ayahs.currentAyah,
    preloadedAyahs: state.preloadedAyahs,
    passedOnBoarding: state.data.passedOnBoarding,
    totalAyahsCount: state.data.totalAyahsCount,
    fontSize: state.data.fontSize,
    continuous: state.data.continuous,
    locale: state.data.locale
  })
)(Main)

import React from "react"
import { View, Text, Animated, Switch, AsyncStorage, Image, TouchableOpacity } from "react-native";
import { KeepAwake, Permissions, Audio }  from "expo"
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
import {
  increaseAyahs,
  loadNextQueue,
  loadPrevQueue,
  setRandomAyah,
  setSpecificAyah,
  setStaticAyah,
  loadNextAyah,
  loadPreviousAyah,
  setNextAyah,
  setPreviousAyah, popPrevAyah, unShiftPrevAyah, shiftNextAyah, popNextAyah, unShiftNextAyah, shiftPrevAyah
} from "../../store/actions/ayahs"
import showError from "../../utils/showError"
import { surahs } from "../PickSurah/surahs";

import stylesFactory from "./styles"
import {increaseTotalCount, setContinuous, setpassedOnBoarding, setSessionId} from "../../store/actions";
import {numberWithCommas, setLastAyah} from "../../utils";
import {getNextAyah, getPrevAyah} from "../../utils/ayahs";

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
        audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
      },
      android: {
        extension: ".wav",
        outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
        audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
      }
    }
    Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
    }).then( async () => {
      this.recording = new Audio.Recording();
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
      Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        playsInSilentLockedModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      }).then(() => {
        this.recording.createNewLoadedSoundAsync()
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
      if (!this.props.currentAyah.surah) {
        if (!this.props.specific) {
          if (lastAyah && lastAyah.surah) {
            this.props.dispatch(setStaticAyah(lastAyah));
          }
          else {
            await this.fetchRandomAyah()
          }
          await this.props.dispatch(setSessionId(this.props.currentAyah.session_id));
          await this.props.dispatch(loadNextAyah());
          await this.props.dispatch(loadPreviousAyah());
          await this.props.dispatch(loadNextQueue());
          await this.props.dispatch(loadPrevQueue());
        }
      }
    }catch (e) {
      showError(e.message)
    }
  }
  fetchRandomAyah = async () => {
    await this.props.dispatch(setRandomAyah())
  }
  fetchSpecificAyah = (surah, ayah) => {
    this.props.dispatch(setSpecificAyah(String(surah), String(ayah)))
  }
  uploadAudioAsync = async (uri) =>  {
    const { currentAyah, continuous } = this.props
    const { surah, ayah, hash } = currentAyah
    const recitation_mode = continuous ? "continuous" : "discrete";
    console.log("Uploading " + uri);
    let apiUrl = 'https://apiv1.tarteel.io/api/recordings/';
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();
    formData.append('surah_num', surah);
    formData.append('ayah_num', ayah);
    formData.append('hash_string', String(hash));
    formData.append('session_id', this.props.sessionId);
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
        'Cookie': `sessionid=${this.props.sessionId}`,
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
      animateRecordingButton: true,
    })
    this.handleRecording();
  }
  increaseRecords = () => {
    this.props.dispatch(increaseRecords());
  }
  increaseAyahs = () => {
    this.props.dispatch(increaseAyahs());
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
      this.handleNextAyah();
      this.resetRecording();
    }
  }

  handleNextAyah = async () => {
    const {ayah, surah} = this.props.currentAyah;
    const {nextSurah, nextAyah} = getNextAyah(surah, ayah);

    await this.props.dispatch(popPrevAyah());
    await this.props.dispatch(unShiftPrevAyah(this.props.currentAyah));

    if (this.props.nextAyah.length && this.props.nextAyah[0].ayah === nextAyah) {
      await this.props.dispatch(setStaticAyah(this.props.nextAyah[0]));
    }

    await this.props.dispatch(shiftNextAyah());
    await this.props.dispatch(loadNextQueue());

  }

  handlePreviousAyah = async () => {
    const {ayah, surah} = this.props.currentAyah;
    const {prevSurah, prevAyah} = getPrevAyah(surah, ayah)

    await this.props.dispatch(popNextAyah());
    await this.props.dispatch(unShiftNextAyah(this.props.currentAyah))

    if (this.props.prevAyah.length && this.props.prevAyah[0].ayah === prevAyah) {
      await this.props.dispatch(setStaticAyah(this.props.prevAyah[0]));
    }

    await this.props.dispatch(shiftPrevAyah());
    this.props.dispatch(loadPrevQueue());
  }
  handleContinuousNext = () => {
    const { continuous } = this.props
    if(continuous) {
      this.recording.stopAndUnloadAsync().then(async () => {
        Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentModeIOS: true,
          playsInSilentLockedModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
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
    this.recording.createNewLoadedSoundAsync()
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
    const { currentAyah, passedOnBoarding, totalAyahsCount, continuous, isLoadingAyah } = this.props
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
              !currentAyah.line || isLoadingAyah ? <Loader /> :
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
                trackColor={{true: "#408F84", false: null}}
              />
              <Text style={styles.continuousSwitchText}>{ I18n.t('continuous-mode-note-text') }</Text>
            </View>
          }
        </View>
      </View>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    recordingsCount: state.records.count,
    demographicData: state.demographicData,
    currentAyah: state.ayahs.currentAyah,
    nextAyah: state.ayahs.nextAyah,
    prevAyah: state.ayahs.prevAyah,
    isLoadingAyah: state.ayahs.isLoadingAyah,
    passedOnBoarding: state.data.passedOnBoarding,
    totalAyahsCount: state.data.totalAyahsCount,
    fontSize: state.data.fontSize,
    continuous: state.data.continuous,
    locale: state.data.locale,
    sessionId: state.data.sessionId,
  }
}

export default connect(
  mapStateToProps,
)(Main)

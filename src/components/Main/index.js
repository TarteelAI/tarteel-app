import React from "react"
import { View, Text, Animated, ScrollView, AsyncStorage, TouchableWithoutFeedback, Image, TouchableOpacity } from "react-native";
import Expo from "expo"
import { MaterialCommunityIcons, MaterialIcons, Feather, FontAwesome } from '@expo/vector-icons';
import { connect }  from "react-redux"
import { Actions } from "react-native-router-flux"

import Button from "../Button/index"
import Navbar from "../Navbar";
import NavbarStyles  from "../Navbar/styles"
import StatusBar from "../StatusBar";
import Loader from "../Loader"
import Snackbar from '../SnackBar'
import Steps from "../Steps"
import RecordingButton from "../RecordingButton"

import { increaseRecords, setRecords } from "../../store/actions/records"
import {increaseAyahs, setCurrentAyah, setSpecificAyah, setStaticAyah} from "../../store/actions/ayahs"
import showError from "../../utils/showError"
import { surahs } from "../PickSurah/surahs";

import styles from "./styles"
import {
  loadNextAyah,
  loadPreviousAyah,
  loadRandomAyah,
  setNextAyah,
  setPreviousAyah
} from "../../store/actions/preloadedAyahs";
import {setpassedOnBoarding} from "../../store/actions";

class Main extends React.Component {
  state = {
    status: {
      isRecording: false,
      durationMillis: 0
    },
    sound: {},
    phase: 0,
    fadeAnim: new Animated.Value(1),
    animateRecordingButton: false
  }
  alertIfRemoteNotificationsDisabledAsync = async () => {
    const { Permissions } = Expo;
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (status !== 'granted') {
      alert('Hey! You might want to enable Audio for my app, they are good.');
    }
  }
  handleRecording = async () => {
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
            // You are now recording!
            this.recording.setOnRecordingStatusUpdate(this.onRecordingStatusUpdate)
          })
      } catch (error) {
        // An error occurred!
        showError(error.message)
      }
    })

  }
  onRecordingStatusUpdate = (status) => {
    this.setState({
      status
    })
  }
  handleStopRecording = () => {
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
      if(!this.props.specific) {
        if(lastAyah && lastAyah.surah) {
          this.props.dispatch(setStaticAyah(lastAyah))
          this.props.dispatch(loadNextAyah())
          this.props.dispatch(loadPreviousAyah())
        }
        else
          this.fetchRandomAyah()
      }
    }catch (e) {
      showError(e.message)
    }
  }
  fetchRandomAyah = () => {
    this.props.dispatch(setCurrentAyah())
    this.props.dispatch(loadRandomAyah())
  }
  fetchSpecificAyah = (surah, ayah) => {
    this.props.dispatch(setSpecificAyah(String(surah), String(ayah)))
  }
  uploadAudioAsync = async (uri) =>  {
    const { currentAyah } = this.props
    console.log("Uploading " + uri);
    let apiUrl = 'https://tarteel.io/api/recordings/';
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();
    formData.append('surah_num', currentAyah.surah);
    formData.append('ayah_num', currentAyah.ayah);
    formData.append('hash_string', String(currentAyah.hash));
    formData.append('session_id', currentAyah.session_id);
    formData.append('file', {
      uri,
      name: `recording.${fileType}`,
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
    const { recordingsCount, demographicData, passedOnBoarding } = this.props

    let uri = await this.recording.getURI();

    this.uploadAudioAsync(uri).then((res) => {
      if (res.status === 201) {
      }
    }).catch(e => {
      showError(e.message)
    })

    this.increaseRecords()
    this.increaseAyahs()
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
      if(passedOnBoarding){
        this.handleNextAyah()
      }
      else {
        this.fetchRandomAyah()
      }
      this.resetRecording()
    }
  }
  handlePreviousAyah = () => {
    const { previousAyah } = this.props.preloadedAyahs
    if (previousAyah.surah) {
      this.props.dispatch(setNextAyah(this.props.currentAyah))
      this.props.dispatch(setStaticAyah(previousAyah))
      this.props.dispatch(loadPreviousAyah())
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
  render() {
    const { status, animateRecordingButton } = this.state
    const { currentAyah, passedOnBoarding } = this.props
    const { isRecording, isDoneRecording } = status
    const NavigationButtons = () => (
      (isDoneRecording) ?
        <View style={styles.navigationButtons}>
          <View style={styles.navigationButton}>
            <TouchableOpacity style={{ padding: 10}} onPress={() => {
              this.handlePreviousAyah()
              this.resetRecording()
            }}>
              <View>
                <Text style={styles.navigationButtonText}>Previous Ayah</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
          :
        <View style={[ styles.navigationButtons, { opacity: isRecording ? 0 : 1 } ]}>
          <View style={styles.navigationButton}>
            <TouchableOpacity style={{ padding: 10}} onPress={this.handlePreviousAyah}>
              <View>
                <Text style={styles.navigationButtonText}>Previous</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.navigationButton}>
            <TouchableOpacity style={{ padding: 10}} onPress={this.handleNextAyah}>
            <View>
            <Text style={styles.navigationButtonText}>Next</Text>
            </View>
            </TouchableOpacity>
          </View>
        </View>
    )
    return (
      <View style={styles.container}>
        <StatusBar />
        <Navbar style={{ height: 55 }}>
          <View style={[NavbarStyles.right, { transform: [ { translateY: 5 } ]}]}>
            <Button color={"transparent"} Height={50} Width={50} radius={0} onPress={Actions.profile}>
              <FontAwesome name="user" size={35} color="#676A75" />
            </Button>
          </View>

          <View style={[NavbarStyles.left, { transform: [ { translateY: 5 } ]}]}>
            <TouchableOpacity style={{ height: 50, width: 50}} onPress={Actions.about}>
              <View style={styles.leftIconFigure}>
                <Image source={require("../../../assets/imgs/account.png")}  />
              </View>
            </TouchableOpacity>
          </View>
        </Navbar>
        <View style={[styles.container, { marginTop: 25 }]}>
          <View style={styles.ayahWrapper}>
            {
              !currentAyah.line ? <Loader /> :
                <Text style={styles.ayahText}>
                  { currentAyah.line }
                </Text>
            }
            {
              Boolean(currentAyah.ayah) && 
                <TouchableOpacity onPress={() => { Actions.pickayah({currentAyah}) }}>
                  <View>
                    <MaterialIcons style={styles.exclamationIcon} name={"info-outline"} size={12} color={"gray"}/>
                    <Text style={[styles.ayahText, styles.ayahPositionText]}>
                      [{ currentAyah.surah } : { currentAyah.ayah }]
                    </Text>
                  </View>
                </TouchableOpacity>
            }
          </View>
          <View style={styles.recordingButtonsWrapper}>
            {
              isDoneRecording ?
                <View style={styles.wrapper}>
                  <Button onPress={this.handleRetry} Height={55} Width={55} color={"#19213B"} >
                    <Feather name={"refresh-ccw"} size={28} color={"#fff"} />
                  </Button>
                  <Button style={{ marginTop: 50 }} radius={23} Width={180} Height={45} color={"#58BCB0"} onPress={this.handleSubmit}>
                    <Text style={styles.white}>Next</Text>
                  </Button>
                </View>
                :
                  <View style={styles.recordButtonWrapper} >
                    <RecordingButton handleRecord={this.handleRecording}
                                     handleStop={this.handleStopRecording} isRecording={isRecording} animateManual={animateRecordingButton} />
                  </View>
            }
          </View>
          {
            passedOnBoarding ? <NavigationButtons /> : <Steps />
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
    passedOnBoarding: state.data.passedOnBoarding
  })
)(Main)

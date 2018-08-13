import React from "react"
import { View, Text, Animated, Easing, TouchableWithoutFeedback, Image, TouchableOpacity } from "react-native";
import Expo from "expo"
import { MaterialCommunityIcons, Feather, FontAwesome } from '@expo/vector-icons';
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

import { increaseRecords, setRecords, setLastDate } from "../../store/actions/records"
import { increaseAyahs, setCurrentAyah } from "../../store/actions/ayahs"
import showError from "../../utils/showError"

import styles from "./styles"

class Main extends React.Component {
  state = {
    status: {
      isRecording: false,
      durationMillis: 0
    },
    sound: {},
    phase: 0,
    fadeAnim: new Animated.Value(1),
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
  componentWillMount() {
    this.alertIfRemoteNotificationsDisabledAsync()
    this.fetchNewAyah()
  }
  fetchNewAyah = () => {
    this.props.dispatch(setCurrentAyah())
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
  handleRetry = () => {
    this.recording = null
    this.setState({
      sound: {},
      status: {},
    })
    this.fetchNewAyah()
  }
  increaseRecords = () => {
    this.props.dispatch(increaseRecords())
  }
  increaseAyahs = () => {
    this.props.dispatch(increaseAyahs())
  }
  setLastDate = () => {
    const today = new Date()
    this.props.dispatch(setLastDate(today.getTime()))
  }
  handleSubmit = async () => {
    const { recordingsCount, demographicData } = this.props
      let uri = await this.recording.getURI();

this.uploadAudioAsync(uri)

      this.uploadAudioAsync(uri).then((res) => {
        console.log(res);
        res.text().then(json => console.log(json))
        if(res.status === 201){
          this.increaseRecords()
          this.increaseAyahs()
          if(recordingsCount === 4) {
            this.setLastDate()
            if(!demographicData)
              Actions.demographic()
            else {
              if(!demographicData.age)
                Actions.demographic()
            }

          }
          else {
            this.handleRetry()
          }
        }
      })
      .catch(e => {
        showError(e.message)
      })
  }
  render() {
    const { status } = this.state
    const { currentAyah } = this.props
    const { isRecording, isDoneRecording } = status
    return (
      <View style={styles.container}>
        <StatusBar />
        <Navbar>
          <View style={NavbarStyles.right}>
            <Button color={"transparent"} Height={50} Width={50} radius={0} onPress={Actions.profile}>
              <FontAwesome name="user" size={32} color="#676A75" />
            </Button>
          </View>

          <View style={NavbarStyles.left}>
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
              Boolean(currentAyah.ayah) && <Text style={[styles.ayahText, styles.ayahPositionText]}>
                [{ currentAyah.surah } : { currentAyah.ayah }]
              </Text>
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
                                     handleStop={this.handleStopRecording} isRecording={isRecording} />
                  </View>
            }
          </View>
          <Steps />
        </View>
      </View>
    )
  }
}


export default connect(
  state => ({
    recordingsCount: state.records.count,
    lastDate: state.records.lastDate,
    demographicData: state.demographicData,
    currentAyah: state.ayahs.currentAyah
  })
)(Main)

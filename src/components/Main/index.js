import React from "react"
import { StyleSheet, View, Text, Animated, Easing } from "react-native";
import Expo from "expo"
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { secondsToTime } from "../../utils/timeConverter"

import Button from "../Button/index"
import Navbar from "../Navbar";
import NavbarStyles, { MenuButton } from "../Navbar/styles"
import StatusBar from "../StatusBar";
import Footer from "../Footer";
import AudioPlayer from "../AudioPlayer";
import Loader from "../Loader"

export default class Main extends React.Component {
  state = {
    status: {
      isRecording: false,
      durationMillis: 0
    },
    currentAyah: {
      line: "",
      surah: "",
      ayah: "",
      hash: 0
    },
    sound: {},
    phase: 0,
    fadeAnim: new Animated.Value(1)
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
        console.log(error.message)
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
            console.log(this.state)
            // Your sound is playing!
          } catch (error) {
            // An error occurred!
            console.log(error.message)
          }
        })
      })

    })
  }
  handleFadeOut() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 0,
      duration: 800,
      easing: Easing.back(5)
    }).start()
  }
  handleFadeIn() {
    Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 800,
      easing: Easing.back(5)
    }).start()
  }
  componentWillMount() {
    this.alertIfRemoteNotificationsDisabledAsync()
    this.fetchNewAyah()
  }
  fetchNewAyah = () => {
    fetch("https://tarteel.io/get_ayah")
      .then(res => res.json())
      .then(json => {
        this.setState({
          currentAyah: json
        })
      })
  }
  uploadAudioAsync = async (uri) =>  {
    const { currentAyah } = this.state
    console.log("Uploading " + uri);
    let apiUrl = 'https://tarteel.io/api/recordings/';
    let uriParts = uri.split('.');
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();
    formData.append('surah_num', Number(currentAyah.surah));
    formData.append('ayah_num', Number(currentAyah.ayah));
    formData.append('hash_string', String(currentAyah.hash));
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
        'Content-Type': 'multipart/form-data',
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
      currentAyah: {}
    })
    this.fetchNewAyah()
  }
  addPhase = () => {
    this.setState(
      state => ({
        phase: state.phase + 1
      })
    )
  }
  handleSubmit = async () => {
    let uri = await this.recording.getURI();
    this.addPhase()
    return this.uploadAudioAsync(uri);
  }
  handleNewOne = () => {
    this.handleRetry()
    this.setState({
      phase: 0
    })
  }
  render() {
    const { status, currentAyah, fadeAnim, sound, phase }= this.state
    const { isRecording, durationMillis, isDoneRecording } = status
    return (
      <View style={styles.container}>
        <StatusBar />
        <Navbar>
          <View style={NavbarStyles.right}>
            <MenuButton/>
          </View>
          <View style={NavbarStyles.left}>
            <Text>
            </Text>
          </View>
        </Navbar>
        <View style={styles.ayahWrapper}>
          {
            !currentAyah.line ? <Loader /> :
            <Text style={styles.ayahText}>
              { currentAyah.line }
            </Text>
          }
          {
            Boolean(currentAyah.ayah) && <Text style={styles.ayahText}>
              [{ currentAyah.surah }:{ currentAyah.ayah }]
            </Text>
          }
        </View>
        {
          isDoneRecording ? null :
          !isRecording ?
              <Animated.View style={{ opacity: fadeAnim }}>
              <Button onPress={this.handleRecording}>
                <MaterialCommunityIcons name="microphone" size={32} color="white" />
              </Button>
            </Animated.View> :
            <Animated.View style={{ opacity: fadeAnim }}>
              <Text style={{ textAlign: "center" }}>
                { secondsToTime(durationMillis) }
              </Text>
              <Button onPress={this.handleStopRecording} >
                <MaterialCommunityIcons name="stop" size={32} color="white" />
              </Button>
            </Animated.View>
        }
        {
          Boolean(sound.sound && phase === 0) && <AudioPlayer sound={sound}/>
        }
        {
          Boolean(sound.sound) && <Footer newOne={this.handleNewOne} phase={phase} retry={this.handleRetry} submit={this.handleSubmit}/>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  right: {
    transform: [
      { translateY: 15 }
    ]
  },
  left: {
    transform: [
      { translateY: 15 }
    ]
  },
  ayahWrapper: {
    marginBottom: 50
  },
  ayahText: {
    textAlign: "center",
    paddingHorizontal: 20,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 15,
    lineHeight: 30,
    letterSpacing: 2,
  }
});

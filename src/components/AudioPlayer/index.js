import React from "react"
import { View, TouchableOpacity, Animated } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import styles from "./styles"

export default class AudioPlayer extends React.Component {
  state = {
    progress: new Animated.Value(0)
  }
  handlePlay = () => {
    this.props.sound.sound.playAsync()
    Animated.timing(this.state.progress, {
      toValue: 250,
      duration: this.props.sound.status.durationMillis || 2000,
    }).start();
  }
  render() {
    const { progress } = this.state
    const { sound, status } = this.props.sound
    return (
      <Animated.View style={styles.container}>
        <TouchableOpacity onPress={this.handlePlay} style={styles.playButton}>
          <MaterialCommunityIcons name={"play"} size={32} color={"#fff"} />
        </TouchableOpacity>
        <View style={styles.background} />
        <Animated.View style={[styles.foreground, { width: progress }]} />
      </Animated.View>
    )
  }
}
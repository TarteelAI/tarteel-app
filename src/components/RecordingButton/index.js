import React from "react"
import { TouchableWithoutFeedback, Animated, StyleSheet } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class RecordingButton extends React.Component {
  animatedValue = new Animated.Value(1)
  animatedBorder = new Animated.Value(0.75)
  animatedOverlay = new Animated.Value(0)
  startAnimation = () => {
    this.scaleUp()
    this.scaleBorderUp()
    this.scaleOverlayUp()
  }
  resetAnimation = () => {
    this.scaleDown()
    this.scaleBorderDown()
    this.scaleOverlayDown()
  }
  scaleUp = () => {
    Animated.spring(this.animatedValue,
      {
        toValue: 1.25,
      }
    ).start()
  }
  scaleDown = () => {
    Animated.spring(this.animatedValue,
      {
        toValue: 1,
        friction: 3,
        tension: 40
      }
    ).start()
  }
  scaleBorderUp = () => {
    Animated.spring(this.animatedBorder,
      {
        toValue: 1.5,
      }
    ).start()
  }
  scaleBorderDown = () => {
    Animated.spring(this.animatedBorder,
      {
        toValue: 0.75,
        friction: 3,
        tension: 40
      }
    ).start()
  }
  scaleOverlayUp = () => {
    Animated.spring(this.animatedOverlay,
      {
        toValue: 1,
      }
    ).start()
  }
  scaleOverlayDown = () => {
    Animated.spring(this.animatedOverlay,
      {
        toValue: 0,
        friction: 3,
        tension: 40
      }
    ).start()
  }
  handleRecord = () => {
    this.startAnimation()
    this.props.handleRecord()
  }
  handleStop = () => {
    this.resetAnimation()
    this.props.handleStop()
  }
  componentWillReceiveProps() {
    if(this.props.animateManual) {
      this.startAnimation()
    }
  }
  render() {
    const { isRecording } = this.props
    const styles = stylesFactory(this.props)
    const animatedStyle = {
      transform: [{ scale: this.animatedValue }]
    }
    const animatedBordered= {
      transform: [{ scale: this.animatedBorder }]
    }
    const animatedOverlay= {
      transform: [{ scale: this.animatedOverlay }]
    }
    return (
      <TouchableWithoutFeedback {...this.props} onPress={!isRecording ? this.handleRecord : this.handleStop }>
        <Animated.View style={[styles.container ]} >
          <Animated.View style={[ styles.background, animatedStyle]} />
          <Animated.View style={[styles.wrapper, { zIndex: 4 }, animatedStyle]}>
            <MaterialCommunityIcons name={"microphone"} size={32} color={"#fff"} />
          </Animated.View>
          <Animated.View style={[styles.bordered, animatedBordered]}/>
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}

const buttonHeight = 65
const buttonWidth = 65

const stylesFactory = (props) => StyleSheet.create({
  container: {
    width: buttonWidth * 2 ,
    height: buttonHeight  * 2,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    width: buttonWidth,
    height: buttonHeight,
    justifyContent: "center",
    alignItems: "center",
    borderRadius:  50,

  },
  background: {
    backgroundColor: props.isRecording ? "#c45e5e" : "#408F84" ,
    position: "absolute",
    zIndex: 2,
    height: buttonHeight,
    width: buttonWidth,
    borderRadius:  50,
  },
  active: {
    backgroundColor: "#c45e5e",
  },
  overlay: {
    minWidth: buttonWidth / 2,
    minHeight: buttonHeight / 2,
    borderRadius: 50,
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  bordered: {
    width: buttonWidth,
    height: buttonHeight ,
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: "#fff",
    borderColor: "#c45e5e",
    position: "absolute",
  }
})

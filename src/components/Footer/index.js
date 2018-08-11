import React from "react"
import { View, Text, Animated, ActivityIndicator } from "react-native"
import Ripple from "react-native-material-ripple"
import { styles } from "./styles";

import { Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"

export default class Footer extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),
    isLoading: false
  }
  handleRetry = () => {
    this.props.retry()
  }
  handleSubmit = () => {
    this.setState({
      isLoading: true
    })
    this.props.submit().then((res) => {
      console.log(res)
      this.setState({
        isLoading: false
      })
    })
  }
  componentDidMount() {
    this.fadeAnimation = Animated.timing(this.state.fadeAnim, {
      toValue: 1,
      duration: 500,
    });
    this.fadeAnimation.start();
  }
  render() {
    const { fadeAnim, isLoading } = this.state
    const { phase } = this.props
    return (
      <Animated.View style={[styles.container, { opacity: fadeAnim } ]}>
        {
          phase > 0 ?
            <SubmissionMessage newOne={this.props.newOne}/> :
          isLoading ?
          <View style={[styles.footerTab, { backgroundColor: "#408F84" }]}>
            <ActivityIndicator size="small" color={"#fff"}/>
          </View> :
          <View style={styles.container}>
            <View style={styles.footerTab}>
              <Button color={"#408F84"} onPress={this.handleSubmit}>
                <Text style={[styles.white, { textAlign: "center" }]}>Submit</Text>
                <Feather name={"check"} size={32} color={"#fff"} />
              </Button>
            </View>
            <View style={styles.footerTab}>
              <Button color={"#282C34"} onPress={this.handleRetry}>
                <Text style={[styles.white, { textAlign: "center" }]}>Retry</Text>
                <Feather name={"refresh-ccw"} size={32} color={"#fff"} />
              </Button>
            </View>
          </View>
        }
      </Animated.View>
    )
  }
}

const Button = (props) => (
  <Ripple onPress={props.onPress} style={styles.buttonWrapper}>
    <View style={[styles.buttonContent, props.style, { backgroundColor: props.color }]}>
      { props.children }
    </View>
  </Ripple>
)


const SubmissionMessage = (props) => (
  <View style={styles.container}>
    <View style={[styles.footerTab, {flex: 3, backgroundColor: "#408F84", flexDirection: "row"}]}>
      <MaterialCommunityIcons name={"check-all"} size={32} color={"#fff"} />
      <Text style={{ marginLeft: 5, color: "#fff", textAlign: "center" }}>Sent</Text>
    </View>
    <View style={[styles.footerTab, {flex: 2, justifyContent: "space-around"}]}>
      <Button color={"#282C34"} onPress={props.newOne} style={{flexDirection: "row"}}>
        <Text style={[styles.white, { textAlign: "center" }]}>New one</Text>
        <MaterialIcons name={"navigate-next"} size={32} color={"#fff"} />
      </Button>
    </View>
  </View>
)
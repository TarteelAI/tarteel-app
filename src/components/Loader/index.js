import React from "react"
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient'
import { Svg } from "expo"

export default class Loader extends React.Component {
  render() {
    return (
      <SvgAnimatedLinearGradient primaryColor="#e8f7ff" secondaryColor="#c0c8ce" duration={700} height={140}>
        <Svg.Rect x="20" y="17" rx="4" ry="4" width="250" height="13"/>
        <Svg.Rect x="60" y="35" rx="4" ry="4" width="150" height="13"/>

        <Svg.Rect x="120" y="85" rx="4" ry="4" width="50" height="13"/>
      </SvgAnimatedLinearGradient>
    )
  }
}
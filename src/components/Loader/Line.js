import React from "react"
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient'
import { Svg } from "expo"

export default () => (
  <SvgAnimatedLinearGradient primaryColor="#e8f7ff" secondaryColor="#c0c8ce" duration={700} height={140}>
    <Svg.Rect x="0" y="8" rx="4" ry="4" width="50" height="13"/>
  </SvgAnimatedLinearGradient>
)
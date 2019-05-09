import React from 'react'
import { View, TextInput as RNTextInput } from 'react-native'

import styles from './styles'
import { Colors } from '../../Themes'

export default class TextInput extends React.Component {
  onChangeText = e => {
    this.props.onChange(e)
  }

  render () {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <RNTextInput
          underlineColorAndroid='transparent'
          {...this.props}
          style={[styles.input, this.props.style]}
          placeholderTextColor={Colors.snow}
          onChangeText={this.onChangeText}
        />
      </View>
    )
  }
}

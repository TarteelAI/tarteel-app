import React, { Fragment, Component } from 'react'
import { View, Text, StatusBar, Image, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Permissions } from 'expo'
import I18n from 'ex-react-native-i18n'

import TextInput from '../TextInput'
import Snackbar from '../SnackBar'
import showError from '../../utils/showError'

import styles from './styles'

class WaitList extends Component {
  state = {
    email: '',
    onWaitList: false,
    done: false
  }

  alertIfRemoteNotificationsDisabledAsync = async () => {
    const { status } = await Permissions.getAsync(
      Permissions.USER_FACING_NOTIFICATIONS
    )
    if (status !== 'granted') {
      alert(
        'Tarteel Would Like To Send You Notifications! You might want to enable notifications to notify you when you are ready to start matching.'
      )
    } else {
      setTimeout(() => {
        this.setState({ done: true })
      }, 2000)
    }
  }

  handleChange = email => {
    this.setState({ email })
  }

  handleSubmit = () => {
    const { email } = this.state
    if (this.validateEmail(email)) {
      this.setState({ onWaitList: true })
    } else {
      showError('invalid email')
    }
  }

  validateEmail (email) {
    const filter = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
    return filter.test(email)
  }

  renderForm = () => {
    return (
      <Fragment>
        <TextInput
          containerStyle={[styles.textInputContainer]}
          style={[styles.textInput]}
          placeholder='Please Enter Your Favoriate Email'
          autoCapitalize='none'
          autoCorrect={false}
          onChange={this.handleChange}
        />

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={this.handleSubmit}
        >
          <Text style={styles.buttonText}>
            {I18n.t('waitList-submit-button')}
          </Text>
        </TouchableOpacity>
      </Fragment>
    )
  }

  renderMessage = () => {
    const { done } = this.state

    setTimeout(() => {
      this.alertIfRemoteNotificationsDisabledAsync()
    }, 1000)

    return (
      <View style={styles.messageContainer}>
        <Text style={styles.subTitle}>
          {done ? I18n.t('waitList-set') : I18n.t('waitList-congrats')}
        </Text>

        <Text style={styles.paragraph}>
          {done ? I18n.t('waitList-notify') : I18n.t('waitList-permission')}
        </Text>
      </View>
    )
  }

  render () {
    const { onWaitList } = this.state

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='transparent' barStyle='dark-content' />

        <Image
          style={styles.figure}
          source={require('../../../assets/imgs/Logo.png')}
        />

        <View style={styles.innerContainer}>
          <Text style={styles.title}>
            {I18n.t('waitList-first-screen-title')}
          </Text>

          <Text style={styles.text}>
            {I18n.t('waitList-first-screen-text')}
          </Text>

          {!onWaitList ? this.renderForm() : this.renderMessage()}
        </View>

        <Snackbar id={'root_app'} />
      </View>
    )
  }
}

export default connect()(WaitList)

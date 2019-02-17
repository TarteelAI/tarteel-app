import React from "react"
import { View, Text, FlatList, TouchableWithoutFeedback, ScrollView, Linking, Share, Alert } from "react-native"
import { connect } from "react-redux"
import { Actions } from "react-native-router-flux"
import { MaterialCommunityIcons, Feather, FontAwesome } from "@expo/vector-icons"
import I18n from "ex-react-native-i18n"
import { ActionSheet, ActionSheetItem } from 'react-native-action-sheet-component';

import Navbar from "../Navbar";
import Button from  "../Button"
import StatusBar from  "../StatusBar"
import Snackbar from '../SnackBar'

import {restoreRecords, setLocale, setFontSize, setNotificationIteration} from "../../store/actions/index"
import { numberWithCommas } from "../../utils"
import showError from "../../utils/showError";
import AnimatedCircularProgress  from '../../utils/AnimatedCircularProgress'

import stylesFactory from "./styles"
import NavbarStyles from "../Navbar/styles"

class Profile extends React.Component {
  actionSheet;
  fontActionSheet;

  state = {
    fill: 100,
    defaultSelectedValues: [this.props.notifications],
    selectedFontSize: [this.props.fontSize],
    linksList: [
      {
        text: I18n.t("change-ayah-page-title"),
        onClick: () => Actions.change()
      },
      {
        text: I18n.t("demographic-info-link-text"),
        onClick: () => Actions.demographicForm()
      },
      {
        text: I18n.t("ayah-recognition-link-text"),
        new: true,
        onClick: () => Linking.openURL("https://www.tarteel.io/recognition"),
      },
      {
        text: I18n.t("evaluate-ayahs-link-text"),
        new: true,
        onClick: () => Linking.openURL("https://www.tarteel.io/evaluator")
      },
      {
        text: I18n.t("font-size-link-text"),
        new: true,
        onClick: () => {
          this.fontActionSheet.show()
        }
      },
      {
        text: I18n.t("share-tarteel-link-text"),
        onClick: () => {
          Share.share({
            url: 'http://tarteel.app.link/3NMFNtbiBP',
            title: I18n.t("share-tarteel-post-title"),
          }).then(() => {

          }).catch(e => showError(e.message))
        }
      },
      {
        text: I18n.t("privacy-policy-link-text"),
        onClick: () => Linking.openURL("https://www.tarteel.io/privacy")
      },
      {
        text: I18n.t("reset-records-link-text"),
        onClick: () => {
          Alert.alert(
            I18n.t("restore-records-alert-title"),
            I18n.t("restore-records-alert-text"),
            [
              {text: I18n.t("restore-record-alert-cancel"), style: 'cancel'},
              {text: I18n.t("restore-record-alert-confirm"), onPress: this.handleRestore },
            ],
            { cancelable: true }
          )

        }
      },
      {
        text: I18n.t("change-language-link-text"),
        onClick: () => {
          Alert.alert(
            I18n.t("change-language-link-text"),
            "",
            [
              {text: "English", onPress: () => this.handleChangeLanguage("en")},
              {text: "العربيه", onPress: () => this.handleChangeLanguage("ar") },
            ],
            { cancelable: true }
          )

        }
      },
      {
        text: I18n.t("notifications-link-text"),
        onClick: () => {
          this.actionSheet.show(() => {
            console.log('callback - show');
          })
        }
      },
      {
        text: I18n.t("contact-us-button-text"),
        onClick: () => Linking.openURL("mailto:tarteel@abdellatif.io")
      },
    ]
  }
  handleChangeLanguage = (locale) => {
    I18n.locale = (locale) ? locale.replace(/_/, '-') : '';
    this.forceUpdate(() => {
      this.props.dispatch(setLocale(locale))
    })
  }
  handleRestore = () => {
    this.props.dispatch(restoreRecords())
  }
  handleNotificationChange = (value, index, selectedData) => {
    this.props.dispatch(setNotificationIteration(value))
  }
  handleFontSizeChange = (value, index, selectedData) => {
    this.props.dispatch(setFontSize(value))
  }
  _keyExtractor = (item, index) => index;
  render() {
    const { linksList } = this.state;
    const { ayahsCount } = this.props;
    const styles = stylesFactory({...this.props, locale: I18n.locale})
    const currentTarget = ayahsCount > 100 ? 1000 : ayahsCount > 1000 ? 10000 : 100;
    const checkedIcon =  <Feather name={"check"} size={32} color={"#5ec49e"}/>;
    const ListItem = ({ item }) => {
      return (
          <View style={styles.listItem}>
            <TouchableWithoutFeedback onPress={item.onClick} >
              <View style={styles.listItemContent}>
                <Text style={styles.listItemText}>
                  { item.text }
                </Text>
                {
                  item.new ?
                    <View style={styles.newBadge}>
                      <Text style={styles.newBadgeText}>
                        { I18n.t("new-badge-text") }
                      </Text>
                    </View>
                    :
                    null
                }
              </View>
            </TouchableWithoutFeedback>
          </View>
      )
    }
    return (
      <View style={styles.container}>
        <StatusBar />
        <Navbar>
          <View style={NavbarStyles.left} >
            <Button color={"transparent"} Height={35} Width={35} radius={0} onPress={Actions.pop}>
              <View>
                <MaterialCommunityIcons name={"keyboard-backspace"} size={32} color={"#474f59"} />
              </View>
            </Button>
          </View>
          <View >
            <Text style={[NavbarStyles.center, styles.title]}>
              { I18n.t("profile-page-title") }
            </Text>
          </View>
        </Navbar>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.progressContainer} >
            <AnimatedCircularProgress
              size={120}
              width={3}
              fill={ayahsCount/currentTarget*100}
              rotation={360}
              duration={1000}
              tintColor="#5ec49e"
              onAnimationComplete={() => console.log('onAnimationComplete')}
              backgroundColor="#ccc" >
              {
                (fill) => (
                  <View>
                    <Text style={styles.progressText} >
                      { I18n.t("progressbar-ayahs") }
                    </Text>
                    <Text style={styles.ayahsCount}>
                      { String(numberWithCommas((ayahsCount))) }
                    </Text>
                    <Text style={styles.progressNote} >
                      { `/${currentTarget}` }
                    </Text>
                  </View>
                )
              }
            </AnimatedCircularProgress>
          </View>
          <View style={styles.list}>
            <FlatList
              keyExtractor={this._keyExtractor}
              data={linksList}
              renderItem={({item}) => <ListItem item={item} /> }
            />
          </View>
        </ScrollView>
        <ActionSheet
            ref={(actionSheet) => { this.actionSheet = actionSheet; }}
            position="bottom"
            onChange={this.handleNotificationChange}
            defaultValue={this.state.defaultSelectedValues}
            multiple={false}
        >
          <ActionSheetItem
              text={` ${ I18n.t("notifications-daily-option") }`}
              value="day"
              selectedIcon={checkedIcon}
              style={styles.actionSheetItem}
              icon={
                I18n.locale !== "ar" && <Feather name="clock" color="gray" size={25} />
              }
              onPress={this.onItemPress}
          />
          <ActionSheetItem
              text={` ${ I18n.t("notifications-weekly-option") }`}
              value="week"
              selectedIcon={checkedIcon}
              style={styles.actionSheetItem}
              icon={
                I18n.locale !== "ar" && <FontAwesome name="calendar" color="gray" size={25} />
              }
              onPress={this.onItemPress}
          />
          <ActionSheetItem
              text={` ${ I18n.t("notifications-off-option") }`}
              value="off"
              selectedIcon={checkedIcon}
              style={styles.actionSheetItem}
              icon={
                I18n.locale !== "ar" && <Feather name="bell-off" color="gray" size={25} />
              }
              onPress={this.onItemPress}
          />
        </ActionSheet>
        <ActionSheet
          ref={(C) => { this.fontActionSheet = C; }}
          position="bottom"
          onChange={this.handleFontSizeChange}
          defaultValue={this.state.selectedFontSize}
          multiple={false}
        >
          <ActionSheetItem
            text={` ${ I18n.t("font-size-small-option") }`}
            value="small"
            selectedIcon={checkedIcon}
            onPress={this.onItemPress}
          />
          <ActionSheetItem
            text={` ${ I18n.t("font-size-medium-option") }`}
            value="medium"
            selectedIcon={checkedIcon}
            onPress={this.onItemPress}
          />
          <ActionSheetItem
            text={` ${ I18n.t("font-size-large-option") }`}
            value="large"
            selectedIcon={checkedIcon}
            onPress={this.onItemPress}
          />
        </ActionSheet>
      </View>
    )
  }
}

export default connect(
  state => ({
    ayahsCount: state.ayahs.count,
    demographicData: state.demographicData,
    passedOnBoarding: state.data.passedOnBoarding,
    notifications: state.data.notifications,
    fontSize: state.data.fontSize,
  })
)(Profile)

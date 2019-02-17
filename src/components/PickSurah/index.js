import React from "react"
import {Text, View, FlatList, TextInput, TouchableWithoutFeedback} from "react-native";
import NavbarStyles from "../Navbar/styles";
import {Actions} from "react-native-router-flux";
import { MaterialCommunityIcons } from "@expo/vector-icons"
import I18n from "ex-react-native-i18n"

import Button from "../Button";
import Navbar from "../Navbar";
import StatusBar from "../StatusBar"
import surahs from "./surahs";
import styles from "./styles"

export default class PickSurah extends React.Component {
  state = {
    searchText: ''
  };
  componentDidMount() {
    this.surahsList.scrollToIndex({
      animated: false,
      index: 100
    })
  }
  render() {
    const { searchText } = this.state
    const { currentAyah } = this.props
    const currentSurah = currentAyah ? currentAyah.surah : ""
    const ListItem = ({item}) => {
      return (
        <TouchableWithoutFeedback onPress={() => {Actions.pickayah({ currentSurah: item, currentAyah })}}>
          <View style={styles.listItem}>
            <Text style={[ styles.english, item === currentSurah ? {color: "#2ca4ab"} : {} ]}>{ surahs[item].english  }</Text>
            <Text style={[ styles.arabic, item === currentSurah ? {color: "#2ca4ab"} : {} ]} >{ surahs[item].arabic }</Text>
          </View>
        </TouchableWithoutFeedback>
      )
    }
    return (
      <View style={styles.container}>
        <StatusBar/>
        <Navbar>
          <View style={NavbarStyles.left} >
            <Button color={"transparent"} Height={35} Width={35} radius={0} onPress={Actions.home}>
              <MaterialCommunityIcons name={"keyboard-backspace"} size={32} color={"#474f59"} />
            </Button>
          </View>
          <View >
            <Text style={NavbarStyles.center} >{ I18n.t("surah-picker-title") }</Text>
          </View>
        </Navbar>
        <View style={styles.content}>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              onChangeText={(text) => this.setState({searchText: text})}
              value={this.state.text}
              underlineColorAndroid={"transparent"}
              placeholder={I18n.t("surah-picker-search-placeholder")}
              placeholderTextColor={"gray"}
              returnKeyType={"search"}
            />
          </View>
          <View style={styles.listWrapper}>
            <FlatList
              ref={(Ref) => { this.surahsList = Ref}}
              keyExtractor={item => item}
              initialScrollIndex={ Number(currentSurah) - 3 }
              data={
                !searchText ? Object.keys(surahs) :
                Object.keys(surahs).filter((elm) => {
                  return (
                    surahs[elm].arabic.includes(searchText.toLowerCase().trim()) ||
                    surahs[elm].english.toLocaleLowerCase().includes(searchText.toLowerCase().trim()) ||
                    surahs[elm].english.toLocaleLowerCase().includes(searchText.toLowerCase().trim())
                  )
                })
              }
              getItemLayout={(data, index) => (
                {length: 60, offset: 60 * index, index}
              )}
              renderItem={ListItem}
            />
          </View>
        </View>
      </View>
    )
  }
}


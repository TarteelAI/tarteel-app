import React from "react"
import {Text, View, FlatList, TextInput, TouchableWithoutFeedback, Dimensions} from "react-native";
import NavbarStyles from "../Navbar/styles";
import {Actions} from "react-native-router-flux";
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { connect } from "react-redux"
import I18n from "ex-react-native-i18n";

import Button from "../Button";
import Navbar from "../Navbar";
import StatusBar from "../StatusBar"
import { ayahsDict } from "./ayahs";
import styles from "./styles"
import {surahs} from "../PickSurah/surahs";
import {setSpecificAyah} from "../../store/actions/ayahs";
import {loadNextAyah, loadPreviousAyah} from "../../store/actions/preloadedAyahs";

const { height, width } = Dimensions.get("window")

String.prototype.trunc = function(n){
  return this.substr(0,n-1)+(this.length>n?'...':'');
};

class PickAyah extends React.Component {
  state = {
    searchText: ''
  };
  handleSelectAyah = (surah, ayah) => {
    this.props.dispatch(setSpecificAyah(surah, ayah))
    Actions.home({ specific: true })
  }
  render() {
    const { searchText } = this.state
    let { currentSurah, currentAyah } = this.props // that is just for development
    currentSurah = currentSurah || currentAyah.surah
    const ayahs = ayahsDict[currentSurah]
    const ListItem = ({item}) => {
      return (
        <View style={styles.listItem} key={item}>
          <TouchableWithoutFeedback onPress={() => this.handleSelectAyah(currentSurah, item)}>
            <View style={{ flexDirection: "row-reverse" }}>
              <Text
                writingDirection={"rtl"}
                style={[styles.text, styles.number,
                  item === currentAyah.ayah && currentSurah === currentAyah.surah ? {color: "#2ca4ab"} : {}]}>
                { item }
              </Text>
              <Text writingDirection={"rtl"}
                    style={[styles.text, item === currentAyah.ayah && currentSurah === currentAyah.surah ? {color: "#2ca4ab"} : {}]}>
                { ayahs[item].displayText.trunc(55) }
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <StatusBar/>
        <Navbar>
          <View style={NavbarStyles.left} >
            <Button color={"transparent"} Height={35} Width={35} radius={0} onPress={() => { Actions.picksurah({currentAyah}) }}>
              <MaterialCommunityIcons name={"keyboard-backspace"} size={32} color={"#474f59"} />
            </Button>
          </View>
          <View >
            <Text style={NavbarStyles.center} >{ surahs[currentSurah].latin || I18n.t("ayah-picker-title")  }</Text>
          </View>
        </Navbar>
        <View style={styles.content}>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              onChangeText={(text) => this.setState({searchText: text})}
              value={this.state.text}
              underlineColorAndroid={"transparent"}
              placeholder={I18n.t("ayah-picker-search-placeholder")}
              placeholderTextColor={"gray"}
              returnKeyType={"search"}
            />
          </View>
          <View style={styles.listWrapper}>
            <FlatList
              ref={"ayahsList"}
              keyExtractor={item => item}
              initialScrollIndex={ currentSurah === currentAyah.surah ? (Number(currentAyah.ayah) - 3) : 0 }
              data={
                !searchText ? Object.keys(ayahs) :
                Object.keys(ayahs).filter((elm) => {
                  return (
                    ayahs[elm].text.includes(searchText.toLowerCase().trim())
                  )
                })
              }
              renderItem={ListItem}
              getItemLayout={(data, index) => (
                {length: 65, offset: 65 * index, index}
              )}
            />
          </View>
        </View>
      </View>
    )
  }
}

export default connect()(PickAyah)
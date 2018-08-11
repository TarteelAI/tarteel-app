import React from "react"
import { View, Text, TextInput, Picker, TouchableWithoutFeedback } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import CountryPicker, {
  getAllCountries
} from 'react-native-country-picker-modal'
import { Actions } from "react-native-router-flux"
import { Dropdown } from 'react-native-material-dropdown';
import { connect } from 'react-redux';

import Navbar from "../Navbar";
import Button from  "../Button"
import StatusBar from  "../StatusBar"
import Snackbar from '../SnackBar'

import { setDemographicData } from "../../store/actions/demographicData"
import showError from "../../utils/showError"

import styles from "./styles"
import NavbarStyles  from "../Navbar/styles"


const COUNTRY_LIST = ["AF","AL","DZ","AS","AD","AO","AI","AQ","AG","AR","AM","AW","AU","AT","AZ","BS","BH","BD","BB","BY","BE","BZ","BJ","BM","BT","BO","BA","BW","BV","BR","IO","VG","BN","BG","BF","BI","KH","CM","CA","CV","KY","CF","TD","CL","CN","CX","CC","CO","KM","CK","CR","HR","CU","CW","CY","CZ","CD","DK","DJ","DM","DO","EC","EG","SV","GQ","ER","EE","ET","FK","FO","FJ","FI","FR","GF","PF","TF","GA","GM","GE","DE","GH","GI","GR","GL","GD","GP","GU","GT","GG","GN","GW","GY","HT","HM","HN","HK","HU","IS","IN","ID","IR","IQ","IE","IM","IL","IT","CI","JM","JP","JE","JO","KZ","KE","KI","XK","KW","KG","LA","LV","LB","LS","LR","LY","LI","LT","LU","MO","MK","MG","MW","MY","MV","ML","MT","MH","MQ","MR","MU","YT","MX","FM","MD","MC","MN","ME","MS","MA","MZ","MM","NA","NR","NP","NL","NC","NZ","NI","NE","NG","NU","NF","KP","MP","NO","OM","PK","PW","PS","PA","PG","PY","PE","PH","PN","PL","PT","PR","QA","CG","RO","RU","RW","RE","BL","KN","LC","MF","PM","VC","WS","SM","SA","SN","RS","SC","SL","SG","SX","SK","SI","SB","SO","ZA","GS","KR","SS","ES","LK","SD","SR","SJ","SZ","SE","CH","SY","ST","TW","TJ","TZ","TH","TL","TG","TK","TO","TT","TN","TR","TM","TC","TV","UG","UA","AE","GB","US","UM","VI","UY","UZ","VU","VA","VE","VN","WF","EH","YE","ZM","ZW","AX"]

const data = [
  { value: 'Male' },
  { value: 'Female'},
  { value: 'Other'}
]

const ages = [
  { value: "13-18" },
  { value: "19-25" },
  { value: "26-35" },
  { value: "36-45" },
  { value: "46-55" },
  { value: "56+" }
]

class DemographicForm extends React.Component {
  state = {
    age: "19-25",
    gender: "Male",
    cca2: "US",
    callingCode: "1",
  }
  handleSave = () => {
    const { age, gender, cca2:ethnicity } = this.state
    const data = { age, gender, ethnicity }

    fetch("https://tarteel.io/api/demographics/", {
      method: "POST",
      body: JSON.stringify(data)
    })
    .then((res) => {
      console.log(res)
      if(res.status === 201) {
        this.props.dispatch(setDemographicData(data))
        Actions.profile()
      }
    })
    .catch(e => {
      showError(e.message);
    })
  }
  capitalize = (str) => str.slice(0,1).toUpperCase() + str.slice(1)
  render() {
    return (
      <View style={styles.container}>
        <StatusBar />
        <Navbar>
          <View style={NavbarStyles.left} >
            <Button color={"transparent"} Height={35} Width={35} radius={0} onPress={Actions.pop}>
              <MaterialCommunityIcons name={"keyboard-backspace"} size={32} color={"#474f59"} />
            </Button>
          </View>
          <View >
            <Text style={NavbarStyles.center}>
              Demographic Data
            </Text>
          </View>
        </Navbar>
        <View style={styles.content}>
          <View style={styles.form}>
            <View style={styles.formRow}>
              <Text style={styles.inputLabel}>
                Age
              </Text>
              <View style={{ borderWidth: 0, paddingRight: 5, marginRight: -2}}>
                <TouchableWithoutFeedback>
                  <View>
                    <Text style={{ opacity: 0 }}>
                      { this.capitalize(this.state.age) }
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
                <Dropdown
                  label=''
                  data={ages}
                  containerStyle={styles.dropdown}
                  dropdownOffset={{ top: 0 , left: 0 }}
                  value={this.state.age}
                  fontSize={14}
                  pickerStyle={{ alignItems: 'stretch'}}
                  onChangeText={(value) => {
                    this.setState({
                      age: value
                    })
                  }}
                />
              </View>
            </View>
            <View style={styles.formRow}>
              <Text style={styles.inputLabel}>
                Gender
              </Text>
              <View style={{ borderWidth: 0 }}>
                <TouchableWithoutFeedback>
                  <View>
                    <Text style={{ opacity: 0 }}>
                      { this.capitalize(this.state.gender) }
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
                <Dropdown
                  label=''
                  data={data}
                  containerStyle={styles.dropdown}
                  dropdownOffset={{ top: 0 , left: 0 }}
                  value={this.state.gender}
                  fontSize={14}
                  onChangeText={(value) => {
                    this.setState({
                      gender: value
                    })
                  }}
                />
              </View>

            </View>
            <View style={styles.formRow}>
              <Text style={[styles.inputLabel, { bottom: -8}]}>
                Ethnic background
              </Text>
                <CountryPicker
                  countryList={COUNTRY_LIST}
                  onChange={value => {
                    this.setState({ cca2: value.cca2, callingCode: value.callingCode })
                  }}
                  cca2={this.state.cca2}
                  translation="eng"
                  closeable
                  filterable
                  styles={{
                    touchFlag: {
                      marginTop: -20
                    },
                    itemCountryName: {
                      borderBottomWidth: 0
                    },
                  }}
                />
            </View>

          </View>
          <Button radius={23} Width={150} Height={45} color={"#58BCB0"} style={styles.bottomButton} onPress={this.handleSave}>
            <Text style={styles.white}>
              Save
            </Text>
          </Button>
        </View>
      </View>
    )
  }
}

export default connect()(DemographicForm)

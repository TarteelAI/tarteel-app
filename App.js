import React from 'react';
import { Router, Stack , Scene } from "react-native-router-flux"
import { Font, Asset, AppLoading } from "expo";
import { Provider } from "react-redux"
import { AsyncStorage }  from "react-native"
import fromPairs from "lodash.frompairs"
import I18n from 'ex-react-native-i18n'

import configStore from "./src/store"
import { setRecords} from "./src/store/actions/records";
import { getDemographicData } from "./src/store/actions/demographicData";

import Main from "./src/components/Main"
import OnBoarding from "./src/components/OnBoarding"
import Demographic from "./src/components/Demographic"
import About from "./src/components/About"
import DemographicForm from "./src/components/DemographicForm";
import Profile from "./src/components/Profile";
import {getAyahs} from "./src/store/actions/ayahs";
import ChangeAyah from "./src/components/ChangeAyah";
import PickSurah from "./src/components/PickSurah";
import PickAyah from "./src/components/PickAyah";
import {getTotalAyahsCount, setContinuous, setLocale, setpassedOnBoarding} from "./src/store/actions";
import "./src/i18n/index"

const store = configStore()

export default class App extends React.Component {
  state = { loading: true }
  async componentWillMount() {
    await Font.loadAsync({
      'Arial': require('./assets/fonts/arial.ttf'),
      'Proxima-Nova-Alt-Regular': require('./assets/fonts/Proxima-Nova-Alt-Regular.ttf'),
      'Proxima-Nova-Alt-SemiBold': require('./assets/fonts/Proxima-Nova-Alt-SemiBold.ttf'),
      'Uthmanic': require('./assets/fonts/Uthmanic.otf'),
    });
    await I18n.initAsync();
    store.dispatch(getDemographicData())
    store.dispatch(getAyahs())
    store.dispatch(getTotalAyahsCount())
    try {
      let { recordsCount, passedOnBoarding, passedOnBoardingScreen, continuous, locale } =
        fromPairs(await AsyncStorage.multiGet(["recordsCount", "passedOnBoarding", "passedOnBoardingScreen", "continuous", "locale"]))
      this.setState({ loading: false, passedOnBoardingScreen })
      store.dispatch(setpassedOnBoarding(passedOnBoarding))
      store.dispatch(setContinuous(continuous))
      store.dispatch(setRecords(Number(recordsCount)))
      store.dispatch(setLocale(locale))
      store.subscribe(() => {
        let { locale: newLocale } = store.getState().data
        if(locale !== newLocale) {
          locale = newLocale
          this.forceUpdate()
        }
      })
    }
    catch(e) {
      console.log(e.message)
    }
    Asset.fromModule(require("./assets/imgs/Logo.png")).downloadAsync();
  }
  render() {
    const { loading, passedOnBoardingScreen } = this.state
    if (loading) {
      return <AppLoading />
    }
    return (
      <Provider store={store}>
        <Router>
          <Stack key="root" hideNavBar>
            <Scene initial={!passedOnBoardingScreen} key="onBoarding" component={OnBoarding}/>
            <Scene initial={passedOnBoardingScreen} key="home" component={Main}/>
            <Scene key="demographic" component={Demographic} />
            <Scene key="demographicForm" component={DemographicForm} />
            <Scene key="profile" component={Profile} />
            <Scene key="about" component={About} />
            <Scene key="change" component={ChangeAyah} />
            <Scene key="picksurah" component={PickSurah} />
            <Scene key="pickayah" component={PickAyah} />
          </Stack>
        </Router>
      </Provider>
    );
  }
}

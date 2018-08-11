import React from 'react';
import { Router, Stack , Scene } from "react-native-router-flux"
import { Font, Asset, AppLoading } from "expo";
import { Provider } from "react-redux"
import { AsyncStorage }  from "react-native"
import fromPairs from "lodash.frompairs"

import configStore from "./src/store"
import {getLastDate, setRecords} from "./src/store/actions/records";
import { getDemographicData } from "./src/store/actions/demographicData";

import Main from "./src/components/Main"
import OnBoarding from "./src/components/OnBoarding"
import Demographic from "./src/components/Demographic"
import About from "./src/components/About"
import DemographicForm from "./src/components/DemographicForm";
import Profile from "./src/components/Profile";
import {checkDayReset} from "./src/utils";
import {getAyahs} from "./src/store/actions/ayahs";

const store = configStore()

export default class App extends React.Component {
  state = { loading: true }
  async componentWillMount() {
    await Asset.loadAsync([
      require("./assets/imgs/Logo.svg"),
      require("./assets/imgs/man-user.svg"),
      require("./assets/imgs/privacy.svg"),
      require("./assets/imgs/Shape.svg"),
      require("./assets/imgs/mini-logo.svg"),
    ])
    await Font.loadAsync({
      'Arial': require('./assets/fonts/arial.ttf'),
      'Proxima-Nova-Alt-Regular': require('./assets/fonts/Proxima-Nova-Alt-Regular.ttf'),
      'Geeza': require('./assets/fonts/Geeza-Pro.ttf'),
    });
    store.dispatch(getDemographicData())
    store.dispatch(getLastDate())
    store.dispatch(getAyahs())
    try {
      const { recordsCount, passedOnBoarding } = fromPairs(await AsyncStorage.multiGet(["recordsCount", "passedOnBoarding"]))
      this.setState({ loading: false, passedOnBoarding })
      store.dispatch(setRecords(Number(recordsCount)))
      checkDayReset(store)
    }
    catch(e) {
      console.log(e.message)
    }
  }
  render() {
    const { loading, passedOnBoarding } = this.state
    if (loading) {
      return <AppLoading />
    }
    return (
      <Provider store={store}>
        <Router>
          <Stack key="root" hideNavBar>
            <Scene initial={!passedOnBoarding} key="onBoarding" component={OnBoarding}/>
            <Scene initial={passedOnBoarding} key="home" component={Main}/>
            <Scene key="demographic" component={Demographic} />
            <Scene key="demographicForm" component={DemographicForm} />
            <Scene key="profile" component={Profile} />
            <Scene key="about" component={About} />
          </Stack>
        </Router>
      </Provider>
    );
  }
}

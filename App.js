import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator}from 'react-navigation-tabs';
import facebook from './screens/facebook';
import insta from './screens/insta';
import ScanScreen from './screens/ScanScreen';


export default class App extends React.Component {
  render(){
    return(
      <AppContainer/>
    )
  }
}

const TabNavigator = createBottomTabNavigator({
  facebook:{screen:facebook},
  insta:{screen:insta}
})

const AppContainer = createAppContainer(TabNavigator)

import React, {Component} from 'react';
import { StyleSheet, Text, View, Platform, StatusBar} from 'react-native';
import Decks from './components/Decks'
import AddCard from './components/AddCard'
import AddDeck from './components/AddDeck'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import middleware from './middlewares'
import Constants from 'expo-constants';
import Container from './Container'
import {white, purple} from './utils/colors'

function UdaciStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends Component {

  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <View style={{flex: 1}}>
          <UdaciStatusBar backgroundColor={purple} barStyle="light-content" />
        <Container />
        </View>
      </Provider>
    )
  }
}
